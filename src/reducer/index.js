import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import appListReducer from './appList'

export const rootReducer = combineReducers({
  routing: routerReducer,
  appList: appListReducer
})
