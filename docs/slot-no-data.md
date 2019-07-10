noData插槽<br>
以下示例中，第一个table第一次请求时没有数据时就显示no-data的slot;<br>
而第二个table第一次查询返回有数据的，第二次用户名输入nodata还是显示table，不显示no-data slot

```vue
<template>
  <div>
    <template v-for="(url,index) in urls">
      <div>第{{index + 1}}个table</div>
      <el-data-table
        v-bind="tableConfig"
        :url="url"
      >
        <template slot="no-data">
          <div class="no-data">没有数据，请去添加数据</div>
        </template>
      </el-data-table>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableConfig:{
        dataPath: 'payload.content',
        totalPath: 'payload.totalElements',
        columns: [
          {prop: 'id', label: 'id'},
          {prop: 'login', label: '名称'},
          {prop: 'type', label: '账户类型'},
          {prop: 'html_url', label: '主页地址'}
        ],
        searchForm: [
          {
            type: 'input',
            id: 'q',
            label: '用户名',
            width: '200px',
            el: {placeholder: '输入nodata查询'}
          }
        ],
        hasEdit: false,
        hasNew: false,
        hasDelete: false,
        saveQuery:false
      },
      urls: [
        'https://easy-mock.com/mock/5d240d912102c0666393d262/mock/no-data',
        'http://yapi.demo.qunar.com/mock/78092/get-data'
      ]
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
