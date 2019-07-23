<template>
  <component
    :is="isText ? 'text-button' : 'el-button'"
    v-bind="$attrs"
    v-on="listeners"
    :loading="loading"
    :type="type"
  >
    <slot></slot>
  </component>
</template>

<script>
import TextButton from './text-button.vue'

export default {
  components: {TextButton},
  props: {
    /**
     * 是否是文字按钮。
     */
    isText: {
      type: Boolean,
      default: false
    },
    /**
     * 如果没有这个props，则通过attrs传`type`时，会导致el-button的`native-type`也被改变
     */
    type: String,
    /**
     * 点击按钮绑定的函数
     */
    click: {
      type: Function
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        // click handler 会被组件覆盖
        click: () => {
          if (!this.click) return
          this.loading = true
          // 监控按钮的Promise进程
          Promise.resolve(this.click())
            .then(flag => flag !== false && this.$emit('click'))
            .finally(() => (this.loading = false))
        }
      }
    }
  }
}
</script>
