使用toggleRowSelection切换、设置行是否选中

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
      firstPage: 0,
      paginationSizes: [2, 4],
      url: 'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock/el-data-table/persist-selection?a=3',
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
