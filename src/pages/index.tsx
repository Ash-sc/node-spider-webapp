import * as React from 'react'
import TopBar from '../components/top-bar'
import Footer from '../components/footer'

interface MainProps {
  name?: string
}

class Main extends React.Component<MainProps> {

  public render() {
    return (
      <div className="main">
        <TopBar />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Main
