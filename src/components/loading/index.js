import Loading from './loading.vue'
const VueComponent = {
  install: Vue => {
    Vue.component('spider-loading', Loading)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueComponent)
}
export default VueComponent

export { Loading }
