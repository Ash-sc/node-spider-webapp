import XHR from '../../service/xhr'

export function getMovieList() {
  return {
    types: [
      'GET_MOVIE_LIST_REQUEST',
      'GET_MOVIE_LIST_SUCCESS',
      'GET_MOVIE_LIST_FAILURE',
    ],
    callAPI: () => XHR({
      url: '/movieList/list'
    }),
    payload: {},
  };
}
