import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'

class AppList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logo: 'http://web-site-files.ashshen.cc/images/chuyin.jpg'
    }
  }

  componentDidMount() {
    this.props.actions.getAppList()
  }

  render() {
    console.log(this.props, 222)
    return (
      <div className="App">
        <header className="App-header">
          <img src={this.state.logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.appList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppList)
