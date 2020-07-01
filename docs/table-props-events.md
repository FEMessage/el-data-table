通过 tableAttrs & tableEventHandlers 属性，可以直接传 prop 和 eventHandler 到 el-table 本体上

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
      tableAttrs: {
        stripe: true,
      },
      tableEventHandlers: {
        // camel & kebab case 皆可
        rowClick: (row) => {
          this.$message.success(`点击 ${row.name}！`)
        },
        'row-dblclick': (row) => {
          this.$message.success(`双击点击 ${row.name}！`)
        }
      },
    }
  }
}
</script>
```
