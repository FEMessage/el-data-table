<template>
  <el-data-table
    v-bind="$data"
  >
    <el-table-column type="expand" fixed="left">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="客户名称">
            <span>{{ props.row.memberName }}</span>
          </el-form-item>
          <el-form-item label="客户ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="预约时间段">
            <span>{{ props.row.period }}</span>
          </el-form-item>
          <el-form-item label="预估时长">
            <span>{{ props.row.maintenanceTime }}</span>
          </el-form-item>
          <el-form-item label="预约事项">
            <span>{{ props.row.subscribeItem }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
  </el-data-table>
</template>
<script>
import ElDataTable from '../src/el-data-table.vue'

export default {
  components: {ElDataTable},
  data() {
    return {
      url:
        'https://easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/reservation',
      columns: [
        {prop: 'memberName', label: '客户姓名'},
        {prop: 'memberAddress', label: '客户所在地'},
        {prop: 'period', label: '预约时间段'},
        {prop: 'maintenanceTime', label: '预约时长'}
      ],
      hasNew: false,
      hasEdit: false,
      hasOperation: false
    }
  }
}
</script>
