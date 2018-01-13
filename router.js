const GoodsController = require('./controllers/goods')
const CategoryController = require('./controllers/category')
const EntryController = require('./controllers/entry')
const IndexController = require('./controllers/index')
const AdminController = require('./controllers/admin')
module.exports = app => {
  // 商品模块
  app.get('/v1/goods/:name?curPage=:curPage&nextPage=:nextPage&perPage=:perPage&min=:min&max=:max', GoodsController.get)
  app.post('/v1/goods', GoodsController.post)
  app.delete('/v1/goods/:id', GoodsController.delete)
  app.put('/v1/goods', GoodsController.put)
  app.post('/v1/goods/img', GoodsController.addImg)
  // 类别模块
  app.get('/v1/category', CategoryController.get)
  app.post('/v1/category', CategoryController.post)
  app.delete('/v1/category/:id', CategoryController.delete)
  app.put('/v1/category', CategoryController.put)
  // 订单模块

  // 购物车模块

  // 用户模块

  // ------------------------ 直出模版 --------------------------- //
  // 登陆
  app.get('/login', EntryController.login)
  app.get('/register', EntryController.register)
  // 官网
  app.get('/', IndexController.index)
  app.get('/list?:param', IndexController.list)
  app.get('/detail?:id', IndexController.detail)
  app.get('/shopping-cart?:id', IndexController.shoppingCart)
  app.get('/order-form?:id', IndexController.orderForm)
  app.get('/info/userInfo', IndexController.userInfo)
  app.get('/info/orderFormInfo', IndexController.orderFormInfo)
  // cms
  app.get('/admin/goods', AdminController.goods)
  app.get('/admin/vip', AdminController.vip)
  app.get('/admin/type', AdminController.type)
  app.get('/admin/orderForm', AdminController.orderForm)
}
