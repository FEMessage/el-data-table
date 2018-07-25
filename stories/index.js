import {storiesOf} from '@storybook/vue'
import 'element-ui/lib/theme-chalk/index.css'
import Basic from './basic.vue'
import SearchDataTable from './search-data-table.vue'
import TreeDataTable from './tree-data-table.vue'
import CustomFormDataTable from './custom-form-data-table.vue'
import CustomButtonDataTable from './custom-button-data-table.vue'

storiesOf('ElDataTable', module)
  .add('基本CRUD', basic)
  .add('查询表格', searchTable)
  .add('树形表格', treeTable)
  .add('自定义表单', customFormTable)
  .add('自定义操作按钮', customButtonTable)

function basic() {
  return {
    components: {Basic},
    template: `<basic/>`
  }
}
function treeTable() {
  return {
    components: {TreeDataTable},
    template: `<tree-data-table/>`
  }
}
function searchTable() {
  return {
    components: {SearchDataTable},
    template: `<search-data-table></search-data-table>`
  }
}
function customFormTable() {
  return {
    components: {CustomFormDataTable},
    template: `<custom-form-data-table/>`
  }
}
function customButtonTable() {
  return {
    components: {CustomButtonDataTable},
    template: `<custom-button-data-table/>`
  }
}
