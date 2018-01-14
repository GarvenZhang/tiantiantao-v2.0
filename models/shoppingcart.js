const path = require('path')
const baseTips = require('../middlewares/baseTips')
let Cache = require('../middlewares/cache')
let mysqlModule = require('../middlewares/mysqlModule')
let fsModule = require('../middlewares/fsModule')

/**
 * 加入购物车
 */
exports.add = async ctx => {
  const postData = ctx.filteredData
  let sql = `
    SET @goods = (SELECT goods FROM ShoppingCart WHERE idShoppingCart = ${postData.idUser});
    UPDATE ShoppingCart SET goods = (
      IF(@goods IS NULL, ${postData.goodsId}, CONCAT(@goods, ',', ${postData.goodsId}))
    ) WHERE idShoppingCart = ${postData.idUser};
    SET @updatedGoods = (SELECT goods FROM ShoppingCart WHERE idShoppingCart = ${postData.idUser});
    SET @sta = CONCAT(
      'SELECT * FROM Goods WHERE idGoods IN (',
        'select ', replace(@goods, ',' ,'  union all select '), ' AS name',
      ')
    ');
    PREPARE sta FROM @sta ;
    EXECUTE sta;
  `
  await mysqlModule.queryConnection(sql)
    .then(async result => {
      ctx.resbody = result
    })
    .catch(error => {
      console.log(`添加商品error：${error}`)
      ctx.resbody = baseTips['082']
    })
}

/**
 * 清空购物车
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
 * 删除购物车中的商品
 */
exports.delete = async ctx => {
  const postData = ctx.filteredData
  const id = postData.id
  await mysqlModule.queryConnection(`DELETE FROM Goods WHERE idGoods = ?`, [id])
    .then(async result => {
      await Cache.checkDefaultModel('goodsModel', id)
      ctx.resbody = await Cache.getModel('goodsModel')
    })
    .catch(error => {
      console.log(`删除商品出错：${error}`)
      ctx.resbody = baseTips['082']
    })
}
