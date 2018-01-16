// middlewares
let session = require('../middlewares/session')
let Formvalidate = require('../middlewares/formvalidate')
// model
let orderFormModel = require('../models/orderform')

/**
 * 生成订单
 */
exports.post = async ctx => {
  let postData = ctx.reqbody
  let idUser = session.getSession(ctx.headers['cookie'])
  // 检验
  let ret = Formvalidate([{
    value: postData.phone,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.address,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.recipients,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.postcodes,
    type: ['notNull'],
    code: ['16']
  }])
  if (typeof ret === 'object') {
    ctx.resbody = ret
    return
  }
  ctx.filter(Object.assign(postData, {
    idUser
  }))

  // model
  await orderFormModel.add(ctx)
}

/**
 * 删除订单
 */
exports.delete = async ctx => {
  ctx.filter({
    idGoods: ctx.aUrlParam[0],
    idUser: session.getSession(ctx.headers['cookie'])
  })
  // model
  await orderFormModel.delete(ctx)
}
/**
 * 查找订单
 */
exports.get = async ctx => {

}

/**
 * 结算订单(用户)／执行订单(管理员)
 */
exports.put = async ctx => {
  ctx.filter({
    idUser: session.getSession(ctx.headers['cookie'])
  })
  await orderFormModel.clear(ctx)
}
