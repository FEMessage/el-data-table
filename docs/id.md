自定义主键，点击删除按钮，查看网络请求

```vue
<template>
  <el-data-table
    v-bind="$data"
  >
  </el-data-table>
</template>
<script>
export default {
  data: function() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img',
      // 主键设置为status
      id: 'status',
      columns: [
        {prop: 'code', label: '品牌编号'},
        {prop: 'name', label: '品牌名称'},
        {
          prop: 'status',
          label: '状态',
          formatter: row => (row.status === 'normal' ? '启用' : '禁用')
        }
      ],
      hasNew: false
    }
  }
}
</script>
```
