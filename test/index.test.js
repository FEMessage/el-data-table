import {shallowMount} from '@vue/test-utils'
import Component from '../src'

describe('Component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(Component)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
