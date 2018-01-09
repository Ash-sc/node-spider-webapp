import Vue from 'vue'
import VueRouter from 'vue-router'
import routerList from './routerList'

Vue.use(VueRouter)

const router = new VueRouter({
  suppressTransitionError: __PROD__, // 生产环境下不抛出异常
  routes: routerList
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.auth) { // 判断是否有路由权限, 防止用户直接输入没有权限的页面url
//     const authInfo = JSON.parse(localStorage.authInfo || '{}')
//     if (!authInfo[to.meta.auth]) {
//       console.log('没有该路由的权限')
//       router.replace(from.path)
//     }
//     next()
//   } else {
//     next()
//   }
// })

export default router
