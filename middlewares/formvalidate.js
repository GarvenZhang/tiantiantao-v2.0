const baseTips = require('./baseTips')
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
  if (!formValidate[type](...value)) {
    ret = Object.assign({}, baseTips[code])
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
