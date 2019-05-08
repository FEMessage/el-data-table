<template>
  <el-data-table v-bind="$data"></el-data-table>
</template>

<script>
export default {
  name: 'select-cross-pages',
  data() {
    return {
      firstPage: 0,
      paginationSizes: [2, 4],
      url: 'https://easy-mock.com/mock/5cd253664b170036725e06b5/datatable/list',
      columns: [
        // 注释掉 type: selection时, 删除按钮变成一行一个, 此时onDelete回调参数为选中行的数据
        {type: 'selection'},
        {prop: 'id', label: 'id'},
        {prop: 'name', label: '用户名'}
      ],
      selectCrossPages: true,
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
