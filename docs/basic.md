基本用法，包含crud

```vue
<template>
  <el-data-table v-bind="$data" />
</template>
<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img?a=1',
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
      form: [
        {
          type: 'input',
          id: 'name',
          label: '品牌名称',
          rules: [
            {
              required: true,
              message: '请输入品牌名称',
              trigger: 'blur',
              transform: v => v && v.trim()
            }
          ],
          el: {placeholder: '请输入品牌名称'}
        },
      ],
      searchForm: [
        {
          el: {placeholder: '请输入'},
          label: '品牌名称',
          id: 'name',
          type: 'input'
        }
      ]
    }
  }
}
</script>
```
