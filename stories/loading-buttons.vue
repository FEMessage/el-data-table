<template>
  <div>
    <p>每个按钮之间的loading相互独立</p>
    <el-data-table v-bind="$data"></el-data-table>
  </div>
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
          text: '请求后不刷新',
          atClick: selected => {
            console.log(selected)
            return new Promise((resolve, reject) =>
              setTimeout(() => resolve(false), 1500)
            )
          }
        },
        {
          text: '请求后刷新',
          atClick: selected => {
            return new Promise((resolve, reject) =>
              setTimeout(() => resolve(), 1500)
            )
          }
        }
      ],
      extraButtons: [
        {
          type: 'primary',
          text: 'Promise1',
          atClick: row => {
            console.log(row)
            return new Promise((resolve, reject) => setTimeout(resolve, 1500))
          }
        },
        {
          text: 'Promise2',
          atClick: row => {
            return new Promise((resolve, reject) => setTimeout(resolve, 1500))
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
