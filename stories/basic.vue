<template>
  <el-data-table
    v-bind="$data"
		:hasView="true"
  >
  </el-data-table>
</template>
<script>
// 显示基本crud
// post/delete/put 接口会报错, 因为调用的是github的api
import ElDataTable from '../src/el-data-table.vue'
import config from './config'
export default {
  components: {ElDataTable},
  data: function() {
    return config
  }
}
</script>
