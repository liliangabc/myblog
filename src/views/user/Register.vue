<template>
<div class="page-user-register">
  <el-form label-width="70px" ref="form" hide-required-asterisk :model="formData" :rules="rules">
    <el-form-item label="用户名" prop="userName">
      <el-input v-model.trim="formData.userName" maxlength="15" placeholder="请输入你的昵称"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input type="email" v-model.trim="formData.email" placeholder="请输入你的邮箱地址"></el-input>
    </el-form-item>
    <el-form-item label="密 码" prop="password">
      <el-input type="password" v-model="formData.password" maxlength="18" placeholder="请输入6-18位密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPwd">
      <el-input type="password" v-model="formData.confirmPwd" maxlength="18" placeholder="请再次输入密码"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input v-model="formData.captcha" maxlength="4" placeholder="请输入验证码"></el-input>
      <img class="pic-captcha" title="点击刷新" ref="captcha" @click="handleGetCapcha">
    </el-form-item>
    <el-button class="btn-submit" type="success" :loading="loading" @click="handleSubmit">{{loading ? '请稍后...' : '注 册'}}</el-button>
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
      formData: {},
      loading: false,
      rules: {
        userName: [
          { required: true, message: '请输入2-15位用户名', min: 2, max: 15, trigger: ['blur', 'change'] }
        ],
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
        this.$http.post('user/register', this.formData).then(data => {
          this.$alert(data.info, '提示', {
            callback: () => {
              this.$router.replace({ name: 'login' })
            }
          })
        }).catch(err => {
          this.formData.captcha = ''
          this.handleGetCapcha()
          this.$message.error(err.message)
          this.loading = false
        })
      })
    },
    handleGetCapcha() {
      this.$refs.captcha.src = `/api/captcha?t=${Date.now()}`
    }
  },
  mounted() {
    this.handleGetCapcha()
  }
}
</script>