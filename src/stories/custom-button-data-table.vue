<template>
  <el-data-table v-bind="$data"></el-data-table>
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
      columns: [
        {
          type: 'selection'
        }
      ].concat(config.columns),
      headerButtons: [
        {
          text: '批量导出',
          disabled: selected => selected.length == 0,
          atClick: selected => {
            let ids = selected.map(s => s.id)
            this.$alert(ids)
          }
        }
      ],
      extraButtons: [
        {
          type: 'primary',
          text: '跳转',
          atClick: selected => {
            this.$alert(`hello ${selected.name}`)
          }
        }
      ]
    }
  }
}
</script>
