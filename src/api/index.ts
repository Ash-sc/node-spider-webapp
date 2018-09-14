interface ApiParams {
  url: string
  data: object
}

const headers = new Headers({
  'Content-Type': 'application/json; charset=utf-8'
})

export default function(params: ApiParams) {
  return new Promise((resolve, reject) => {
    fetch('/api' + params.url, {
      body: JSON.stringify(params.data),
      headers,
      method: 'POST'
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        }
        return { result: 1, errorInfo: res.statusText }
      })
      .then(res => {
        const { result, data, errorInfo } = res

        if (result) {
          return reject(errorInfo)
        }
        return resolve(data || {})
      })
      .catch(err => {
        reject(err)
      })
  })
}
