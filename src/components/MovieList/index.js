import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import PropTypes from 'prop-types'

class MovieList extends Component {

  static get contextTypes() {
    return {
      router: PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.actions.getMovieList()
    // this.context.router.history.push('')
  }

  render() {
    const { nowPlayingList } = this.props.reducer
    console.log(this.props.reducer, 33)
    return (
      <div className="App">
        <ul className="movie-list">
          {nowPlayingList.map((item, index) =>
            <li key={index}>
              {item.name}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.movieList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList)
