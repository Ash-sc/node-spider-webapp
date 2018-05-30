const koaRouter = require('koa-router')
const cheerio = require('cheerio')
const superagent = require('superagent')
const request = require('request')

const Entities = require('html-entities').XmlEntities
const entities = new Entities()

const fs = require('fs')
const path = require('path')

const router = koaRouter()

router.get('/list', async function (ctx) {

  const { type } = ctx.query

  const result = await new Promise((resolve, reject) => {
    const targetUrl = type === 'nowPlayingList'
      ? 'https://movie.douban.com/cinema/nowplaying/hangzhou/'
      : 'https://movie.douban.com/cinema/later/hangzhou/'

    superagent
      .get(targetUrl)
      .end((err, res) => {
        if (err || !res) {
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

const getMovieVideo = (link, id) => {

  return new Promise((resolve, reject) => {
    superagent
      .get(link)
      .end((err, res) => {
        if (err || !res) {
          reject('')
        }

        const $ = cheerio.load(res.text)
        const filePath = path.join(__dirname, '../cache/movieFiles/')
        const videoLink = $('video source')[0].attribs.src

        resolve(videoLink)

        // 缓存宣传片到本地
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
        }
        if (!fs.existsSync(filePath + id + '.mp4')) {
          request(videoLink).pipe(fs.createWriteStream(path.join(__dirname, '../cache/movieFiles/' + id + '.mp4')))
        }
      })
  })
}

const getMoment = id => {

    return new Promise((resolve, reject) => {
      superagent
        .get(`https://movie.douban.com/subject/${id}/comments?sort=new_score&status=P`)
        .end((err, res) => {
          if (err || !res) {
            reject([])
          }

          const $ = cheerio.load(res.text)
          const result = []

          $('#comments .comment-item').each((idx, element) => {
            result.push({
              user: entities.decode($(element).find('.comment .comment-info a').html()),
              content: entities.decode($(element).find('.comment p').html()).replace(/<a(\S|\s)+\/a>/g, '')
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
        if (err || !res) {
          reject(err)
        }

        const $ = cheerio.load(res.text)

        const name = $('#content > h1 span')[0].children[0].data
        const movieType = Object.values($('#info  span[property="v:genre"]')).reduce((sum, value) => {
          if (typeof value.children === 'object') {
            return sum + '/' + value.children[0].data
          }
          return sum
        }, '').substr(1)
        const runTime = $('#info span[property="v:runtime"]').attr('content')
        const releaseDate = Object.values($('#info span[property="v:initialReleaseDate"]')).reduce((sum, value) => {
          if (typeof value.children === 'object') {
            return sum + '/' + value.children[0].data
          }
          return sum
        }, '').substr(1)
        const score = $('#interest_sectl .rating_num')[0].children.length && $('#interest_sectl .rating_num')[0].children[0].data
        const synopsis = $('#link-report span[property="v:summary"]')[0].children[0].data.replace(/\s/g, '')
        const imageLink = $('#mainpic .nbgnbg img')[0].attribs.src
        const videoLink =  await getMovieVideo($('.related-pic-video')[0].attribs.href, id)
        const moment = await getMoment(id)

        resolve({
          id,
          name,
          movieType,
          runTime,
          releaseDate,
          score,
          synopsis,
          imageLink,
          videoLink,
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

router.get('/get-movie-stream.mp4', ctx => {

  const { id } = ctx.query
  const filePath = path.join(__dirname, '../cache/movieFiles/' + id + '.mp4')
  const stat = fs.statSync(filePath)
  const fileSize = stat.size
  const { range } = ctx.request.header

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    let end = parts[1] ? parseInt(parts[1], 10) : start + 999999

    end = end > fileSize - 1 ? fileSize - 1 : end

    const chunkSize = (end - start) + 1
    const file = fs.createReadStream(filePath, { start, end })
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4'
    }

    ctx.set(head)
    ctx.response.status = 206
    ctx.body = file

  } else {
    ctx.response.status = 200
    ctx.set({
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
    })
    ctx.body = fs.createReadStream(filePath)
  }
})

module.exports = router
