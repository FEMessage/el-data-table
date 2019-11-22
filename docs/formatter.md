formatter 可以返回 jsx 渲染功能更丰富的单元格

- 如果运行环境中的 webpack 配置中的 babel-plugins-transform-vue-jsx 版本低于 3.4.0，columns 配置的作用域中需要定义 h 这个 render function

- [详情查看](https://cn.vuejs.org/v2/guide/render-function.html#JSX)

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
    const h = this.$createElement
    return {
      url: 'https://api.github.com/search/users',
      dataPath: 'items',
      totalPath: 'total_count',
      columns: [
        {prop: 'id', label: 'id'},
        {prop: 'login', label: '名称'},
        {prop: 'type', label: '账户类型'},
        {
          prop: 'html_url', 
          label: '主页地址',
          formatter: row => (
            <a href={row.html_url} target="_blank">{row.html_url}</a>
          )
        }
      ],
      extraQuery: {q: 'femessage', rate: null},
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
