<template>
  <el-dialog :title="title" :visible.sync="visible">
    <!--https://github.com/FEMessage/el-form-renderer-->
    <el-form-renderer :content="form" ref="form" v-bind="formAttrs" :disabled="isView">
      <!--@slot 额外的弹窗表单内容, 当form不满足需求时可以使用，参考：https://femessage.github.io/el-form-renderer/#/Demo?id=slot -->
      <slot/>
    </el-form-renderer>

    <div slot="footer" v-show="!isView">
      <el-button @click="visible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="confirm" :loading="confirmLoading" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {DialogMode} from '../utils/const'

export default {
  inheritAttrs: false,
  props: {
    /**
     * 新增弹窗的标题
     */
    newTitle: {
      type: String,
      default: '新增'
    },
    /**
     * 修改弹窗的标题
     */
    editTitle: {
      type: String,
      default: '修改'
    },
    /**
     * 查看弹窗的标题
     */
    viewTitle: {
      type: String,
      default: '查看'
    },
    /**
     * 弹窗表单, 用于新增与修改, 详情配置参考el-form-renderer
     * @link https://femessage.github.io/el-form-renderer/
     */
    form: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 弹窗表单属性设置, 详情配置参考element-ui官网
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/form#form-attributes
     */
    formAttrs: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      mode: DialogMode.New,
      visible: false,
      confirmLoading: false
    }
  },
  computed: {
    title() {
      switch (this.mode) {
        case DialogMode.Edit:
          return this.editTitle
        case DialogMode.View:
          return this.viewTitle
        default:
          return this.newTitle
      }
    },
    isView() {
      return this.mode === DialogMode.View
    }
  },
  watch: {
    // el-dialog有内部设置visible的逻辑，这里只能监听visible变量来重设表单
    visible(val) {
      if (!val) this.$refs.form.resetFields()
    }
  },
  methods: {
    confirm() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.confirmLoading = true
        const isNew = this.mode === DialogMode.New
        const formValue = this.$refs.form.getFormValue()
        const done = (close = true) => {
          this.confirmLoading = false
          this.visible = !close
        }
        this.$emit('confirm', isNew, formValue, done)
      })
    },
    /**
     * 显示dialog
     * @public
     */
    show(mode, formData) {
      this.mode = mode
      this.visible = true
      if (formData) {
        this.$nextTick(() => {
          this.$refs.form.updateForm(formData)
        })
      }
    }
  }
}
</script>

<style>
</style>
