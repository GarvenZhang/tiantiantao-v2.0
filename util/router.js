const fs = require('fs')
const FormDataParser = require('./FormDataParser')

/**
 * 路由配置模块
 */
let router = {
  gets: {}, // get请求类型的url集合
  posts: {},  // post请求类型的url集合
  puts: {}, // put请求类型的url集合
  deletes: {},  // delete请求类型的url集合

  /**
   * @desc 获取首页html
   * @param {Object} res
   */
  goIndex: (ctx) => {
    const res = ctx.res
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end(fs.readFileSync(`${ctx.realpath}index.html`))
  },

  /**
   * 处理api
   * @param {Object} ctx 内容主体
   */
  dealWithAPI: async function (ctx) {
    const res = ctx.res
    const pathname = ctx.url.path

    // 请求方法处理
    switch (ctx.method) {
      case 'GET':
        await handleAPICategory(this.gets, pathname, res, ctx)
        break
      case 'POST':
        await handleAPICategory(this.posts, pathname, res, ctx)
        break
      case 'PUT':
        await handleAPICategory(this.puts, pathname, res, ctx)
        break
      case 'DELETE':
        await handleAPICategory(this.deletes, pathname, res, ctx)
        break
      case 'OPTIONS':
        // 默认状态码
        res.statusCode = 200
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', '*') // x-requested-with ...注意
        res.end()
        break
      default:
        res.writeHead(405, {
          'Content-Type': 'application/json',
          'Allow': 'GET/POST/PUT/DELETE/OPTIONS'
        })
        res.end(JSON.stringify({
          error: `不支持${ctx.method}请求方法！`
        }))
    }
  },

  /**
  * @desc 获取其它静态资源
  * @param {String} pathname
  * @param {String} realPath
  * @param {Object} res
  */
  dealWithStatic: (ctx) => {
    const realPath = ctx.realpath
    const pathname = ctx.url.pathname
    const res = ctx.res
    // 首先检测文件是否存在
    fs.exists(realPath, exists => {
      if (!exists) {
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        })
        res.end(`This request url ${pathname} was not found in this server!`)
      } else {
        // 获取后缀名
        let pointPosition = pathname.lastIndexOf('.')
        let mimeString = pathname.substring(pointPosition + 1)
        let mimeType

        // mime格式匹配
        switch (mimeString) {
          case 'css':
            mimeType = 'text/css'
            break
          case 'jpeg':
            mimeType = 'image/jpeg'
            break
          case 'js':
            mimeType = 'text/javascript'
            break
          default :
            mimeType = 'text/plain'
            break
        }
        // 读取文件并发送
        fs.readFile(realPath, (err, file) => {
          if (err) {
            res.writeHead(500, {
              'Content-Type': 'text/plain'
            })
            res.end(err)
          } else {
            res.writeHead(200, {
              'Content-Type': mimeType
            })
            res.write(file)
            res.end()
          }
        })
      }
    })
  }
}

/**
 * @desc 处理4种请求方法
 * @param {Object} categoryObj
 * @param {String} pathname
 * @param {Object} res
 * @param {Object} ctx
 */
async function handleAPICategory (categoryObj, pathname, res, ctx) {
  // 1.看看直接匹配是否有此api
  if (categoryObj[pathname]) {
    await successAPIHandle(categoryObj, pathname, res, ctx)
    return
  }

  // 2.若没有，看看是否为正则型接口
  let isExistedAPIReg = handleAPIReg(categoryObj, pathname, ctx)
  if (isExistedAPIReg) {
    await successAPIHandle(categoryObj, isExistedAPIReg, res, ctx)
    return
  }

  // 3.若还没有，则不存在，返404
  res.writeHead(404, {
    'Content-Type': 'application/json'
  })
  res.end(JSON.stringify({
    error: `不存在此接口！`
  }))
}

/**
 * @desc 成功处理api
 * @param {Object} categoryObj
 * @param {String} pathname
 * @param {Object} res
 * @param {Object} ctx
 */
async function successAPIHandle (categoryObj, pathname, res, ctx) {
  let callback = categoryObj[pathname]
  // 数据读取
  if (ctx.method === 'POST' || ctx.method === 'PUT') {
    await new Promise((resolve, reject) => {
      new FormDataParser(ctx.req, data => {
        ctx.reqbody = data
        resolve()
      })
    })
  }
  // 默认响应头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  // 数据逻辑处理
  await callback(ctx)
  // 设置状态码
  if (ctx.resbody.statusCode) {
    res.statusCode = ctx.resbody.statusCode
    delete ctx.resbody.statusCode
  } else {
    res.statusCode = 200
  }
  // 发送相应内容
  // html文件
  if (typeof ctx.resbody === 'string') {
    res.setHeader('Content-Type', 'text/html')
    res.end(ctx.resbody)
  // json格式数据
  } else if (typeof ctx.resbody === 'object') {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(ctx.resbody))
  }
}

/**
 * @desc 处理api中的正则匹配
 * @example /v1/api/123/books?username=garven&password=9898p 匹配 /v1/api/:id/books?username=:name&password=:pwd
 * @param {String} pathname
 * @return {String|Boolean}
 */
function handleAPIReg (categoryObj, pathname, ctx) {
  let apiReg
  for (var api in categoryObj) {
    // 把注册的api变为正则
    apiReg = api.replace(/\//g, '\\\/')
      .replace(/\?/g, '\\\?')
      .replace(/:\w+?(\\\/|&|\\\?|$)/g, '([\\w\u4e00-\u9fa5]*?)$1')
    apiReg = RegExp(`^${apiReg}$`)
    // 判断：若能匹配，则把捕获组依次放入数组中
    let apiRegRet = pathname.match(apiReg)
    if (apiRegRet && apiRegRet.length > 0) {
      ctx.aUrlParam = apiRegRet.splice(1)
      return api
    }
  }
  return false
}

module.exports = router
