提交前的操作

```vue
<template>
  <el-data-table v-bind="$data" />
</template>

<script>
export default {
  name: 'before-confirm',
  data() {
    return {
      form: [
        {
          $type: 'input',
          $id: 'login',
          label: '用户名',
          rules: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur',
              transform: v => v && v.trim()
            }
          ],
          $el: {placeholder: '请输入用户名'}
        },
        {
          $type: 'select',
          $id: 'type',
          label: '账户类型',
          rules: [{required: true, message: '请选择账户类型', trigger: 'blur'}],
          $options: ['Organization', 'User'].map(f => ({label: f, value: f})),
          $el: {
            placeholder: '请选择'
          }
        }
      ],
      formAttrs: {labelWidth: '80px'},
      url: 'https://api.github.com/search/users?q=FEMessage',
      dataPath: 'items',
      totalPath: 'total_count',
      columns: [
        {prop: 'id', label: 'id'},
        {prop: 'login', label: '名称'},
        {prop: 'type', label: '账户类型'},
        {prop: 'html_url', label: '主页地址'}
      ],
      beforeConfirm(data, isNew) {
        if (isNew) {
          alert('新增可以发送请求')
          return Promise.resolve()
        } else {
          alert('修改不可以发送请求')
          return Promise.reject()
        }
      }
    }
  },
}
</script>
```
