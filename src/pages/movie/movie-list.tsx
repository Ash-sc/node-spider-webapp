import * as React from 'react'
import MovieApi from '../../api/movie'
import { List, ActivityIndicator, TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

const Item = List.Item
const Brief = Item.Brief

interface PathParamsType {
  type?: string
}

interface MovieInfo {
  name: string,
  link: string,
  image: string,
  score: string,
  preview: string,
  director: string,
  actors: string,
  date: string,
  area: string,
  popular: string
}

type PropsType = RouteComponentProps<PathParamsType> & {}

class MovieList extends React.Component<PropsType, any> {

  constructor(props: PropsType) {
    super(props)
    this.state = {
      type: 'inTheaters',
      inTheatersList: [],
      comingSoonList: [],
      loading: false
    }
  }

  public componentDidMount() {
    const type = this.props.match.params.type || this.state.type
    this.getMovieList(type)
  }

  public getMovieList = (type: string) => {
    if (this.state[type + 'List'].length) {
      this.setState({ type })
      return false
    }
    this.setState({ loading: true })
    return MovieApi.movieList(type || 'inTheaters').then(res => {
      this.setState({
        type,
        [type + 'List']: res,
        loading: false
      })
    }, () => {
      this.setState({ Loading: false })
    })
  }

  public movieDetail = (link: string) => {
    console.log(link, 331)
  }

  public changeMovieType = (type: string) => {
    if (type !== this.state.type) {
      this.getMovieList(type)
      this.props.history.replace('/movie-list/' + type)
    }
  }

  public render() {
    const { type } = this.state
    return (
      <div className="movie-body">
        {this.state[type + 'List'].length ? (
          <List
            className={
              'movie-section' +
              (this.state.currentView === 'content' ? ' hide' : '')
            }
          >
            {this.state[type + 'List'].map((movie: MovieInfo) => (
              <Item
                arrow="horizontal"
                key={movie.link}
                thumb={movie.image}
                onClick={() => this.movieDetail(movie.link)}
                className="movie-item"
                multipleLine
              >
                <span className="am-list-title">{movie.name}</span>
                {type === 'inTheaters' && <Brief>豆瓣评分：{movie.score || '-'}</Brief>}
                {type === 'inTheaters' && <Brief>导演：{movie.director}</Brief>}
                {type === 'inTheaters' && <Brief>主演：{movie.actors}</Brief>}
                {type === 'comingSoon' && <Brief>上映日期：{movie.date}</Brief>}
                {type === 'comingSoon' && <Brief>地区：{movie.area}</Brief>}
                {type === 'comingSoon' && <Brief>热度：{movie.popular}</Brief>}
              </Item>
            ))}
          </List>
        ) : this.state.loading ? (
          ''
        ) : (
          <span className="no-result-text">NO RESULTS FOUND!</span>
        )}
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          className="movie-type-select"
        >
          <TabBar.Item
            title="In Theaters"
            key="In Theaters"
            onPress={() => this.changeMovieType('inTheaters')}
            selected={this.state.type === 'inTheaters'}
          />
          <TabBar.Item
            title="Coming Soon"
            key="Coming Soon"
            onPress={() => this.changeMovieType('comingSoon')}
            selected={this.state.type === 'comingSoon'}
          />
        </TabBar>
        {this.state.loading && (
          <ActivityIndicator
            text="Loading..."
            className="full-screen-loading"
          />
        )}
      </div>
    )
  }
}

export default withRouter(MovieList)
