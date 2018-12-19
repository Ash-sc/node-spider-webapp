import * as React from 'react'
import { useState } from 'react'
import { Grid } from 'antd-mobile'
import { withRouter } from 'react-router-dom'


interface AppInfo {
  icon: string,
  text: string,
  path: string
}

const MovieList = (props: any) => {
  const [apps] = useState([
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
  ])

  function gotoApp(el: AppInfo) {
    props.history.push(el.path)
  }

  return (
    <div className="home-page-body">
      <div className="sub-title">Apps : </div>
      <Grid
        columnNum={3}
        data={apps}
        onClick={gotoApp}
      />
    </div>
  )
}

export default withRouter(MovieList)
