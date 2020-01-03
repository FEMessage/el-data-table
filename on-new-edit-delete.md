新增、编辑、删除钩子

```vue
<template>
  <div>
    <p>默认情况下:</p>
    <ul>
      <li>新增是 POST url body 的格式</li>
      <li>修改是 PUT url/id body 的格式</li>
      <li>删除多个的请求地址是 DELETE url/id,id,id 的形式</li>
    </ul>
    <p>当不满足需求时, 可通过 onNew、onEdit、onDelete 方法定制</p>
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
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=basic',
      columns: [
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
    }
  },
  methods: {
    onNew(data, row) {
      console.log('onNew')
      return this.$axios.post(
        'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=basic/on-new',
        data
      )
    },
    onEdit(data, row) {
      console.log('onEdit')
      return this.$axios.put(
        'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=basic/on-edit',
        data
      )
    },
    onDelete(selected) {
      console.log('onDelete')
      return this.$axios.delete(
        'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=basic/on-delete',
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
