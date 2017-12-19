import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += url.indexOf('?') < 0 ? '?' : '&' + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(data)
      }
    })
  })
}

// 拼接url的函数
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // 要把第一个&去除
  return url ? url.substring(1) : ''
}
