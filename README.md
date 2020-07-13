# el-data-table

[![Build Status](https://badgen.net/travis/FEMessage/el-data-table/master)](https://travis-ci.com/FEMessage/el-data-table)
[![NPM Download](https://badgen.net/npm/dm/@femessage/el-data-table)](https://www.npmjs.com/package/@femessage/el-data-table)
[![NPM Version](https://badgen.net/npm/v/@femessage/el-data-table)](https://www.npmjs.com/package/@femessage/el-data-table)
[![NPM License](https://badgen.net/npm/license/@femessage/el-data-table)](https://github.com/FEMessage/el-data-table/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/el-data-table/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

Auto requesting by `axios`, supports pagination, tree data structure, custom search, custom operation column, which makes rest api easily👏

The table uses [@femessage/el-form-renderer](https://github.com/FEMessage/el-form-renderer) to render form.

![](https://i.loli.net/2019/11/14/KxfWjch5F62lwyR.jpg)

[中文文档](./README-zh.md)

## Table of Contents

- [Introduction](#introduction)
  - [CRUD](#crud)
  - [Data Driven](#data-driven)
  - [Why](#why)
- [Feature](#feature)
- [Links](#links)
- [Install](#install)
- [Quick Start](#quick-start)
  - [Global Register Component](#global-register-component)
  - [Template](#template)
- [Reference](#reference)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Introduction

### CRUD

el-data-table is created to solve business problems, so CRUD logic is set inside.<br /> For example, to develop `user` api, suppose its relative path like this:

```javascript
/api/v1/users
```

The restful CRUD api should be:

- Retrieve

```javascript
GET /api/v1/users?page=1&size=10
```

default data structure

```js
{
  "code":0,
  "msg":"ok",
  "payload":{
    "content":[], // dataPath
    "totalElements":2, // totalPath
  }
}
```

You can customize dataPath/totalPath.

If `hasPagination=false`, default dataPath is `payload`

- Create

```javascript
POST / api / v1 / users
```

- Update

```javascript
PUT /api/v1/users/:id
```

- Delete

```javascript
DELETE /api/v1/users/:id
```

Then only need to use the following code to complete CRUD functions

```html
<template>
  <el-data-table v-bind="tableConfig"></el-data-table>
</template>
```

```javascript
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

The results are as follows:

- Retrieve
  ![](https://i.loli.net/2019/11/14/GIN79blaoPKhHmp.jpg)<br />![](https://i.loli.net/2019/11/14/lasJ7NhzFi4rY6n.jpg)

- Create
  ![](https://i.loli.net/2019/11/14/NjvFqDV24Y9QJi5.jpg)

- Update
  ![](https://i.loli.net/2019/11/14/5pBfd4KtMDIbOX9.jpg)

- Delete
  ![](https://i.loli.net/2019/11/14/tEqsjIHKMbRpOXP.jpg)

[⬆Back to Top](#table-of-contents)

### Data Driven

Moving the content of the template to the script means that the template can be reduced and js can be extracted to another file to reuse.
At the same time, the data in js is actually a piece of json, this means code generation tool can help.

![](https://i.loli.net/2019/11/14/1jpJdiNMhPHoZmF.jpg)<br />![](https://i.loli.net/2019/11/14/hfTaURHEOYAkoSr.jpg)<br />![9.jpeg](https://i.loli.net/2019/11/14/uaNq3mbWRXPk1gs.jpg)

[⬆Back to Top](#table-of-contents)

### Why

Why do you create el-data-table based on el-table of element-ui?

I often hear the following sounds:

1.  el-table can cover most scenarios without extended requirements
2.  wrap up so many things, it's heavy and high coupling
3.  bound with too many business logic, it's not flexible; business logic should handle by developers

First of all, I have to say, el-table is really flexible, but when implementing paging requests, only el-table is not enough, and the el-pagination component needs to be combined. Most of the content of paging processing is repeated. Without a high level business component, we get duplicate code everywhere.

In fact, in the admin or dashboard web app, there are many CRUD operations, using restful API. It is possible to use only one url to make a component to complete CRUD functions.

Secondly, many experienced developers think that components are the more flexible the better.

However, for the "newbees" who lack of experience, they are not familiar with common business scenarios. Some basic operations, like form validation, space filtering, adding loading, exception handling, they may forget, which result in bugs.

For front-line business developers, in the face of endless developing task, in fact, they don't want to deal with repeated business logic. they just want to free their hands and get off work early.

In such situation, el-data-table was born.

[⬆Back to Top](#table-of-contents)

## Feature

- Use configuration to call restful api to complete CRUD functions
- Support table display tree structure data
- Bound with pagination logic
- Support custom column buttons, and custom operation functions
- Support saving query on url, which can resotre search status after history.go(-1) or location.reload()

[⬆Back to Top](#table-of-contents)

## Links

- [docs](https://FEMessage.github.io/el-data-table/)
- [fem-vscode-helper](https://marketplace.visualstudio.com/items?itemName=FEMessage.fem-vscode-helper)

[⬆ Back to Top](#table-of-contents)

## Install

Encourage using [Yarn](https://yarnpkg.com/en/docs/install#mac-stable) to install

```sh
yarn add @femessage/el-data-table
```

[⬆Back to Top](#table-of-contents)

## Quick Start

### Global Register Component

This is for minification reason: in this way building your app, webpack or other bundler just bundle the dependencies into one vendor for all pages which using this component, instead of one vendor for one page

```javascript
import Vue from 'vue'
// register component and loading directive
import ElDataTable from '@femessage/el-data-table'
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

[⬆Back to Top](#table-of-contents)

## Reference

- [form rules detail see asynchronc-veriator](https://github.com/yiminghe/async-validator)
- [ll-input enter to submit](https://github.com/ElemeFE/element/pull/5920)
- [html spec form submission](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)
- [what_is_a_URL](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL)
- [history_API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
- [regExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [routing implementations details in vue-router](https://zhuanlan.zhihu.com/p/27588422)
- [peer-dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/)

[⬆Back to Top](#table-of-contents)

## Contributing

For those who are interested in contributing to this project, such as:

- report a bug
- request new feature
- fix a bug
- implement a new feature

Please refer to our [contributing guide](https://github.com/FEMessage/.github/blob/master/CONTRIBUTING.md).

[⬆ Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://levy.work"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt=""/><br /><sub><b>levy</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=levy9527" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/pulls?q=is%3Apr+reviewed-by%3Alevy9527" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=levy9527" title="Documentation">📖</a> <a href="#infra-levy9527" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt=""/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=donaldshen" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=donaldshen" title="Tests">⚠️</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=donaldshen" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/MiffyCooper"><img src="https://avatars1.githubusercontent.com/u/20179564?v=4" width="100px;" alt=""/><br /><sub><b>MiffyCooper</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=MiffyCooper" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=MiffyCooper" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/prisbre"><img src="https://avatars1.githubusercontent.com/u/13557397?v=4" width="100px;" alt=""/><br /><sub><b>Huanfeng Chen</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=prisbre" title="Code">💻</a></td>
    <td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt=""/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/issues?q=author%3Aevillt" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Alvin-Liu"><img src="https://avatars0.githubusercontent.com/u/11909145?v=4" width="100px;" alt=""/><br /><sub><b>Alvin</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=Alvin-Liu" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/issues?q=author%3AAlvin-Liu" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/lianghx-319"><img src="https://avatars2.githubusercontent.com/u/27187946?v=4" width="100px;" alt=""/><br /><sub><b>Han</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=lianghx-319" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/issues?q=author%3Alianghx-319" title="Bug reports">🐛</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=lianghx-319" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/kunzhijia"><img src="https://avatars2.githubusercontent.com/u/4848041?v=4" width="100px;" alt=""/><br /><sub><b>kunzhijia</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=kunzhijia" title="Code">💻</a> <a href="#tool-kunzhijia" title="Tools">🔧</a> <a href="#example-kunzhijia" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/chenEdgar"><img src="https://avatars3.githubusercontent.com/u/12596622?v=4" width="100px;" alt=""/><br /><sub><b>Edgar</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=chenEdgar" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/issues?q=author%3AchenEdgar" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Barretem"><img src="https://avatars2.githubusercontent.com/u/47966933?v=4" width="100px;" alt=""/><br /><sub><b>Barretem</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=Barretem" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/GaryHjy"><img src="https://avatars1.githubusercontent.com/u/32995274?v=4" width="100px;" alt=""/><br /><sub><b>阿禹。</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=GaryHjy" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/lujunwei"><img src="https://avatars0.githubusercontent.com/u/7427200?v=4" width="100px;" alt=""/><br /><sub><b>lujunwei</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=lujunwei" title="Code">💻</a></td>
    <td align="center"><a href="http://www.ccc1996.cn"><img src="https://avatars1.githubusercontent.com/u/20502762?v=4" width="100px;" alt=""/><br /><sub><b>cjf</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/issues?q=author%3Acjfff" title="Bug reports">🐛</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=cjfff" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Jack-rainbow"><img src="https://avatars1.githubusercontent.com/u/20368037?v=4" width="100px;" alt=""/><br /><sub><b>Jack-rainbow</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/issues?q=author%3AJack-rainbow" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://colmugx.github.io"><img src="https://avatars1.githubusercontent.com/u/21327913?v=4" width="100px;" alt=""/><br /><sub><b>ColMugX</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=colmugx" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/snowlocked"><img src="https://avatars0.githubusercontent.com/u/19562649?v=4" width="100px;" alt=""/><br /><sub><b>snowlocked</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=snowlocked" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=snowlocked" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/zcqno1"><img src="https://avatars0.githubusercontent.com/u/11766057?v=4" width="100px;" alt=""/><br /><sub><b>Sponge</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/issues?q=author%3Azcqno1" title="Bug reports">🐛</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=zcqno1" title="Code">💻</a></td>
    <td align="center"><a href="https://4ark.me"><img src="https://avatars0.githubusercontent.com/u/27952659?v=4" width="100px;" alt=""/><br /><sub><b>4Ark</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=gd4Ark" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=gd4Ark" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Htongbing"><img src="https://avatars2.githubusercontent.com/u/36433396?v=4" width="100px;" alt=""/><br /><sub><b>Htongbing</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=Htongbing" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/PPPenny"><img src="https://avatars3.githubusercontent.com/u/20984729?v=4" width="100px;" alt=""/><br /><sub><b>PPPenny</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=PPPenny" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](https://www.yuque.com/deepexi-serverless/onx52o/LICENSE)

[⬆Back to Top](#table-of-contents)
