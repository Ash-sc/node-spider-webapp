'use strict';

let request = require('request')
let fs = require('fs')

let httpStream = request({
  method: 'GET',
  url: 'http://vt1.doubanio.com/201801111634/6a3483d611fd04b63bad03aff33e1518/view/movie/M/302250966.mp4'
});
// 由于不需要获取最终的文件，所以直接丢掉
let writeStream = fs.createWriteStream('/dev/null')

// 联接Readable和Writable
httpStream.pipe(writeStream)

let totalLength = 0

// 当获取到第一个HTTP请求的响应获取
httpStream.on('response', (response) => {
  console.log('response headers is: ', response.headers)
});

httpStream.on('data', (chunk) => {
  totalLength += chunk.length
  console.log('recevied data size: ' + totalLength + 'KB')
});

// 下载完成
writeStream.on('close', () => {
  console.log('download finished')
})