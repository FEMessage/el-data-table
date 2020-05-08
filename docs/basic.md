基本用法，包含crud

```vue
<template>
  <el-data-table v-bind="$data" />
</template>
<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=basic',
      columns: [
        {prop: 'date', label: '日期', align: 'center'},
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
        },
        {
          el: {placeholder: '请输入',multiple:true},
          label: '区域',
          id: 'area',
          type: 'select',
          options:[
            {
              label:'东区',
              value:'east',
            },
            {
              label:'南区',
              value:'south',
            }
            ,{
              label:'西区',
              value:'west',
            },
            {
              label:'北区',
              value:'north',
            }
          ],
        }
      ],
      hasView: true
    }
  }
}
</script>
```
