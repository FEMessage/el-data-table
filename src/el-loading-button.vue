<template>
  <el-button v-bind="$attrs"
             v-on="$listeners"
             :loading="selfLoading || loading"
             :type="type"
             @click="handleClick">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'ElLoadingButton',
  props: {
    /**
     * 按钮的loading状态
     * default: false
     */
    loading: {
      type: Boolean
    },
    /**
     * 点击按钮触发的事件
     * 为什么要用这个传这个事件--如果在组件内部调用this.$emit('click')获取不到回调值（即监控不了promise的进度）
     */
    click: {
      type: Function
    },
    /**
     * 点击事件的回调函数
     */
    callback: {
      type: Function,
      default: () => {}
    },
    /**
     * 点击事件传入的参数
     */
    params: {},
    /**
     * 按钮Type,跟el-button的type一致 详见：http://element-cn.eleme.io/#/zh-CN/component/button
     * 如果不声明props type，在form里会默认加入type=submit覆盖传入的type
     */
    type: {
      type: String
    }
  },
  data() {
    return {
      selfLoading: false
    }
  },
  methods: {
    // 监控按钮的Promise进程
    handleClick() {
      if (!this.click) return

      this.selfLoading = true
      Promise.resolve(this.click(this.params))
        .then(flag => {
          if (flag === false) return
          // 调用父组件中的数据刷新方法
          this.callback()
        })
        .catch(e => {})
        .finally(e => {
          this.selfLoading = false
        })
    }
  }
}
</script>
