```vue
<template>
  <el-data-table
      :url="url"
      :columns="columns"
      :form="form"
      :hasPagination="false"
      :expandAll="true"
      :tableAttrs="{ rowKey: 'id' }"
      >
      </el-data-table>
</template>
<script>
// 注意看post/put请求, 带上了树形结构相应的 parentId
export default {
  data: function() {
    return {
      url: 'https:\/\/easy-mock.com/mock/5b586c9dfce1393a862d034d/example/tree',
      columns: [
        {prop: 'name', label: '分类名称', minWidth: '140px'},
        {prop: 'description', label: '分类说明', minWidth: '140px'},
        {prop: 'icon', label: '图标', minWidth: '140px'}
      ],
      form: [
        {
          $type: 'input',
          $id: 'name',
          label: '分类名称',
          rules: [{required: true, message: '请输入分类名称', trigger: 'blur'}]
        },
        {
          $type: 'input',
          $id: 'description',
          label: '分类说明',
          rules: [{required: true, message: '请输入名称说明', trigger: 'blur'}]
        },
        {
          $type: 'input',
          $id: 'icon',
          label: '图标',
          rules: [
            {required: true, message: '请输入iconfont class', trigger: 'blur'}
          ]
        }
      ]
    }
  }
}
</script>
```
