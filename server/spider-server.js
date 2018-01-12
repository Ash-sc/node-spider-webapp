import Koa from 'koa'
import json from 'koa-json'
import logger from 'koa-logger'
import koaRouter from 'koa-router'
import koaBodyparser from 'koa-bodyparser'

import movieList from './routes/movieList'

const schedule = require('node-schedule')
const fs = require('fs')
const path = require('path')
const app = new Koa()
const router = koaRouter()

app.use(koaBodyparser())
app.use(json())
app.use(logger())

app.use(async function(ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

router.use('/movieList', movieList.routes())

app.use(router.routes())

// 定时任务（定时清除无用的电影宣传片资源）
const j = schedule.scheduleJob('59 23 * * * 7', function(){
  let files = []
  const moviePath = path.join(__dirname, './movieFiles')

  if(fs.existsSync(moviePath)) {
    files = fs.readdirSync(moviePath)
    files.forEach(file => {
      fs.unlinkSync(moviePath + "/" + file)
    })
  }
})


app.listen(10211)