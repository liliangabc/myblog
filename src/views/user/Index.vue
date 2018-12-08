<template>
<div class="page-user-entry">
  <div class="entry-wrapper">
    <div class="tabs">
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
  
}
</script>
<style lang="less">
.page-user-entry {
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  .entry-wrapper {
    width: 100%;
    max-width: 400px;
    padding: 24px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
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