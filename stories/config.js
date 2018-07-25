export default {
  form: [
    {
      $type: 'input',
      $id: 'name',
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
    },
    {
      $type: 'input',
      $id: 'email',
      label: '邮箱',
      rules: [
        {
          required: true,
          message: '请输入邮箱',
          trigger: 'blur',
          transform: v => v && v.trim()
        }
      ],
      $el: {
        placeholder: '请输入邮箱',
        type: 'email'
      }
    }
  ],
  formAttrs: {labelWidth: '80px'},
  url: 'http://yapi.demo.qunar.com/mock/13587/api/v1/users',
  columns: [
    {prop: 'id', label: '主键'},
    {prop: 'name', label: '用户名'},
    {prop: 'sex', label: '性别'},
    {prop: 'address', label: '地址'},
    {prop: 'birthday', label: '生日'},
    {prop: 'email', label: '邮箱'}
  ]
}
