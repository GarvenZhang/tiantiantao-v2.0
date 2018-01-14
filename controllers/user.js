// middlewares
let Formvalidate = require('../middlewares/formvalidate')
let baseTips = require('../middlewares/baseTips')
let session = require('../middlewares/session')
// models
let userModel = require('../models/user')

/**
 * 登陆
 */
exports.login = async ctx => {
  let postData = ctx.reqbody
  // 检验
  let ret = Formvalidate([{
    value: postData.account,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.password,
    type: ['notNull'],
    code: ['16']
  }])
  if (typeof ret === 'object') {
    ctx.resbody = ret
    return
  }
  ctx.filter(postData)

  // model
  userModel.login(ctx)
}

/**
 * 注册
 */
exports.register = async ctx => {
  let postData = ctx.reqbody
  // 检验
  let ret = Formvalidate([{
    value: postData.account,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.password,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.name,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.sex,
    type: ['notNull'],
    code: ['16']
  }])
  if (typeof ret === 'object') {
    ctx.resbody = ret
    return
  }
  ctx.filter(postData)

  // model
  userModel.register(ctx)
}

/**
 * 修改资料
 */
exports.put = async ctx => {
  let postData = ctx.reqbody
  // 检验
  let ret = Formvalidate([{
    value: postData.password,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.name,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.sex,
    type: ['notNull'],
    code: ['16']
  }])
  if (typeof ret === 'object') {
    ctx.resbody = ret
    return
  }
  // 从session中获取idUser
  const idUser = session.getSession(ctx.headers['cookie']).idUser
  ctx.filter(Object.assign(postData, {
    idUser
  }))

  // model
  userModel.put(ctx)
}

/**
 * 解冻/冻结vip
 */
exports.putVip = async ctx => {
  let postData = ctx.reqbody
  let idUser = ctx.aUrlParam[0]
  // 从session中获取idUser
  const account = session.getSession(ctx.headers['cookie']).account
  if (account !== 'admin') {
    ctx.resbody = baseTips['401']
    return
  }
  ctx.filter(Object.assign(postData, idUser))
  // model
  userModel.putVip(ctx)
}

/**
 * 升级为vip
 */
exports.postVip = async ctx => {
  let idUser = session.getSession(ctx.headers['cookie']).idUser
  ctx.filter({
    idUser,
    isVip: 1
  })
  // model
  userModel.putVip(ctx)
}
