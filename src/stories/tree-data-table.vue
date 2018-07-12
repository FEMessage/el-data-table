<template>
  <el-data-table
      :url="url"
      :columns="columns"
      :isTree="isTree"
      :form="form"
      :formAttrs="formAttrs"
      :dataPath="dataPath"
      >
      </el-data-table>
</template>
<script>
import ElDataTable from '../el-data-table.vue'
import config from './config'
export default {
  components: {ElDataTable},
  data: function() {
    return {
      url: config.url,
      dataPath: 'data',
      form: config.form,
      formAttrs: config.formAttrs,
      columns: config.columns,
      isTree: true
    }
  }
}
</script>
