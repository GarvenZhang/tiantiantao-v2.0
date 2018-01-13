module.exports = {
  dbOptions: {
    host: 'localhost',
    port: 3306,
    database: 'tiantiantao',
    user: 'root',
    password: '970226'
  },
  baseModel: {
    'status': 'success',
    'statusCode': 200,
    'data': []
  },
  modelRelationWithTable: {
    'goodsModel': 'Goods',
    'userModel': 'User',
    'categoryModel': 'Category',
    'smImgSrcModel': 'SmImgSrc',
    'shoppingCartModel': 'ShoppingCart',
    'orderFormModel': 'OrderForm',
    'errorModel': '',  // 错误信息的模型
    'get200Model': '' // 获取成功的模型
  },
  modelDataMinNum: 16
}
