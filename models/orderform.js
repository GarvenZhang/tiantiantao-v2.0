const baseTips = require('../middlewares/baseTips')
let mysqlModule = require('../middlewares/mysqlModule')

/**
 * 生成订单
 */
exports.add = async ctx => {
  const postData = ctx.filteredData
  let sql = `
    
  `
  await mysqlModule.queryConnection(sql)
    .then(async result => {
      let baseModel = JSON.parse(JSON.stringify(baseTips['200']))
      baseModel.data = result
      ctx.resbody = baseModel
    })
    .catch(error => {
      console.log(`添加商品error：${error}`)
      ctx.resbody = baseTips['082']
    })
}

/**
 * 删除订单
 */
exports.clear = async ctx => {
  const postData = ctx.filteredData
  let sql = `
    UPDATE ShoppingCart SET goods = '' WHERE idShoppingCart = ${postData.idUser};
  `
  await mysqlModule.queryConnection(sql)
    .then(result => {
      ctx.resbody = baseTips['09']
    })
    .catch(error => {
      console.log(`查询商品出错：${error}`)
      ctx.resbody = baseTips['082']
    })
}

/**
 * 查找订单
 */
exports.delete = async ctx => {
  const postData = ctx.filteredData
  const idGoods = postData.idGoods
  const idUser = postData.idUser
  let sql = `

  `
  await mysqlModule.queryConnection(sql)
    .then(async result => {
      let baseModel = JSON.parse(JSON.stringify(baseTips['200']))
      baseModel.data = result
      ctx.resbody = baseModel
    })
    .catch(error => {
      console.log(`删除商品出错：${error}`)
      ctx.resbody = baseTips['082']
    })
}
/**
 * 结算订单(用户)／执行订单(管理员)
 */

