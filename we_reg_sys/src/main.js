// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import Blob from './excel/Blob.js'
// import Export2Excel from './excel/Export2Excel.js'

Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(Vuex)
const state = {
  userInfo: null,
  houseInfo: null
}
const store = new Vuex.Store({
  state,
  mutations: {
    updateInfo (state, info) {
      state.userInfo = info.userInfo
      state.houseInfo = info.houseInfo
      console.log(info.houseInfo)
      console.log('update info')
    }
  }
})
Vue.config.productionTip = false
Vue.prototype.$axios = axios

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('token')
    const tokenExp = localStorage.getItem('token_exp')
    const nowTime = new Date().getTime()
    console.log(nowTime - tokenExp)
    if (token && nowTime - tokenExp <= 1000 * 60 * 60) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
// axios 请求拦截器处理请求数据
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers.common['Authorization'] = 'Bearer ' + token
  return config
})

axios.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(err)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
