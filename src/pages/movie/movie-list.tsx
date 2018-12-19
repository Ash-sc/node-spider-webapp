import * as React from 'react'
import { useState, useEffect } from 'react'
import MovieApi from '../../api/movie'
import { List, ActivityIndicator, TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

const Item = List.Item
const Brief = Item.Brief

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

const MovieList = function render(props: any) {

  const [type, setType] = useState('inTheaters')
  const [inTheatersList, setInTheatersList] = useState([] as MovieInfo[])
  const [comingSoonList, setComingSoonList] = useState([] as MovieInfo[])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const movieType = props.match.params.type || type
    getMovieList(movieType)
  })

  // 电影列表
  function getMovieList(movieType: string) {
    if ([movieType + 'List'].length) {
      setType(movieType)
      return false
    }
    setLoading(true)
    return MovieApi.movieList(movieType || 'inTheaters').then(res => {
      setLoading(false)
      setType(movieType)
      type === 'inTheaters' ? setInTheatersList(res as MovieInfo[]) : setComingSoonList(res as MovieInfo[])
    }, () => {
      setLoading(false)
    })
  }

  // 电影详情
  function movieDetail(link: string) {
    const id = link.split('/').slice(-2)[0]
    props.history.push('/movie-detail/' + id)
  }

  // 切换类型
  function changeMovieType(movieType: string) {
    if (movieType !== type) {
      getMovieList(movieType)
      props.history.replace('/movie-list/' + movieType)
    }
  }
  return (
    <div className="movie-body">
      {(type === 'inTheaters' ? inTheatersList : comingSoonList).length ? (
        <List
          className={
            'movie-section'
          }
        >
          {(type === 'inTheaters' ? inTheatersList : comingSoonList).map((movie) => (
            <Item
              arrow="horizontal"
              key={movie.link}
              thumb={movie.image}
              onClick={() => movieDetail(movie.link)}
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
      ) : loading ? (
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
          onPress={() => changeMovieType('inTheaters')}
          selected={type === 'inTheaters'}
        />
        <TabBar.Item
          title="Coming Soon"
          key="Coming Soon"
          onPress={() => changeMovieType('comingSoon')}
          selected={type === 'comingSoon'}
        />
      </TabBar>
      {loading && (
        <ActivityIndicator
          text="Loading..."
          className="full-screen-loading"
        />
      )}
    </div>
  )
}

export default withRouter(MovieList)
