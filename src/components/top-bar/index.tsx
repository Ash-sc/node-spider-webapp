import * as React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

interface PathParamsType {
  id?: string
}

type PropsType = RouteComponentProps<PathParamsType> & {}

class TopBar extends React.Component<PropsType> {
  public state = {}

  public menuJump(link: string) {
    this.props.history.push(link)
    this.setState({
      open: false
    })
  }

  public onOpenChange = () => {
    const { pathname } = this.props.history.location
    if (pathname.startsWith('/novel-content') && pathname.indexOf('chapter') < 0) {
      const event = new Event('toggle-view')
      window.dispatchEvent(event)
    }
    this.props.history.goBack()
  }

  public render() {
    return (
      <div className="top-bar">
        <NavBar
          mode="dark"
          leftContent={this.props.history.location.pathname === '/search-novel' ? [] : [
            <Icon key="0" type="left" onClick={this.onOpenChange} />
          ]}
          rightContent={[]}
        >
          Web App
        </NavBar>
      </div>
    )
  }
}

export default withRouter(TopBar)
