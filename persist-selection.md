选中效果在翻页后仍维持

 ```vue
<template>
  <el-data-table v-bind="$data" />
</template>
 <script>
export default {
  name: 'persist-selection',
  data() {
    return {
      paginationSizes: [2, 4],
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=persist-selection',
      columns: [
        {type: 'selection', selectable(row) {return row.id !== 1}},
        {prop: 'id', label: 'id'},
        {prop: 'name', label: '用户名'}
      ],
      hasNew: false,
      persistSelection: true
    }
  },
}
</script>
```
