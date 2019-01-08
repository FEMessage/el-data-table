import {configure} from '@storybook/vue'

import Vue from 'vue'
import axios from 'axios'

import ElFormRenderer from '@femessage/el-form-renderer'
import {
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Loading,
  Pagination,
  MessageBox,
  Message,
  Table,
  TableColumn
} from 'element-ui'

// Register custom components.
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading.directive)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)

// 注册表单渲染组件及表单组件
// 如要使用其他表单组件, 如radio, 需要另外注册
Vue.component('el-form-renderer', ElFormRenderer)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)

// 赋予table发送请求的能力
Vue.prototype.$axios = axios

// 删除操作需要用到确认提示
Vue.prototype.$confirm = MessageBox.confirm
// 操作成功后需要用到消息提醒
Vue.prototype.$message = Message

function loadStories() {
  // You can require as many stories as you need.
  require('../stories')
}

configure(loadStories, module)
