/**
 * 数据缓存模块
 */
module.exports = {
  data: {}, // 数据
  relation: {}, // 映射关系,
  mysqlModule: null,  // mysql模块
  dataMinNum: 16, // 最小数据量
  baseModel: null,  // 基础模型
  /**
   * 设置model
   * @param {String} modelName 模型名称
   * @param {String} modelValue 模型值
   */
  setModel (modelName, modelValue) {
    this.data[modelName].data = modelValue
  },
  /**
   * 获取model
   * @param {String} modelName 模型名称
   * @return {Object} 模型值
   */
  async getModel (modelName) {
    if (this.data[modelName].length === 0) {
      await this.setDefaultModel(modelName)
    }
    return this.data[modelName]
  },
  /**
   * 设置默认model
   * @param {String} modelName model名称
   */
  async setDefaultModel (modelName) {
    const mysqlModule = this.mysqlModule
    const tableName = this.relation[modelName]
    const pageMinNum = this.dataMinNum
    // 存在但不到一页，则增加model中的data
    if (this.data[modelName].data.length <= pageMinNum) {
      await mysqlModule.queryConnection(`SELECT * FROM ${tableName} LIMIT 0, ${pageMinNum}`)
        .then(result => {
          this.setModel(modelName, result)
        })
    }
  },
  /**
   * 检查model是否变化
   * @param {String} modelName model名称
   * @param {Nunber} id 字段id
   */
  async checkDefaultModel (modelName, id) {
    const tableName = this.relation[modelName]
    const mysqlModule = this.mysqlModule
    const pageMinNum = this.dataMinNum
    // 若修改的id在model中能找到
    const isChanged = this.getModel(modelName).data.some(item => item.id === id)
    if (isChanged) {
      // 更新
      await mysqlModule.queryConnection(`SELECT * FROM ${tableName} LIMIT 0, ${pageMinNum}`)
        .then(result => {
          this.setModel(modelName, result)
        })
    }
  },
  /**
   * 附上baseModel
   * @param {Object} ret 查询结果
   */
  addBaseModel (ret) {
    let _baseModel = JSON.parse(JSON.stringify(this.baseModel))
    _baseModel.data = ret
    return _baseModel
  },
  /**
   * 清理缓存
   */
  clearCache () {

  },
  /**
   * 初始化模型
   * @param {Object} modelRelationWithTable 模型与表的关系对象
   * @param {Object} baseModel 基础模型对象
   * @param {Object} mysqlModule mysql模块
   * @param {Number} dataMinNum 数据最小量
   */
  initModel (modelRelationWithTable, baseModel, mysqlModule, dataMinNum) {
    // 设置模型与表关系
    this.relation = modelRelationWithTable
    // 设置baseModel
    this.baseModel = baseModel
    for (var attr in modelRelationWithTable) {
      this.data[attr] = baseModel
    }
    // 挂载mysql模块
    this.mysqlModule = mysqlModule
    // 设置dataMinNum
    this.dataMinNum = dataMinNum
  }
}
