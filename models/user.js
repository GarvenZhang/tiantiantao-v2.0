const baseTips = require('../middlewares/baseTips')
let Cache = require('../middlewares/cache')
let mysqlModule = require('../middlewares/mysqlModule')
let session = require('../middlewares/session')
/**
 * 登陆
 */
exports.login = async ctx => {
  const postData = ctx.filteredData
  await mysqlModule.queryConnection('SELECT idUser FROM User WHERE account = ? AND password = ?', [postData.account, postData.password])
    .then(async result => {
      session.init(ctx.headers['cookie'], result, ctx.res)
      // 管理员权限
      if (ctx.account === 'admin') {
        ctx.res.redirect('/admin/goods')
      // 用户权限
      } else {
        ctx.res.redirect('/info/userInfo')
      }
    })
    .catch(error => {
      console.log(`添加类别error：${error}`)
      ctx.resbody = baseTips['081']
    })
}

/**
 * 注册
 */
exports.register = async ctx => {
  const postData = ctx.filteredData
  let sql = `
    INSERT INTO User(account, password, name, sex) VALUES(${postData.account}, ${postData.password}, ${postData.name}, ${postData.sex});
    SET @lastId = (SELECT @@IDENTITY);
    INSERT INTO ShoppingCart(idShoppingCart) VALUES(@lastId);
  `
  await mysqlModule.queryConnection(sql)
    .then(async result => {
      ctx.resbody = baseTips['00']
    })
    .catch(error => {
      console.log(`添加类别error：${error}`)
      ctx.resbody = baseTips['081']
    })
}

/**
 * 修改资料
 */
exports.put = async ctx => {
  const postData = ctx.filteredData
  await mysqlModule.queryConnection('UPDATE User SET password = ? AND name = ? AND sex = ? WHERE idUser = ?', [postData.password, postData.name, postData.sex, postData.idUser])
    .then(async result => {
      session.put(result.idUser, result)
    })
    .catch(error => {
      console.log(`添加类别error：${error}`)
      ctx.resbody = baseTips['081']
    })
}

/**
 * 解冻/冻结vip - 管理员
 * 升级为vip - 用户
 */
exports.putVip = async ctx => {
  const postData = ctx.filteredData
  await mysqlModule.queryConnection('UPDATE User SET isVip = ? WHERE idUser = ?', [postData.isVip, postData.idUser])
    .then(async result => {
      session.put(postData.idUser, {
        isVip: postData.isVip
      })
    })
    .catch(error => {
      console.log(`添加类别error：${error}`)
      ctx.resbody = baseTips['082']
    })
}
