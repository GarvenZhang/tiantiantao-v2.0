const cache = require('../middlewares/cache')
let session = require('../middlewares/session')
const IndexModel = require('../models/index')
/**
 * 官网首页
 */
exports.index = async ctx => {
  console.log(ctx.pathname)
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
  ctx.filter({
    idUser: session.getSession(ctx.headers['cookie']).idUser
  })
  // model
  IndexModel.orderForm(ctx)
  // view
  ctx.render('/user/order-form', {
    data: ctx.resbody
  })
}
/**
 * 订单页
 */
exports.orderForm = async ctx => {
  ctx.filter({
    idUser: session.getSession(ctx.headers['cookie']).idUser
  })
  // model
  IndexModel.orderForm(ctx)
  // view
  ctx.render('/user/order-form', {
    data: ctx.resbody,
    fare: 6
  })
}
/**
 * 订购成功页
 */
exports.orderFormSuccess = async ctx => {
  ctx.render('/user/order-form-success', {
    data: {}
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
 * 订单详情页
 */
exports.orderFormInfo = async ctx => {
  ctx.render('/user/orderFormInfo', {
    data: {}
  })
}
