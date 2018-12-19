import * as React from 'react'
import TopBar from '../components/top-bar'

const Main = (props: any) => {
  return (
    <div className="main">
      <TopBar />
      <div className="content-body">
        {props.children}
      </div>
    </div>
  )
}

export default Main
