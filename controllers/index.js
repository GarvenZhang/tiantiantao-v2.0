const cache = require('../middlewares/cache')
let session = require('../middlewares/session')
const IndexModel = require('../models/index')
const goodsModel = require('../models/goods')
/**
 * 官网首页
 */
exports.index = async ctx => {
  console.log(ctx.pathname)
  ctx.render('/user/index', {
    category: await cache.getModel('categoryModel'),
    recommandGoods: await cache.getModel('goodsModel'),
    discountedGoods: await cache.getModel('goodsModel')
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
  const aUrlParam = ctx.aUrlParam
  const name = aUrlParam[0]
  ctx.filter({
    id: /^id_(\d)+?$/.exec(name)[1]
  })
  // model
  await goodsModel.get(ctx)
  // view
  ctx.render('/user/detail', {
    data: ctx.resbody
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
  await IndexModel.orderForm(ctx)
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
  await IndexModel.orderForm(ctx)
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
