自定义头部按钮

```vue
<template>
  <el-data-table v-bind="$data" />
</template>

<script>
export default {
  data() {
    return {
      url: 'https://api.github.com/search/users?q=FEMessage',
      dataPath: 'items',
      totalPath: 'total_count',
      columns: [
        {type: 'selection'},
        {prop: 'id', label: 'id'},
        {prop: 'login', label: '名称'},
        {prop: 'type', label: '账户类型'},
        {prop: 'html_url', label: '主页地址'}
      ],
      headerButtons: [
        {
          text: '自定义头部按钮',
          disabled: selected => selected.length == 0,
          atClick: selected => {
            let ids = selected.map(s => s.id)
            alert('selected ids: ' + ids)
            return new Promise((resolve, reject) => setTimeout(resolve, 1500))
          }
        },
        {
          text: '请求后不刷新',
          atClick: selected => {
            return new Promise((resolve, reject) =>
              setTimeout(() => resolve(false), 1500)
            )
          }
        },
        {
          text: selected => `操作选中的 ${selected.length || 0} 条数据`,
          atClick: selected => {
            return new Promise((resolve, reject) =>
              setTimeout(() => resolve(false), 1500)
            )
          }
        }
      ],
      hasOperation: false,
      hasNew: false,
      hasDelete: false
    }
  }
}
</script>

```
