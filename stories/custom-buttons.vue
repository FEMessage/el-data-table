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
            return new Promise((resolve, reject) => setTimeout(resolve, 1500))
          }
        },
        {
          text: '请求后不刷新',
          atClick: selected => {
            return new Promise((resolve, reject) =>
              setTimeout(() => resolve(false), 1500)
            )
          }
        }
      ],
      extraButtons: [
        {
          type: 'primary',
          text: 'Promise.resolve()',
          atClick: row => {
            alert(row.id)
            return new Promise((resolve, reject) => setTimeout(resolve, 1500))
          }
        },
        {
          text: 'Promise.reject()',
          atClick: row => {
            return Promise.reject()
          }
        }
      ],
      hasEdit: false,
      hasNew: false,
      hasDelete: false
    }
  },
  computed: {
    loading() {
      return true
    }
  }
}
</script>
