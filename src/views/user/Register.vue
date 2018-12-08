<template>
<div class="page-user-register">
  <el-form label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model.trim="formData.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model.trim="formData.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input type="password" v-model.trim="confirmPwd"></el-input>
    </el-form-item>
    <el-form-item label="验证码">
      
    </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      confirmPwd: ''
    }
  }
}
</script>
<style lang="less">

</style>