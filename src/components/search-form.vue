<template>
  <!-- @submit.native.prevent -->
  <!-- 阻止表单提交的默认行为 -->
  <!-- https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2 -->
  <!--搜索字段-->
  <el-form-renderer
    inline
    :content="content"
    ref="form"
    @submit.native.prevent
  >
    <!--@slot 额外的搜索内容, 当content不满足需求时可以使用-->
    <slot />
    <el-form-item>
      <!-- https://github.com/ElemeFE/element/pull/5920 -->
      <el-button native-type="submit" type="primary" @click="search" size="small">查询</el-button>
      <el-button @click="reset" size="small">重置</el-button>
    </el-form-item>
  </el-form-renderer>
</template>
<script>
export default {
  props: {
    /**
     * 查询字段渲染, 配置参考el-form-renderer
     * @link https://femessage.github.io/el-form-renderer/
     */
    content: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    search() {
      this.$refs.form.validate().then(valid => valid && this.$emit('search'))
    },
    reset() {
      // reset后, form里的值会变成 undefined, 在下一次查询会赋值给query
      this.$refs.form.resetFields()
      this.$emit('reset')
    },
    /**
     * 批量更新表单数据
     * @public
     * @param {object} value - 要更新的表单数据
     */
    updateForm() {
      return this.$refs.form.updateForm(...arguments)
    },
    /**
     * 对外提供获取表单数据的函数
     * @public
     */
    getFormValue() {
      return this.$refs.form.getFormValue()
    }
  }
}
</script>
