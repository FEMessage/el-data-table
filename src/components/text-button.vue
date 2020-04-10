<template>
  <el-button
    :type="$attrs.type || 'primary'"
    v-bind="$attrs"
    plain
    :style="style"
    v-on="$listeners"
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
  watch: {
    '$attrs.disabled': 'fixHoverColor'
  },
  mounted() {
    this.fixHoverColor()
  },
  methods: {
    // 将 color 写到 style 里是为了覆盖 hover 效果
    async fixHoverColor() {
      const {style} = this
      delete style.color
      this.style = {...style}
      await new Promise(r => setTimeout(r, 300))
      this.style = {
        ...style,
        color: getComputedStyle(this.$el).color
      }
    }
  }
}
</script>
