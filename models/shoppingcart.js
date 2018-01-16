const baseTips = require('../middlewares/baseTips')
let mysqlModule = require('../middlewares/mysqlModule')

/**
 * 加入购物车
 */
exports.add = async ctx => {
  const postData = ctx.filteredData
  let sql = `
    -- 获取原来的值
    SET @goods = (SELECT goods FROM ShoppingCart WHERE idShoppingCart = ${postData.idUser});
    -- 判断，更新
    SET @ret = IF(@goods IS NULL, ${postData.goodsId}, CONCAT(@goods, ',', ${postData.goodsId}))
    UPDATE ShoppingCart SET goods = @ret WHERE idShoppingCart = ${postData.idUser};
    -- 获取更新后的值
    SET @sta = CONCAT(
      'SELECT * FROM Goods WHERE idGoods IN (',
        'select ', replace(@ret, ',' ,'  union all select '), ' AS name',
      ')
    ');
    -- 执行
    PREPARE sta FROM @sta ;
    EXECUTE sta;
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
  const idGoods = postData.idGoods
  const idUser = postData.idUser
  let sql = `
    -- 获取原来的值
    SET @goods = (SELECT goods FROM ShoppingCart WHERE idShoppingCart = 1);
    -- 判断，更新
    SET @ret = IF(
        (INSTR(@goods, ${idGoods}) = 1) AND (LENGTH(${idGoods}) = LENGTH(@goods)),
        REPLACE(@goods, ${idGoods}, ''), 
        IF(
          INSTR(@goods, ${idGoods}) = (LENGTH(@goods) - LENGTH(${idGoods}) + 1),
            REPLACE(@goods, CONCAT(',' , ${idGoods}), ''),
          REPLACE(@goods, CONCAT(${idGoods}, ','), '')
        )
      );
    UPDATE ShoppingCart SET goods = @ret WHERE idShoppingCart = ${idUser};
    -- 获取更新后的值
    SET @sta = CONCAT(
      'SELECT * FROM Goods WHERE idGoods IN (',
      'select ', replace(@ret, ',' ,'  union all select '), ' AS name',
      ')');
      -- 执行
    PREPARE sta FROM @sta ;
    EXECUTE sta;
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
