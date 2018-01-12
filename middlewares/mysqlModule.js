const mysql = require('mysql')

/**
 * 数据库模块的常用api的封装
 */
let mysqlModule = {
  pool: null, // 连接池
  /**
   * 创建连接池
   * @param {Object} options 配置对象
   */
  createPool: function (options) {
    this.pool = mysql.createPool(options)
  },
  /**
   * 建立连接
   */
  getConnection: function () {
    let pool = this.pool
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err)
        } else {
          resolve(connection)
        }
      })
    })
  },
  /**
   * 查询操作
   * @param {String} sql sql语句
   * @param {Object} parameters 配置选项
   */
  queryConnection: async function (sql, parameters) {
    let connection
    // 建立连接
    await this.getConnection()
      .then(connc => {
        connection = connc
      })
      .catch(error => {
        console.log(`建立mysql连接时出错：${error}`)
      })
    // 去除空格
    sql = sql.trim()
    // 查询操作
    return new Promise((resolve, reject) => {
      connection.query(sql, parameters, (err, result) => {
        console.log(err)
        // sql语法错误／执行时错误
        if (err) {
          reject(`sql语法错误／执行时错误: ${err}`)
        } else {
          // 查询
          if (sql.indexOf('SELECT') === 0) {
            // 查询成功
            if (result.length > 0) {
              resolve(result)
            // 查询时无结果
            } else {
              reject('无查询结果！')
            }
          // 单一sql语句的增／删／改
          } else if (!Array.isArray(result)) {
            // 操作成功
            if (result.affectedRows > 0) {
              resolve(result.insertId)
            // 操作失败
            } else {
              reject(`单一sql语句的增／删／改 - 操作失败！${err}`)
            }
          // 多sql情况
          } else if (Array.isArray(result)) {
            // 多表插入
            if (sql.indexOf('INSERT') === 0) {
              for (var l = result.length; l--;) {
                let item = result[l]
                if (item.affectedRows > 0 && item.insertId !== 0) {
                  resolve(item.insertId)
                  return
                }
              }
              reject(`多表插入失败！${err}`)
            // 多表删除
            } else if (sql.indexOf('DELETE') === 0) {
              if (result.some(item => item.affectedRows > 0)) {
                resolve(true)
              } else {
                reject(`多表删除失败！${err}`)
              }
              // 多表更新
            } else if (sql.indexOf('UPDATE') === 0) {
              if (result.some(item => item.affectedRows > 0)) {
                resolve(true)
              } else {
                reject(`多表更新失败！${err}`)
              }
            }
          }
        }
        // 释放连接
        connection.release()
      })
    })
  },
  /**
   * 销毁连接
   */
  destroyConnection: function () {
    this.pool.destroy()
  },
  /**
   * 终止连接
   */
  endConnection: function () {
    this.pool.end()
  }
}

module.exports = mysqlModule
