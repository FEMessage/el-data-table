```vue
<template>
  <el-data-table
    :url="url"
    :columns="columns"
    :searchForm="searchForm"
    :beforeSearch="beforeSearch"
  >
  </el-data-table>
</template>
<script>
export default {
  data() {
    return {
      url: '',
      columns: [
        {prop: 'name', label: '用户名'},
        {prop: 'createdBy', label: '创建人'},
        {prop: 'userInfo.createTime', label: '创建时间'}
      ],
      searchForm: [
        {
          $type: 'input',
          $id: 'name',
          label: '用户名',
          $el: {placeholder: '请输入用户名'}
          //            rules: [{required: true, trigger: 'blur', whitespace: true}]
        }
      ],
      beforeSearch: () => {
        this.url = 'https:\/\/easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/customFirstPage'
        return Promise.resolve()
      }
    }
  }
}
</script>
```
