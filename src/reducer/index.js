import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import appListReducer from './appList'
import movieListReducer from './movieList'

export const rootReducer = combineReducers({
  routing: routerReducer,
  appList: appListReducer,
  movieList: movieListReducer
})
