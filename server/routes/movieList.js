import koaRouter from 'koa-router'
import cheerio from 'cheerio'
import superagent from 'superagent'

const router = koaRouter()

router.get('/list', async function (ctx) {

  const result = await new Promise((resolve, reject) => {
    superagent
      .get('https://movie.douban.com/cinema/nowplaying/hangzhou/')
      .end((err, res) => {
        if (err) {
          reject(err)
        }
        const $ = cheerio.load(res.text)
        const movies = []
        $('#nowplaying .lists .list-item ul').each((idx, element) => {
          movies.push({
            link: $(element).find('.poster a').attr('href'),
            image: $(element).find('.poster a img').attr('src'),
            name: $(element).find('.stitle a').attr('title'),
            score: $(element).find('.srating .subject-rate').html()
          })
        })
        resolve(movies)
      })
  })
  ctx.body = {
    result: typeof result === 'object' ? 0 : 1,
    data: typeof result === 'object' ? result : [],
    errorInfo: typeof result === 'object' ? '' : result
  }
})

export default router
