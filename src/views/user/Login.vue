<template>
<div class="page-user-login">
  <el-form label-width="70px" label-position="left" status-icon :model="formData" :rules="rules" ref="form">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model.trim="formData.email" placeholder="请输入你的邮箱地址"></el-input>
    </el-form-item>
    <el-form-item label="密 码" prop="password">
      <el-input type="password" v-model.trim="formData.password" placeholder="请输入你的密码"></el-input>
    </el-form-item>
    <el-button class="btn-submit" type="primary" :loading="loading" @click="handleSubmit">{{loading ? '请稍后...' : '登 录'}}</el-button>
  </el-form>
</div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      formData: { email: 'll917274996@live.co' },
      rules: {
        email: [
          { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入你的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.loading = true
        this.$http.post('/api/user/login', this.formData).then(({data}) => {
          this.loading = false
          this.$message.success(data.info)
        }).catch(err => {
          this.loading = false
          this.$message.error(err.response.data)
        })
      })
    }
  }
}
</script>
<style lang="less">

</style>