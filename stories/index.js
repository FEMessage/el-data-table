import {storiesOf} from '@storybook/vue'
import 'element-ui/lib/theme-chalk/index.css'
import Basic from './basic.vue'
import Search from './search.vue'
import Tree from './tree.vue'
import CustomButtons from './custom-buttons.vue'
import ExtraParams from './extra-params.vue'
import CustomId from './custom-id.vue'

storiesOf('ElDataTable', module)
  .add('基本CRUD', basic)
  .add('slot=search查询', search)
  .add('树形结构', tree)
  .add('自定义按钮', customButtons)
  .add('自定义主键', customId)
  .add('slot=form及额外的post/put参数', extraParams)

function basic() {
  return {
    components: {Basic},
    template: `<basic/>`
  }
}
function tree() {
  return {
    components: {Tree},
    template: `<tree/>`
  }
}
function search() {
  return {
    components: {Search},
    template: `<search></search>`
  }
}
function customButtons() {
  return {
    components: {CustomButtons},
    template: `<custom-buttons/>`
  }
}
function extraParams() {
  return {
    components: {ExtraParams},
    template: `<extra-params/>`
  }
}
function customId() {
  return {
    components: {CustomId},
    template: `<custom-id/>`
  }
}
