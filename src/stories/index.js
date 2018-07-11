import Vue from 'vue'

import {storiesOf} from '@storybook/vue'
import ElDataTable from '../el-data-table.vue'
import {withNotes} from '@storybook/addon-notes'
import 'element-ui/lib/theme-chalk/index.css'
import '../../mock'
import CustomDataTableDemo from './custom-data-table-demo.vue'

const form = [
  {
    $type: 'input',
    $id: 'name',
    label: '用户名',
    rules: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
        transform: v => v && v.trim()
      }
    ],
    $el: {placeholder: '请输入用户名'}
  },
  {
    $type: 'select',
    $id: 'sex',
    label: '性别',
    rules: [{required: true, message: '请选择性别', trigger: 'blur'}],
    $options: ['男生', '女生'].map(f => ({label: f, value: f})),
    $el: {
      placeholder: '请选择'
    }
  },
  {
    $type: 'input',
    $id: 'email',
    label: '邮箱',
    rules: [
      {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur',
        transform: v => v && v.trim()
      }
    ],
    $el: {
      placeholder: '请输入邮箱',
      type: 'email'
    }
  }
]
const formAttrs = {labelWidth: '80px'}

function commonTable() {
  return {
    components: {ElDataTable},
    data: () => {
      return {
        url: '/api/v1/users',
        dataPath: 'data',
        formAttrs,
        form,
        columns: [
          {prop: 'id', label: '主键'},
          {prop: 'name', label: '用户名'},
          {prop: 'sex', label: '性别'},
          {prop: 'address', label: '地址'},
          {prop: 'birthday', label: '生日'},
          {prop: 'email', label: '邮箱'}
        ]
      }
    },
    template: `<el-data-table
      :url="url"
      :columns="columns"
      :form="form"
      :formAttrs="formAttrs"
      :dataPath="dataPath"
      >
      </el-data-table>`
  }
}
function treeTable() {
  return {
    components: {ElDataTable},
    data: () => {
      return {
        url: '/api/v1/trees',
        dataPath: 'data',
        isTree: true,
        formAttrs,
        form,
        columns: [
          {prop: 'id', label: '主键'},
          {prop: 'name', label: '名称'},
          {prop: 'sex', label: '性别'},
          {prop: 'address', label: '地址'},
          {prop: 'birthday', label: '生日'},
          {prop: 'email', label: '邮箱'}
        ]
      }
    },
    template: `<el-data-table
      :url="url"
      :columns="columns"
      :isTree="isTree"
      :form="form"
      :formAttrs="formAttrs"
      :dataPath="dataPath"
      >
      </el-data-table>`
  }
}
function searchTable() {
  return {
    components: {ElDataTable},
    data: () => {
      return {
        url: '/api/v1/trees',
        dataPath: 'data',
        formAttrs,
        searchForm: form,
        form,
        columns: [
          {prop: 'id', label: '主键'},
          {prop: 'name', label: '名称'},
          {prop: 'sex', label: '性别'},
          {prop: 'address', label: '地址'},
          {prop: 'birthday', label: '生日'},
          {prop: 'email', label: '邮箱'}
        ]
      }
    },
    template: `<el-data-table
      :url="url"
      :columns="columns"
      :form="form"
      :searchForm="searchForm"
      :formAttrs="formAttrs"
      :dataPath="dataPath"
      >
      </el-data-table>`
  }
}
function customTable() {
  return {
    components: {CustomDataTableDemo},
    data: function() {
      return {
        form,
        formAttrs
      }
    },
    template: `<custom-data-table-demo v-bind="$data"></custom-data-table-demo>`
  }
}

storiesOf('ElDataTable', module)
  .add('通用表格', commonTable)
  .add('查询表格', searchTable)
  .add('树形表格', treeTable)
  .add('自定义表单', customTable)
