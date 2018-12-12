<template>
<div class="page-user-login">
  <el-form label-width="70px" ref="form" hide-required-asterisk :model="formData" :rules="rules">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model.trim="formData.email" placeholder="请输入你的邮箱地址"></el-input>
    </el-form-item>
    <el-form-item label="密 码" prop="password">
      <el-input type="password" v-model.trim="formData.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input v-model="formData.captcha" maxlength="4" placeholder="请输入验证码"></el-input>
      <img class="pic-captcha" title="点击刷新" ref="captcha" @click="handleGetCapcha">
    </el-form-item>
    <div class="forget-pwd">
      <router-link to="resetpwd">忘记密码?</router-link>
    </div>
    <el-button class="btn-submit" type="primary" :loading="loading" @click="handleSubmit">{{loading ? '请稍后...' : '登 录'}}</el-button>
  </el-form>
</div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      formData: { email: 'll917274996@live.com', password: 'aaaaaa' },
      rules: {
        email: [
          { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入你的密码', trigger: ['blur', 'change'] }
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
        this.$http.post('user/login', this.formData).then(data => {
          this.loading = false
          if (data.code === 401) {
            this.handleGetCapcha()
            this.$confirm(data.info, '提示', {
              confirmButtonText: '我要激活',
              cancelButtonText: '取消',
              type: 'warning',
              closeOnClickModal: false
            }).then(this.sendActivateMail)
          } else {
            this.$message.success(data.info)
          }
        }).catch(err => {
          this.loading = false
          this.handleGetCapcha()
          this.$message.error(err.message)
        })
      })
    },
    handleGetCapcha() {
      this.$refs.captcha.src = `/api/captcha?t=${Date.now()}`
    },
    sendActivateMail() {
      let loading = this.$loading({
        lock: true,
        text: '邮件发送中...',
        spinner: 'el-icon-loading'
      })
      this.$http.post('user/send_activate_mail', { email: this.formData.email }).then(data => {
        loading.close()
        this.$alert(data.info, '提示')
      }).catch(err => {
        loading.close()
        this.$message.error(err.message)
      })
    }
  },
  mounted() {
    this.handleGetCapcha()
  }
}
</script>