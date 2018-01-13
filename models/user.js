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
