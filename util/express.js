const http = require('http')
const router = require('./router')
const bodyParser = require('./bodyParser')
const mysqlModule = require('../middlewares/mysqlModule')
const fsModule = require('../middlewares/fsModule')

/**
 * express对象
 * 借鉴了jquery的无new创建对象的思想
 */
function express () {
  return new express.fn.init()
}
express.fn = express.prototype = {
  constructor: express,
  init: function () {
    this.rootpath = ''
    this.dbOptions = {}
    this.pool = null
    this.connection = null
  },
  setRootPath: function (path) {
    this.rootpath = path
  },
  /**
   * listen方法
   * 因为我想要实现的是`app.listen()`这样的用法，所以巧妙的在app对象上设置了一个假的listen方法，内部才是http模块的监听方法
   * @param {String} port 端口号
   * @param {Function} callback 回调
   */
  listen: function (port, callback) {
    const self = this

    // 创建server对象
    const server = http.createServer((req, res) => {
      let isReqReg = /\/[^./]*?$/   // 判断是否为api接口的正则

      // bodyParser中间层，解析请求主体和请求头等
      let ctx = bodyParser(req, res, self.rootpath)

      // 获得当前index.html路径
      let pathname = ctx.url.pathname

      // 请求url的判断
      // 排除/favicon.ico
      if (pathname == '/favicon.ico') {
      // 首页html文件
      } else if (pathname == '/index' || pathname == '/') {
        router.goIndex(ctx)
      // 接口api
      } else if (isReqReg.test(pathname)) {
        router.dealWithAPI(ctx)
      // 其它静态资源请求
      } else {
        router.dealWithStatic(ctx)
      }
    })
    // 监听
    server.listen(port, callback)
  },
  /**
   * get请求
   * @param {String} url 请求路径
   * @param {Function} controller 控制器
   */
  get: function (url, controller) {
    router.gets[url] = controller
  },
  /**
   * post请求
   * @param {String} url 请求路径
   * @param {Function} controller 控制器
   */
  post: function (url, controller) {
    router.posts[url] = controller
  },
  /**
   * put请求
   * @param {String} url 请求路径
   * @param {Function} controller 控制器
   */
  put: function (url, controller) {
    router.puts[url] = controller
  },
  /**
   * delete请求
   * @param {String} url 请求路径
   * @param {Function} controller 控制器
   */
  delete: function (url, controller) {
    router.deletes[url] = controller
  }
}
express.fn.init.prototype = express.fn

module.exports = express
