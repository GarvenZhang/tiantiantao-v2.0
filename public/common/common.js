/**
 * ajax
 * @param obj
 */
function ajax (obj) {
  const xhr = new XMLHttpRequest()
  let headers = obj.headers || []

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        obj.fn && obj.fn(xhr.responseText)
      }
    }
  }
  xhr.open(obj.method, obj.url, obj.isAsync || true)
  // 自定义请求头
  headers.forEach(function (item) {
    xhr.setRequestHeader(item.name, item.value)
  })
  xhr.send(obj.data || null)
}

/**
 * 获取cookie
 * @param cookie
 * @param cookieName
 */
function getCookie (cookie, cookieName) {
  const reg = new RegExp('(?:^|\\s)' + cookieName + '=(.+?(?=;|$))')
  const result = cookie.match(reg)
  return result ? result[1] : null
}

/**
 * 获取查询字符串的值
 * @param url
 * @param name
 * @returns {*}
 */
function getSearch (url, name) {
  const reg = new RegExp('(?:\\?|&)' + name + '=(.*?)(?=&|$)')
  const result = url.match(reg)
  return result ? result[1] : null
}

/**
 * 获取元素
 * @param ele
 * @returns {NodeList}
 */
function $ (ele) {
  return document.querySelectorAll(ele)
}
