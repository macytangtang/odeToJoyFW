import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import api from '@/api'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 全局注入api入口
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
