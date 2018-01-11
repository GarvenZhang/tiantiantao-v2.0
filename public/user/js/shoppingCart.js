let datas = [
  {
    name: '百香果',
    id: 1,
    price: 20,
    count: 4,
    stock: 40,
    description: '现摘百香果新鲜热带广西西番莲鸡蛋果5斤大红果 水果酸爽香甜',
    url: '/src/detail.html?id=1'
  },
  {
    name: '橙子',
    id: 1,
    price: 20,
    count: 2,
    stock: 40,
    description: '信必果鲜橙江西赣州赣南脐橙净重10斤装手剥橙新鲜水果寻乌甜橙子',
    url: '/src/detail.html?id=2'
  },
  {
    name: '番石榴',
    id: 1,
    price: 22,
    count: 1,
    stock: 10,
    description: '广西现摘番石榴芭乐6斤装 新鲜热带水果 高山种植老树 清脆香甜',
    url: '/src/detail.html?id=3'
  }
];

const orderArea = $('#order-area')[0];
const totalSymbol = $('.total-symbol')[0];
const totalAmount = $('.total-amount')[0];

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
  /**
   * 计算商品的总价
   * @param num
   * @param price
   * @returns {number}
   */
  countTotalPrice: (num, price) => {
    return (num * price).toFixed(2);
  },
  /**
   * 展示总价
   * @param num
   * @param area
   */
  showTotal: (num, area) => {
    area.innerHTML = num;
  },
  /**
   * 删除一样商品
   * @param target
   */
  delAGoods: (target) => {
    const parent = target.parentNode.parentNode.parentNode.parentNode.parentNode;
    const child = target.parentNode.parentNode.parentNode.parentNode;
    const goodsData = JSON.parse(getCookie(document.cookie, 'goods'));
    const id = parseInt(target.getAttribute('data-id'));

    goodsData.data.forEach((item, index) => {
      if(item.id === id) {
        goodsData.data.splice(index, 1);
      }
    })

    document.cookie = `goods=${JSON.stringify(goodsData)}; expires=${new Date('2017-12-30')}`;

    parent.removeChild(child);

  },
  /**
   * 清除购物车
   */
  clearCart: () => {
    document.cookie = `goods=''; expires=${new Date(0)}`;
    orderArea.innerHTML = '<div style="text-align: center;background: #e7e7e7;padding: 10px 0">暂无购买的商品</div>';
  },

  /**
   * 选择一样商品
   * @param target
   * @returns {number}
   */
  selectOneGoods: (target) => {
    let price = 0;
    let amount = 0;

    if (target.checked) {
      price = parseFloat(target.parentNode.parentNode.parentNode.parentNode.querySelector('.td-sum .price').innerHTML).toFixed(2);
      amount = parseInt(target.parentNode.parentNode.parentNode.parentNode.querySelector('.text-amount').value);
    }

    return {
      price: price,
      amount: amount
    };
  },

  chooseAll: (target) => {
    const selectOne = $('.select-one');
    const len = selectOne.length;

    if(target.checked) {
      for (let i = 0; i < len; i++) {
        selectOne[i].checked = true;
      }
    } else {
      for (let i = 0; i < len; i++) {
        selectOne[i].checked = false;
      }
    }

  },
  /**
   *
   * @returns {string}
   */
  total: () => {
    const selectOne = $('.select-one');
    const len = selectOne.length;
    let total = 0;
    let amount = 0;

    for (let i = 0; i < len; i++) {
      total += parseFloat(Cart.selectOneGoods(selectOne[i]).price);
      amount += parseInt(Cart.selectOneGoods(selectOne[i]).amount);
    }

    return {
      total: total,
      amount: amount
    };
  },

}

/**
 * 减少数量
 * @param target
 */
function minusNum (target) {
  const num = Cart.minus(target.nextElementSibling.value);
  Cart.showNum(num, target.nextElementSibling);
  const tPrice = target.parentNode.parentNode.parentNode.nextElementSibling.querySelector('.price');
  Cart.showTotal(Cart.countTotalPrice(num, parseInt(target.getAttribute('data-price'))), tPrice);
  getTotalPriceAndTotalAmount();
}

/**
 * 增加数量
 * @param target
 */
function  plusNum(target) {
  const num = Cart.plus(target.previousElementSibling.value, parseInt(target.getAttribute('data-stock')));
  Cart.showNum(num, target.previousElementSibling);
  const tPrice = target.parentNode.parentNode.parentNode.nextElementSibling.querySelector('.price');
  Cart.showTotal(Cart.countTotalPrice(num, parseInt(target.getAttribute('data-price'))), tPrice);
  getTotalPriceAndTotalAmount();
}

/**
 * 获取所有购买商品的总价和总件数
 */
function getTotalPriceAndTotalAmount () {
  Cart.showTotal(Cart.total().total, totalSymbol);
  Cart.showTotal(Cart.total().amount, totalAmount);
}

function selectAllGoods (target) {
  Cart.chooseAll(target);
  getTotalPriceAndTotalAmount();
}


/**
 * 商品信息列表模板
 * @param data
 * @param parent
 */
function createGoodListTpl (data, parent) {
  let str = '';
  let len = data.length;
  if (len) {
    data.forEach((item) => {
      str += `<div class="order-item">
                        <ul class="item-content clearfix">
                            <li class="td td-chk">
                                <div class="td-inner">
                                    <div class="cart-checkbox">
                                        <input type="checkbox" class="select-one">
                                    </div>
                                </div>
                            </li>
                            <li class="td td-info">
                                <div class="td-inner clearfix">
                                    <div class="item-pic">
                                        <a href="${item.url}" target="_blank">
                                            <img src="/src/imgs/timg.gif">
                                        </a>
                                    </div>
                                    <div class="item-info">
                                        <div class="item-basic-info">
                                            <a href="${item.url}" target="_blank">${item.description}</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="td td-price">
                                <div class="td-inner">
                                    <div class="item-price">
                                        <span>￥</span><em>${item.price.toFixed(2)}</em>
                                    </div>
                                </div>
                            </li>
                            <li class="td td-amount">
                                <div class="td-inner">
                                    <div class="amount-wrapper">
                                        <a href="javascript:;" class="minus" data-stock="${item.stock}" data-price="${item.price}">-</a>
                                        <input type="text" class="text text-amount" value="${item.count}">
                                        <a href="javascript:;" class="plus" data-stock="${item.stock}" data-price="${item.price}">+</a>
                                    </div>
                                </div>
                            </li>
                            <li class="td td-sum">
                                <div class="td-inner">
                                    <span>￥</span><em class="price">${(item.price * item.count).toFixed(2)}</em>
                                </div>
                            </li>
                            <li class="td td-op">
                                <div class="td-inner">
                                    <a href="javascript:;" class="delGoods" data-id="${item.id}">删除</a>
                                </div>
                            </li>
                        </ul>
                    </div>`
    });
  } else {
    str = '<div style="text-align: center;background: #e7e7e7;padding: 10px 0">暂无购买的商品</div>'
  }

  parent.innerHTML = str;
}

/**
 * 页面渲染函数
 */
function render () {
  const goodsData = getCookie(document.cookie, 'goods');
  if (goodsData) {
    createGoodListTpl(JSON.parse(goodsData).data, orderArea);
  }
}

/**
 * 事件绑定
 */
function bindEvent () {
  document.body.onclick = (e) => {
    const ev = e || window.event;
    const target = ev.target || ev.srcElement;
    const cName = target.className;

    switch (cName) {
      case 'minus':
        minusNum(target);
        break;
      case 'plus':
        plusNum(target);
        break;
      case 'delGoods':
        Cart.delAGoods(target);
        render();
        break;
      case 'clearCart':
        Cart.clearCart();
        render();
        break;
      case 'select-one':
        getTotalPriceAndTotalAmount();
        break;
      case 'js-select-all':
        selectAllGoods(target);
        break;
    }
  }
}

render();
bindEvent();