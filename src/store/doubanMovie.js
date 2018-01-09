import axios from '@/services/axios'
// initial state
const state = {
  nowPlayingList: []
}

// getters
const getters = {
}


// actions
const actions = {
  getMovieList({ commit, state }, query = {}) {
    return axios({
      url: '/movieList/list',
      body: query
    })
  }
}

// mutations
const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
