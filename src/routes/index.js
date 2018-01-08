import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

const App = require('../components/App').default

const AppList = require('../components/AppList/').default

export default class RootRoute extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/app-list" component={AppList} exact />
            <Redirect path="/" to={{ pathname: '/app-list' }} />
          </Switch>
        </App>
      </Router>
    )
  }
}
