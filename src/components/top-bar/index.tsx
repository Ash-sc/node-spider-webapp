import * as React from 'react'
import Button from 'antd/lib/button'

class TopBar extends React.Component {
  public render() {
    return (
      <div className="top-bar">
        <p>top bar</p>
        <Button type="primary">Primary</Button>
      </div>
    )
  }
}

export default TopBar
