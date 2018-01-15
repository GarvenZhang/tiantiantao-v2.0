const express = require('./express/express')
let app = express()
const router = require('./router')
const config = require('./config')
const mysqlModule = require('./middlewares/mysqlModule')
const Cache = require('./middlewares/cache')

// 配置信息
mysqlModule.createPool(config.dbOptions)
Cache.initModel(config.modelRelationWithTable, config.baseModel, mysqlModule, config.modelDataMinNum)
// 设置根路径
app.setRootPath(__dirname)
// 配置view层
app.setViewPath(`${__dirname}/views`)

// 设置路由
router(app)

// 监听端口
app.listen(3000)
