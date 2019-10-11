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