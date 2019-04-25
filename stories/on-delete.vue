<template>
  <div>
    <p>默认删除多个的请求地址是 DELETE url/id,id,id 这种形式, 当不满足需求时, 可以使用onDelete, 自定义删除方法, 返回promise</p>
    <el-data-table
        v-bind="$data"
    >
    </el-data-table>
  </div>
</template>

<script>
import Axios from 'axios'
import ElDataTable from '../src/el-data-table.vue'
export default {
  name: 'custom-delete',
  components: {ElDataTable},
  data() {
    return {
      firstPage: 0,
      url:
        'https://easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/customFirstPage',
      hasNew: false,
      hasEdit: false,
      //      single: true,
      //      hasOperation: false,
      columns: [
        // 注释掉 type: selection时, 删除按钮变成一行一个, 此时onDelete回调参数为选中行的数据
        {type: 'selection'},
        {prop: 'name', label: '用户名'},
        {prop: 'createdBy', label: '创建人'},
        {prop: 'userInfo.createTime', label: '创建时间'}
      ],
      onDelete: selected => {
        return Axios.delete(
          'https://www.easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/on-delete',
          {
            data: {
              rows: selected.id || selected.map(v => v.id)
            }
          }
        )
      }
    }
  },
  methods: {}
}
</script>
<style>
</style>
