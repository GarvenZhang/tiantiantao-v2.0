/**
 * 验证规则
 */
const formvalidateRule = {
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
  '14': {
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
    'retCode': '016',
    'message': '**不能为空！', // ** 可替换
    'statusCode': 400
  }
}
/**
 * 表单验证模块
 */
let formValidate = {
  rPhone: /^1(3|5|8)\d{9}$/,
  rMail: /^[\w\W]+?@\w+?\.(?:com|cn)$/,
  rLegal: /[^\*\\\/\?\"\'\+\^]/,
  rDate: /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/,
  rNum: /^\d*$/,
  notNull: function (val) {
    return val.length !== 0
  },
  isValidPhone: function (val) {
    return this.rPhone.test(val)
  },
  isValidMail: function (val) {
    return this.rMail.test(val)
  },
  minLength: function (val, minlength = 8) {
    return val.length >= minlength
  },
  maxLength: function (val, maxLength = 16) {
    return val.length <= maxLength
  },
  isLegal: function (val) {
    return this.rLegal.test(val)
  },
  isValidDate: function (val) {
    return this.rDate.test(val)
  },
  isNum: function (val) {
    return this.rNum.test(val)
  }
}

/**
 * @desc 得出判断结果
 * @param {String} value 值
 * @param {String} type 判断类型
 * @param {Number} code 判断代码
 * @return {true|Object} 结果
 */
let getResult = function (value, type, code) {
  let ret
  if (type.indexOf(':') > -1) {
    type = type.split(':')[0]
    let limitedNum = type.split(':')[1]
    value = [value, limitedNum]
  } else {
    value = [value]
  }
  console.log(value, type, code)
  if (!formValidate[type](...value)) {
    ret = Object.assign({}, formvalidateRule[code])
    return ret
  }
  return true
}

/**
 * @desc 初始化校验
 * @param {Array} validators 校验规则
 * @example init([
 {
   value: postData.price,
   type: ['notNull', 'isNum'],
   code: ['021', '11']
 },
 {
   value: postData.date,
   type: ['notNull', 'isValidDate'],
   code: ['021', '12']
 }
 ])
 * @return {true|Object} 结果
 */
function init (validators = []) {
  let l = validators.length
  while (l--) {
    let item = validators[l]
    let [value, types, codes] = [item.value, item.type, item.code]
    let k = types.length
    while (k--) {
      let [type, code] = [types[k], codes[k]]
      let ret = getResult(value, type, code)
      if (ret !== true) {
        return ret
      }
    }
  }
  return true
}

module.exports = init
