const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const koaRouter = require('koa-router')
const koaBodyparser = require('koa-bodyparser')

const movie = require('./routes/movie')
const novel = require('./routes/novel')

const clearMovieCache = require('./scheduleTask/clearMovieCache')

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

router.use('/movie', movie.routes())
router.use('/novel', novel.routes())

app.use(router.routes())

clearMovieCache()


app.listen(9982)
