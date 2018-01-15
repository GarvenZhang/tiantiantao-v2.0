// middlewares
let session = require('../middlewares/session')
let Formvalidate = require('../middlewares/formvalidate')
// model
let shoppingCartModel = require('../models/shoppingcart')

/**
 * 加入购物车
 */
exports.post = async ctx => {
  let postData = ctx.reqbody
  let idUser = session.getSession(ctx.headers['cookie'])
  // 检验
  let ret = Formvalidate([{
    value: postData.goodsId,
    type: ['notNull'],
    code: ['16']
  }])
  if (typeof ret === 'object') {
    ctx.resbody = ret
    return
  }
  ctx.filter({
    goodsId: postData.goodsId,
    idUser
  })

  // model
  await shoppingCartModel.add(ctx)
}

/**
 * 清空购物车
 */
exports.clear = async ctx => {
  ctx.filter({
    idUser: session.getSession(ctx.headers['cookie'])
  })
  await shoppingCartModel.clear(ctx)
}

/**
 * 删除购物车中的商品
 */
exports.delete = async ctx => {
  ctx.filter({
    idGoods: ctx.aUrlParam[0],
    idUser: session.getSession(ctx.headers['cookie'])
  })
  // model
  await shoppingCartModel.delete(ctx)
}
