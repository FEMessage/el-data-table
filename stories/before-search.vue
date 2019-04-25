<template>
  <el-data-table
    v-bind="$data"
  >
  </el-data-table>
</template>
<script>
import ElDataTable from '../src/el-data-table.vue'

let url =
  'https://easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/customFirstPage'

export default {
  components: {ElDataTable},
  data() {
    return {
      url: '',
      columns: [
        {prop: 'name', label: '用户名'},
        {prop: 'createdBy', label: '创建人'},
        {prop: 'userInfo.createTime', label: '创建时间'}
      ],
      searchForm: [
        {
          $type: 'input',
          $id: 'name',
          label: '用户名',
          $el: {placeholder: '请输入用户名'}
          //            rules: [{required: true, trigger: 'blur', whitespace: true}]
        }
      ],
      beforeSearch: () => {
        this.url = url
        return Promise.resolve()
      }
    }
  }
}
</script>
