import * as React from 'react'
import MovieApi from '../../api/movie'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { List, ActivityIndicator } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

interface PathParamsType {
  id: string
}

interface MovieDetail {
  id: string,
  imageLink: string,
  moment: any[],
  movieType: string,
  name: string,
  releaseDate: string,
  runTime: string,
  score: string,
  synopsis: string,
  videoLink: string
}

type PropsType = RouteComponentProps<PathParamsType> & {}

class MovieDetail extends React.Component<PropsType, any> {

  constructor(props: PropsType) {
    super(props)
    this.state = {
      movieDetail: {},
      loading: false
    }
  }

  public componentDidMount() {
    const { id } = this.props.match.params
    this.setState({ loading: true })
    MovieApi.movieDetail(id).then(data => {
      this.setState({
        movieDetail: data,
        loading: false
      })
    }, () => {
      this.setState({ loading: false })
    })
  }

  public viewVideo (link: string) {
    console.log(link, 1)
  }

  public render() {
    const { movieDetail, loading } = this.state

    return (
      <div className="movie-detail">
        <List className="movie-section">
            <Item
                thumb={ movieDetail.imageLink || 'http://web-site-files.ashshen.cc/blank.png' }
                className="movie-item"
                multipleLine
              >
                <span className="am-list-title">{ movieDetail.name }</span>
                <Brief>类型：{ movieDetail.movieType }</Brief>
                <Brief>时长：{ movieDetail.runTime || '-' }分钟</Brief>
                <Brief>上映时间：{ movieDetail.releaseDate }</Brief>
                <Brief>评分：{ movieDetail.score }</Brief>
                <Brief><span onClick={() => this.viewVideo(movieDetail.videoLink)}>宣传片：点我！！！</span></Brief>
              </Item>
          </List>
          {loading && (
          <ActivityIndicator
            text="Loading..."
            className="full-screen-loading"
          />
        )}
      </div>
    )
  }
}

export default withRouter(MovieDetail)
