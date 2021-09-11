处理请求返回的数据，需要返回 total 与 data, 如果有此函数，则会忽略 totalPath/dataPath

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
      onResponse: raw => {
        console.log(raw)
        return {
          data: raw.data.payload.content,
          total: raw.data.payload.totalElements,
        }
      }
    }
  }
}
</script>
```
