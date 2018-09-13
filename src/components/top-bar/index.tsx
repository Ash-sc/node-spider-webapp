import * as React from 'react'
import { Drawer, List, NavBar, Icon } from 'antd-mobile'

class TopBar extends React.Component {
  public state = {
    open: false,
    appList: [
      { name: 'Movie View', link: '/movie-list' },
      { name: 'Online Reader', link: '/online-reader' },
    ]
  }

  public onOpenChange = () => {
    this.setState({
      open: !this.state.open
    })
  }

  public menuJump(link: string) {
    console.log(link)
    this.setState({
      open: false
    })
  }

  public render() {
    return (
      <div className="top-bar">
        <NavBar
          mode="dark"
          leftContent={[
            <Icon key="0" type="ellipsis" onClick={this.onOpenChange} />
          ]}
          rightContent={[
            <Icon key="0" type="search" />
          ]}
        >
        Web App
        </NavBar>
        <Drawer
          className="app-menu"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          sidebar={this.state.appList.map(
            (info, i) => (
              <List.Item key={i} onClick={() => this.menuJump(info.link)}>{info.name}</List.Item>
            )
          )}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >Hide Menu</Drawer>
      </div>
    )
  }
}

export default TopBar
