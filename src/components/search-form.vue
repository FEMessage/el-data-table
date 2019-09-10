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
      <slot
        v-for="slot in locatedSlotKeys"
        :name="slot"
        :slot="replaceToId(slot)"
      />
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
      <slot
        v-for="slot in locatedSlotKeys"
        :name="slot"
        :slot="replaceToId(slot)"
      />
      <slot />
    </el-form-renderer>
  </div>
</template>

<script>
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
    },
    locatedSlotKeys: {
      type: Array
    }
  },

  computed: {
    unCollapsibleContent() {
      return this.searchForm.filter(
        item => item.collapsible !== undefined || item.collapsible === false
      )
    },
    hasUnCollapsibleForm() {
      return this.canSearchCollapse && this.unCollapsibleContent.length > 0
    },
    currentForm() {
      return this.isSearchCollapse ? 'unCollapsibleForm' : 'normalForm'
    }
  },

  watch: {
    isSearchCollapse(collapse) {
      this.syncFormValue(
        this.currentForm,
        collapse ? 'normalForm' : 'unCollapsibleForm'
      )
    }
  },

  methods: {
    validate(fn) {
      return this.$refs[this.currentForm].validate(fn)
    },

    resetFields() {
      this.$refs.normalForm.resetFields()
      if (this.hasUnCollapsibleForm) {
        this.$refs.unCollapsibleForm.resetFields()
      }
    },

    updateForm(value) {
      this.$refs.normalForm.updateForm(value)
      if (this.hasUnCollapsibleForm) {
        this.$refs.unCollapsibleForm.updateForm(value)
      }
    },

    getFormValue() {
      if (this.hasUnCollapsibleForm) {
        this.$refs.normalForm.updateForm(
          this.$refs.unCollapsibleForm.getFormValue()
        )
      }

      return this.$refs.normalForm.getFormValue()
    },

    syncFormValue(target, source) {
      if (this.hasUnCollapsibleForm) {
        this.$refs[target].updateForm(this.$refs[source].getFormValue())
      }
    },

    setOptions(id, options) {
      this.$refs.normalForm.setOptions(id, options)
      if (this.hasUnCollapsibleForm) {
        this.$refs.unCollapsibleForm.setOptions(id, options)
      }
    },

    replaceToId(key) {
      return key.replace('search:', 'id:')
    }
  }
}
</script>
