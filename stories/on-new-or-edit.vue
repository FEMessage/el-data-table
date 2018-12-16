<template>
  <div class="on-new-or-edit">
    <p>默认情况下:
    </p>
      <ul>
    <li>新增是 POST url body 的格式</li>
    <li>修改是 PUT url/id body 的格式</li>
        <p>当不满足需求时, 可通过 onNew/onEdit 方法定制</p>
  </ul>
    <el-data-table
        v-bind="$data"
        :onNew="onNew"
        :onEdit="onEdit"
    >
    </el-data-table>
  </div>
</template>

<script>
import Axios from 'axios'
import ElDataTable from '../src/el-data-table.vue'
export default {
  name: 'on-new-or-edit',
  components: {ElDataTable},
  data() {
    return {
      url:
        'https://www.easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/on-get',
      columns: [
        {prop: 'name', label: '用户名'},
        {prop: 'createdBy', label: '创建人'},
        {prop: 'userInfo.createTime', label: '创建时间'}
      ],
      form: [
        {
          $type: 'input',
          $id: 'name',
          label: '用户名',
          $el: {placeholder: '请输入用户名'},
          rules: [{required: true, trigger: 'blur', whitespace: true}]
        }
      ]
    }
  },
  methods: {
    onNew(data, row) {
      console.log(data, row)
      return Axios.post(
        'https://www.easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/on-new',
        data
      )
    },
    onEdit(data, row) {
      console.log(data, row)
      return Axios.put(
        'https://www.easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/on-edit',
        data
      )
    }
  }
}
</script>
<style>
</style>
