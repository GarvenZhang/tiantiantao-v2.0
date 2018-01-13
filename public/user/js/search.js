(function () {
  const searchArea = $('#search-area')[0]
  const smP = $('#js-sm')[0]
  const bigP = $('#js-big')[0]
  const sure = $('#js-sure')[0]

  // 根据商品名搜索商品
  if (location.href.includes('name')) {
    const name = decodeURIComponent(getSearch(location.search, 'name'))
    getData(`/goods/search?name=${name}`, (data) => {
      createGoodsItem(data, searchArea)
    })
  }

  // 根据价格确认搜索
  sure.onclick = () => {
    const sVal = smP.value.trim()
    const bigVal = bigP.value.trim()
    location.href = `/src/search.html?smPrice=${sVal || 0}&bigPrice=${bigVal}`
  }

  // 根据价格搜索商品
  if (location.href.includes('Price')) {
    const smPrice = decodeURIComponent(getSearch(location.search, 'smPrice'))
    const bigPrice = decodeURIComponent(getSearch(location.search, 'bigPrice'))
    console.log(smPrice, bigPrice)
    getData(`/goods/search/price?smPrice=${smPrice}&bigPrice=${bigPrice}`, (data) => {
      createGoodsItem(data, searchArea)
    })
  }
})()
