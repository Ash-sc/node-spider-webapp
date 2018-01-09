import Vue from 'vue'
import Vuex from 'vuex'
import doubanMovie from './doubanMovie'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const getters = {}

const actions = {}

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    doubanMovie
  },
  strict: debug
})
