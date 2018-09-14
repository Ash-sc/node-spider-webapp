import * as React from 'react'
import Main from './pages/'
import MovieList from './pages/movie/movie-list'
import MovieDetail from './pages/movie/movie-detail'
import SearchNovel from './pages/novel/search'
import NovelContent from './pages/novel/chapter-and-content'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Main>
          <Switch>
            <Route path="/movie-list" component={MovieList} exact={true} />
            <Route path="/movie-detail" component={MovieDetail} />
            <Route path="/search-novel" component={SearchNovel} />
            <Route path="/novel-content/:link" component={NovelContent} />
            <Redirect to="/movie-list" />
          </Switch>
        </Main>
      </Router>
    )
  }
}

export default App
