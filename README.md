# el-data-table

使用`axios`自动发送请求，支持树形结构，支持分页，支持自定义查询, 自定义操作列, 让 RESTful 风格的 CRUD 更简单 👏

auto requesting by `axios`, supports pagination, tree data structure, custom search, custom operation column, makes rest api easily 👏

## pre install

this component depends on [element-ui](http://element.eleme.io/#/zh-CN/component/table) and [el-form-renderer](https://github.com/leezng/el-form-renderer)

## install

encourage using [yarn](https://yarnpkg.com/en/docs/install#mac-stable) to install

```sh
yarn add el-data-table
```

## documentation

[full api doc](https://femessage.github.io/el-data-table/)
[storybook demo]](https://femessage.github.io/el-data-table/storybook/)

## usage

### global register component

this is for minification reason: in this way building your app,

webpack or other bundler just bundle the dependencies into one vendor for all pages which using this component,

instead of one vendor for one page

```js
import Vue from 'vue'

// register component and loading directive
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

// inject Vue.prototype
// if the table component cannot access `this.$axios`, it cannot send request
import axios from 'axios'
Vue.prototype.$axios = axios
```

### template

```vue
<template>
  <el-data-table></el-data-table>
</template>
```

## example

### basic

suppose the api response looks like this:

```json
{
  "code": 0,
  "msg": "ok",
  "payload": {
    "content": [], // the data to render
    "totalElements": 2 // total count
  }
}
```

we get setting

```template
<el-data-table
  dataPath="payload.content"
  totalPath="payload.totalElement"
>
</el-data-table>
```

that's the default setting, you can get your custom setting according to your api

now I'll show you more code example, here we go🚴

### url and columns

```vue
<!-- template -->
<el-data-table
  :url="url"
  :columns="columns"
>
</el-data-table>
```

```js
// script
export default {
  data() {
    return {
      url: '/api/v1/users',
      columns: [
        {prop: 'id', label: '主键'},
        {prop: 'username', label: '用户名'},
        {prop: 'fullname', label: '全名'},
        {prop: 'email', label: 'email'},
        {prop: 'department.id', label: 'department.id'},
        {prop: 'department.name', label: 'department.name'}
      ]
    }
  }
}
```

> examples below will omit template and some repeated content in script

### new/edit form

```js
form: [
  {
    $type: 'select',
    $id: 'backendFramework',
    label: '后端框架',
    rules: [{required: true, message: '请选择后端框架', trigger: 'blur'}],
    $options: backendFrameworks.map(f => ({label: f, value: f})),
    $el: {
      placeholder: '请选择'
    }
  },
  {
    $type: 'input',
    $id: 'name',
    label: '元数据名称',
    rules: [
      {
        required: true,
        message: '请输入元数据名称',
        trigger: 'blur',
        transform: v => v && v.trim()
      }
    ],
    $el: {placeholder: '请输入'}
  }
]
```

### search

```js
searchForm: [
  {
    $el: {placeholder: '请输入'},
    label: '用户名',
    $id: 'username',
    $type: 'input'
  },
  {
    $el: {placeholder: '请输入'},
    label: '全名',
    $id: 'fullname',
    $type: 'input'
  },
  {
    $el: {placeholder: '请输入'},
    label: 'email',
    $id: 'email',
    $type: 'input'
  }
]
```

### header buttons on the top of the table

> attention: click function called `atClick`

```js
headerButtons: [
  {
    text: '批量导出',
    disabled: selected => selected.length == 0,
    atClick: selected => {
      let ids = selected.map(s => s.id)
      console.log(ids)
    }
  }
]
```

### extra buttons in operation column

> attention: click function called `atClick`

```js
extraButtons: [
  {
    type: 'primary',
    text: '跳转',
    atClick: row =>
      this.$router.push({path: '/module-detail', query: {id: row.id}})
  }
]
```

### extraParams on new/edit

```js
extraParams: {
  version: 0,
  isTree: false
}
```

### customQuery on search

```js
customQuery: {
  type: this.$route.query.type
}
```


### 监听 `new` /`edit` 事件

如果想在默认的新增、编辑方法中增加额外的操作。可以监听 `new` 、`edit` 事件

点击新增/修改按钮，会触发`new`/`edit`事件

适用场景:  想利用el-data-table快速渲染弹窗表单的特性，并且复用默认的`new`/`edit`的逻辑，但弹窗含有自定义组件, 无法通过配置进行渲染的情况

例子：在新增和编辑的弹窗中，除了常规的表单元素，还要增加一个上传图片组件，并且发送`POST`/`PUT`请求的body中，带上图片的url

```vue
<template>
  <el-data-table
    :extraParams=extraParams
    @new="clearExtraParams"
    @edit="setExtraParams"
  >
    <div slot="form" prop="logo">
      <div class="form-label"> 品牌logo</div>
      <my-upload-component
        :onLoadSuccess="onLoadSuccess"
        :fileUrl="extraParams.logoUrl">
      </my-upload-component>
    </div>
  </el-data-table>
</template>
<script>
  export default{
    data () {
      return {
        extraParams: {
          logoUrl: ''
        }
      }
    },
    methods:{
      onLoadSuccess(url) {
        this.extraParams.logoUrl = url// 将成功后的url 放进extraParams
      },
      clearExtraParams(){
        this.extraParams.logoUrl = ''  //清空extraParams
      },
      setExtraParams(row) {
        this.extraParams.logoUrl = row.logoUrl //将原有的logoUrl 放入extraParams
      }
    }
  }
</script>
```

技巧点：

1. 上传成功后把图片url放在 `extraParams` 上
2. 点击新增按钮时，清除 `extraParams.logoUrl`
3. 点击编辑按钮时，设置`extraParams.logoUrl`
