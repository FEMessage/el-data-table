import {configure, setAddon} from '@storybook/vue'

import Vue from 'vue'
import Vuex from 'vuex' // Vue plugins

import axios from 'axios'

import ElFormRenderer from 'el-form-renderer'
import {
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Upload,
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
Vue.use(Input)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading.directive)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.component('el-form-renderer', ElFormRenderer)

// Install Vue plugins.
Vue.use(Vuex)

Vue.prototype.$axios = axios
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

function loadStories() {
  // You can require as many stories as you need.
  require('../stories')
}

configure(loadStories, module)
