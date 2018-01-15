/**
 * 基本提示
 */
module.exports = {
  '00': {
    'status': 'success',
    'retCode': '00',
    'message': '注册成功！',
    'statusCode': 200
  },
  '01': {
    'status': 'success',
    'retCode': '01',
    'message': '登陆成功！',
    'statusCode': 200
  },
  '011': {
    'status': 'failed',
    'retCode': '011',
    'message': '账号或密码错误！',
    'statusCode': 401
  },
  '02': {
    'status': 'failed',
    'retCode': '02',
    'message': '账号不存在！',
    'statusCode': 401
  },
  '021': {
    'status': 'failed',
    'retCode': '021',
    'message': '用户名已被注册！',
    'statusCode': 409
  },
  '022': {
    'status': 'failed',
    'retCode': '022',
    'message': '用户名包含非法字符！',
    'statusCode': 400
  },
  '03': {
    'status': 'failed',
    'retCode': '03',
    'message': '密码错误！',
    'statusCode': 416
  },
  '031': {
    'status': 'failed',
    'retCode': '031',
    'message': '密码包含非法字符！',
    'statusCode': 400
  },
  '032': {
    'status': 'failed',
    'retCode': '032',
    'message': '密码长度小于最小值！',
    'statusCode': 400
  },
  '033': {
    'status': 'failed',
    'retCode': '033',
    'message': '密码长度大于最大值！',
    'statusCode': 400
  },
  '04': {
    'status': 'failed',
    'retCode': '04',
    'message': '未选择性别！',
    'statusCode': 400
  },
  '051': {
    'status': 'failed',
    'retCode': '051',
    'message': '联系方式包含非法字符！',
    'statusCode': 400
  },
  '052': {
    'status': 'failed',
    'retCode': '052',
    'message': '手机位数非11位！',
    'statusCode': 400
  },
  '061': {
    'status': 'failed',
    'retCode': '061',
    'message': '地址包含非法字符！',
    'statusCode': 400
  },
  '07': {
    'status': 'failed',
    'retCode': '07',
    'message': '邮箱格式不正确！',
    'statusCode': 400
  },
  '08': {
    'status': 'success',
    'retCode': '08',
    'message': '添加成功！',
    'statusCode': 201
  },
  '081': {
    'status': 'failed',
    'retCode': '081',
    'message': '已存在！',
    'statusCode': 409
  },
  '082': {
    'status': 'failed',
    'retCode': '082',
    'message': '不存在！'
  },
  '09': {
    'status': 'success',
    'retCode': '09',
    'message': '删除成功！',
    'statusCode': 416
  },
  '10': {
    'status': 'success',
    'retCode': '10',
    'message': '更新成功！',
    'statusCode': 202
  },
  '11': {
    'status': 'failed',
    'retCode': '11',
    'message': '非数字！',
    'statusCode': 400
  },
  '12': {
    'status': 'failed',
    'retCode': '12',
    'message': '非YYYY-MM-DD HH:MM:SS格式！',
    'statusCode': 400
  },
  '13': {
    'status': 'failed',
    'retCode': '13',
    'message': '超过范围！',
    'statusCode': 416
  },
  '200': {
    'status': 'success',
    'retCode': '14',
    'message': '获取成功！',
    'statusCode': 200
  },
  '15': {
    'status': 'failed',
    'retCode': '15',
    'message': '存在外键！',
    'statusCode': 409
  },
  '16': {
    'status': 'failed',
    'retCode': '16',
    'message': '**不能为空！', // ** 可替换
    'statusCode': 400
  },
  '401': {
    'status': 'failed',
    'retCode': '401',
    'message': '未授权！',
    'statusCode': 401
  },
  '500': {
    'status': 'failed',
    'retCode': '500',
    'message': '服务器内部错误！',
    'statusCode': 500
  }
}
