/**
 * 获取商品信息
 * @param options
 * @param url
 * @returns {Promise.<*>}
 */
const getAjaxResult = async (url, options) => {
  return await JM.ajax({
    method: 'get',
    url: url
  }).then(result => {
    result = JSON.parse(result)
    if (result.status === 'success') {
      return new Promise((resolve, reject) => {
        const len = result.data.length
        if (options) {
          const perPage = options.perPage
          resolve({
            currentPage: options.currentPage,
            perPage: perPage,
            totalPages: Math.ceil(len / perPage),
            totalRecords: len
          })
        }
        showGoods(result.data)
      })
    } else {
      showGoods([])
    }
  })
}

/**
 *
 * @param options
 * @returns {Promise.<*>}
 */

const ajaxGoods = async (options) => {
  const typeReg = /(?:\?|\/)type_(.*(?=\?|$))/
  let typeId = typeReg.exec(location.href) ? typeReg.exec(location.href)[1] : ''
  let result = null

  // 根据类别id
  if (typeId) {
    result = getAjaxResult(`/v1/goods/type_${typeId}?nextPage=${options.currentPage}&perPage=${options.perPage}&min=0&max=0`, options)
  }
  // 查询商品名
  else {
    const goodsNameReg = /list\?(.*(?=$))|goods\/(.*(?=\?))/


    let goodsName = goodsNameReg.exec(location.href) ? decodeURIComponent(goodsNameReg.exec(location.href)[1]) : ''

    const cMinPrice = JM.getCookie(document.cookie, 'minPrice')
    const cMaxPrice = JM.getCookie(document.cookie, 'maxPrice')
    console.log(cMinPrice, cMaxPrice)

    if (cMinPrice && cMaxPrice) {
      const minPrice = document.getElementById('minPrice')
      const maxPrice = document.getElementById('maxPrice')
      let miPrice = (minPrice && minPrice.value.trim() === '' ? 0: cMinPrice)
      let maPrice = (maxPrice && maxPrice.value.trim() === '' ? 0: cMinPrice)

      result = getAjaxResult(`/v1/goods/${goodsName}?nextPage=${options.currentPage}&perPage=${options.perPage}&min=${miPrice}&max=${maPrice}`, options)
    } else {
      result = getAjaxResult(`/v1/goods/${goodsName}?nextPage=${options.currentPage}&perPage=0&min=0&max=0`, options)
    }
  }

  return result
}

/**
 * 展示商品
 * @param data
 */
function showGoods (data) {
  const len = data.length
  const goodsArea = document.getElementById('goodsArea')
  let str = ''

  if (len) {
    for (let item of data) {
      str += `<div class="section-item">
                <div class="item-img-wrapper">
                    <img class="item-img" src="${item.bigImg}">
                </div>
                <div class="item-detail-wrapper">
                    <a href="${'/src/detail.html?id=' + item.id}" class="item-link"><h3 class="item-ti">${item.name}</h3></a>
                    <p class="item-price"><span class="price-sign">￥</span><strong class="price">${item.price}</strong></p>
                </div>
            </div>`
    }
  } else {
    str = `<div>暂无数据</div>`
  }
  goodsArea.innerHTML = str
}

// 初始化分页插件
pagination({
  wrapper: document.getElementById('pag'),
  ajax: ajaxGoods,
  perPage: 5
})

const jsMoneySearch = document.getElementById('js-money-search')

if (jsMoneySearch) {
  jsMoneySearch.onclick = () => {
    const minPrice = document.getElementById('minPrice')
    const maxPrice = document.getElementById('maxPrice')
    document.cookie = `minPrice=${minPrice.value.trim()}`
    document.cookie = `maxPrice=${maxPrice.value.trim()}`
    const goodsNameReg = /list\?(.*(?=$))|goods\/(.*(?=\?))/
    let goodsName = goodsNameReg.exec(location.href) ? decodeURIComponent(goodsNameReg.exec(location.href)[1]) : ''

    getAjaxResult(`/v1/goods/${goodsName}?nextPage=${1}&perPage=${10}&min=${parseInt(minPrice.value.trim())}&max=${parseInt(maxPrice.value.trim())}`)
  }
}