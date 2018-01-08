// Initial state
export const initialState = {
  status: 'ok',
  appList: [
    {
      name: 'DouBan movie',
      link: '/movie-list'
    }
  ]
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}