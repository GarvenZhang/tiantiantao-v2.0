let sessionsModule = {
  sessions: {}, // session列表
  EXPIRES: 20 * 60 * 1000,  // 2h过期时间
  CHAR: '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM', // 随机字符串
  /**
   * 添加session
   */
  add: function () {
    let CHAR = this.CHAR
    let EXPIRES = this.EXPIRES
    let sessions = this.sessions
    let sessionId = ''
    // 算法
    for (let l = 40; l--;) {
      let position = Math.random() * CHAR.length | 0
      sessionId += CHAR.substring(position, position + 1)
    }
    // expires
    let dt = new Date().getTime() + EXPIRES
    // 存进去
    let session = {
      sessionId,
      account: '',
      expires: dt,
      userData: {},
      visitTimes: 1
    }
    sessions[sessionId] = session
  },
  /**
   * 更新session
   */
  update: function (sessionId) {
    let sessions = this.sessions
    let EXPIRES = this.EXPIRES
    // expires
    sessions[sessionId].expires = new Date().getTime() + EXPIRES
    // visitTimes
    ++sessions[sessionId].visitTimes
  },
  /**
   * 设置session
   * @param {Object} res 响应对象
   */
  set: function (res, sessionId) {
    res.setHeader('Set-Cookie', `session_id=${sessionId}; httpOnly`)
  },
  /**
   * 删除指定session
   * @param {Object} sessionId 某个session的id
   */
  remove: function (sessionId) {
    delete this.sessions[sessionId]
  },
  /**
   * 清除过期的session
   */
  clean: function () {
    let sessions = this.sessions
    for (var session in sessions) {
      if (session.expires < new Date().getTime()) {
        this.remove(session)
      }
    }
  },
  /**
   * 从cookie中获取特定值
   * @param {String} cookies 请求头cookies
   * @param {String} name 名称
   */
  getCookie: function (cookies = '', name) {
    let result = ''
    let item = []
    // 先截断分号;
    item = cookies.split(';')
    // 再截断等号=
    item.forEach(function (item, i, len) {
      var _name = item.split('=')[0].trim()
      // 匹配
      if (_name === name) {
        result = item.split('=')[1].trim()
      }
    })
    return result
  },
  /**
   * 修改session
   * @param {String} id 用户id
   * @param {Object} userData 用户数据
   */
  put: function (id, userData) {
    const sessions = this.sessions
    sessions[id] = userData
  },
  /**
   * 获取用户信息
   * @param {String} cookies 请求头cookies字段值
   * @return {Object} 用户信息
   */
  getSession: function (cookies) {
    let sessions = this.sessions
    let sessionId = this.getCookie(cookies, 'session_id')
    return sessions[sessionId]
  },
  /**
   * 初始化sessions
   * @param {String} cookies 请求头中的cookie字段值
   * @param {Object} userData 用户信息
   * @param {Object} res 响应对象
   */
  init: function (cookies, userData, res) {
    let sessions = this.sessions
    let sessionId = this.getCookie(cookies, 'session_id')
    // 无则创建，有则更新
    if (!sessionId) {
      this.add()
    } else if (sessions[sessionId].expires > new Date().getTime()) {
      this.update(sessionId)
    } else {
      this.remove(sessionId)
    }
    // 设置相应头中的cookie字段
    this.set(res, sessionId)
  }
}

module.exports = sessionsModule
