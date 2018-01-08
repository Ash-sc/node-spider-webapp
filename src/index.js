import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './assets/style/index.scss'

import RootRoute from './routes/'
import configureStore from './store/configureStore'

require('es6-promise').polyfill()

const requireAll = r => r.keys().forEach(r)
requireAll(require.context('./assets/fonts/', true))
requireAll(require.context('./assets/images/', true))

const store = configureStore()


ReactDOM.render(
  <Provider store={store}>
    <RootRoute />
  </Provider>,
  document.getElementById('root')
)
