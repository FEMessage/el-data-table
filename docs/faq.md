## 获取组件内的el-table实例

```html
<template>
  <el-data-table ref="dataTable" />
</template>
<script>
export default {
  mounted() {
    this.$refs.dataTable.$refs.table
  }
}
</script>
```

## 手动刷新el-data-table

```javascript
this.$refs.dataTable.getList()
```

## 查询后刷新

### 场景
![](https://cdn.nlark.com/yuque/0/2018/png/160590/1543571549979-6e8e9121-538d-47f6-a319-3f3941d2f3e0.png#align=left&display=inline&height=406&originHeight=406&originWidth=1344&status=done&width=747)<br />![](https://cdn.nlark.com/yuque/0/2018/png/160590/1543571651982-1aaffcbf-ad2e-471f-948b-d18de3c5c73c.png#align=left&display=inline&height=432&originHeight=432&originWidth=1298&status=done&width=747)

### 解决方案
把select option的value变成字符串类型

### 原有代码

```javascript
searchForm: [
  {
    el: {placeholder: '请选择'},
    label: '状态',
    id: 'status',
    type: 'select',
    options: [
      {
        value: 1,
        label: '待处理'
      },
    ]
  }
],
```

### 改动后代码

```javascript
searchForm: [
  {
    el: {placeholder: '请选择'},
    label: '状态',
    id: 'status',
    type: 'select',
    options: [
      {
        value: '1', // 修改了这一行
        label: '待处理'
      },
    ]
  }
],
```

## 弹窗关闭时清空选中状态

### 场景
el-data-table 在 el-dialog 中展示，在 el-dialog 关闭后，清空 el-data-table 的选中状态。

### 解决方案
![](https://cdn.nlark.com/yuque/0/2018/png/160590/1544089655978-f73452e4-8da6-476e-8dbd-22a975e9a89c.png#align=left&display=inline&height=632&originHeight=632&originWidth=1700&status=done&width=827)

```javascript
cancelRelation() {
  this.showRelationDialog = false
  this.$refs.outsideModuleTable.clearSelection()
}
```

## searchForm 部分内容重置失效
### 场景
两个 data-table 在同一个页面使用时，搜索栏的重置按钮不起作用
```html
<el-data-table v-if="flag" />
<el-data-table v-else />
```
### 解决方案
在el-data-table上使用key属性规避此问题。
```html
<el-data-table v-if="flag" key="1" />
<el-data-table v-else key="2" />
```
### 原始issue
[https://github.com/FEMessage/el-data-table/issues/119](https://github.com/FEMessage/el-data-table/issues/119)

## 点击 el-form 内部按钮触发页面刷新

### 场景

el-form 包裹 el-data-table 时，点击 el-data-table 的操作列按钮会触发 form submit 的默认行为，导致页面刷新一次。

```html
<el-form>
  <el-data-table :extraButtons="extraButtons">
</el-form>
```

### 解决方案

在 el-form 上增加一个禁用 submit 默认行为的事件。

```html
<el-form
  @submit.native.prevent
>
  <el-data-table :extraButtons="extraButtons">
</el-form>
```

### 参考链接
[W3C Form Submission](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)

[element-ui el-form 文档](https://element.eleme.cn/#/zh-CN/component/form)

[issue #224](https://github.com/FEMessage/el-data-table/issues/224)
