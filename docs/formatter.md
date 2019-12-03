formatter 可以返回 jsx 渲染功能更丰富的单元格

```vue
<template>
  <el-data-table
    :url="url"
    :dataPath="dataPath"
    :totalPath="totalPath"
    :columns="columns"
    :hasEdit="false"
    :hasNew="false"
    :hasDelete="false"
    :extra-query.sync="extraQuery"
  >
  </el-data-table>
</template>
<script>
export default {
  data() {
    /**
     * 如果 babel-plugins-transform-vue-jsx 版本低于 3.4.0，jsx 作用域中需要如下定义 h 
     * 下面的代码可确保在 CI 环境不报错！
     * @see: https://cn.vuejs.org/v2/guide/render-function.html#JSX
    */
    if (typeof h === 'undefined') {
      h = this.$createElement
    }

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
      hasEdit: false,
      hasNew: false,
      hasDelete: false,
    }
  }
}
</script>
```
