extraQuery用sync修饰时，点击重置按钮也会重置extraQuery

```vue
<template>
  <el-data-table
    :url="url"
    :dataPath="dataPath"
    :totalPath="totalPath"
    :columns="columns"
    :searchForm="searchForm"
    :hasEdit="false"
    :hasNew="false"
    :hasDelete="false"
    :extra-query.sync="extraQuery"
  >
    <template slot="search">
      <el-tag>slot=search</el-tag>
      <el-rate v-model="extraQuery.rate" style="display: inline-block"></el-rate>
    </template>
  </el-data-table>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://api.github.com/search/users',
      dataPath: 'items',
      totalPath: 'total_count',
      columns: [
        {prop: 'id', label: 'id'},
        {prop: 'login', label: '名称'},
        {prop: 'type', label: '账户类型'},
        {prop: 'html_url', label: '主页地址'}
      ],
      extraQuery: {rate: null},
      searchForm: [
        {
          type: 'input',
          id: 'q',
          label: 'github用户名',
          width: '200px',
          el: {placeholder: '1分钟只能调用10次'},
          rules: [{required: true, trigger: 'blur', len: 3}]
        }
      ],
      hasEdit: false,
      hasNew: false,
      hasDelete: false,
    }
  }
}
</script>
```
