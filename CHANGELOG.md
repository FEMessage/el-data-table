# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.20.1](https://github.com/FEMessage/el-data-table/compare/v1.20.0...v1.20.1) (2020-07-13)


### Bug Fixes

* 给 el-form-renderer 容器增加类名 ([0229411](https://github.com/FEMessage/el-data-table/commit/0229411))



## [1.20.0](https://github.com/FEMessage/el-data-table/compare/v1.19.5...v1.20.0) (2020-07-01)


### Features

* 支持监听 el-table 事件（新增 prop：tableEventHandlers） ([#309](https://github.com/FEMessage/el-data-table/issues/309)) ([1aa1e0e](https://github.com/FEMessage/el-data-table/commit/1aa1e0e))



### [1.19.5](https://github.com/FEMessage/el-data-table/compare/v1.19.4...v1.19.5) (2020-06-17)


### Bug Fixes

* 增加searchForm 的空数组进行判断 ([#306](https://github.com/FEMessage/el-data-table/issues/306)) ([db86b8b](https://github.com/FEMessage/el-data-table/commit/db86b8b))



### [1.19.4](https://github.com/FEMessage/el-data-table/compare/v1.19.3...v1.19.4) (2020-06-04)


### Bug Fixes

* 搜索参数出现 # 时丢失 ([#304](https://github.com/FEMessage/el-data-table/issues/304)) ([f12e89c](https://github.com/FEMessage/el-data-table/commit/f12e89c))



### [1.19.3](https://github.com/FEMessage/el-data-table/compare/v1.19.2...v1.19.3) (2020-05-11)


### Bug Fixes

* 查询值为数组时的分隔符问题 ([#301](https://github.com/FEMessage/el-data-table/issues/301)) ([4483c8f](https://github.com/FEMessage/el-data-table/commit/4483c8f))



### [1.19.2](https://github.com/FEMessage/el-data-table/compare/v1.19.1...v1.19.2) (2020-05-08)


### Bug Fixes

* 查询值为数组时的持久化问题 ([#300](https://github.com/FEMessage/el-data-table/issues/300)) ([0158c32](https://github.com/FEMessage/el-data-table/commit/0158c32))



### [1.19.1](https://github.com/FEMessage/el-data-table/compare/v1.19.0...v1.19.1) (2020-04-10)


### Bug Fixes

* 修复 extraButtons 未正确显示 disabled 状态的问题 ([#298](https://github.com/FEMessage/el-data-table/issues/298)) ([c8b879f](https://github.com/FEMessage/el-data-table/commit/c8b879f))
* 超出页码的请求自动跳回最后一页 ([#296](https://github.com/FEMessage/el-data-table/issues/296)) ([d4f0689](https://github.com/FEMessage/el-data-table/commit/d4f0689))



## [1.19.0](https://github.com/FEMessage/el-data-table/compare/v1.18.4...v1.19.0) (2020-03-19)


### Features

* beforeSearch增加表单数据参数 ([#291](https://github.com/FEMessage/el-data-table/issues/291)) ([7557c0e](https://github.com/FEMessage/el-data-table/commit/7557c0e))



### [1.18.4](https://github.com/FEMessage/el-data-table/compare/v1.18.3...v1.18.4) (2020-02-13)


### Bug Fixes

* 没 searchForm 时仍有搜索🔍按钮 ([#285](https://github.com/FEMessage/el-data-table/issues/285)) ([92eb6b2](https://github.com/FEMessage/el-data-table/commit/92eb6b2))



### [1.18.3](https://github.com/FEMessage/el-data-table/compare/v1.18.2...v1.18.3) (2020-02-10)


### Bug Fixes

* tableAttrs 无法修改 rowClassName 的问题 ([#284](https://github.com/FEMessage/el-data-table/issues/284)) ([1ab51ed](https://github.com/FEMessage/el-data-table/commit/1ab51ed))



### [1.18.2](https://github.com/FEMessage/el-data-table/compare/v1.18.1...v1.18.2) (2020-02-03)


### Bug Fixes

* select all 应该过滤掉 selectable 为 false 的行 ([#279](https://github.com/FEMessage/el-data-table/issues/279)) ([b9d4c5c](https://github.com/FEMessage/el-data-table/commit/b9d4c5c))
* slot header 应该在折叠按钮前面 ([#280](https://github.com/FEMessage/el-data-table/issues/280)) ([5b319b7](https://github.com/FEMessage/el-data-table/commit/5b319b7))



### [1.18.1](https://github.com/FEMessage/el-data-table/compare/v1.18.0...v1.18.1) (2020-01-03)


### Bug Fixes

* 折叠 与 `el-form-renderer.remote` 功能冲突 ([#274](https://github.com/FEMessage/el-data-table/issues/274)) ([5b2164d](https://github.com/FEMessage/el-data-table/commit/5b2164d))



## [1.18.0](https://github.com/FEMessage/el-data-table/compare/v1.17.0...v1.18.0) (2019-12-27)


### Bug Fixes

* columns property align not work ([#272](https://github.com/FEMessage/el-data-table/issues/272)) ([befdd77](https://github.com/FEMessage/el-data-table/commit/befdd77))


### Features

* 新增 onSuccess 钩子 ([#269](https://github.com/FEMessage/el-data-table/issues/269)) ([0de48b9](https://github.com/FEMessage/el-data-table/commit/0de48b9))
* 添加分页自定义 key ([#270](https://github.com/FEMessage/el-data-table/issues/270)) ([8a47d13](https://github.com/FEMessage/el-data-table/commit/8a47d13))



## [1.17.0](https://github.com/FEMessage/el-data-table/compare/v1.16.1...v1.17.0) (2019-12-24)


### Features

* 支持配置axios的config ([#265](https://github.com/FEMessage/el-data-table/issues/265)) ([6f4d773](https://github.com/FEMessage/el-data-table/commit/6f4d773))
* 自定义删除弹窗文案 ([#266](https://github.com/FEMessage/el-data-table/issues/266)) ([79e278d](https://github.com/FEMessage/el-data-table/commit/79e278d))



### [1.16.1](https://github.com/FEMessage/el-data-table/compare/v1.16.0...v1.16.1) (2019-12-11)


### Bug Fixes

* getList 出错时设置 total = 0 ([#255](https://github.com/FEMessage/el-data-table/issues/255)) ([7773639](https://github.com/FEMessage/el-data-table/commit/7773639))



## [1.16.0](https://github.com/FEMessage/el-data-table/compare/v1.15.2...v1.16.0) (2019-12-10)


### Features

* 支持多级表头 ([#253](https://github.com/FEMessage/el-data-table/issues/253)) ([9bd3147](https://github.com/FEMessage/el-data-table/commit/9bd3147))



### [1.15.2](https://github.com/FEMessage/el-data-table/compare/v1.15.1...v1.15.2) (2019-12-07)


### Bug Fixes

* header 仅有 slot 时，slot 不显示的 bug ([#252](https://github.com/FEMessage/el-data-table/issues/252)) ([e55cae8](https://github.com/FEMessage/el-data-table/commit/e55cae8))



### [1.15.1](https://github.com/FEMessage/el-data-table/compare/v1.15.0...v1.15.1) (2019-12-03)



## [1.15.0](https://github.com/FEMessage/el-data-table/compare/v1.14.0...v1.15.0) (2019-11-28)


### Features

* extraButton添加函数类型的disabled属性 ([#247](https://github.com/FEMessage/el-data-table/issues/247)) ([4872ca0](https://github.com/FEMessage/el-data-table/commit/4872ca0))
* 暴露 correctPage API ([#245](https://github.com/FEMessage/el-data-table/issues/245)) ([1f5fccc](https://github.com/FEMessage/el-data-table/commit/1f5fccc))



## [1.14.0](https://github.com/FEMessage/el-data-table/compare/v1.13.4...v1.14.0) (2019-11-27)


### Features

* 刷新列表时提供一个 flag 判断是否显示 loading ([#246](https://github.com/FEMessage/el-data-table/issues/246)) ([44e2161](https://github.com/FEMessage/el-data-table/commit/44e2161))
* 暴露 correctPage API ([#245](https://github.com/FEMessage/el-data-table/issues/245)) ([1f5fccc](https://github.com/FEMessage/el-data-table/commit/1f5fccc))



### [1.13.4](https://github.com/FEMessage/el-data-table/compare/v1.13.3...v1.13.4) (2019-11-23)


### Bug Fixes

* onDelete没有抛出异常的问题 ([#239](https://github.com/FEMessage/el-data-table/issues/239)) ([09a50d2](https://github.com/FEMessage/el-data-table/commit/09a50d2))



### [1.13.3](https://github.com/FEMessage/el-data-table/compare/v1.13.2...v1.13.3) (2019-11-19)


### Bug Fixes

* 修复树形表数据无法直接stringify的问题 ([#235](https://github.com/FEMessage/el-data-table/issues/235)) ([53e9969](https://github.com/FEMessage/el-data-table/commit/53e9969))



### [1.13.2](https://github.com/FEMessage/el-data-table/compare/v1.13.1...v1.13.2) (2019-11-18)


### Bug Fixes

* 修改 no-data slot 逻辑 ([#231](https://github.com/FEMessage/el-data-table/issues/231)) ([f9dc5e3](https://github.com/FEMessage/el-data-table/commit/f9dc5e3))



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
