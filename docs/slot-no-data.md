slot=no-data, 只在第一次请求获取数据为空时显示

```vue
<template>
  <el-data-table v-bind="$data">
    <template slot="no-data">
      <div class="no-data">没有数据，请去添加数据</div>
    </template>
  </el-data-table>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=no-data',
      columns: [
        {prop: 'date', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'address', label: '地址'},
      ],
    }
  }
}
</script>
<style>
.no-data{
  padding: 32px 0;
  text-align:center;
  font-weight:600;
}
.tip{
  padding-bottom: 16px;
}
</style>
```
