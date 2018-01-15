const baseTips = require('../middlewares/baseTips')
let Cache = require('../middlewares/cache')
let mysqlModule = require('../middlewares/mysqlModule')
/**
 * 添加类别
 */
exports.add = async ctx => {
  const postData = ctx.filteredData
  await mysqlModule.queryConnection('INSERT INTO Category(name) VALUES(?)', [postData.name])
    .then(async result => {
      await Cache.setDefaultModel('categoryModel')
      ctx.resbody = await Cache.getModel('categoryModel')
    })
    .catch(error => {
      console.log(`添加类别error：${error}`)
      ctx.resbody = baseTips['081']
    })
}

/**
 * 获取类别
 */
exports.get = async ctx => {
  // 查询
  await mysqlModule.queryConnection(`SELECT * FROM Category`)
    .then(result => {
      ctx.resbody = Cache.addBaseModel(result)
    })
    .catch(error => {
      console.log(`查询类别出错：${error}`)
      ctx.resbody = baseTips['082']
    })
}

/**
 * 删除类别
 */
exports.delete = async ctx => {
  const postData = ctx.filteredData
  const id = postData.id
  await mysqlModule.queryConnection(`DELETE FROM Category WHERE idCategory = ?`, [id])
    .then(async result => {
      await Cache.checkDefaultModel('categoryModel', id)
      ctx.resbody = await Cache.getModel('categoryModel')
    })
    .catch(error => {
      console.log(`删除类别出错：${error}`)
      ctx.resbody = baseTips['082']
    })
}

/**
 * 修改类别
 */
exports.put = async ctx => {
  const postData = ctx.filteredData
  await mysqlModule.queryConnection(`UPDATE Category SET name = ? WHERE idCategory = ?`, [postData.name, postData.idCategory])
    .then(async result => {
      await Cache.checkDefaultModel('categoryModel', postData.idCategory)
      ctx.resbody = await Cache.getModel('categoryModel')
    })
    .catch(error => {
      console.log(`修改类别出错：${error}`)
      ctx.resbody = baseTips['082']
    })
}
