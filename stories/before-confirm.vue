<template>
  <div class="before-confirm">
    <el-data-table
        v-bind="$data"
        :beforeConfirm="beforeConfirm"
    >
    </el-data-table>
  </div>
</template>

<script>
import ElDataTable from '../src/el-data-table.vue'
import config from './config'
export default {
  name: 'before-confirm',
  components: {ElDataTable},
  data() {
    return config
  },
  methods: {
    beforeConfirm(data, isNew) {
      console.log(data, isNew)

      if (isNew) {
        alert('新增可以发送请求')
        return Promise.resolve()
      } else {
        alert('修改不可以发送请求')
        return Promise.reject()
      }
    }
  }
}
</script>
<style>
</style>
