搜索前的操作

```vue
<template>
  <el-data-table v-bind="$data" />
</template>
<script>
export default {
  data() {
    return {
      url: '',
      columns: [
        {prop: 'date', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'address', label: '地址'},
      ],
      searchForm: [
        {
          type: 'input',
          id: 'name',
          label: '用户名',
          el: {placeholder: '请输入用户名'}
        }
      ],
      beforeSearch: (searchData) => {
        this.url = 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=basic'
        console.log(searchData)
        return Promise.resolve()
      }
    }
  }
}
</script>
```
