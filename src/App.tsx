import * as React from 'react'
import Main from './pages/'
import Movie from './pages/movie/index'
import MovieList from './pages/movie/movie-list'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Main>
          <Switch>
            <Route path="/" component={Movie} exact={true} />
            <Route path="/movie-list" component={MovieList} exact={true} />
            <Route path="/movie-detail" component={MovieList} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

export default App
