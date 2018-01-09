import axios from '@/services/axios'
// initial state
const state = {
  nowPlayingList: []
}

// getters
const getters = {
  nowPlayingList: state => state.nowPlayingList
}


// actions
const actions = {
  GET_MOVIE_LIST({ commit, state }, query = {}) {
    return axios({
      url: '/movieList/list',
      body: query
    }).then(data => {
      console.log(1)
      return commit('GET_MOVIE_LIST_SUCCESS', { data, type: query.type })
    }, err => {
      return commit('GET_MOVIE_LIST_FAILURE', { err, type: query.type })
    })
  }
}

// mutations
const mutations = {
  GET_MOVIE_LIST_SUCCESS(state, { data, type }) {
    state[type] = data
  },
  GET_MOVIE_LIST_FAILURE(state, { err, type }) {
    state[type] = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
