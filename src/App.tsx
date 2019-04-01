import * as React from 'react'
import Main from './pages/'
import HomePage from './pages/home-page'
import MovieList from './pages/movie/movie-list'
import MovieDetail from './pages/movie/movie-detail'
import SearchNovel from './pages/novel/search'
import NovelContent from './pages/novel/chapter-and-content'
import * as Sentry from '@sentry/browser'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

Sentry.init({
 dsn: "https://45a6f451b6ae4e649a6c0750a80696a8@sentry.io/1427911"
})
class App extends React.Component {

  public componentDidCatch(error: any, errorInfo: any) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    });
  }

  public render() {
    return (
      <Router>
        <Main>
          <Switch>
            <Route path="/movie-list/:type" component={MovieList} />
            <Route path="/movie-detail/:id" component={MovieDetail} />
            <Route path="/search-novel" component={SearchNovel} />
            <Route path="/novel-content/:link/:index" component={NovelContent} />
            <Route path="/" component={HomePage} />
            <Redirect to="/" />
          </Switch>
        </Main>
      </Router>
    )
  }
}

export default App
