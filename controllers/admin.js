const cache = require('../middlewares/cache')
/**
 * 商品管理
 */
exports.goods = async ctx => {
  ctx.render('/admin/goods', {
    goods: await cache.getModel('goodsModel'),
    category: await cache.getModel('categoryModel')
  })
}
/**
 * 会员管理
 */
exports.vip = async ctx => {
  ctx.render('/admin/vip', {
    data: await cache.getModel('userModel')
  })
}

/**
 * 类别管理
 */
exports.type = async ctx => {
  ctx.render('/admin/category', {
    data: await cache.getModel('categoryModel')
  })
}
/**
 * 订单管理
 */
exports.orderForm = async ctx => {
  ctx.render('/admin/orderForm', {
    data: await cache.getModel('orderFormModel')
  })
}
