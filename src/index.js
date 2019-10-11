// Import vue component
import component from './el-data-table.vue'

// `Vue.use` automatically prevents you from using the same plugin more than once,
// so calling it multiple times on the same plugin will install the plugin only once
component.install = Vue => {
  Vue.component(component.name, component)
}

// To auto-install when vue is found
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(component)
}

// To allow use as module (npm/webpack/etc.) export component
export default component

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
