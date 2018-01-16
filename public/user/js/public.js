/**
 * 获取数据
 * @param url
 */
function getData (url, fn) {
  ajax({
    method: 'get',
    url: url,
    fn: function (data) {
      const result = JSON.parse(data)
      if (result.status) {
        fn && fn(result.data)
      }
    }
  })
}

/**
 * 创建商品展示
 * @param data
 * @param parent
 */
function createGoodsItem (data, parent) {
  let str = ''
  let len = data.length;
  console.log(data, parent);
  if (Array.isArray(data) && len > 0) {
    data.forEach((item) => {
      str += `<div class="section-item">
                <div class="item-img-wrapper">
                    <img class="item-img" src="${item.bigImg}">
                </div>
                <div class="item-detail-wrapper">
                    <a href="${'/src/detail.html?id=' + item.id}" class="item-link"><h3 class="item-ti">${item.name}</h3></a>
                    <p class="item-price"><span class="price-sign">￥</span><strong class="price">${item.price}</strong></p>
                </div>
            </div>`
    })
  } else {
    str = `<div style="margin-top: 20px;font-size: 40px">暂无数据</div>`
  }

  parent.innerHTML = str
}
