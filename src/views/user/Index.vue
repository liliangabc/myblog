<template>
<div class="page-user-entry">
  <div class="entry-wrapper">
    <h3 class="title" v-if="isResetPage">用邮箱重置你的密码</h3>
    <div class="tabs" v-else>
      <router-link to="login">登录</router-link>
      <b class="dot"></b>
      <router-link to="register">注册</router-link>
    </div>
    <router-view></router-view>
  </div>
</div>
</template>
<script>
export default {
  computed: {
    isResetPage() {
      return this.$route.name === 'resetpwd'
    }
  }
}
</script>
<style lang="less">
.page-user-entry {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  .entry-wrapper {
    width: 100%;
    max-width: 400px;
    padding: 24px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    .title {
      text-align: center;
      margin-bottom: 24px;
      color: #303133;
      font-size: 20px;
    }
    .tabs {
      text-align: center;
      margin-bottom: 24px;
      color: #606266;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        font-size: 18px;
        &.router-link-active, &:hover {
          color: #409EFF;
        }
      }
      .dot {
        width: 4px;
        height: 4px;
        background-color: #606266;
        border-radius: 50%;
        margin: 0 12px;
      }
    }
    .forget-pwd {
      text-align: right;
      margin: -20px 0 20px;
      a:hover {
        color: #303133;
      }
    }
    .back-to-login {
      margin-top: 32px;
      a:hover {
        color: #303133;
      }
    }
    .btn-send-validcode, .pic-validcode {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
    }
    .pic-validcode {
      width: 100px;
      background-color: #dcdfe6;
      overflow: hidden;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .el-form-item__label {
    white-space: nowrap;
  }
  .btn-submit {
    width: 100px;
    margin: auto;
    display: block;
  }
}
</style>