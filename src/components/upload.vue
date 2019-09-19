<template>
<!-- 上传 -->
  <div class="upload">
    <el-upload
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :data="form"
      :on-error="uploadError"
      class="avatar-uploader"
      action="http://up-z1.qiniup.com/"
    >
      <img v-if="image" :src="image" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"/>
    </el-upload>
  </div>
</template>
<script>
import { qiniuToken } from '@/api/upload'
export default {
  props: ['image', 'number'],
  data() {
    return {
      form: {
        token: ''
      },
      url: ''
    }
  },
  created() {
    qiniuToken().then(res => {
      this.form.token = res.data.token
      this.url = res.data.domain
    })
  },
  mounted(){
    document.querySelector('.avatar-uploader').click()
  },
  methods: {
    // 向父组件发送数据
    beforeAvatarUpload(file) {
      this.$emit('beforeAvatarUpload', file)
    },
    handleAvatarSuccess(res) {
      const qiniuUrl = `${this.url}/${res.key}`
      this.$emit('success', [qiniuUrl, this.number])
    },
    uploadError(err, file, fileList) {
      this.$message.error('图片上传失败')
    }
  }
}
</script>
<style scoped>
  /deep/ .avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /deep/ .avatar img{
    width: 70px;
    height: 70px;
  }
</style>

