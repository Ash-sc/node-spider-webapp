import api from '.'

class NovelApi {
  public searchNovel (searchKey: string) {
    return api({
      data: { searchKey },
      url: '/novel/search'
    })
  }

  public getChapter (link: string) {
    return api({
      data: { link },
      url: '/novel/get-chapter'
    })
  }

  public getContent (href: string) {
    return api({
      data: { href },
      url: '/novel/get-content'
    })
  }
}

export default new NovelApi()
