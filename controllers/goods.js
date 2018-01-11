// middlewares
let Cache = require('../middlewares/cache')
let Formvalidate = require('../middlewares/formvalidate')
// models
let goodsModel = require('../models/goods')

/**
 * 添加商品
 */
exports.post = async ctx => {
  let postData = ctx.reqbody
  // 检验
  let ret = Formvalidate([{
    value: postData.name,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.description,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.price,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.category_id,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.date,
    type: ['isValidDate'],
    code: ['12']
  }])
  if (typeof ret === 'object') {
    Object.assign(ctx.resbody, ret)
    return
  }
  // model
  if (!Cache.getModel('goodsModel') || Cache.getModel('goodsModel').data.length <= 16) {
    await goodsModel.add(postData)
  } else {
    goodsModel.add(postData)
  }
  // res
  ctx.resbody = Cache.getModel('goodsModel')
}

/**
 * 获取商品
 */
exports.get = async ctx => {
  const aUrlParam = ctx.aUrlParam
  const name = aUrlParam[0]
  const curPage = aUrlParam[1]
  const nextPage = aUrlParam[2]
  const perPage = aUrlParam[3]
  const min = aUrlParam[4]
  const max = aUrlParam[5]

  // 将curPage, nextPage, perPage 转化成LIMIT 起点数位置， 将要获取的数目
  const start = nextPage * perPage - perPage
  const offset = perPage

  // 管理员
  if (name === 'all') {
    await goodsModel.get({
      start, offset
    })
  // 只根据名称查询
  } else if (name !== 'all' && min === max) {
    await goodsModel.get({
      name, start, offset
    })
  // 根据名称和价格范围来查询
  } else if (name !== 'all' && min !== max) {
    await goodsModel.get({
      name, start, offset, min, max
    })
  }
  // res
  ctx.resbody = Cache.getModel('tmpModel')
}

/**
 * 删除商品
 */
exports.delete = async ctx => {
  const id = ctx.aUrlParam[0]
  // model
  await goodsModel.delete({id})
  // res
  ctx.resbody = Cache.getModel('goodsModel')
}

/**
 * 修改商品
 */
exports.put = async ctx => {

}

/**
 * 上传图片
 */
exports.addImg = async ctx => {
  const postData = ctx.reqbody
  // model
  await goodsModel.addImg(postData)
  // res
  ctx.resbody = Cache.getModel('goodsModel')
}
