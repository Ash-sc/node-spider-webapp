import api from '.'

class MovieApi {
  public movieList (type: string) {
    return api({
      data: { type },
      url: '/movie/list'
    })
  }
}

export default new MovieApi()
