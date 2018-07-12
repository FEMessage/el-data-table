<template>
  <el-data-table
      :url="url"
      :columns="columns"
      :form="form"
      :searchForm="searchForm"
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
      searchForm: config.form.map(form => {
        return Object.assign({}, form, {rules: []})
      }),
      columns: config.columns
    }
  }
}
</script>
