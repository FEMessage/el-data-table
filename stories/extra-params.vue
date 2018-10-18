<template>
  <el-data-table
      :url="url"
      :columns="columns"
      :hasDelete="false"
      :form="form"
      :formAttrs="formAttrs"
      :extraParams="extraParams"
      @new="clearExtraParams"
      @edit="setExtraParams"
      >
        <div slot='form' prop="logo" class="el-form-item is-required">
          <div class="el-form-item__label" :style="{width: '80px'}">品牌logo</div>
          <el-upload
            class="avatar-uploader"
            action="https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/tree"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="extraParams.logoUrl" :src="extraParams.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-data-table>
</template>
<script>
import ElUpload from 'element-ui/lib/upload'
import ElDataTable from '../src/el-data-table.vue'
import config from './config'

const checkName = (rule, value, callback) => {
  if (!!value && value.length > 30) {
    callback('品牌名称长度不得大于30')
    return
  }
  if ((!!value && !value.trim()) || !value) {
    callback('请输入品牌名称')
    return
  }
  callback()
}

export default {
  components: {ElDataTable, ElUpload},
  data: function() {
    return {
      url: 'https://easy-mock.com/mock/5b586c9dfce1393a862d034d/example/img',
      columns: [
        {prop: 'code', label: '品牌编号'},
        {prop: 'name', label: '品牌名称'},
        {prop: 'alias', label: '品牌别名'},
        {
          prop: 'logoUrl',
          label: '品牌Logo',
          //          formatter: this.logoFormatter,
          width: '150px'
        },
        {
          prop: 'status',
          label: '状态',
          formatter: row => (row.status === 'normal' ? '启用' : '禁用')
        }
      ],
      extraParams: {logoUrl: ''},
      form: [
        {
          rules: [{required: true, trigger: 'blur', validator: checkName}],
          $el: {
            placeholder: '请输入品牌名称'
          },
          label: '品牌名称',
          $id: 'name',
          $type: 'input'
        },
        {
          rules: [
            {message: '请输入品牌别名', required: false, trigger: 'blur'}
          ],
          $el: {placeholder: '请输入品牌别名'},
          label: '品牌别名',
          $id: 'alias',
          $type: 'input'
        }
      ],
      formAttrs: config.formAttrs
    }
  },
  methods: {
    //logoFormatter(row) {
    //  return (
    //    <img
    //      src={row.logoUrl ? row.logoUrl : ''}
    //      style={{
    //        width: '100px',
    //            background: 'transparent',
    //            padding: '0'
    //      }}
    //    />
    //  )
    //},
    handleAvatarSuccess(res, file) {
      this.extraParams.logoUrl = URL.createObjectURL(file.raw)
    },
    clearExtraParams() {
      this.extraParams.logoUrl = ''
    },
    setExtraParams(row) {
      this.extraParams.logoUrl = row.logoUrl
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      return isJPG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
