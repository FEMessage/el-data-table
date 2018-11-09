<template>
  <el-data-table
    v-bind="$data"
  >
  </el-data-table>
</template>
<script>
  import ElDataTable from '../src/el-data-table.vue'

  export default {
    components: {ElDataTable},
    data() {
      return {
        firstPage: 0,
        url: 'https://easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/customFirstPage',
        columns: [
          {prop: 'name', label: '用户名'},
          {prop: 'createdBy', label: '创建人'},
          {prop: 'userInfo.createTime', label: '创建时间'}
        ],
        form: [
          {
            $type: 'input',
            $id: 'name',
            label: '用户名',
            rules: [{required: true, message: '请输入用户名', trigger: 'blur'}]
          }
        ]
      }
    }
  }
</script>
