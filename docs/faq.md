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

## 自己实现 delete 操作，同时实现删除最后一页时，返回正确的最后一页

### 场景
1. 因为业务需求，data-table 默认的删除确认框不满足需求
2. 自己在外部使用 extra-buttons 实现 delete 操作
3. 遇到了[最后一页删到空，页码出现错误](https://github.com/FEMessage/el-data-table/issues/223)的问题

### 解决方案
1. 自己实现删除操作
2. 调用 correctPage 判断是否返回正确的最后一页
3. 调用 getList 刷新列表
```html
<template>
  <el-data-table ref="dataTable" :extraButtons="extraButtons">
</template>

<script>
export default {
  data() {
    return {
      extraButtons: [
        {
          type: 'danger',
          text: '删除',
          atClick(row) {
            this.$axios.delete('delete this row', {
              id: row.id
            }).then(() => {
              // 判断删除后是否返回正确的最后一页
              this.$refs.dataTable.correctPage()

              // 删除后刷新列表
              this.$refs.dataTable.getList()
            })
          }
        }
      ]
    }
  }
}
</script>
```

## 查询后刷新

### 场景
![](https://i.loli.net/2019/11/14/7qL8sAWzPchbKnJ.png)<br />![](https://i.loli.net/2019/11/14/f3o76bJCZKOk5Gr.png)


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
![](https://i.loli.net/2019/11/14/913MoeQ6cnIOlSk.png)

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

## 在 TypeScript 中指定组件的类型

```html
<script lang="ts">
// 需要引入这个
// import { ElDataTableType } from '@femessage/el-data-table'
export default {
  mounted() {
    (this.$refs.dataTable as ElDataTableType).getList()
  },
}
</script>
```
> 关于更多可用类型请参考：[el-data-table.d.ts](https://github.com/FEMessage/el-data-table/blob/dev/src/el-data-table.d.ts)
