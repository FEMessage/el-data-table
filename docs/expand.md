展开表格列

```vue
<template>
  <el-data-table
    v-bind="$data"
  >
    <el-table-column type="expand" fixed="left">
      <template slot-scope="{row}">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="日期">
            <span>{{ row.date }}</span>
          </el-form-item>
          <el-form-item label="姓名">
            <span>{{ row.name }}</span>
          </el-form-item>
          <el-form-item label="地址">
            <span>{{ row.address }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
  </el-data-table>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-table?q=basic',
      columns: [
        {prop: 'date', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'address', label: '地址'},
      ],
      hasNew: false,
      hasEdit: false,
      hasOperation: false
    }
  }
}
</script>
```
