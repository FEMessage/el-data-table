<template>
  <el-button v-bind="$attrs"
             v-on="$listeners"
             :loading="loading"
             @click="handleClick">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'ElLoadingButton',
  props: {
    /**
     * 点击按钮绑定的函数
     */
    click: {
      type: Function
    },
    /**
     * click函数的参数
     */
    params: {},
    /**
     * 点击事件的回调函数
     */
    callback: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    // 监控按钮的Promise进程
    handleClick() {
      if (!this.click) return

      this.loading = true
      Promise.resolve(this.click(this.params))
        .then(flag => {
          if (flag === false) return
          // 调用父组件中的数据刷新方法
          this.callback()
        })
        .catch(e => {})
        .finally(e => {
          this.loading = false
        })
    }
  }
}
</script>
