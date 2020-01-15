const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const koaRouter = require('koa-router')
const koaBodyparser = require('koa-bodyparser')

const novel = require('./routes/novel')


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

router.use('/novel', novel.routes())

app.use(router.routes())

app.listen(9982)
