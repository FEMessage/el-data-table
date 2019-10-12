## Extra feature

### searchForm

除了原有的 el-form-renderer 的表单项配置, 每个表单项还可以添加如下配置, 以达到表单项变更时, 立即获取新的表格数据.

```diff
const content = [
  {
    id: 'name',
    type: 'input',
    label: 'name',
+   searchImmedialtely: true
  }
]
```

当开启 `canSearchCollapse` 折叠表单的时候, 可以设置特定表单项不可折叠(无论折叠与否, 始终显示).

```diff
const content = [
  {
    id: 'name',
    type: 'input',
    label: 'name',
+   collapsible: false
  }
]
```
