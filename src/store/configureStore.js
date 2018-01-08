import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import callAsyncMiddleware from './callAsyncMiddleware'
import { rootReducer } from '../reducer/index'
// import DevTools from '../dev/devTools'

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, callAsyncMiddleware),
    )
  )

  persistStore(store)

  return store
}

export default configureStore
