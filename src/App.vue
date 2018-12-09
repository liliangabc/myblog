<template>
<div id="app">
  <com-header></com-header>
  <router-view/>
</div>
</template>
<script>
import ComHeader from '@/components/Header'
export default {
  components: { ComHeader }
}
</script>

<style lang="less">
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  padding-top: 60px;
  background-color: #f7f7f7;
}
</style>