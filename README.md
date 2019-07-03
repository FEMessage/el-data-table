# el-data-table

[![Build Status](https://travis-ci.com/femessage/el-data-table.svg?branch=master)](https://travis-ci.com/femessage/el-data-table)
[![NPM Download](https://img.shields.io/npm/dm/el-data-table.svg)](https://www.npmjs.com/package/el-data-table)
[![NPM Version](https://img.shields.io/npm/v/el-data-table.svg)](https://www.npmjs.com/package/el-data-table)
[![NPM License](https://img.shields.io/npm/l/el-data-table.svg)](https://github.com/FEMessage/el-data-table/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/el-data-table/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

使用`axios`自动发送请求，支持树形结构，支持分页，支持自定义查询, 自定义操作列, 让 RESTful 风格的 CRUD 更简单 👏

![](https://ws1.sinaimg.cn/large/b5e3d01fgy1fxrbi1wsszj218r0l5n2c.jpg)

[English](./README-en.md)

## Table of Contents <!-- omit in toc -->

* [Introduction](#introduction)
  * [CRUD](#crud)
  * [数据驱动](#数据驱动)
  * [Why](#why)
* [Feature](#feature)
* [Demo](#demo)
* [Install](#install)
* [Quick Start](#quick-start)
  * [Global Register Component](#global-register-component)
  * [Template](#template)
* [Reference](#reference)
* [License](#license)
* [Contributors](#contributors)

## Introduction

### CRUD

el-data-table 就是为了解决业务问题而生的，故而封装了 CRUD 的逻辑在里面。

以用户接口示例，设其相对路径为:

```sh
/api/v1/users
```

则其 restful CRUD 接口如下：

* 查询

```sh
GET /api/v1/users?page=1&size=10
```

* 新增

```sh
POST /api/v1/users
```

* 修改(编辑)

```sh
PUT /api/v1/users/:id
```

* 删除

```sh
DELETE /api/v1/users/:id
```

则只需要使用以下代码，即可完成 CRUD 功能

```vue
<template>
  <el-data-table v-bind="tableConfig"></el-data-table>
</template>
```

```js
<script>
export default {
  data() {
    return {
      tableConfig: {
        url: '/example/users',
        columns: [
          {
            prop: 'name',
            label: '用户名'
          }
        ],
        searchForm: [
          {
            type: 'input',
            id: 'name',
            label: '用户名',
            el: {
              placeholder: '请输入'
            }
          }
        ],
        form: [
          {
            type: 'input',
            id: 'name',
            label: '用户名',
            el: {
              placeholder: '请输入'
            },
            rules: [
              {
                required: true,
                message: '请输入用户名',
                trigger: 'blur'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
```

效果如下：

* 查询

![](https://ws1.sinaimg.cn/large/9f4faba8gy1fyc4rvgsaxj21i60ls0ul.jpg)

![](https://ws1.sinaimg.cn/large/9f4faba8gy1fyc4wpwt65j21z20qiwj9.jpg)

* 新增

![](https://ws1.sinaimg.cn/large/9f4faba8gy1fyc4tjfhkmj21z20pcdk3.jpg)

* 修改

![](https://ws1.sinaimg.cn/large/9f4faba8gy1fyc4xoiq6nj21yy0qcjvy.jpg)

* 删除

![](https://ws1.sinaimg.cn/large/9f4faba8gy1fyc4yxw47kj21z20q6n2c.jpg)

[⬆ Back to Top](#table-of-contents)

### 数据驱动

把 template 的内容移动到 script 中, 意味着 template 可以精简，js 可以抽取出来，方便复用；同时，js 里的数据其实就是一段 json，这也让代码生成工具有了用武之地。

其中表单的渲染使用到了组件[@femessage/el-form-renderer](https://github.com/FEMessage/el-form-renderer)

![](https://ws1.sinaimg.cn/large/9f4faba8gy1fyc5dawjm4j216r0j5jss.jpg)

![](https://ws1.sinaimg.cn/large/9f4faba8gy1fyc5b55tzfj216v0g1mye.jpg)

![](https://ws1.sinaimg.cn/large/9f4faba8gy1fyc5bvw1qvj21630pcgnj.jpg)

[⬆ Back to Top](#table-of-contents)

### Why

为什么要在 element-ui 的 el-table 的基础上封装一个 el-data-table?

我常听到有以下几种声音：

1.  el-table 已可以覆盖大部分场景，暂无扩展需求
2.  封装了这么多东西，耦合太严重了
3.  涉及过多的业务逻辑，有点僵化，业务操作还是交给开发者去处理

首先 el-table 的确很灵活，只不过，在实现分页请求的时候，仅有 el-table 还不够，还需要组合 el-pagination 组件来实现。而分页处理的内容大多都是重复的，如果不封装，只会产生冗余的代码。

而中后台太多都是 CRUD 的操作，结合 restful API，使用得只传一个 url 让组件做 CRUD 成为了可能。

其次，很多有经验的“老手”觉得组件越灵活越好。

但对于经验尚浅的“新手”，他们并不熟悉常见的业务场景，对一些基本操作，如果表单校验，空格过滤，添加 loading，异常处理，他们只会漏掉，而这正是产生 bug 的源头。

对于一线的业务开发人员而言，面对做不完的业务，其实他们并不想去处理重复的业务逻辑，他们只想解放双手，早点下班。

正是在这样的背景下，产生了 el-data-table。

[⬆ Back to Top](#table-of-contents)

## Feature

* 只需进行 json 配置，即可实现 restful 风格的 CRUD 四个接口的对接
* 支持表格内展示树形结构数据(该功能 element-ui 官方是不支持的)
* 自带分页逻辑
* 可扩展自定义列按钮，以及自定义操作函数
* 支持分页查询后，点击详情再返回，恢复上一次的查询状态

[⬆ Back to Top](#table-of-contents)

## Demo

* [doc and online demo](https://femessage.github.io/el-data-table/)

[⬆ Back to Top](#table-of-contents)

## Install

encourage using [yarn](https://yarnpkg.com/en/docs/install#mac-stable) to install

```sh
yarn add el-data-table
```

[⬆ Back to Top](#table-of-contents)

## Quick Start

### Global Register Component

this is for minification reason: in this way building your app,

webpack or other bundler just bundle the dependencies into one vendor for all pages which using this component,

instead of one vendor for one page

```js
import Vue from 'vue'

// register component and loading directive
import ElDataTable from 'el-data-table'
import ElFormRenderer from '@femessage/el-form-renderer'
import {
  Button,
  Dialog,
  Form,
  FormItem,
  Loading,
  Pagination,
  Table,
  TableColumn,
  Message,
  MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading.directive)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.component('el-form-renderer', ElFormRenderer)
Vue.component('el-data-table', ElDataTable)

// to show confirm before delete
Vue.prototype.$confirm = MessageBox.confirm

// show tips
Vue.prototype.$message = Message

// if the table component cannot access `this.$axios`, it cannot send request
import axios from 'axios'
Vue.prototype.$axios = axios
```

### Template

```vue
<template>
  <el-data-table></el-data-table>
</template>
```

[⬆ Back to Top](#table-of-contents)

## Reference

* [form rules detail see async-validator](https://github.com/yiminghe/async-validator)
* [el-input enter to submit](https://github.com/ElemeFE/element/pull/5920)
* [html spec form submission](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)
* [What_is_a_URL](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL)
* [History_API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
* [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
* [RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
* [从 vue-router 看前端路由的两种实现](https://zhuanlan.zhihu.com/p/27588422)
* [peer-dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/)

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://levy.work"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=levy9527" title="Code">💻</a> <a href="#review-levy9527" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=levy9527" title="Documentation">📖</a> <a href="#infra-levy9527" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=donaldshen" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=donaldshen" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/MiffyCooper"><img src="https://avatars1.githubusercontent.com/u/20179564?v=4" width="100px;" alt="MiffyCooper"/><br /><sub><b>MiffyCooper</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=MiffyCooper" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=MiffyCooper" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/prisbre"><img src="https://avatars1.githubusercontent.com/u/13557397?v=4" width="100px;" alt="Huanfeng Chen"/><br /><sub><b>Huanfeng Chen</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=prisbre" title="Code">💻</a></td><td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/issues?q=author%3Aevillt" title="Bug reports">🐛</a></td><td align="center"><a href="https://github.com/Alvin-Liu"><img src="https://avatars0.githubusercontent.com/u/11909145?v=4" width="100px;" alt="Alvin"/><br /><sub><b>Alvin</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=Alvin-Liu" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/issues?q=author%3AAlvin-Liu" title="Bug reports">🐛</a></td><td align="center"><a href="https://github.com/lianghx-319"><img src="https://avatars2.githubusercontent.com/u/27187946?v=4" width="100px;" alt="Han"/><br /><sub><b>Han</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=lianghx-319" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/issues?q=author%3Alianghx-319" title="Bug reports">🐛</a></td></tr><tr><td align="center"><a href="https://github.com/kunzhijia"><img src="https://avatars2.githubusercontent.com/u/4848041?v=4" width="100px;" alt="kunzhijia"/><br /><sub><b>kunzhijia</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=kunzhijia" title="Code">💻</a> <a href="#tool-kunzhijia" title="Tools">🔧</a> <a href="#example-kunzhijia" title="Examples">💡</a></td><td align="center"><a href="https://github.com/chenEdgar"><img src="https://avatars3.githubusercontent.com/u/12596622?v=4" width="100px;" alt="Edgar"/><br /><sub><b>Edgar</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=chenEdgar" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/issues?q=author%3AchenEdgar" title="Bug reports">🐛</a></td><td align="center"><a href="https://github.com/Barretem"><img src="https://avatars2.githubusercontent.com/u/47966933?v=4" width="100px;" alt="Barretem"/><br /><sub><b>Barretem</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=Barretem" title="Code">💻</a></td><td align="center"><a href="https://github.com/GaryHjy"><img src="https://avatars1.githubusercontent.com/u/32995274?v=4" width="100px;" alt="阿禹。"/><br /><sub><b>阿禹。</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=GaryHjy" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/lujunwei"><img src="https://avatars0.githubusercontent.com/u/7427200?v=4" width="100px;" alt="lujunwei"/><br /><sub><b>lujunwei</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=lujunwei" title="Code">💻</a></td><td align="center"><a href="http://www.ccc1996.cn"><img src="https://avatars1.githubusercontent.com/u/20502762?v=4" width="100px;" alt="cjf"/><br /><sub><b>cjf</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/issues?q=author%3Acjfff" title="Bug reports">🐛</a></td><td align="center"><a href="https://github.com/Jack-rainbow"><img src="https://avatars1.githubusercontent.com/u/20368037?v=4" width="100px;" alt="Jack-rainbow"/><br /><sub><b>Jack-rainbow</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/issues?q=author%3AJack-rainbow" title="Bug reports">🐛</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
