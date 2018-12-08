import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element-ui'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
