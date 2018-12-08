import Vue from 'vue'
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element-ui'
import './assets/main.less'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
