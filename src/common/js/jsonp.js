import Jsonp from 'jsonp'

// 封装jsonp
export default function jsonp(url, data, option) {
    // 查询问号没有问号就设置问号，
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    Jsonp(url, option, (err, data) => {
        // 不报错就返回数据
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (var k in data) {
    //   如果data[k]的值不等于undefined就使用data[k]否则为空
    let value = data[k] !== undefined ? data[k] : ''
    // 拼接字符串
    url += `&${k}=${encodeURIComponent(value)}`
  }
//   
  return url ? url.substring(1) : ''
}
