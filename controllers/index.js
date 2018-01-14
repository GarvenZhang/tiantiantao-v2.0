const cache = require('../middlewares/cache')
/**
 * 官网首页
 */
exports.index = async ctx => {
  ctx.render('/user/index', {
    data: {}
  })
}
/**
 * 商品列表页
 */
exports.list = async ctx => {
  ctx.render('/user/list', {
    data: await cache.getModel('goodsModel')
  })
}
/**
 * 商品详情页
 */
exports.detail = async ctx => {
  ctx.render('/user/detail', {
    data: {}
  })
}
/**
 * 购物车
 */
exports.shoppingCart = async ctx => {
  ctx.render('/user/shopping-cart', {
    data: await cache.getModel('shoppingCartModel')
  })
}
/**
 * 订单页
 */
exports.orderForm = async ctx => {
  ctx.render('/user/order-form', {
    data: await cache.getModel('orderFormModel')
  })
}
/**
 * 用户信息页
 */
exports.userInfo = async ctx => {
  ctx.render('/user/userInfo', {
    data: {}
  })
}
/**
 * 订单页
 */
exports.orderFormInfo = async ctx => {
  ctx.render('/user/orderFormInfo', {
    data: {}
  })
}
