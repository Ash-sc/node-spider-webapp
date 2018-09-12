import * as React from 'react'

class Movie extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">parent</h1>
        </header>
        {this.props.children}
      </div>
    )
  }
}

export default Movie
