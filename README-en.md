# el-data-table

![](https://cdn.nlark.com/yuque/0/2019/svg/224563/1561703030697-8a6d2fe9-597d-47a2-9f49-0490464abf56.svg#align=left&display=inline&height=20&originHeight=20&originWidth=90&size=0&status=done&width=90) ![](https://img.shields.io/npm/dm/el-data-table.svg#align=left&display=inline&height=20&originHeight=20&originWidth=134&status=done&width=134) ![](https://img.shields.io/npm/v/el-data-table.svg#align=left&display=inline&height=20&originHeight=20&originWidth=80&status=done&width=80) ![](https://img.shields.io/npm/l/el-data-table.svg#align=left&display=inline&height=20&originHeight=20&originWidth=78&status=done&width=78) ![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg#align=left&display=inline&height=20&originHeight=20&originWidth=90&status=done&width=90) [![](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg#align=left&display=inline&height=20&originHeight=20&originWidth=104&status=done&width=104)](https://github-tools.github.io/github-release-notes/)

Auto requesting by `axios`, supports pagination, tree data structure, custom search, custom operation column, which makes rest api easily👏

![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026827-d2ba00dd-0e93-4e4f-a7da-247fbcd67333.jpeg#align=left&display=inline&height=761&originHeight=761&originWidth=1611&size=0&status=done&width=1611)

## Table of Contents

* [Introduction](#introduction)
  * [CRUD](#crud)
  * [Data Driven](#data-driven)
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

el-data-table is created to solve business problems, so CRUD logic is set inside.<br /> For example, to develop `user` api, suppose its relative path like this:

```javascript
/api/v1/users
```

The restful CRUD api should be:

* Retrieve

```javascript
GET /api/v1/users?page=1&size=10
```

* Create

```javascript
POST / api / v1 / users
```

* Update

```javascript
PUT /api/v1/users/:id
```

* Delete

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

* Retrieve
  ![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026830-1aa50e0b-8ae2-46b3-8722-816f19e62498.jpeg#align=left&display=inline&height=784&originHeight=784&originWidth=1950&size=0&status=done&width=1950)<br />![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026867-b3ecaa0b-043e-48e7-aacd-590ec99ebeb4.jpeg#align=left&display=inline&height=954&originHeight=954&originWidth=2558&size=0&status=done&width=2558)

* Create
  ![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026834-0b8f4bf4-0b60-48e2-8602-0184d42d2b73.jpeg#align=left&display=inline&height=912&originHeight=912&originWidth=2558&size=0&status=done&width=2558)

* Update
  ![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026856-1e2c48bc-b934-46bb-88ec-90a2e7887be0.jpeg#align=left&display=inline&height=948&originHeight=948&originWidth=2554&size=0&status=done&width=2554)

* Delete
  ![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026855-9c30f12f-523d-4a29-bce9-3c91835dbbfc.jpeg#align=left&display=inline&height=942&originHeight=942&originWidth=2558&size=0&status=done&width=2558)

[⬆Back to Top](#table-of-contents)

### Data driven

Moving the content of the template to the script means that the template can be reduced and js can be extracted to another file to reuse.
At the same time, the data in js is actually a piece of json, this means code generation tool can help.

Beside, herer uses the component [@femessage/el-form-renderer](https://github.com/FEMessage/el-form-renderer) to render form.

![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026838-0fb2ab84-2934-4c6b-91d9-e3d706520f38.jpeg#align=left&display=inline&height=689&originHeight=689&originWidth=1539&size=0&status=done&width=1539)<br />![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026890-51418c24-b277-42dd-a6a8-c98a5291e922.jpeg#align=left&display=inline&height=577&originHeight=577&originWidth=1543&size=0&status=done&width=1543)<br />![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026831-0d1a339b-dbde-4eeb-9d68-89850b9449fb.jpeg#align=left&display=inline&height=912&originHeight=912&originWidth=1515&size=0&status=done&width=1515)

[⬆Back to Top](#table-of-contents)

### Why

Why do you create el-data-table based on el-table of element-ui?

I often hear the following sounds:

1.  el-table can cover most scenarios without extended requirements
1.  wrap up so many things, it's heavy and high coupling
1.  bound with too many business logic, it's not flexible; business logic should handle by developers

First of all, I have to say, el-table is really flexible, but when implementing paging requests, only el-table is not enough, and the el-pagination component needs to be combined. Most of the content of paging processing is repeated. Without a high level business component, we get duplicate code everywhere.

In fact, in the admin or dashboard web app, there are many CRUD operations, using restful API. It is possible to use only one url to make a component to complete CRUD functions.

Secondly, many experienced developers think that components are the more flexible the better.

However, for the "newbees" who lack of experience, they are not familiar with common business scenarios. Some basic operations, like form validation, space filtering, adding loading, exception handling, they may forget, which result in bugs.

For front-line business developers, in the face of endless developing task, in fact, they don't want to deal with repeated business logic. they just want to free their hands and get off work early.

In such situation, el-data-table was born.

[⬆Back to Top](#table-of-contents)

## Feature

* Use configuration to call restful api to complete CRUD functions
* Support table display tree structure data
* Bound with pagination logic
* Support custom column buttons, and custom operation functions
* Support saving query on url, which can resotre search status after history.go(-1) or location.reload()

[⬆Back to Top](#table-of-contents)

## Demo

* [Doc and online demo](https://femessage.github.io/el-data-table/)

[⬆Back to Top](#table-of-contents)

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

* [form rules detail see asynchronc-veriator](https://github.com/yiminghe/async-validator)
* [ll-input enter to submit](https://github.com/ElemeFE/element/pull/5920)
* [html spec form submission](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)
* [what_is_a_URL](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL)
* [history_API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
* [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
* [regExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
* [routing implementations details in vue-router](https://zhuanlan.zhihu.com/p/27588422)
* [peer-dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/)

[⬆Back to Top](#table-of-contents)

## License

[MIT](https://www.yuque.com/deepexi-serverless/onx52o/LICENSE)

[⬆Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://levy.work"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=levy9527" title="Code">💻</a> <a href="#review-levy9527" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=levy9527" title="Documentation">📖</a> <a href="#infra-levy9527" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=donaldshen" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=donaldshen" title="Tests">⚠️</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=donaldshen" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/MiffyCooper"><img src="https://avatars1.githubusercontent.com/u/20179564?v=4" width="100px;" alt="MiffyCooper"/><br /><sub><b>MiffyCooper</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=MiffyCooper" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/commits?author=MiffyCooper" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/prisbre"><img src="https://avatars1.githubusercontent.com/u/13557397?v=4" width="100px;" alt="Huanfeng Chen"/><br /><sub><b>Huanfeng Chen</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=prisbre" title="Code">💻</a></td><td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/issues?q=author%3Aevillt" title="Bug reports">🐛</a></td><td align="center"><a href="https://github.com/Alvin-Liu"><img src="https://avatars0.githubusercontent.com/u/11909145?v=4" width="100px;" alt="Alvin"/><br /><sub><b>Alvin</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=Alvin-Liu" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/issues?q=author%3AAlvin-Liu" title="Bug reports">🐛</a></td><td align="center"><a href="https://github.com/lianghx-319"><img src="https://avatars2.githubusercontent.com/u/27187946?v=4" width="100px;" alt="Han"/><br /><sub><b>Han</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=lianghx-319" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/issues?q=author%3Alianghx-319" title="Bug reports">🐛</a></td></tr><tr><td align="center"><a href="https://github.com/kunzhijia"><img src="https://avatars2.githubusercontent.com/u/4848041?v=4" width="100px;" alt="kunzhijia"/><br /><sub><b>kunzhijia</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=kunzhijia" title="Code">💻</a> <a href="#tool-kunzhijia" title="Tools">🔧</a> <a href="#example-kunzhijia" title="Examples">💡</a></td><td align="center"><a href="https://github.com/chenEdgar"><img src="https://avatars3.githubusercontent.com/u/12596622?v=4" width="100px;" alt="Edgar"/><br /><sub><b>Edgar</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=chenEdgar" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-table/issues?q=author%3AchenEdgar" title="Bug reports">🐛</a></td><td align="center"><a href="https://github.com/Barretem"><img src="https://avatars2.githubusercontent.com/u/47966933?v=4" width="100px;" alt="Barretem"/><br /><sub><b>Barretem</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=Barretem" title="Code">💻</a></td><td align="center"><a href="https://github.com/GaryHjy"><img src="https://avatars1.githubusercontent.com/u/32995274?v=4" width="100px;" alt="阿禹。"/><br /><sub><b>阿禹。</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=GaryHjy" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/lujunwei"><img src="https://avatars0.githubusercontent.com/u/7427200?v=4" width="100px;" alt="lujunwei"/><br /><sub><b>lujunwei</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=lujunwei" title="Code">💻</a></td><td align="center"><a href="http://www.ccc1996.cn"><img src="https://avatars1.githubusercontent.com/u/20502762?v=4" width="100px;" alt="cjf"/><br /><sub><b>cjf</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/issues?q=author%3Acjfff" title="Bug reports">🐛</a></td><td align="center"><a href="https://github.com/Jack-rainbow"><img src="https://avatars1.githubusercontent.com/u/20368037?v=4" width="100px;" alt="Jack-rainbow"/><br /><sub><b>Jack-rainbow</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/issues?q=author%3AJack-rainbow" title="Bug reports">🐛</a></td></tr><tr><td align="center"><a href="https://colmugx.github.io"><img src="https://avatars1.githubusercontent.com/u/21327913?v=4" width="100px;" alt="ColMugX"/><br /><sub><b>ColMugX</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-table/commits?author=colmugx" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
