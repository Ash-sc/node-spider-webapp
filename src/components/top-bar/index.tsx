import * as React from 'react'
import { Drawer, List, NavBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

interface InfoType {
  name: string,
  link: string
}

const TopBar = (props: any) => {
  const [open, setOpen] = (React as any).useState(false)
  const [appList] = (React as any).useState([
    { name: 'Movie View', link: '/movie-list/inTheaters' },
    { name: 'Online Reader', link: '/search-novel' }
  ])
  function menuJump(link: string) {
    props.history.push(link)
    setOpen(false)
  }

  function onOpenChange() {
    setOpen(!open)
  }

  return (
    <div className="top-bar">
      <NavBar
        mode="dark"
        leftContent={[
          <Icon key="0" type="ellipsis" onClick={onOpenChange} />
        ]}
        rightContent={[<Icon key="0" type="search" />]}
      >
        Web App
      </NavBar>
      <Drawer
        className="app-menu"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        sidebar={appList.map((info: InfoType, i: number) => (
          <List.Item key={i} onClick={() => menuJump(info.link)}>
            {info.name}
          </List.Item>
        ))}
        open={open}
        onOpenChange={onOpenChange}
      >
        Hide Menu
      </Drawer>
    </div>
  )
}

export default withRouter(TopBar)
