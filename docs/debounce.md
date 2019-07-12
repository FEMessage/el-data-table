改变url会触发table更新数据，但会有个debounce间隔，目前设为200ms

```vue
<template>
  <el-data-table v-bind="$data" />
</template>
<script>
export default {
  mounted() {
    const id = setInterval(() => this.url += 1, 100)
    setTimeout(() => clearInterval(id), 5000)
  },
  data() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img?a=',
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
      hasOperation: false,
      hasNew: false
    }
  }
}
</script>
```
