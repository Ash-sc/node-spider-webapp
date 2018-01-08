import XHR from '../../service/xhr'

export function getAppList() {
  return {
    types: [
      'GET_APP_LIST_REQUEST',
      'GET_APP_LIST_SUCCESS',
      'GET_APP_LIST_FAILURE',
    ],
    callAPI: () => XHR({
      url: '/appList/list'
    }),
    payload: {},
  };
}
