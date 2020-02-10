树形结构

```vue
<template>
  <el-data-table v-bind="$data" />
</template>
<script>
// 注意看post/put请求, 带上了树形结构相应的 parentId
export default {
  data: function() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=tree',
      columns: [
        {prop: 'date', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'address', label: '地址'},
      ],
      form: [
        {
          type: 'input',
          id: 'name',
          label: '姓名',
          rules: [
            {
              required: true,
              message: '请输入姓名',
              trigger: 'blur',
              transform: v => v && v.trim()
            }
          ],
          el: {placeholder: '请输入姓名'}
        },
      ],
      hasPagination: false,
      isTree: true,
      tableAttrs: {
        rowClassName({rowIndex}) {
          return rowIndex === 2 ? 'is-tree-red' : ''
        }
      },
      expandAll: true,
    }
  },
  created() {
    // FYI: styleguide 里面用不了 style block
    document.querySelector('style').sheet.insertRule('.is-tree-red {color: red}')
  }
}
</script>
```
