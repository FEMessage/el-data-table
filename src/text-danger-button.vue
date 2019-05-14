<template>
  <div class="el-alert--error container">
    <el-button v-bind="$attrs" v-on="$listeners" type="text" class="button">
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'TextDangerButton'
}
</script>

<style lang="stylus" scoped>
.container
  display inline-block
  background-color initial
  .el-button + &
    margin-left 10px

.button
  color inherit
</style>
