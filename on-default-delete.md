有时候，el-data-table 内置删除按钮的形式、数量不满足用户需求。那么用户可以在合适的时机自行调用内部方法来删除。
下面的例子就是在多选的情况补回行删除按钮

```vue
<template>
  <el-data-table v-bind="$data" ref="table" />
</template>
<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=basic',
      columns: [
        {type: 'selection'},
        {prop: 'date', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'address', label: '地址'},
      ],
      extraButtons: [
        {
          type: 'danger',
          text: '删除',
          atClick: (row) => {
            this.$refs.table.onDefaultDelete(row)
            return false
          }
        },
      ]
    }
  }
}
</script>
```
