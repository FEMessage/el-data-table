<template>
  <div>
    <!-- 搜索字段 -->
    <!-- @submit.native.prevent -->
    <!-- 阻止表单提交的默认行为 -->
    <!-- https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2 -->
    <el-form-renderer
      v-show="!isSearchCollapse"
      ref="mainForm"
      inline
      :content="$table.searchForm"
      @submit.native.prevent
    >
      <slot />
    </el-form-renderer>

    <el-form-renderer
      v-if="canSearchCollapse"
      v-show="isSearchCollapse"
      ref="alwaysDisplayForm"
      inline
      :content="alwaysDisplayContent"
      @submit.native.prevent
    >
      <slot />
    </el-form-renderer>
  </div>
</template>

<script>
let formValue = {}
let unwatchMainForm
let unwatchAlwaysDisplayForm

export default {
  name: 'SearchForm',

  inject: ['$table'],

  computed: {
    alwaysDisplayContent() {
      return this.$table.searchForm.filter(item => item.alwaysDisplay)
    },
    canSearchCollapse() {
      return (
        this.$table.canSearchCollapse && this.alwaysDisplayContent.length > 0
      )
    },
    isSearchCollapse() {
      return this.$table.isSearchCollapse
    },
    currentForm() {
      return this.isSearchCollapse ? 'alwaysDisplayForm' : 'mainForm'
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
      this.$refs.mainForm.getFormValue()
    )
    unwatchMainForm = this.$refs.mainForm.$watch('value', val => {
      formValue = Object.assign(formValue, val)
    })
    if (this.canSearchCollapse) {
      unwatchAlwaysDisplayForm = this.$refs.alwaysDisplayForm.$watch(
        'value',
        val => {
          formValue = Object.assign(formValue, val)
        }
      )
    }
  },

  beforeDestroy() {
    unwatchMainForm()
    if (this.canSearchCollapse) {
      unwatchAlwaysDisplayForm()
    }
  },

  methods: {
    validate(fn) {
      return this.$refs[this.currentForm].validate(fn)
    },

    resetFields() {
      formValue = {}
      this.$refs.mainForm.resetFields()
      if (this.canSearchCollapse) {
        this.$refs.alwaysDisplayForm.resetFields()
      }
    },

    updateForm(value) {
      formValue = Object.assign(formValue, value)
      this.$refs.mainForm.updateForm(formValue)
      if (this.canSearchCollapse) {
        this.$refs.alwaysDisplayForm.updateForm(formValue)
      }
    },

    getFormValue() {
      return formValue
    },

    setOptions(id, options) {
      this.$refs.mainForm.setOptions(id, options)
      this.$refs.alwaysDisplayForm.setOptions(id, options)
    }
  }
}
</script>
