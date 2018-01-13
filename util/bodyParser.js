const url = require('url')
const ejs = require('ejs')
const fs = require('fs')
/**
 * bodyParser中间件
 * 主要是解析出请求方法，请求头，请求路径，请求主体，和响应主体，还有绝对路径
 * @param {Object} req 请求对象
 * @param {Object} res 响应独享
 * @param {String} dirname 根目录的绝对路径
 * @return {Object} ctx对象
 */
const bodyParser = function (req, res, dirname, viewPath) {
  let ctx = {}
  ctx.method = req.method
  ctx.headers = req.headers
  ctx.url = url.parse(decodeURI(req.url))
  ctx.reqbody = {}
  ctx.filteredData = {}
  ctx.resbody = {}
  ctx.realpath = `${dirname}/dist${ctx.url.pathname}` // 此处设置在/dist下是因为前端的静态资源都在压缩文件都在dist中
  ctx.viewPath = viewPath
  ctx.res = res
  ctx.req = req
  /**
   * 过滤数据
   * @param {Object} postData controller处理后的数据
   */
  ctx.filter = function (postData) {
    Object.assign(this.filteredData, postData)
  }
  /**
   * 通过ejs渲染
   * @param {String} templateName 模版所在路径
   * @param {Object} data 传达给ejs的数据
   */
  ctx.render = function (templateName, data = {}) {
    const templateStr = fs.readFileSync(`${this.viewPath}${templateName}.ejs`, 'utf8')
    this.resbody = ejs.render(templateStr, data)
  }
  return ctx
}

module.exports = bodyParser
