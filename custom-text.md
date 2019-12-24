自定义新增、修改、删除按钮以及删除提示框的文案

```vue
<template>
  <el-data-table v-bind="$data" />
</template>
<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=basic',
      columns: [
        {type: 'selection'},
        {prop: 'date', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'address', label: '地址'},
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
        },
      ],
      hasView: true,
      newText: '创建',
      editText: '编辑',
      viewText: '详情',
      deleteText: '移除',
      deleteMessage(data) {
        // 开启多选且 single = false（default）时 data 为数组，其他情况下为行数据对象。数据和传给 onDelete 的是一样
        const name = data.map(r => r.name).join(',')
        return `确认移除 ${name} 吗？`
      }
    }
  }
}
</script>
```
