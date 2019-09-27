# 正确地为组件贡献

## 关于按钮大小

我们使用 `prop.buttonSize` 统一控制按钮大小.

因此, 在开发或贡献的时候有需要添加新的按钮的情况, 需要使用 `buttonSize` 来控制, 使得风格统一.

例如这样写:

```html
<el-button :size="buttonSize">新增的按钮</el-button>
```