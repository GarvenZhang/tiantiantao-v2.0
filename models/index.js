const baseTips = require('../middlewares/baseTips')
let mysqlModule = require('../middlewares/mysqlModule')
/**
 * 生成订单页
 */
exports.orderForm = async ctx => {
  const postData = ctx.filteredData
  let sql = `
    -- 获取原来的值
    SET @goods = (SELECT goods FROM ShoppingCart WHERE idShoppingCart = ${postData.idUser});
    -- 获取更新后的值
    SET @sta = CONCAT(
      'SELECT * FROM Goods WHERE idGoods IN (',
        'select ', replace(@goods, ',' ,'  union all select '), ' AS name',
      ')
    ');
    -- 执行
    PREPARE sta FROM @sta ;
    EXECUTE sta;
  `
  mysqlModule.queryConnection(sql)
    .then(async result => {
      ctx.resbody = result
    })
    .catch(error => {
      console.log(`添加商品error：${error}`)
      ctx.resbody = baseTips['082']
    })
}
