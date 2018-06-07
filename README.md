# el-data-table

使用`axios`自动发送请求，支持树形结构，支持分页，支持自定义查询, 让 RESTFul 风格的 CRUD 更简单 👏

## 前提

本组件依赖`element-ui`以及开源组件`el-form-renderer`

## 安装

推荐使用[yarn](https://yarnpkg.com/en/docs/install#mac-stable)安装

```sh
yarn add el-data-table
```

## 使用

### 全局注册

为减小打包体积, 组件内并不注册外部依赖, 因此鼓励在项目内使用全局注册组件的方式

```js
import Vue from 'vue'

// 全局注册组件及loading指令
import ElDataTable from 'el-data-table'
import ElFormRenderer from 'el-form-renderer'
import {
  Button,
  Dialog,
  Form,
  FormItem,
  Loading,
  Pagination,
  Table,
  TableColumn
} from 'element-ui'

Vue.use(ElDataTable)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading.directive)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.component('el-form-renderer', ElFormRenderer)
```

### template

```html
<template>
  <el-data-table></el-data-table>
</template>
```

## doc

[api doc](https://femessage.github.io/el-data-table/)
