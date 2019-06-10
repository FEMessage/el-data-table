import Vue from 'vue'
import Axios from 'axios'
import ElementUI from 'element-ui'
import FormRenderer from '@femessage/el-form-renderer'
import {mount} from '@vue/test-utils'
import ElDataTable from '../src/el-data-table.vue'

Vue.prototype.$axios = Axios
Vue.use(ElementUI)
Vue.component('ElFormRenderer', FormRenderer)

describe('href remain still after several resetSearch()', () => {
  const options = {
    propsData: {
      url: 'https://api.github.com/search/users',
      searchForm: [
        {
          $type: 'input',
          $id: 'q',
          label: 'github用户名'
        }
      ],
      // REVIEW: el-pagination组件在mount时报错
      hasPagination: false
    },
    sync: false
  }
  test('when routeMode === history', async () => {
    const wrapper = mount(
      ElDataTable,
      Object.assign({}, options, {
        routerMode: 'history'
      })
    )
    await new Promise(r => setTimeout(r, 1000))
    const initHref = location.href
    // console.log(initHref)
    wrapper.vm.$refs.searchForm.updateForm({
      q: '123'
    })
    await wrapper.vm.search()
    wrapper.vm.resetSearch()
    expect(location.href).toBe(initHref)
    wrapper.vm.resetSearch()
    expect(location.href).toBe(initHref)
  })
  test('when routeMode === hash', async () => {
    const wrapper = mount(ElDataTable, options)
    await new Promise(r => setTimeout(r, 1000))
    location.href += '#/'
    const initHref = location.href
    // console.log(initHref)
    wrapper.vm.$refs.searchForm.updateForm({
      q: '123'
    })
    await wrapper.vm.search()
    wrapper.vm.resetSearch()
    expect(location.href).toBe(initHref)
    wrapper.vm.resetSearch()
    expect(location.href).toBe(initHref)
  })
})
