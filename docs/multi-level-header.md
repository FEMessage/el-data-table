只需要在`columns`子项里嵌套`columns`数组，就可以实现多级表头

```vue
<template>
  <el-data-table v-bind="$data" />
</template>
<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/LEcMEAs713a1b6dfad35518033b046ca69b4cffb478dc4d/el-data-table?q=basic',
      columns: [
        {prop: 'date', label: '日期'},
        {
          prop: 'info',
          label: '个人信息',
          columns: [
            {prop: 'name', label: '姓名'},
            {prop: 'address', label: '地址'}
          ]
        }
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
        }
      ],
      searchForm: [
        {
          el: {placeholder: '请输入'},
          label: '姓名',
          id: 'name',
          type: 'input'
        }
      ],
      hasView: true
    }
  }
}
</script>
```
