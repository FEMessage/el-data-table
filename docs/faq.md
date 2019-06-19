## searchForm的注意事项
填写选项后，点击搜索，然后刷新页面。第一个选择框出现错误。所以$options的value都应该是string类型

```vue
<template>
  <el-data-table v-bind="$data" />
</template>
<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img?a=11',
      columns: [
        {prop: 'code', label: '品牌编号'},
        {prop: 'name', label: '品牌名称'},
        {prop: 'alias', label: '品牌别名'},
      ],
      searchForm: [
        {
          $el: {placeholder: '请选择'},
          label: '状态',
          $id: 'status',
          $type: 'select',
          $options: [
            {
              value: 1,
              label: '待处理'
            },
          ]
        },
        {
          $el: {placeholder: '请选择'},
          label: '状态',
          $id: 'status',
          $type: 'select',
          $options: [
            {
              value: '1',
              label: '待处理'
            },
          ]
        },
      ],
      hasNew: false,
      hasOperation: false,
      hasPagination: false
    }
  }
}
</script>
```

## 主动刷新el-data-table
通过getList方法主动刷新el-data-table。

```vue
<template>
<div>
  <el-data-table v-bind="$data" ref="dataTable" />
  <el-button @click="getList">调用el-table的toggleAllSelection方法</el-button>
</div>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img?a=1',
      columns: [
        {type: 'selection'},
        {prop: 'code', label: '品牌编号'},
        {prop: 'name', label: '品牌名称'},
        {prop: 'alias', label: '品牌别名'},
        {
          prop: 'status',
          label: '状态',
          formatter: row => (row.status === 'normal' ? '启用' : '禁用')
        }
      ],
      hasOperation: false,
      hasNew: false,
      hasDelete: false
    }
  },
  methods: {
    getList() {
      this.$refs.dataTable.getList()
    }
  },
}
</script>
```

## 弹窗关闭时清空选中状态
el-dialog中的slot不会每次都重新生成。如果你想在dialog关闭时清除多选状态，你需要监听dialog的close事件手动处理。

```vue
<template>
  <div>
    <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>

    <el-dialog :visible.sync="dialogTableVisible" @close="onCloseDialog">
      <el-data-table v-bind="$data" ref="dataTable" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img?a=12',
      columns: [
        {type: 'selection'},
        {prop: 'code', label: '品牌编号'},
        {prop: 'name', label: '品牌名称'},
        {prop: 'alias', label: '品牌别名'},
        {
          prop: 'status',
          label: '状态',
          formatter: row => (row.status === 'normal' ? '启用' : '禁用')
        }
      ],
    }
  },
  methods: {
    onCloseDialog() {
      this.$refs.dataTable.$refs.table.clearSelection()
    }
  }
}
</script>
```

## 获取组件内el-table实例
获取el-table实例后即可监听其组件事件和调用组件方法。

```vue
<template>
<div>
  <el-data-table v-bind="$data" ref="dataTable" />
  <el-button @click="toggleAllSelection">调用el-table的toggleAllSelection方法</el-button>
</div>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img?a=1',
      columns: [
        {type: 'selection'},
        {prop: 'code', label: '品牌编号'},
        {prop: 'name', label: '品牌名称'},
        {prop: 'alias', label: '品牌别名'},
        {
          prop: 'status',
          label: '状态',
          formatter: row => (row.status === 'normal' ? '启用' : '禁用')
        }
      ],
      hasOperation: false,
      hasNew: false,
      hasDelete: false
    }
  },
  methods: {
    toggleAllSelection() {
      this.$refs.dataTable.$refs.table.toggleAllSelection()
    }
  },
  mounted() {
    this.$refs.dataTable.$refs.table.$on('selection-change', console.log)
  }
}
</script>
```
