import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AppList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { appList } = this.props.reducer
    return (
      <div className="App">
      {appList.map((item, index) =>
        <Link key={index} to={item.link}>{ item.name }</Link>
      )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.appList
  }
}

export default connect(mapStateToProps)(AppList)
