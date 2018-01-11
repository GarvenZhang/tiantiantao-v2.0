(function () {
  /**
   * 展示商品
   * @param id
   */
  function showGoods (id) {
    ajax({
      method: 'post',
      url: '/goods/type',
      headers: [
        {
          name: 'Content-Type',
          value: 'application/json'
        }
      ],
      data: JSON.stringify({
        id: id
      }),
      fn: function (data) {
        const result = JSON.parse(data)
        if (result.status) {
          const area = $('#area')[0]
          createGoodsItem(result.data, area)
        }
      }
    })
  }

  const typeList = $('#type-list')[0]
  const headerTi = $('.header-ti')[0]

  // 获取商品类别数据
  getData('/type', (data) => {
    let str = ''
    data.forEach((item) => {
      str += `<li class="list-item"><a href="javascript:;" class="item-link" data-sign="type" data-id="${item.id}">${item.name}</a></li>`
    })
    typeList.innerHTML = str

    // 默认展示第一个类别的商品
    const a = $('#type-list .item-link')[0]
    headerTi.innerHTML = a.innerHTML
    showGoods(a.getAttribute('data-id'))
  })

  // 点击一个商品类别就展示相应的商品
  document.body.onclick = (e) => {
    const ev = e || window.event
    const target = ev.target || ev.srcElement

    if (target.getAttribute('data-sign') === 'type') {
      headerTi.innerHTML = target.innerHTML
      showGoods(target.getAttribute('data-id'))
    }
  }
})()
