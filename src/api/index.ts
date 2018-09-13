interface ApiParams {
  url: string,
  data: object
}

export default function(params: ApiParams) {
  return fetch(params.url, {
    body: JSON.stringify(params.data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'POST',
    mode: 'no-cors',
  })
}
