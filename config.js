module.exports = {
  dbOptions: {
    host: '123.207.121.188',
    port: 3306,
    database: 'tiantiantao',
    user: 'garven',
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
    'errorModel': '',  // 错误信息的模型
    'get200Model': '' // 获取成功的模型
  },
  modelDataMinNum: 16
}
