# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.13.1](https://github.com/FEMessage/el-data-table/compare/v1.13.0...v1.13.1) (2019-11-12)


### Bug Fixes

* 删完最后一页后页码不正确的问题 ([#228](https://github.com/FEMessage/el-data-table/issues/228)) ([2dbdde6](https://github.com/FEMessage/el-data-table/commit/2dbdde6))



## [1.13.0](https://github.com/FEMessage/el-data-table/compare/v1.12.0...v1.13.0) (2019-10-12)


### Features

* 支持统一定制按钮大小 ([#220](https://github.com/FEMessage/el-data-table/issues/220)) ([f9edea6](https://github.com/FEMessage/el-data-table/commit/f9edea6))
* **searchImmediately:** 支持搜索表单项变更时自动搜索 ([#222](https://github.com/FEMessage/el-data-table/issues/222)) ([8c73ebe](https://github.com/FEMessage/el-data-table/commit/8c73ebe))



## [1.12.0](https://github.com/FEMessage/el-data-table/compare/v1.11.0...v1.12.0) (2019-09-27)


### Features

* 支持切换操作栏按钮风格 ([#221](https://github.com/FEMessage/el-data-table/issues/221)) ([a193677](https://github.com/FEMessage/el-data-table/commit/a193677))
* 支持统一定制按钮大小 ([#220](https://github.com/FEMessage/el-data-table/issues/220)) ([f9edea6](https://github.com/FEMessage/el-data-table/commit/f9edea6))



## [1.11.0](https://github.com/FEMessage/el-data-table/compare/v1.10.0...v1.11.0) (2019-09-12)


### Bug Fixes

* `extraQuery` 重置问题 ([4d1079a](https://github.com/FEMessage/el-data-table/commit/4d1079a))


### Features

* 搜索表单支持定位插槽 ([#215](https://github.com/FEMessage/el-data-table/issues/215)) ([4d3bbc4](https://github.com/FEMessage/el-data-table/commit/4d3bbc4))



## [1.10.0](https://github.com/FEMessage/el-data-table/compare/v1.9.0...v1.10.0) (2019-09-10)


### Features

* 搜索表单支持定位插槽 ([#215](https://github.com/FEMessage/el-data-table/issues/215)) ([4d3bbc4](https://github.com/FEMessage/el-data-table/commit/4d3bbc4))



## [1.9.0](https://github.com/FEMessage/el-data-table/compare/v1.8.0...v1.9.0) (2019-09-05)


### Bug Fixes

* 使用需要弹窗的功能并把 hasDialog 设置为 false 时, 将会报错 ([#211](https://github.com/FEMessage/el-data-table/issues/211)) ([b5fad7f](https://github.com/FEMessage/el-data-table/commit/b5fad7f))


### Features

* slot-form增加作用域数据 ([#212](https://github.com/FEMessage/el-data-table/issues/212)) ([c173954](https://github.com/FEMessage/el-data-table/commit/c173954))



## [1.8.0](https://github.com/FEMessage/el-data-table/compare/v1.7.3...v1.8.0) (2019-08-22)


### Features

* searchForm 内容支持属性 collapsible=false，在搜索区域折叠后仍可见 ([e654fed](https://github.com/FEMessage/el-data-table/commit/e654fed))
* 支持设置对话框属性 dialogAttrs ([dd71f7b](https://github.com/FEMessage/el-data-table/commit/dd71f7b))



### [1.7.3](https://github.com/FEMessage/el-data-table/compare/v1.7.2...v1.7.3) (2019-08-07)


### Bug Fixes

* 保存查询参数时使用 replaceState ([c1031ef](https://github.com/FEMessage/el-data-table/commit/c1031ef)), closes [#186](https://github.com/FEMessage/el-data-table/issues/186)



### [1.7.2](https://github.com/FEMessage/el-data-table/compare/v1.7.1...v1.7.2) (2019-08-02)


### Bug Fixes

* error 422 when fetch github api  ([#189](https://github.com/FEMessage/el-data-table/issues/189)) ([104866b](https://github.com/FEMessage/el-data-table/commit/104866b))



### [1.7.1](https://github.com/FEMessage/el-data-table/compare/v1.7.0...v1.7.1) (2019-07-30)


### Bug Fixes

* header 在没有头部按钮时出现 22px 高度的问题 ([1e766b1](https://github.com/FEMessage/el-data-table/commit/1e766b1))
* 修复 tr 淡入动画 ([#179](https://github.com/FEMessage/el-data-table/issues/179)) ([6135a4a](https://github.com/FEMessage/el-data-table/commit/6135a4a))



## [1.7.0](https://github.com/FEMessage/el-data-table/compare/v1.6.3...v1.7.0) (2019-07-26)


### Features

* 增加header-slot ([#177](https://github.com/FEMessage/el-data-table/issues/177)) ([d3aeccf](https://github.com/FEMessage/el-data-table/commit/d3aeccf))



### [1.6.3](https://github.com/FEMessage/el-data-table/compare/v1.6.2...v1.6.3) (2019-07-12)


### Bug Fixes

* getList在mounted阶段会发出两次  ([c1403f7](https://github.com/FEMessage/el-data-table/commit/c1403f7)), closes [#162](https://github.com/FEMessage/el-data-table/issues/162)



### [1.6.2](https://github.com/FEMessage/el-data-table/compare/v1.6.1...v1.6.2) (2019-07-11)



### [1.6.1](https://github.com/FEMessage/el-data-table/compare/v1.6.0...v1.6.1) (2019-07-05)



## [1.6.0](https://github.com/FEMessage/el-data-table/compare/v1.5.1...v1.6.0) (2019-07-02)


### Features

* **deps:** upgrade `@femessage/el-form-renderer` to `1.6.0`  ([dcf90ae](https://github.com/FEMessage/el-data-table/commit/dcf90ae))



### [1.5.1](https://github.com/FEMessage/el-data-table/compare/v1.5.0...v1.5.1) (2019-07-01)


### Bug Fixes

* self-loading-button在header处应该是el-button   ([96bb0e1](https://github.com/FEMessage/el-data-table/commit/96bb0e1))



## [1.5.0](https://github.com/FEMessage/el-data-table/compare/v1.4.2...v1.5.0) (2019-06-24)


### Features

* 增加属性saveQuery控制开启query保存功能  ([e4c95ad](https://github.com/FEMessage/el-data-table/commit/e4c95ad)), closes [#126](https://github.com/FEMessage/el-data-table/issues/126)



### [1.4.2](https://github.com/FEMessage/el-data-table/compare/v1.4.1...v1.4.2) (2019-06-10)


### Bug Fixes

* 没有sync修饰时，customQuery也被重置的bug   ([3f18917](https://github.com/FEMessage/el-data-table/commit/3f18917)), closes [#105](https://github.com/FEMessage/el-data-table/issues/105)



### [1.4.1](https://github.com/FEMessage/el-data-table/compare/v1.4.0...v1.4.1) (2019-05-31)



## [1.4.0](https://github.com/FEMessage/el-data-table/compare/v1.3.0...v1.4.0) (2019-05-21)


### Bug Fixes

* 出现多个computed  ([587ff1b](https://github.com/FEMessage/el-data-table/commit/587ff1b))


### Features

* 删除弹窗的确认按钮用danger样式 ([5b4b54c](https://github.com/FEMessage/el-data-table/commit/5b4b54c))



## [1.3.0](https://github.com/FEMessage/el-data-table/compare/v1.2.3...v1.3.0) (2019-05-20)


### Features

* 删除弹窗的确认按钮用danger样式 ([5b4b54c](https://github.com/FEMessage/el-data-table/commit/5b4b54c))
* 多选项在翻页、数据刷新时仍保持 ([0efce14](https://github.com/FEMessage/el-data-table/commit/0efce14))



### 1.2.3 (2019-05-13)


### Bug Fixes

* dependences miss  ([d27724c](https://github.com/FEMessage/el-data-table/commit/d27724c))
