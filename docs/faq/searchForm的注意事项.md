填写选项后，点击搜索，然后刷新页面。第一个选择框出现错误。所以$options的value都应该是string类型

```vue
<template>
  <el-data-table v-bind="$data" />
</template>
<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img?a=11',
      columns: [
        {prop: 'code', label: '品牌编号'},
        {prop: 'name', label: '品牌名称'},
        {prop: 'alias', label: '品牌别名'},
      ],
      searchForm: [
        {
          $el: {placeholder: '请选择'},
          label: '状态',
          $id: 'status',
          $type: 'select',
          $options: [
            {
              value: 1,
              label: '待处理'
            },
          ]
        },
        {
          $el: {placeholder: '请选择'},
          label: '状态',
          $id: 'status',
          $type: 'select',
          $options: [
            {
              value: '1',
              label: '待处理'
            },
          ]
        },
      ],
      hasNew: false,
      hasOperation: false,
      hasPagination: false
    }
  }
}
</script>
```
