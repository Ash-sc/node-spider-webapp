import * as React from 'react'
import Movie from './pages/movie/index'
import { BrowserRouter as Router, Route } from "react-router-dom"

class App extends React.Component {
  public render() {
    return (
      <Router>
      <Route path="/" component={Movie} />
      </Router>
    )
  }
}

export default App
