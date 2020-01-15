import * as React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

interface PathParamsType {
  id?: string,
  novelName?: string
}

type PropsType = RouteComponentProps<PathParamsType> & {}

class TopBar extends React.Component<PropsType> {
  public onOpenChange = () => {
    const { pathname } = this.props.history.location
    if (pathname.startsWith('/novel-content') && pathname.indexOf('chapter') < 0) {
      const event = new Event('toggle-view')
      window.dispatchEvent(event)
    } else {
      this.props.history.push('/search-novel')
    }
  }

  public render() {
    const pathArr = this.props.location.pathname.split('/')

    return (
      <div className="top-bar">
        <NavBar
          mode="dark"
          leftContent={this.props.history.location.pathname === '/search-novel' ? [] : [
            <Icon key="0" type="left" onClick={this.onOpenChange} />
          ]}
          rightContent={[]}
        >
        { pathArr[1] ==='novel-content' ? pathArr[4] : ''}
        </NavBar>
      </div>
    )
  }
}

export default withRouter(TopBar)
