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

const getMovieVideo = link => {
  return new Promise((resolve, reject) => {
    superagent
      .get(link)
      .end((err, res) => {
        if (err) {
          reject('')
        }

        const $ = cheerio.load(res.text)

        resolve($('video source')[0].attribs.src)
      })
  })
}

const getMoment = id => {
    return new Promise((resolve, reject) => {
      superagent
        .get(`https://movie.douban.com/subject/${id}/comments?sort=new_score&status=P`)
        .end((err, res) => {
          if (err) {
            reject([])
          }

          const $ = cheerio.load(res.text)

          const result = []

          $('#comments .comment-item').each((idx, element) => {
            result.push({
              user: entities.decode($(element).find('.comment .comment-info a').html()),
              content: entities.decode($(element).find('.comment p').html())
            })
          })

          resolve(result)
        })
    })
}

router.get('/detail', async function (ctx) {
  const { id } = ctx.query

  const result = await new Promise((resolve, reject) => {
    superagent
      .get('https://movie.douban.com/subject/' + id)
      .end(async function(err, res) {
        if (err) {
          reject(err)
        }
        const $ = cheerio.load(res.text)

        const name = $('#content > h1 span')[0].children[0].data
        const movieType = Object.values($('#info  span[property="v:genre"]')).reduce((sum, value) => {
          if (typeof value.children === 'object') {
            return sum + '/' + value.children[0].data
          }
          return sum
        }, '')
        const runTime = $('#info span[property="v:runtime"]').attr('content')
        const releaseDate = Object.values($('#info span[property="v:initialReleaseDate"]')).reduce((sum, value) => {
          if (typeof value.children === 'object') {
            return sum + '/' + value.children[0].data
          }
          return sum
        }, '')
        const score = $('#interest_sectl .rating_num')[0].children[0].data
        const synopsis = $('#link-report span[property="v:summary"]')[0].children[0].data.replace(/\s/g, '')

        const videoLink =  await getMovieVideo($('.related-pic-video')[0].attribs.href)

        const videoType = videoLink ? videoLink.split('.').pop() : ''

        const moment = await getMoment(id)

        resolve({
          name,
          movieType,
          runTime,
          releaseDate,
          score,
          synopsis,
          videoLink,
          videoType,
          moment
        })
      })
  })

  ctx.body = {
    result: typeof result === 'object' ? 0 : 1,
    data: typeof result === 'object' ? result : [],
    errorInfo: typeof result === 'object' ? '' : result
  }
})

export default router
