// middlewares
let Cache = require('../middlewares/cache')
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
    Object.assign(ctx.resbody, ret)
    return
  }
  // model
  if (!Cache.getModel('categoryModel') || Cache.getModel('categoryModel').data.length <= 16) {
    await categoryModel.add(postData)
  } else {
    categoryModel.add(postData)
  }
  console.log(Cache.getModel('tmpModel').data)
  // res
  ctx.resbody = Cache.getModel('tmpModel')
}

/**
 * 获取类别
 */
exports.get = async ctx => {
  // model
  await categoryModel.get()
  // res
  ctx.resbody = Cache.getModel('tmpModel')
}

/**
 * 删除类别
 */
exports.delete = async ctx => {
  const id = ctx.aUrlParam[0]
  // model
  await categoryModel.delete({id})
  // res
  ctx.resbody = Cache.getModel('tmpModel')
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
    Object.assign(ctx.resbody, ret)
    return
  }
  // model
  categoryModel.put(postData)
  // res
  ctx.resbody = Cache.getModel('tmpModel')
}
