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
        padding: '9px 0',
        color: '',
        pointerEvents: ''
      }
    }
  },
  watch: {
    '$attrs.disabled': 'fixHoverColor'
  },
  mounted() {
    this.style.color = getComputedStyle(this.$el).color
  },
  methods: {
    // 将 color 写到 style 里是为了覆盖 hover 效果
    async fixHoverColor() {
      this.style.color = ''
      this.style.pointerEvents = 'none'
      await new Promise(r => setTimeout(r, 300))
      this.style.color = getComputedStyle(this.$el).color
      this.style.pointerEvents = ''
    }
  }
}
</script>
