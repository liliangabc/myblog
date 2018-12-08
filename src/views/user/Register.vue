<template>
<div class="page-user-register">
  <el-form label-width="70px" label-position="left" status-icon :model="formData" :rules="rules" ref="form">
    <el-form-item label="用户名" prop="userName">
      <el-input v-model.trim="formData.userName" placeholder="请输入你的昵称"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input type="email" v-model="formData.email" placeholder="请输入你的邮箱地址"></el-input>
    </el-form-item>
    <el-form-item label="密 码" prop="password">
      <el-input type="password" v-model.trim="formData.password" maxlength="18" placeholder="请输入6-18位密码" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPwd">
      <el-input type="password" v-model.trim="formData.confirmPwd" placeholder="请再次输入密码" autocomplete="off"></el-input>
    </el-form-item>
    <el-button class="btn-submit" type="success" :loading="loading" @click="handleSubmit">{{loading ? '请稍后...' : '注 册'}}</el-button>
  </el-form>
</div>
</template>
<script>
export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formData: {},
      loading: false,
      rules: {
        userName: [
          { required: true, message: '请输入你的昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, min: 6, max: 18, message: '请输入6-18位密码', trigger: 'blur' }
        ],
        confirmPwd: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.loading = true
        this.$http.post('/api/user/register', this.formData).then(({data}) => {
          this.$message.success(data.info)
          this.$router.replace({ name: 'login' })
        }).catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
      })
    }
  }
}
</script>