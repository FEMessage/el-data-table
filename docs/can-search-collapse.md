search表单可以折叠、展开

```vue
<template>
  <el-data-table v-bind="$data">
    <el-button slot="header">slot header button</el-button>
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
          type: 'input',
          id: 'name',
          label: '用户名',
          el: {placeholder: '请输入用户名'}
        }
      ],
      canSearchCollapse: true
    }
  }
}
</script>
```
