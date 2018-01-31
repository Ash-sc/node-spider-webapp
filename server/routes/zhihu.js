import koaRouter from 'koa-router'
import cheerio from 'cheerio'
import superagent from 'superagent'

const router = koaRouter()

router.get('/getStories', async function (ctx) {

  const result = await new Promise((resolve, reject) => {
    superagent
      .get('https://www.zhihu.com/')
      .end((err, res) => {
        if (err) {
          reject(err)
        }
        const $ = cheerio.load(res.text)
        console.log(res.text)
      })
  })

  ctx.body = {
    result: 0
  }

})

export default router
