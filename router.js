const GoodsController = require('./controllers/goods')

module.exports = app => {
  // 商品模块
  app.get('/v1/goods/:name?curPage=:curPage&nextPage=:nextPage&perPage=:perPage&min=:min&max=:max', GoodsController.get)
  app.post('/v1/goods', GoodsController.post)
  app.delete('/v1/goods/:id', GoodsController.delete)
  app.put('/v1/goods', GoodsController.put)
  app.post('/v1/goods/img', GoodsController.addImg)
  // 类别模块

  // 订单模块

  // 购物车模块

  // 用户模块

}
