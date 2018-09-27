import api from '.'

class MovieApi {
  public movieList (type: string) {
    return api({
      data: { type },
      url: '/movie/list'
    })
  }

  public movieDetail (id: string) {
    return api({
      data: { id },
      url: '/movie/detail'
    })
  }
}

export default new MovieApi()
