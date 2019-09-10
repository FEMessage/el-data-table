search插槽

```vue
<template>
  <el-data-table v-bind="$data">
    <template slot="search">
      <el-tag>slot=search</el-tag>
      <el-rate v-model="extraQuery.rate" style="display: inline-block"></el-rate>
    </template>

    <template slot="search:q">
      <el-form-item label="我是`search:q`插槽">
        <el-input value="在表单 id 为 `q` 的前面"></el-input>
      </el-form-item>
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
      extraQuery: {rate: 0},
      searchForm: [
        {
          type: 'input',
          id: 'q',
          default: 'fem',
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
