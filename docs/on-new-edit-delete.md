新增、编辑、删除钩子

```vue
<template>
  <div>
    <p>默认情况下:
    </p>
      <ul>
    <li>新增是 POST url body 的格式</li>
    <li>修改是 PUT url/id body 的格式</li>
    <li>删除多个的请求地址是 DELETE url/id,id,id 的形式</li>
    <p>当不满足需求时, 可通过 onNew、onEdit、onDelete 方法定制</p>
  </ul>
    <el-data-table
      v-bind="$data"
      :onNew="onNew"
      :onEdit="onEdit"
      :onDelete="onDelete"
    />
  </div>
</template>

<script>
export default {
  name: 'on-new-edit-delete',
  data() {
    return {
      url:
        'https:\/\/www.easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/on-get',
      columns: [
        {type: 'selection'},
        {prop: 'name', label: '用户名'},
        {prop: 'createdBy', label: '创建人'},
        {prop: 'userInfo.createTime', label: '创建时间'}
      ],
      form: [
        {
          $type: 'input',
          $id: 'name',
          label: '用户名',
          $el: {placeholder: '请输入用户名'},
          rules: [{required: true, trigger: 'blur', whitespace: true}]
        }
      ]
    }
  },
  methods: {
    onNew(data, row) {
      console.log('onNew')
      return this.$axios.post(
        'https:\/\/www.easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/on-new',
        data
      )
    },
    onEdit(data, row) {
      console.log('onEdit')
      return this.$axios.put(
        'https:\/\/www.easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/on-edit',
        data
      )
    },
    onDelete(selected) {
      console.log('onDelete')
      return this.$axios.delete(
        'https:\/\/www.easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/on-delete',
        {
          data: {
            rows: selected.id || selected.map(v => v.id)
          }
        }
      )
    }
  }
}
</script>
```
