const koaRouter = require('koa-router')
const cheerio = require('cheerio')
const request = require('superagent')
const urlencode = require('urlencode')
const charset = require('superagent-charset')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
charset(request)

const router = koaRouter()

// 获取小说内容并打包成txt文件
const getContent = (index, charterList, articleUrl, articleName) => {
  console.info(`get charter ${charterList[index].title} content ...`)
  request.get(articleUrl + charterList[index].href)
    .charset('gbk')
    .end((error, resp) => {
      if (error) {
        console.error(`get charter ${charterList[index].title} error : `, error)
      } else {
        console.info(`get charter ${charterList[index].title} success !`)
        const $ = cheerio.load(resp.text)
        const content = charterList[index].title + '\n' + unescape($($('#BookText')[0]).html()
            .replace(/&#x/g, '%u')
            .replace(/;/g, '')
            .replace(/%uA0/g, ' ')
            .replace(/&apos/g, '')
            .replace(/<br>/g, '\n'))
          .replace(/%[0-9a-zA-Z]+/g, ''); // 内容处理
        fs.appendFile(`${__dirname}/${articleName}.txt`, content, () => {
          console.info(`write charter ${charterList[index].title} success !`)
          if (index < charterList.length - 1) {
            getContent(index + 1, charterList, articleUrl, articleName)
          }
        })
      }
    })
}

router.post('/search', async ctx => {

  const {
    searchKey
  } = ctx.request.body

  const result1 = new Promise((resolve) => {
    request.get(`http://www.xxsa.net/modules/article/search.php?ie=gbk&searchkey=${urlencode(searchKey, 'gbk')}`)
    .charset('gbk')
    .end((error, resp) => {
      if (error) {
        console.error('search error : ', error)
        return resolve([])
      } else {
        const $ = cheerio.load(resp.text)
        const item = []
        const resultList = $('.main .grid tr');
        $('.main .grid tr').each((idx, element) => {
          if (idx === 0) return
          const $element = $(element)
          const novelInfo = $element.find('td')
          item.push({
            classify: '',
            articleName: $(novelInfo[0]).find('a').text(),
            articleLink: $(novelInfo[0]).find('a').attr('href'),
            latestCharterName: $(novelInfo[1]).find('a').text(),
            latestCharterLink: $(novelInfo[1]).find('a').attr('href'),
            authorName: $(novelInfo[2]).text(),
            authorLink: '',
            updateTime: '20' + $(novelInfo[4]).text(),
          });
        });
        return resolve(item)
      }
    })
  })

  const result2 = new Promise((resolve) => {
    request.get(`http://www.snwx8.com/modules/article/search.php?searchkey=${urlencode(searchKey, 'gbk')}`)
      .charset('gbk')
      .end((error, resp) => {
        if (error) {
          console.error('search error : ', error)
          return resolve([])
        } else {
          const $ = cheerio.load(resp.text)
          const item = []
          $('#newscontent .l ul li').each((idx, element) => {
            const $element = $(element)
            item.push({
              classify: $element.find('.s1').text().replace(/小说|\[|]/g, ''),
              articleName: $element.find('.s2 a').text(),
              articleLink: $element.find('.s2 a').attr('href'),
              latestCharterName: $element.find('.s3 a').text(),
              latestCharterLink: $element.find('.s3 a').attr('href'),
              authorName: $element.find('.s4 a').text(),
              authorLink: $element.find('.s4 a').attr('href'),
              updateTime: $element.find('.s5').text(),
            });
          });
          return resolve(item)
        }
      })
  })

  const result = {
    result: 0,
    data: [],
    errorInfo: ''
  }

  await Promise.all([result1, result2]).then(([res1, res2]) => {
    result.data = [ ...res2, ...res1 ]
  })

  ctx.body = result
})


router.post('/get-chapter', async ctx => {

  const {
    link
  } = ctx.request.body

  const result = await new Promise(resolve => {
    request.get(link)
      .charset('gbk')
      .end(async (error, resp) => {
        if (error) {
          console.error('get charter list error : ', error)
          return resolve({
            result: 1,
            errorInfo: error,
            data: {}
          })
        } else {
          let articleName = ''
          const chapterList = [] // 章节信息列表
          const $ = cheerio.load(resp.text)
          if (link.indexOf('xxsa.net > 0')) {
            await new Promise(resolve2 => {
              const dirLinks = $('#diralinks').attr('href')
              articleName = $('.con_txt .info h1 a').text()
              request.get(dirLinks)
                .charset('gbk')
                .end((err, response) => {
                  if (err) {
                    console.error('get charter list error : ', error)
                    return resolve2({})
                  } else {
                    const $$ = cheerio.load(response.text)
                    $$('.novel_list .book_article_listtext').each((idx, element) => {
                      $$(element).find('dd').each((i, ele) => {
                        chapterList.push({
                          title: $$(ele).find('a').text(),
                          href: dirLinks + $$(ele).find('a').attr('href'),
                        })
                      })
                    })

                    return resolve2({})
                  }
                })
            })
          } else {
            articleName = $($('.infotitle h1')[0]).text()
            $('#list dl dd a').each((idx, element) => {
              const $element = $(element)
              chapterList.push({
                title: $element.attr('title'),
                href: $element.attr('href'),
              })
            })
          }
          return resolve({
            result: 0,
            data: {
              chapterList,
              name: articleName,
              downloadLink: link.indexOf('xxsa.net > 0') ? ('http://www.xxsa.net/modules/article/txtarticle.php?id=' + $('#down_txt').attr('href').match(/\d+/gi)[0]) : ''
            },
            errorInfo: ''
          })
        }
      })
  })

  ctx.body = result
})

router.post('/get-content', async ctx => {
  const {
    href
  } = ctx.request.body

  const result = await new Promise(resolve => {
    request.get(href)
      .charset('gbk')
      .end((error, resp) => {
        if (error) {
          console.error('get charter content error : ', error)
          return resolve({
            result: 1,
            data: {},
            errorInfo: error
          })
        } else {
          console.info('get charter content success !')
          const $ = cheerio.load(resp.text)
          if (href.indexOf('xxsa.net > 0')) {

          } else {
            
          }
          const content = unescape($($('#BookText')[0]).html()
              .replace(/&#x/g, '%u')
              .replace(/;/g, '')
              .replace(/%uA0/g, ' ')
              .replace(/&apos/g, ''))
            .replace(/%[0-9a-zA-Z]+/g, ''); // 内容处理
          return resolve({
            result: 0,
            data: content,
            errorInfo: ''
          })
        }
      })
  })

  ctx.body = result
})

module.exports = router
