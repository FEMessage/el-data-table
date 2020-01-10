显示单选框

```vue
<template>
  <div>
    <el-data-table v-bind="$data" ref="dataTable" @selection-change="onSelectionChange" />
    <div>selected: {{selected}}</div>
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
        {prop: 'id', label: 'id'},
        {prop: 'name', label: '用户名'}
      ],
      hasNew: false,
      hasOperation: true,
      selected: [],
      hasRadioSelect: true
    }
  },
  methods: {
    clearSelection() {
        this.$refs.dataTable.radioVal = ''
        this.$refs.dataTable.selected = []
    },
    onSelectionChange(val) {
      this.selected = val
    }
  }
}
</script>
```
