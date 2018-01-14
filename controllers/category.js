// middlewares
let Formvalidate = require('../middlewares/formvalidate')
// models
let categoryModel = require('../models/category')

/**
 * 添加类别
 */
exports.post = async ctx => {
  let postData = ctx.reqbody
  // 检验
  let ret = Formvalidate([{
    value: postData.name,
    type: ['notNull'],
    code: ['16']
  }])
  if (typeof ret === 'object') {
    ctx.resbody = ret
    return
  }
  ctx.filter(postData)

  // model
  await categoryModel.add(ctx)
}

/**
 * 获取类别
 */
exports.get = async ctx => {
  // model
  await categoryModel.get(ctx)
}

/**
 * 删除类别
 */
exports.delete = async ctx => {
  ctx.filter({
    id: ctx.aUrlParam[0]
  })
  // model
  await categoryModel.delete(ctx)
}

/**
 * 修改类别
 */
exports.put = async ctx => {
  let postData = ctx.reqbody
  // 检验
  let ret = Formvalidate([{
    value: postData.name,
    type: ['notNull'],
    code: ['16']
  }])
  if (typeof ret === 'object') {
    ctx.resbody = ret
    return
  }
  ctx.filter({
    idCategory: postData.id,
    name: postData.name
  })
  // model
  await categoryModel.put(ctx)
}
