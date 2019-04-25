```vue
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
const config = require('./config').default

export default {
  data() {
    return config
  }
}
</script>
```
