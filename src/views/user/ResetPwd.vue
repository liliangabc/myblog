<template>
<div class="page-user-resetpwd">
<el-form label-width="70px" ref="form" hide-required-asterisk :model="formData" :rules="rules">
  <el-form-item label="邮箱" prop="email">
    <el-input type="email" required placeholder="请输入你注册的邮箱地址" v-model="formData.email"></el-input>
  </el-form-item>
  <el-form-item label="验证码" prop="captcha">
    <el-input placeholder="请输入收到的验证码" maxlength="4" v-model="formData.captcha"></el-input>
    <el-button class="btn-send-validcode" type="primary" @click="handleSendCaptcha">发送验证码</el-button>
  </el-form-item>
  <el-form-item label="新密码" prop="password">
    <el-input type="password" placeholder="请输入6-18位新密码" maxlength="18" v-model="formData.password"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="confirmPwd">
    <el-input type="password" placeholder="请输入确认密码" maxlength="18" v-model="formData.confirmPwd"></el-input>
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
    const validConfirmPwd = (rule, value, callback) => {
      value && value === this.formData.password ? callback() : callback(new Error())
    }
    return {
      loading: false,
      formData: {},
      rules: {
        email: [
          { required: true, message: '请输入正确的邮箱地址', type: 'email', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入6-18位密码', min: 6, max: 18, trigger: ['blur', 'change'] }
        ],
        confirmPwd: [
          { validator: validConfirmPwd, message: '确认密码不能为空，且必须和密码一致', trigger: ['blur', 'change'] }
        ],
        captcha: [
          { required: true, message: '请输入验证码' }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate().then(() => {
        this.loading = true
        this.$http.post('/user/reset_pwd', this.formData).then(data => {
          this.loading = false
          this.$message.success(data.info)
        }).catch(err => {
          this.loading = false
          this.$message.error(err.message)
        })
      })
    },
    handleSendCaptcha() {
      this.$http.post('/user/email_captcha', {
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