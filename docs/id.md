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
      id: 'date',
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=basic',
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
      hasNew: false
    }
  }
}
</script>
```
