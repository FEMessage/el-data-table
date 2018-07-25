<template>
  <el-data-table
      v-bind="$data"
      :hasEdit="false"
      :hasNew="false"
      :hasDelete="false"
      >
      </el-data-table>
</template>
<script>
import ElDataTable from '../src/el-data-table.vue'
import config from './config'

export default {
  components: {ElDataTable},
  data: function() {
    let searchForm = [
      {
        $type: 'input',
        $id: 'q',
        label: 'github用户名',
        width: '200px',
        $el: {placeholder: '1分钟只能调用10次'}
      }
    ]

    let cfg = JSON.parse(JSON.stringify(config))
    cfg.searchForm = searchForm
    cfg.url = 'https://api.github.com/search/users'

    return cfg
  }
}
</script>
