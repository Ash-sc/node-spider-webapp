import * as React from 'react'
import { useState, useEffect } from 'react'
import MovieApi from '../../api/movie'
import { withRouter } from 'react-router-dom'
import { List, ActivityIndicator } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

// interface MovieDetailType {
//   id: string,
//   imageLink: string,
//   moment: any[],
//   movieType: string,
//   name: string,
//   releaseDate: string,
//   runTime: string,
//   score: string,
//   synopsis: string,
//   videoLink: string
// }

const MovieDetail = (props: any) => {
  const [movieDetail] = useState({
    id: '',
    imageLink: '',
    moment: [],
    movieType: '',
    name: '',
    releaseDate: '',
    runTime: '',
    score: '',
    synopsis: '',
    videoLink: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { id } = props.match.params
    setLoading(true)
    MovieApi.movieDetail(id).then(() => {
      // setMovieDetail(data)
      setLoading(false)
    }, () => {
      setLoading(false)
    })
  })

  function viewVideo(link: string) {
    console.log(link, 1)
  }

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
              <Brief><span onClick={() => viewVideo(movieDetail.videoLink)}>宣传片：点我！！！</span></Brief>
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

export default withRouter(MovieDetail)
