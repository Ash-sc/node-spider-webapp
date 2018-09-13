import api from './index'

class MovieApi {
  public movieList (type: string) {
    return api({
      data: { type },
      url: '/movie-list/list'
    })
  }
}

export default new MovieApi()
