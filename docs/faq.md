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

## 两个 data-table 在同一个页面使用时，searchForm 部分输入不能重置
在el-data-table上使用key属性规避此问题。
### before
![](https://user-images.githubusercontent.com/27187946/59015253-22eab580-8871-11e9-970b-61cf5530ba37.png)
![](https://user-images.githubusercontent.com/27187946/59015265-27af6980-8871-11e9-95bc-0046bfe9dd9d.gif)
### after
![](https://user-images.githubusercontent.com/27187946/59015310-46156500-8871-11e9-88d9-8448b26c7b69.png)
![](https://user-images.githubusercontent.com/27187946/59015350-5b8a8f00-8871-11e9-9fd1-da17d4ab9128.gif)
### 原始issue
https://github.com/FEMessage/el-data-table/issues/119
