import koaRouter from 'koa-router'
import cheerio from 'cheerio'
import superagent from 'superagent'

const Entities = require('html-entities').XmlEntities
const router = koaRouter()
const entities = new Entities()

router.get('/list', async function (ctx) {

  const { type } = ctx.query

  const result = await new Promise((resolve, reject) => {
    const targetUrl = type === 'nowPlayingList'
      ? 'https://movie.douban.com/cinema/nowplaying/hangzhou/'
      : 'https://movie.douban.com/cinema/later/hangzhou/'

    superagent
      .get(targetUrl)
      .end((err, res) => {
        if (err) {
          reject(err)
        }
        const $ = cheerio.load(res.text)
        const movies = []

        if (type === 'nowPlayingList') {
          $('#nowplaying .lists .list-item ul').each((idx, element) => {
            movies.push({
              link: $(element).find('.poster a').attr('href'),
              image: $(element).find('.poster a img').attr('src'),
              name: $(element).find('.stitle a').attr('title'),
              score: $(element).find('.srating .subject-rate').html()
            })
          })
        } else {
          $('#showing-soon .mod').each((idx, element) => {
            movies.push({
              link: $(element).find('.thumb').attr('href'),
              image: $(element).find('img').attr('src'),
              name: entities.decode($(element).find('.intro h3 a').html()),
              preview: $(element).find('.intro .trailer_icon').attr('href')
            })
          })
        }
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
