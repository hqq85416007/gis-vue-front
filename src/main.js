import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
// 组件全局注册
import '@/styles/common.css'
Vue.config.productionTip = false
import hasRole from './directive/permission'
Vue.use(hasRole)
import Element from 'element-ui'
Vue.use(Element)
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import codelist from '@/components/CodeList'
Vue.use(codelist)
import '@/styles/theme/dark/theme-dark.css';
import '@/styles/theme/dark/change.css'
//开发环境下使用mock.js
if (process.env.NODE_ENV == "development") {
  const { mockXHR } = require('../mock')
  mockXHR()
}
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
