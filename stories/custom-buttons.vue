<template>
  <el-data-table v-bind="$data"></el-data-table>
</template>
<script>
import ElDataTable from '../src/el-data-table.vue'
import config from './config'

export default {
  components: {ElDataTable},
  data: function() {
    return {
      url: config.url,
      dataPath: config.dataPath,
      totalPath: config.totalPath,
      form: config.form,
      formAttrs: config.formAttrs,
      columns: [
        {
          type: 'selection'
        }
      ].concat(config.columns),
      headerButtons: [
        {
          text: '自定义头部按钮',
          disabled: selected => selected.length == 0,
          atClick: selected => {
            let ids = selected.map(s => s.id)
            alert('selected ids: ' + ids)
          }
        }
      ],
      extraButtons: [
        {
          type: 'primary',
          text: '自定义操作按钮',
          atClick: selected => {
            alert(`hello ${selected.login}`)
          }
        }
      ],
      hasEdit: false,
      hasNew: false,
      hasDelete: false
    }
  }
}
</script>
