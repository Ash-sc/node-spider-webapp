import koaRouter from 'koa-router'
import https from 'https'

const router = koaRouter()

router.get('/list', async function (ctx) {

  ctx.body = {
    result: 0,
    data: [1, 2, 3, 4]
  }
})

export default router
