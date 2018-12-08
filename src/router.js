import Vue from 'vue'
import Router from 'vue-router'

const _require = name => require(`./views/${name}.vue`).default

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: _require('Home')
    },
    { path: '/entry', component: _require('user/Index'),
      children: [
        { path: '', redirect: 'login' },
        { path: 'login', name: 'login', component: _require('user/Login') },
        { path: 'register', name: 'register', component: _require('user/Register') },
        { path: 'resetpwd', name: 'resetpwd', component: _require('user/ResetPwd') }
      ]
    }
  ]
})
