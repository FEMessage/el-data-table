表单项变更时, 立即获取新的表格数据

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
        {prop: 'date', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'address', label: '地址'},
      ],
      searchForm: [
        {
          el: {placeholder: '请输入'},
          label: '姓名',
          id: 'name',
          type: 'input',
          searchImmediately: true
        },
        {
          el: {placeholder: '请选择'},
          label: '性别',
          id: 'sex',
          type: 'select',
          searchImmediately: true,
          options: [
            {label: '男', value: 'man'},
            {label: '女', value: 'woman'},
          ]
        },
      ],
      hasNew: false,
      hasView: true
    }
  }
}
</script>
```
