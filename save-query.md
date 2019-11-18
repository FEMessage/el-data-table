通过saveQuery控制页面中只有一个table使用url来保存query参数。saveQuery默认为true。
以下示例中，第一个table会saveQuery为true, 第二个saveQuery为false

```vue
<template>
  <div>
    <el-data-table v-bind="$data" />
    <el-data-table v-bind="$data" :save-query="false" />
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      searchForm: [
        {
          el: {placeholder: '请输入'},
          label: '姓名',
          id: 'name',
          type: 'input'
        }
      ],
    }
  }
}
</script>
```
