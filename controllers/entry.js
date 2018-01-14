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
