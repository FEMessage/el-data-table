export default {
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
      $id: 'sex',
      label: '性别',
      rules: [{required: true, message: '请选择性别', trigger: 'blur'}],
      $options: ['男生', '女生'].map(f => ({label: f, value: f})),
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
  ]
}
