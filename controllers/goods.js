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
    value: postData.categoryId,
    type: ['notNull'],
    code: ['16']
  }, {
    value: postData.date,
    type: ['isValidDate'],
    code: ['12']
  }])
  if (typeof ret === 'object') {
    ctx.resbody = ret
    return
  }
  ctx.filter(postData)

  // model
  await goodsModel.add(ctx)
}

/**
 * 获取商品
 */
exports.get = async ctx => {
  const aUrlParam = ctx.aUrlParam
  const name = aUrlParam[0]
  const nextPage = aUrlParam[2]
  const perPage = aUrlParam[3]
  const min = aUrlParam[4]
  const max = aUrlParam[5]

  // 将curPage, nextPage, perPage 转化成LIMIT 起点数位置， 将要获取的数目
  const start = nextPage * perPage - perPage
  const offset = perPage
  // 具体商品
  if (name.indexOf('id_') === 0) {
    let id = /^id_(\d)+?$/.exec(name)[1]
    ctx.filter({
      id
    })
  // 根据类别查询商品
  } else if (name.indexOf('type_') === 0) {
    let categoryId = /^type_(\d)+?$/.exec(name)[1]
    ctx.filter({
      categoryId, start, offset
    })
  // 管理员
  } else if (name === 'all') {
    ctx.filter({
      start, offset
    })
  // 只根据名称查询
  } else if (name !== 'all' && min === max) {
    ctx.filter({
      name, start, offset
    })
  // 根据名称和价格范围来查询
  } else if (name !== 'all' && min !== max) {
    ctx.filter({
      name, start, offset, min, max
    })
  }
  await goodsModel.get(ctx)
}

/**
 * 删除商品
 */
exports.delete = async ctx => {
  const id = ctx.aUrlParam[0]
  ctx.filter({
    id
  })
  // model
  await goodsModel.delete(ctx)
}

/**
 * 修改商品
 */
exports.put = async ctx => {
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
    value: postData.categoryId,
    type: ['notNull'],
    code: ['16']
  }])
  if (typeof ret === 'object') {
    ctx.resbody = ret
    return
  }
  ctx.filter(postData)

  // model
  goodsModel.put(ctx)
}

/**
 * 上传图片
 */
exports.addImg = async ctx => {
  const postData = ctx.reqbody
  ctx.filter(postData)

  // model
  await goodsModel.addImg(ctx)
}
