const path = require('path')
const baseTips = require('../middlewares/baseTips')
let Cache = require('../middlewares/cache')
let mysqlModule = require('../middlewares/mysqlModule')
let fsModule = require('../middlewares/fsModule')
/**
 * 添加类别
 */
exports.add = async postData => {
  await mysqlModule.queryConnection('INSERT INTO Category(name) VALUES(?)', [postData.name])
    .then(async result => {
      await Cache.setDefaultModel('categoryModel')
    })
    .catch(error => {
      console.log(`添加类别error：${error}`)
      Cache.setModel('tmpModel', baseTips['081'])
    })
}

/**
 * 获取类别
 */
exports.get = async postData => {
  // 查询
  await mysqlModule.queryConnection(`SELECT * FROM Category`)
    .then(result => {
      Cache.setModel('tmpModel', result)
    })
    .catch(error => {
      console.log(`查询类别出错：${error}`)
      Cache.setModel('tmpModel', baseTips['082'])
    })
}

/**
 * 删除类别
 */
exports.delete = async postData => {
  const id = postData.id
  await mysqlModule.queryConnection(`DELETE FROM Category WHERE idCategory = ?`, [id])
    .then(async result => {
      await Cache.checkDefaultModel('categoryModel', id)
    })
    .catch(error => {
      console.log(`删除类别出错：${error}`)
      Cache.setModel('tmpModel', baseTips['082'])
    })
}

/**
 * 修改类别
 */
exports.put = async postData => {
  await mysqlModule.queryConnection(`UPDATE Category SET name = ? WHERE idCategory = ?`, [postData.name, postData.id])
    .then(async result => {
      await Cache.checkDefaultModel('categoryModel', postData.id)
    })
    .catch(error => {
      console.log(`修改类别出错：${error}`)
      Cache.setModel('tmpModel', baseTips['082'])
    })
}
