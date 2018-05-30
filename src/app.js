/* 启动文件 */
import 'es6-shim'
import Vue from 'vue/dist/vue.js'
import router from '@/routes/'
import App from '@/components/App'
import store from './store'
import AssistiveBall from 'vue-simple-assistive-ball'

import Loading from '@/components/loading/index.js'

Vue.use(Loading)
Vue.use(AssistiveBall)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});

if (__DEV__) {
  console.info('[当前环境] 开发环境')
  Vue.config.devtools = true
}

if (__PROD__) {
  console.info('[当前环境] 生产环境')
  Vue.config.devtools = false
}

import '@/assets/less/style.less'
