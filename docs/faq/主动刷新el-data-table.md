通过getList方法主动刷新el-data-table。

```vue
<template>
<div>
  <el-data-table v-bind="$data" ref="dataTable" />
  <el-button @click="getList">调用el-table的toggleAllSelection方法</el-button>
</div>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img?a=1',
      columns: [
        {type: 'selection'},
        {prop: 'code', label: '品牌编号'},
        {prop: 'name', label: '品牌名称'},
        {prop: 'alias', label: '品牌别名'},
        {
          prop: 'status',
          label: '状态',
          formatter: row => (row.status === 'normal' ? '启用' : '禁用')
        }
      ],
      hasOperation: false,
      hasNew: false,
      hasDelete: false
    }
  },
  methods: {
    getList() {
      this.$refs.dataTable.getList()
    }
  },
}
</script>
```
