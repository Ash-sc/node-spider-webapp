// Initial state
export const initialState = {
  status: 'ok',
  data: {
    content: [],
    page: 0,
    size: 10,
    total: 0
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_APP_LIST_REQUEST':
      console.log(234234)
      return state
    case 'GET_APP_LIST_SUCCESS':
      console.log('list success:', action.data, 22222)
      return state
    case 'GET_APP_LIST_FAILURE':
      console.log('list failure:', 33333)
      return state
    default:
      return state
  }
}