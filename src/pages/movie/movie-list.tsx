import * as React from 'react'
import api from '../../api'

class MovieList extends React.Component {
  public componentDidMount() {
    console.log(api({ url: '/api/ccs', data: {} }))
  }

  public render() {
    return (
      <div className="App">
        <p>list list</p>
      </div>
    )
  }
}

export default MovieList
