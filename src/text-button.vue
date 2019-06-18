<template>
  <el-button
    :type="$attrs.type || 'primary'"
    v-bind="$attrs"
    v-on="$listeners"
    plain
    :style="style"
  >
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  data() {
    return {
      style: {
        border: 'none',
        background: 'inherit',
        padding: '9px 0'
      }
    }
  },
  mounted() {
    // 将初始color写到style里，覆盖element的hover效果
    this.style = Object.assign({}, this.style, {
      color: getComputedStyle(this.$el).color
    })
  }
}
</script>
