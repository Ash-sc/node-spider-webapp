import axios from 'axios'

const rootPath = '/api' // 后端 API 根路径
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const xhr = ({ method = 'get', url, body = null }) => {

  const queryString = data => {
    let str = ''
    const body = typeof data === 'object' ? data : {}
    Object.keys(body || {}).forEach((key, index) => {
      str += (index === 0 ? '?' : '&') + key + '=' + body[key]
    })
    return str
  }

  const promise = new Promise((resolve, reject) => {
    const reqPath = rootPath + url + (method === 'get' ? queryString(body) : '')
    axios({
      method,
      url: reqPath,
      data: body
    }).then(res => {
      const { data } = res
      if (data.result === 3) {
        console.error('not login')
      } else if (data.result) {
        const errorInfo = data.errorInfo || '处理错误'
        return reject(errorInfo)
      }
      resolve(data.data || {})
    }).catch(() => {
      reject('请求失败')
    })
  })

  return promise
}

export default xhr
