(function () {
  const Cart = {
    /**
     * 增加数量
     * @param num
     * @param socket
     * @returns {number}
     */
    plus: (num, socket) => {
      if (num && num < socket) {
        num++;
      }
      return num;
    },
    /**
     * 减少数量
     * @param num
     * @returns {number}
     */
    minus: (num) => {
      if (num > 0) {
        num--;
      }
      return num;
    },
    /**
     * 展示数量
     * @param num
     * @param input
     */
    showNum: (num, input) => {
      input.value = num;
    },

  };


  /**
   * 展示商品
   */
  function showGoodsDetail (id) {
    const detailContent = $('.detail-content')[0];
    ajax({
      method: 'get',
      url: '/goods?id=' + id,
      fn: function (data) {
        const result = JSON.parse(data)
        if (result.status) {
          const detail = result.data[0]
          let str = ''
          if (detail) {
            str = `<div class="content-inner">
                      <div class="content-hd">
                          <h3 class="hd-tt">${detail.name}</h3>
                      </div>
                      <div class="content-wrapper">
                          <p class="content-des">${detail.description}</p>
                      </div>
                       <div class="content-wrapper clearfix" style="margin-bottom: 20px">
                          <div class="wrapper-inner">
                             单价：
                          </div>
                          <div class="wrapper-inner">
                              <span>￥${detail.price}</span>
                          </div>
                      </div>
                      <div class="content-wrapper clearfix">
                          <div class="wrapper-inner">
                              购买数量：
                          </div>
                          <div class="wrapper-inner">
                              <button type="button" class="btn" id="js-reduce" data-stock="${detail.stock}">-</button><input type="text" value="1" class="num"><button type="button" class="btn" id="js-add" data-stock="${detail.stock}">+</button>（库存：<span>${detail.stock}</span>）
                          </div>
                      </div>
                      <div class="content-wrapper">
                          <button type="button" class="shopBtn" id="js-shop" data-id="${detail.id}" data-stock="${detail.stock}" data-description="${detail.description}" data-name="${detail.name}" data-price="${detail.price}">加入购物车</button>
                      </div>
                  </div>`
          } else {
            str = '<div>没有获取到数据</div>';
          }
          detailContent.innerHTML = str;
        }
      }
    })
  }
  /**
   * 减少数量
   * @param target
   */
  function minusNum (target) {
    const num = Cart.minus(target.nextElementSibling.value);
    Cart.showNum(num, target.nextElementSibling);
  }

  /**
   * 增加数量
   * @param target
   */
  function  plusNum(target) {
    const num = Cart.plus(target.previousElementSibling.value, parseInt(target.getAttribute('data-stock')));
    Cart.showNum(num, target.previousElementSibling);
  }

  /**
   * 记录需要购买的商品
   * @param target
   */
  function noteGoodsList (target) {
    let goodsArrCookie = getCookie(document.cookie, 'goods');

    if (!goodsArrCookie) {
      goodsArrCookie = {
        data: []
      }
      document.cookie = `goods=${JSON.stringify(goodsArrCookie)}; expires=${new Date('2017-12-30')}`;
    } else {
      goodsArrCookie = JSON.parse(getCookie(document.cookie, 'goods'));
    }

    const num = $('.num')[0];
    const len = goodsArrCookie.data.length;
    let idArr = [];

    let goodsInfo = {
      id: parseInt(target.getAttribute('data-id')),
      name: target.getAttribute('data-name'),
      stock: target.getAttribute('data-stock'),
      description: target.getAttribute('data-description'),
      price: parseFloat(target.getAttribute('data-price')),
      count: parseInt(num.value.trim()),
      url: location.href.split('http://localhost:3000')[1]
    };

    goodsArrCookie.data.forEach((item) => {
      idArr.push(item.id);
    });

    if(len) {
      if(!idArr.includes(parseInt(target.getAttribute('data-id')))) {
        goodsArrCookie.data.push(goodsInfo);
      }
    } else {
      goodsArrCookie.data.push(goodsInfo);
    }

    document.cookie = `goods=${JSON.stringify(goodsArrCookie)}; expires=${new Date('2017-12-30')}`;
    console.log(JSON.parse(getCookie(document.cookie, 'goods')));
  }
  function bindEvent () {
    document.body.onclick = (e) => {
      const ev = e || window.event;
      const target = ev.target || ev.srcElement;
      const id = target.id;

      switch (id) {
        case 'js-add':
          plusNum(target);
          break;
        case 'js-reduce':
          minusNum(target);
          break;
        case 'js-shop':
          noteGoodsList(target);
          break;
      }
    }
  }

  showGoodsDetail(getSearch(location.search, 'id'));

  bindEvent();

})()
