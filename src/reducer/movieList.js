// Initial state
export const initialState = {
  status: 'ok',
  nowPlayingList: [],
  willPlayList: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_MOVIE_LIST_REQUEST':
      return { ...state, ...{ status: action.status } }
    case 'GET_MOVIE_LIST_SUCCESS':
      return { ...state, ...{ status: action.status, nowPlayingList: action.data } }
    case 'GET_MOVIE_LIST_FAILURE':
      return { ...state, ...{ status: action.status, nowPlayingList: [] } }
    default:
      return state
  }
}