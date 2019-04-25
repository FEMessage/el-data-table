```vue
<template>
  <el-data-table
    v-bind="$data"
    :beforeConfirm="beforeConfirm"
  ></el-data-table>
</template>

<script>
const config = require('./config').default

export default {
  name: 'before-confirm',
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
```
