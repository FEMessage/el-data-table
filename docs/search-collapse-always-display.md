search表单折叠并且设置部分总是可见

```vue
<template>
  <div>
    <el-data-table v-bind="$data" ref="table" />
    <button @click="setOptions">setoptions</button>
  </div>
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
          label: '用户名',
          el: {placeholder: '请输入用户名'}
        },
        {
          type: 'select',
          id: 'age',
          label: '年龄',
          alwaysDisplay: true,
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
        }
      ],
      canSearchCollapse: true
    }
  },
  methods: {
    setOptions() {
      this.$refs.table.$refs.searchForm.setOptions('age', [
        {
          value: 20
        }
      ])
    }
  },
}
</script>
```
