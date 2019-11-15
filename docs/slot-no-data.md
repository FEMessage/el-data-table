slot=no-data, 只在第一次请求获取数据为空时显示<br>
以下示例中
- 第一个table第一次请求时数据为空，显示了 no-data slot <br>
- 第二个table第一次请求时数据不为空，则就算之后搜索没有数据，也不会显示 no-data slot

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
const mockUrl = 'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock/el-data-table/'
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
        mockUrl + 'no-data',
        mockUrl + 'has-data'
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
