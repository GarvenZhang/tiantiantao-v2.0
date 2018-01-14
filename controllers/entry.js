// middlewares
let Formvalidate = require('../middlewares/formvalidate')
// models
let categoryModel = require('../models/category')

/**
 * 登陆
 */
exports.login = async ctx => {
  ctx.render('/login', {
    data: {}
  })
}
/**
 * 注册
 */
exports.register = async ctx => {
  ctx.render('/register', {
    data: {}
  })
}
