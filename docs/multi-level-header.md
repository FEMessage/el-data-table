只需要在columns子项里嵌套columns数组，就可以实现多级表头

**二级**
```vue
<template>
  <el-data-table v-bind="$data" />
</template>
<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/LEcMEAs713a1b6dfad35518033b046ca69b4cffb478dc4d/el-data-table?q=basic',
      columns: [
        {prop: 'date', label: '日期'},
        {
          label: '个人信息',
          columns: [
            {prop: 'name', label: '姓名'},
            {prop: 'address', label: '地址'}
          ]
        }
      ],
      form: [
        {
          type: 'input',
          id: 'name',
          label: '姓名',
          rules: [
            {
              required: true,
              message: '请输入姓名',
              trigger: 'blur',
              transform: v => v && v.trim()
            }
          ],
          el: {placeholder: '请输入姓名'}
        }
      ],
      searchForm: [
        {
          el: {placeholder: '请输入'},
          label: '姓名',
          id: 'name',
          type: 'input'
        }
      ],
      hasView: true
    }
  }
}
</script>
```

**更多级**
```vue
<template>
  <el-data-table v-bind="$data" />
</template>
<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/LEcMEAs713a1b6dfad35518033b046ca69b4cffb478dc4d/el-data-table?q=basic',
      columns: [
        {
          label: '这是一级表头',
          columns: [
            {prop: 'date', label: '日期'},
            {
              prop: 'info',
              label: '个人信息',
              columns: [
                {prop: 'name', label: '姓名'},
                {prop: 'address', label: '地址'}
              ]
            }
          ]
        },
      ],
      form: [
        {
          type: 'input',
          id: 'name',
          label: '姓名',
          rules: [
            {
              required: true,
              message: '请输入姓名',
              trigger: 'blur',
              transform: v => v && v.trim()
            }
          ],
          el: {placeholder: '请输入姓名'}
        }
      ],
      searchForm: [
        {
          el: {placeholder: '请输入'},
          label: '姓名',
          id: 'name',
          type: 'input'
        }
      ],
      hasView: true
    }
  }
}
</script>
```
