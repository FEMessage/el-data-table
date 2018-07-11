<template>
  <el-data-table
      :url="url"
      :columns="columns"
      :form="form"
      :formAttrs="formAttrs"
      :dataPath="dataPath"
      @new="clearExtraParams"
      @edit="setExtraParams"
      >
        <div slot='form' prop="logo" class="el-form-item is-required">
          <div class="el-form-item__label" :style="{width:labelWidth}">品牌logo</div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
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
import ElDataTable from '../el-data-table.vue'

export default {
  components: {ElDataTable},
  props: ['form', 'formAttrs'],
  data: function() {
    return {
      url: '/api/v1/users',
      dataPath: 'data',
      imageUrl: '',
      extraParams: {logoUrl: ''},
      columns: [
        {prop: 'id', label: '主键'},
        {prop: 'name', label: '用户名'},
        {prop: 'sex', label: '性别'},
        {prop: 'address', label: '地址'},
        {prop: 'birthday', label: '生日'},
        {prop: 'email', label: '邮箱'}
      ]
    }
  },
  computed: {
    labelWidth: function() {
      return this.formAttrs && this.formAttrs.labelWidth
        ? this.formAttrs.labelWidth
        : '80px'
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.info()
      console.info(file)
      this.extraParams = {
        logoUrl: URL.createObjectURL(file.raw)
      }
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    clearExtraParams() {
      this.extraParams = {}
    },
    setExtraParams(row) {
      console.info(row)
      console.info(row.logoUrl)
      this.extraParams = {
        logoUrl: row.logoUrl
      }
      console.info(this.extraParams.logoUrl)
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
