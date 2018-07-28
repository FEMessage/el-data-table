<template>
  <el-data-table
    v-bind="$data"
  >
  </el-data-table>
</template>
<script>
// 自定义主键
// post/delete/put ,对应接口不存在
import ElDataTable from '../src/el-data-table.vue'
import config from './config'
export default {
  name:'custom-id',
  components: {ElDataTable},
  data: function() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img',
      id:'code',
      columns: [
        {prop: 'code', label: '品牌编号'},
        {prop: 'name', label: '品牌名称'},
        {prop: 'alias', label: '品牌别名'},
        {
          prop: 'logoUrl',
          label: '品牌Logo',
          width: '150px'
        },
        {
          prop: 'status',
          label: '状态',
          formatter: row => (row.status === 'normal' ? '启用' : '禁用')
        }
      ],
      form: [
        {
          rules: [{required: true, trigger: 'blur'}],
          $el: {
            placeholder: '请输入品牌名称'
          },
          label: '品牌名称',
          $id: 'name',
          $type: 'input'
        },
        {
          rules: [
            {message: '请输入品牌别名', required: false, trigger: 'blur'}
          ],
          $el: {placeholder: '请输入品牌别名'},
          label: '品牌别名',
          $id: 'alias',
          $type: 'input'
        }
      ],
      formAttrs: config.formAttrs
    }
  }
}
</script>
