import * as React from 'react'
import { Grid } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

interface PathParamsType {
  type?: string
}

interface AppInfo {
  icon: string,
  text: string,
  path: string
}

type PropsType = RouteComponentProps<PathParamsType> & {}

class MovieList extends React.Component<PropsType, any> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      apps: [
        {
          icon:
            'http://web-site-files.ashshen.cc/spider-web-app/movie.svg',
          text: 'Movie',
          path: '/movie-list/inTheaters'
        },
        {
          icon:
            'http://web-site-files.ashshen.cc/spider-web-app/novel.svg',
          text: 'Novel',
          path: '/search-novel'
        }
      ]
    }
  }

  // public componentDidMount() {}

  public gotoApp = (el: AppInfo) => {
    this.props.history.push(el.path)
  }

  public render() {
    return (
      <div className="home-page-body">
        <div className="sub-title">Apps : </div>
        <Grid
          columnNum={3}
          data={this.state.apps}
          onClick={this.gotoApp}
        />
      </div>
    )
  }
}

export default withRouter(MovieList)
