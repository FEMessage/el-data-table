import {shallowMount} from '@vue/test-utils'
import ElDataTable from '../src'

// 注册loading指令
import Vue from 'vue'
import {Loading} from 'element-ui'

Vue.use(Loading.directive)

describe('ElDataTable', () => {
  it('mounted 发送请求, 返回数据非空', async done => {
  const wrapper = shallowMount(ElDataTable, {
    propsData: {
      url: 'http://levy.ren:3000/mock/11/levy/api/v1/generatorUsers',
      columns: [
        {prop: 'id', label: '主键'},
        {prop: 'username', label: '用户名'},
        {prop: 'fullname', label: '全名'},
        {prop: 'email', label: 'email'},
        {prop: 'department.id', label: 'department.id'},
        {prop: 'department.name', label: 'department.name'}
      ]
    }
  })

  setTimeout(() => {
  wrapper.vm.$nextTick(() => {
    expect(wrapper.vm.data.length > 0).toBe(true)
  done()
})
}, 3000)
})
})
