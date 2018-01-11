(function () {
  // 获取元素

  const categories = $('#categories')[0]
  const commendGoods = $('#commendGoods')[0]
  const discountGoods = $('#discountGoods')[0]
  const searchInput = $('.search-input')[0]
  const searchBtn = $('.search-btn')[0]

  if (categories) {
    getData(`/goods/all`, (data) => {
      createGoodsItem(data, categories)
    })
  }

  if (commendGoods) {
    getData(`/goods/commend`, (data) => {
      createGoodsItem(data, commendGoods)
    })
  }

  if (discountGoods) {
    getData(`/goods/discount`, (data) => {
      createGoodsItem(data, discountGoods)
    })
  }

  if (searchBtn) {
    searchBtn.onclick = () => {
      const val = searchInput.value.trim()
      location.href = `/src/search.html?name=${val}`
    }
  }
})()


