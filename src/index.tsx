import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './assets/less/index.less'
import 'antd-mobile/dist/antd-mobile.less'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
