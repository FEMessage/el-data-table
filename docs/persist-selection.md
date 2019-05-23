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
      firstPage: 0,
      paginationSizes: [2, 4],
      url: 'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock/el-data-table/persist-selection',
      columns: [
        {type: 'selection'},
        {prop: 'id', label: 'id'},
        {prop: 'name', label: '用户名'}
      ],
      hasNew: false,
      persistSelection: true,
      onDelete: selected => {
        return this.$axios.delete(
          'https://www.easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/on-delete',
          {
            data: {
              rows: selected.id || selected.map(v => v.id)
            }
          }
        )
      }
    }
  },
}
</script>
```
