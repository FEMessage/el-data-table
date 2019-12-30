自定义操作列按钮

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
      extraButtons: [
        {
          type: 'success',
          disabled: row => row.date === '2016-05-04',
          text: row => row.status === 'normal' ? '禁用' : '启用',
          atClick(row) {
            alert(row.name)
          }
        },
      ]
    }
  }
}
</script>
```
