import axios from '@/services/axios'
// initial state
const state = {
  nowPlayingList: [],
  willPlayList: [],
  movieDetail: {}
}

// getters
const getters = {
  nowPlayingList: state => state.nowPlayingList,
  willPlayList: state => state.willPlayList,
  movieDetail: state => state.movieDetail
}


// actions
const actions = {
  GET_MOVIE_LIST({ commit, state }, query = {}) {
    return axios({
      url: '/movieList/list',
      body: query
    }).then(data => {
      return commit('GET_MOVIE_LIST_SUCCESS', { data, type: query.type })
    }, err => {
      return commit('GET_MOVIE_LIST_FAILURE', { err, type: query.type })
    })
  },

  GET_MOVIE_DETAIL({ commit, state }, id) {
    state.movieDetail = {}
    return axios({
      url: '/movieList/detail',
      body: { id }
    }).then(data => {
      return commit('GET_MOVIE_DETAIL_SUCCESS', { data })
    }, err => {
      return commit('GET_MOVIE_DETAIL_FAILURE', { err })
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
  },

  GET_MOVIE_DETAIL_SUCCESS(state, { data }) {
    state.movieDetail = data
  },
  GET_MOVIE_DETAIL_FAILURE(state, { err }) {
    state.movieDetail = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
