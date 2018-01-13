// middlewares
let Formvalidate = require('../middlewares/formvalidate')
// models
let categoryModel = require('../models/category')

/**
 * 添加类别
 */
exports.login = async ctx => {
  ctx.render('/login', {
    name: 'hello'
  })
}
