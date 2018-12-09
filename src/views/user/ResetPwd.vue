<template>
<div class="page-user-resetpwd">
<el-form label-width="70px">
  <el-form-item label="邮箱">
    <el-input type="email" required placeholder="请输入你注册的邮箱地址" v-model="formData.email"></el-input>
  </el-form-item>
  <el-form-item label="验证码">
    <el-input placeholder="请输入收到的验证码" maxlength="5" v-model="formData.captcha"></el-input>
    <el-button class="btn-send-validcode" type="primary" @click="handleSendCaptcha">发送验证码</el-button>
  </el-form-item>
  <el-form-item label="新密码">
    <el-input type="password" placeholder="请输入6-16位新密码" v-model="formData.password"></el-input>
  </el-form-item>
  <el-form-item label="确认密码">
    <el-input type="password" placeholder="请输入确认密码" v-model="formData.confirmPwd"></el-input>
  </el-form-item>
  <el-button class="btn-submit" type="warning" :loading="loading" @click="handleSubmit">{{loading ? '请稍后...' : '重置密码'}}</el-button>
  <div class="back-to-login">
    <router-link to="login"><i class="el-icon-back"></i> 返回登录注册</router-link>
  </div>
</el-form>
</div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      formData: {}
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true
      this.$http.post('/user/reset_pwd', this.formData).then(({data}) => {
        this.loading = false
        this.$message.success(data.info)
      }).catch(err => {
        this.loading = false
        this.$message.error(err.message)
      })
    },
    handleSendCaptcha() {
      this.$http.post('/email_captcha', {
        email: this.formData.email
      }).then(({data}) => {
        this.$message.success(data.info)
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>
<style lang="less">

</style>