<template>
  <div>
    <!-- 搜索字段 -->
    <!-- @submit.native.prevent -->
    <!-- 阻止表单提交的默认行为 -->
    <!-- https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2 -->
    <el-form-renderer
      v-show="!isSearchCollapse"
      ref="normalForm"
      inline
      :content="searchForm"
      @submit.native.prevent
    >
      <slot />
    </el-form-renderer>

    <el-form-renderer
      v-if="hasUnCollapsibleForm"
      v-show="isSearchCollapse"
      ref="unCollapsibleForm"
      inline
      :content="unCollapsibleContent"
      @submit.native.prevent
    >
      <slot />
    </el-form-renderer>
  </div>
</template>

<script>
let formValue = {}
let unwatchNormalForm
let unwatchUnCollapsibleForm

export default {
  name: 'SearchForm',

  props: {
    searchForm: {
      type: Array
    },
    canSearchCollapse: {
      type: Boolean
    },
    isSearchCollapse: {
      type: Boolean
    }
  },

  computed: {
    unCollapsibleContent() {
      return this.searchForm.filter(item => item.collapsible !== undefined || item.collapsible === false)
    },
    hasUnCollapsibleForm() {
      return (
        this.canSearchCollapse && this.unCollapsibleContent.length > 0
      )
    },
    currentForm() {
      return this.isSearchCollapse ? 'unCollapsibleForm' : 'normalForm'
    }
  },

  watch: {
    isSearchCollapse(collapse) {
      this.updateForm(formValue)
    }
  },

  mounted() {
    formValue = Object.assign(
      {},
      this.$refs.normalForm.getFormValue()
    )
    unwatchNormalForm = this.$refs.normalForm.$watch('value', val => {
      formValue = Object.assign(formValue, val)
    })
    if (this.hasUnCollapsibleForm) {
      unwatchUnCollapsibleForm = this.$refs.unCollapsibleForm.$watch(
        'value',
        val => {
          formValue = Object.assign(formValue, val)
        }
      )
    }
  },

  beforeDestroy() {
    unwatchNormalForm()
    if (this.hasUnCollapsibleForm) {
      unwatchUnCollapsibleForm()
    }
  },

  methods: {
    validate(fn) {
      return this.$refs[this.currentForm].validate(fn)
    },

    resetFields() {
      formValue = {}
      this.$refs.normalForm.resetFields()
      if (this.hasUnCollapsibleForm) {
        this.$refs.unCollapsibleForm.resetFields()
      }
    },

    updateForm(value) {
      formValue = Object.assign(formValue, value)
      this.$refs.normalForm.updateForm(formValue)
      if (this.hasUnCollapsibleForm) {
        this.$refs.unCollapsibleForm.updateForm(formValue)
      }
    },

    getFormValue() {
      return formValue
    },

    setOptions(id, options) {
      this.$refs.normalForm.setOptions(id, options)
      if (this.hasUnCollapsibleForm) {
        this.$refs.unCollapsibleForm.setOptions(id, options)
      }
    }
  }
}
</script>
