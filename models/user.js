const baseTips = require('../middlewares/baseTips')
let Cache = require('../middlewares/cache')
let mysqlModule = require('../middlewares/mysqlModule')
/**
 * 登陆
 */
exports.login = async ctx => {
  const postData = ctx.filteredData
  await mysqlModule.queryConnection('SELECT idUser FROM User WHERE account = ? AND password = ?', [postData.account, postData.password])
    .then(async result => {
      await Cache.setDefaultModel('categoryModel')
      ctx.resbody = Cache.getModel('categoryModel')
    })
    .catch(error => {
      console.log(`添加类别error：${error}`)
      ctx.resbody = baseTips['081']
    })
}
