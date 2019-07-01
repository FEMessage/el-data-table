# El-data-table

![](https://cdn.nlark.com/yuque/0/2019/svg/224563/1561703030697-8a6d2fe9-597d-47a2-9f49-0490464abf56.svg#align=left&display=inline&height=20&originHeight=20&originWidth=90&size=0&status=done&width=90) ![](https://img.shields.io/npm/dm/el-data-table.svg#align=left&display=inline&height=20&originHeight=20&originWidth=134&status=done&width=134) ![](https://img.shields.io/npm/v/el-data-table.svg#align=left&display=inline&height=20&originHeight=20&originWidth=80&status=done&width=80) ![](https://img.shields.io/npm/l/el-data-table.svg#align=left&display=inline&height=20&originHeight=20&originWidth=78&status=done&width=78) ![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg#align=left&display=inline&height=20&originHeight=20&originWidth=90&status=done&width=90) [![](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg#align=left&display=inline&height=20&originHeight=20&originWidth=104&status=done&width=104)](https://github-tools.github.io/github-release-notes/)

Auto requesting by `axios`, supports pagination, tree data structure, custom search, custom operation column, which makes rest api easily👏

![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026827-d2ba00dd-0e93-4e4f-a7da-247fbcd67333.jpeg#align=left&display=inline&height=761&originHeight=761&originWidth=1611&size=0&status=done&width=1611)

<a name="W2pT5"></a>
## Table of Contents

- [Introduction](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#introduction)
  - [CRUD](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#crud)
  - [Data driven](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8)
  - [Why](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#why)
- [Feature](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#feature)
- [Demo](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#demo)
- [Install](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#install)
- [Quick Start](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#quick-start)
  - [Global Register Component](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#global-register-component)
  - [Template](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#template)
- [Reference](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#reference)
- [License](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#license)
- [Contributors](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#contributors)

<a name="kiA6T"></a>
## Introductio

<a name="I6SsE"></a>
### CRUD

El-data-table is created to solve business problems, so CRUD logic is packaged inside.<br />In the user interface example, set its relative path:

```javascript
/api/v1/users
```

The rest CRUD interface is as follows:

- Query

```javascript
GET /api/v1/users?page=1&size=10
```

- Add

```javascript
POST /api/v1/users
```

- Modify (edit)

```javascript
PUT /api/v1/users/:id
```

- Delete

```javascript
DELETE /api/v1/users/:id
```

You only need to use the following code to complete the CRUD function

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
            $type: 'input',
            $id: 'name',
            label: '用户名',
            $el: {
              placeholder: '请输入'
            }
          }
        ],
        form: [
          {
            $type: 'input',
            $id: 'name',
            label: '用户名',
            $el: {
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

The effect is as follows:

- Query<br />![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026830-1aa50e0b-8ae2-46b3-8722-816f19e62498.jpeg#align=left&display=inline&height=784&originHeight=784&originWidth=1950&size=0&status=done&width=1950)<br />![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026867-b3ecaa0b-043e-48e7-aacd-590ec99ebeb4.jpeg#align=left&display=inline&height=954&originHeight=954&originWidth=2558&size=0&status=done&width=2558)

- Add<br />![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026834-0b8f4bf4-0b60-48e2-8602-0184d42d2b73.jpeg#align=left&display=inline&height=912&originHeight=912&originWidth=2558&size=0&status=done&width=2558)

- Modify<br />![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026856-1e2c48bc-b934-46bb-88ec-90a2e7887be0.jpeg#align=left&display=inline&height=948&originHeight=948&originWidth=2554&size=0&status=done&width=2554)

- Delete<br />![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026855-9c30f12f-523d-4a29-bce9-3c91835dbbfc.jpeg#align=left&display=inline&height=942&originHeight=942&originWidth=2558&size=0&status=done&width=2558)<br />[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#table-of-contents)

<a name="WVlyq"></a>
### Data driven

Moving the content of the template to the script means that the template can be streamlined and js can be extracted to facilitate reuse. at the same time, the data in js is actually a piece of json, this also makes the code generation tool useful.

Where the rendering of the form uses the component [@femessage/el-form-renderer](https://github.com/FEMessage/el-form-renderer)

![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026838-0fb2ab84-2934-4c6b-91d9-e3d706520f38.jpeg#align=left&display=inline&height=689&originHeight=689&originWidth=1539&size=0&status=done&width=1539)<br />![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026890-51418c24-b277-42dd-a6a8-c98a5291e922.jpeg#align=left&display=inline&height=577&originHeight=577&originWidth=1543&size=0&status=done&width=1543)<br />![](https://cdn.nlark.com/yuque/0/2019/jpeg/224563/1561703026831-0d1a339b-dbde-4eeb-9d68-89850b9449fb.jpeg#align=left&display=inline&height=912&originHeight=912&originWidth=1515&size=0&status=done&width=1515)<br />[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#table-of-contents)

<a name="vxUGZ"></a>
### Why
Why do you want to encapsulate an el-data-table based on the el-table of element-ui?

I often hear the following sounds:

1. El-table can cover most scenarios without extended requirements
1. Encapsulating so many things, the coupling is too serious
1. Involving too many business logic, a bit rigid, business operations are still handed over to developers to deal

First of all, el-table is really flexible, but when implementing paging requests, only el-table is not enough, and the el-pagination component needs to be combined to implement it. Most of the content of paging processing is repeated. if it is not packaged, only redundant code will be generated.<br />
In the background, too many are CRUD operations. combined with the Christmas API, it is possible to use only one url to make the component CRUD.<br />
Secondly, many experienced "veterans" feel that the more flexible the components are, the better.<br />
However, for the "newcomers" who are still experienced, they are not familiar with common business scenarios. for some basic operations, if form verification, space filtering, adding loading, exception handling, they will only leak, and this is the source of the bug.<br />
For front-line business developers, in the face of endless business, in fact, they don't want to deal with repeated business logic. they just want to free their hands and get off work early.<br />
It is in this context that el-data-table is generated.<br />[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#table-of-contents)

<a name="aPYyn"></a>
## Feature

- Only json configuration is needed to realize the docking of the four interfaces of the Christmas-style CRUD
- Support table display tree structure data (this function element-ui official is not supported)
- Bring your own paging logic
- Scalable custom column buttons, and custom operation functions
- After supporting paging query, click on the details and return to restore the last query status<br />[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#table-of-contents)

<a name="ghfMB"></a>
## Demo

- [Doc and online demo](https://femessage.github.io/el-data-table/)<br />[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#table-of-contents)

<a name="oT4HF"></a>
## Install

Encourage using [Yarn](https://yarnpkg.com/en/docs/install#mac-stable) To install

```sh
yarn add el-data-table
```

[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#table-of-contents)

<a name="NT80B"></a>
## Quick Start

<a name="Ngird"></a>
### Global Register Component

This is for minification reason: in this way building your app, webpack or other bundler just bundle the dependencies into one vendor for all pages which using this component, Instead of one vendor for one page

```javascript
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

<a name="lIk6A"></a>
### Template

```vue
<template>
  <el-data-table></el-data-table>
</template>
```

[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#table-of-contents)

<a name="o9QRa"></a>
## Reference

- [Form rules detail see asynchronc-veriator](https://github.com/yiminghe/async-validator)
- [El-input enter to submit](https://github.com/ElemeFE/element/pull/5920)
- [Html spec form submission](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)
- [What_is_a_URL](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL)
- [History_API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [EncodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
- [RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [Two implementations of front-end routing from vue-router](https://zhuanlan.zhihu.com/p/27588422)
- [Peer-dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/)<br />[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#table-of-contents)

<a name="JLIDq"></a>
## License

[MIT](https://www.yuque.com/deepexi-serverless/onx52o/LICENSE)<br />[⬆Back to Top](https://www.yuque.com/deepexi-serverless/onx52o/ecbgv0?translate=en#table-of-contents)

<a name="6vyad"></a>
## Contributors

Thanks goes to these wonderful people ( [Emoji key](https://allcontributors.org/docs/en/emoji-key) ):<br />


| [![](https://avatars3.githubusercontent.com/u/9384365?v=4#alt=levy&width=100)<br />**levy**](http://levy.work)<br />[💻](https://github.com/FEMessage/el-data-table/commits?author=levy9527) [👀](#review-levy9527) [📖](https://github.com/FEMessage/el-data-table/commits?author=levy9527) [🚇](#infra-levy9527) [🤔](#ideas-levy9527) | [![](https://avatars3.githubusercontent.com/u/19591950?v=4#alt=Donald%20Shen&width=100)<br />**Donald Shen**](https://donaldshen.github.io/portfolio)<br />[💻](https://github.com/FEMessage/el-data-table/commits?author=donaldshen) [📖](https://github.com/FEMessage/el-data-table/commits?author=donaldshen) | [![](https://avatars1.githubusercontent.com/u/20179564?v=4#alt=MiffyCooper&width=100)<br />**MiffyCooper**](https://github.com/MiffyCooper)<br />[💻](https://github.com/FEMessage/el-data-table/commits?author=MiffyCooper) [📖](https://github.com/FEMessage/el-data-table/commits?author=MiffyCooper) | [![](https://avatars1.githubusercontent.com/u/13557397?v=4#alt=Huanfeng%20Chen&width=100)<br />**Huanfeng Chen**](https://github.com/prisbre)<br />[💻](https://github.com/FEMessage/el-data-table/commits?author=prisbre) | [![](https://avatars3.githubusercontent.com/u/19513289?v=4#alt=EVILLT&width=100)<br />**EVILLT**](https://evila.me)<br />[💻](https://github.com/FEMessage/el-data-table/commits?author=evillt) [🐛](https://github.com/FEMessage/el-data-table/issues?q=author%3Aevillt) | [![](https://avatars0.githubusercontent.com/u/11909145?v=4#alt=Alvin&width=100)<br />**Alvin**](https://github.com/Alvin-Liu)<br />[💻](https://github.com/FEMessage/el-data-table/commits?author=Alvin-Liu) [🐛](https://github.com/FEMessage/el-data-table/issues?q=author%3AAlvin-Liu) | [![](https://avatars2.githubusercontent.com/u/27187946?v=4#alt=Han&width=100)<br />**Han**](https://github.com/lianghx-319)<br />[💻](https://github.com/FEMessage/el-data-table/commits?author=lianghx-319) [🐛](https://github.com/FEMessage/el-data-table/issues?q=author%3Alianghx-319) |
| --- | --- | --- | --- | --- | --- | --- |
| [![](https://avatars2.githubusercontent.com/u/4848041?v=4#alt=kunzhijia&width=100)<br />**kunzhijia**](https://github.com/kunzhijia)<br />[💻](https://github.com/FEMessage/el-data-table/commits?author=kunzhijia) [🔧](#tool-kunzhijia) [💡](#example-kunzhijia) | [![](https://avatars3.githubusercontent.com/u/12596622?v=4#alt=Edgar&width=100)<br />**Edgar**](https://github.com/chenEdgar)<br />[💻](https://github.com/FEMessage/el-data-table/commits?author=chenEdgar) [🐛](https://github.com/FEMessage/el-data-table/issues?q=author%3AchenEdgar) | [![](https://avatars2.githubusercontent.com/u/47966933?v=4#alt=Barretem&width=100)<br />**Barretem**](https://github.com/Barretem)<br />[💻](https://github.com/FEMessage/el-data-table/commits?author=Barretem) | [![](https://avatars1.githubusercontent.com/u/32995274?v=4#alt=%E9%98%BF%E7%A6%B9%E3%80%82&width=100)<br />**阿禹。**](https://github.com/GaryHjy)<br />[📖](https://github.com/FEMessage/el-data-table/commits?author=GaryHjy) | [![](https://avatars0.githubusercontent.com/u/7427200?v=4#alt=lujunwei&width=100)<br />**lujunwei**](https://github.com/lujunwei)<br />[💻](https://github.com/FEMessage/el-data-table/commits?author=lujunwei) | [![](https://avatars1.githubusercontent.com/u/20502762?v=4#alt=cjf&width=100)<br />**cjf**](http://www.ccc1996.cn)<br />[🐛](https://github.com/FEMessage/el-data-table/issues?q=author%3Acjfff) | [![](https://avatars1.githubusercontent.com/u/20368037?v=4#alt=Jack-rainbow&width=100)<br />**Jack-rainbow**](https://github.com/Jack-rainbow)<br />[🐛](https://github.com/FEMessage/el-data-table/issues?q=author%3AJack-rainbow) |








