search表单折叠并且设置部分总是可见

```vue
<template>
  <el-data-table v-bind="$data" ref="table" />
</template>
<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img?a=1',
      columns: [
        {prop: 'name', label: '用户名'},
        {prop: 'createdBy', label: '创建人'},
        {prop: 'userInfo.createTime', label: '创建时间'}
      ],
      searchForm: [
        {
          type: 'input',
          id: 'name',
          label: '您的用户名',
          collapsible: false,
          el: {placeholder: '请输入用户名'}
        },
        {
          type: 'select',
          id: 'age',
          label: '年龄',
          el: {
            placeholder: '请输入年龄'
          },
          options: [
            {
              value: 17
            },
            {
              value: 18
            }
          ]
        },
        {
          type: 'input',
          id: 'favorite',
          label: '喜欢的东西'
        },
        {
          type: 'input',
          id: 'wishTravel',
          label: '想去的地方'
        },
        {
          type: 'select',
          id: 'lived',
          label: '待过的地方',
          options: [
            {
              label: '三番',
              value: 'San Francisco'
            }
          ]
        }
      ],
      canSearchCollapse: true
    }
  }
}
</script>
```
