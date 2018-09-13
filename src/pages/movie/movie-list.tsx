import * as React from 'react'
import MovieApi from '../../api/movie'

class MovieList extends React.Component {
  public componentDidMount() {
    MovieApi.movieList('nowPlayingList')
    .then(res => {
      console.log(res, 22)
    })
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
