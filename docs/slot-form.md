form插槽用法

```vue
<template>
  <el-data-table v-bind="$data">
    <template v-slot:form>
      <el-input value="我是form插槽" />
    </template>
  </el-data-table>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img?a=slot-form',
      columns: [
        {prop: 'code', label: '品牌编号'},
        {prop: 'name', label: '品牌名称'},
        {prop: 'alias', label: '品牌别名'},
      ],
      form: [
        {
          type: 'input',
          id: 'name',
          label: '品牌名称',
          rules: [
            {
              required: true,
              message: '请输入品牌名称',
              trigger: 'blur',
              transform: v => v && v.trim()
            }
          ],
          el: {placeholder: '请输入品牌名称'}
        },
      ],
      hasView: true
    }
  }
}
</script>
```
