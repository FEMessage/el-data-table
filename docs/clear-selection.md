使用clearSelection清空多选项；使用toggleRowSelection切换、设置行是否选中

 ```vue
<template>
  <div>
    <el-data-table v-bind="$data" ref="dataTable" @selection-change="onSelectionChange" />
    <div>selected: {{selected}}</div>
    <el-button @click="select">选择</el-button>
    <el-button @click="clearSelection">取消选择</el-button>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      paginationSizes: [2, 4],
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=persist-selection',
      columns: [
        {type: 'selection'},
        {prop: 'id', label: 'id'},
        {prop: 'name', label: '用户名'}
      ],
      hasNew: false,
      persistSelection: true,
      hasOperation: false,
      selected: []
    }
  },
  methods: {
    select() {
      [this.$refs.dataTable.data[1], {id: 3}]
        .forEach(r => this.$refs.dataTable.toggleRowSelection(r, true))
    },
    clearSelection() {
      this.$refs.dataTable.clearSelection()
    },
    onSelectionChange(val) {
      this.selected = val
    }
  }
}
</script>
```
