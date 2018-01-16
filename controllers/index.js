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
  const aUrlParam = ctx.aUrlParam
  const param = aUrlParam[0]
  const nextPage = 1
  const perPage = 16
  // 将curPage, nextPage, perPage 转化成LIMIT 起点数位置， 将要获取的数目
  const start = nextPage * perPage - perPage
  const offset = perPage
  // 根据类型查商品
  if (param.indexOf('type_') === 0) {
    let categoryId = /^type_(\d)+?$/.exec(param)[1]
    ctx.filter({
      categoryId, start, offset
    })
  // 根据名称查商品
  } else {
    ctx.filter({
      name: param,
      start,
      offset
    })
  }
  // model
  await goodsModel.get(ctx)
  // view
  ctx.render('/user/list', {
    data: ctx.resbody
  })
}
/**
 * 商品详情页
 */
exports.detail = async ctx => {
  const aUrlParam = ctx.aUrlParam
  ctx.filter({
    id: aUrlParam[0]
  })
  // model
  await goodsModel.get(ctx)
  // view
  console.log(ctx.resbody)
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
