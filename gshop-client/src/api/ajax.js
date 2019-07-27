/**
 * ajax请求函数模块
 * 返回值： promise对象(异步返回的数据是: response.data)
 */

import axios from 'axios'

/**
 *
 *
 * @export
 * @param {*} url   //请求地址
 * @param {*} [data={}]  //请求数据对象
 * @param {string} [type='GET']  //请求方法
 */
export default function ajax(url, data = {}, type = 'GET') {
  // console.log(url)
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // console.log(response)
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}
