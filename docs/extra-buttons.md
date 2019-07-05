自定义操作列按钮

```vue
<template>
  <el-data-table v-bind="$data" />
</template>
<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img?a=2',
      columns: [
        {prop: 'code', label: '品牌编号'},
        {prop: 'name', label: '品牌名称'},
        {prop: 'alias', label: '品牌别名'},
        {
          prop: 'status',
          label: '状态',
          formatter: row => (row.status === 'normal' ? '启用' : '禁用')
        }
      ],
      extraButtons: [
        {
          type: 'success',
          text: row => row.status === 'normal' ? '禁用' : '启用',
          atClick(row) {
            alert(row.name)
          }
        },
      ]
    }
  }
}
</script>
```
