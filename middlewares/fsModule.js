const fs = require('fs')

/**
 * fs模块的封装
 */
module.exports = {
  /**
   * 写文件
   * @param {String} path 文件路径
   * @param {Binary|String|Buffer} data 文件数据
   * @param {Object} optoins 配置对象
   */
  writeFile (path, data, options) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, options, err => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }
}
