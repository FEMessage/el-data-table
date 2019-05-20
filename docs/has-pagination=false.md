不分页，设置has-pagination="false"即可，此时接口传参page=-1

```vue
<template>
  <el-data-table
    v-bind="$data"
		:hasView="true"
    :hasPagination="false"
  >
  </el-data-table>
</template>
<script>
const config = require('./config').default

export default {
  data() {
    return config
  }
}
</script>
```
