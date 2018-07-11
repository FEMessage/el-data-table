// 使用 Mock
let Mock = require('mockjs')

Mock.mock(/api\/v1\/users/, {
  errcode: 0,
  errmsg: '@word',
  'data|10-10': [
    {
      'id|+1': '@id',
      name: '@cname',
      //"sex|1-2": true,
      //属性 sex 是数组当中的一个值
      'sex|1': ['男生', '女生'],
      //属性 address 是一个随机地址
      address: '@county(true)',
      //属性 date 是一个yyyy-MM-dd 的随机日期
      birthday: '@date("yyyy-MM-dd")',
      logoUrl: '@image("200x200", "#50B347", "#FFF", "ElDataTable")',
      //属性 email 是一个随机email
      email: '@email'
    }
  ]
})

Mock.mock(/api\/v1\/trees/, {
  errcode: 0,
  errmsg: '@word',
  'data|10-10': [
    {
      'id|+1': '@id',
      name: '@cname',
      //"sex|1-2": true,
      //属性 sex 是数组当中的一个值
      'sex|1': ['男生', '女生'],
      //属性 address 是一个随机地址
      address: '@county(true)',
      'children|3-3': [
        {
          'id|+1': '@id',
          name: '@cname',
          //"sex|1-2": true,
          //属性 sex 是数组当中的一个值
          'sex|1': ['男生', '女生'],
          //属性 address 是一个随机地址
          address: '@county(true)',
          //属性 date 是一个yyyy-MM-dd 的随机日期
          birthday: '@date("yyyy-MM-dd")',
          //属性 email 是一个随机email
          email: '@email'
        }
      ],
      //属性 date 是一个yyyy-MM-dd 的随机日期
      birthday: '@date("yyyy-MM-dd")',
      //属性 email 是一个随机email
      email: '@email'
    }
  ]
})
