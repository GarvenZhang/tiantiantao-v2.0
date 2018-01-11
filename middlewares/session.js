let sessionsModule = {
  sessions: {}, // session列表
  session_id: '', // 当前处理的session_id
  EXPIRES: 20 * 60 * 1000,  // 2h过期时间
  CHAR: '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM', // 随机字符串
  // 添加session
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
    this.session_id = sessionId
    // expires
    let dt = new Date().getTime() + EXPIRES
    // 存进去
    let session = {
      sessionId,
      expires: dt,
      visitTimes: 1
    }
    sessions[sessionId] = session
  },
  // 更新session
  update: function () {
    let sessions = this.sessions
    let sessionId = this.session_id
    let EXPIRES = this.EXPIRES
    // expires
    sessions[sessionId].expires = new Date().getTime() + EXPIRES
    // visitTimes
    ++sessions[sessionId].visitTimes
    // session_id
    this.session_id = sessionId
  },
  // 设置session
  set: function (res) {
    res.setHeader('Set-Cookie', `session_id=${this.session_id}; httpOnly`)
  },
  // 删除指定session
  remove: function (session) {
    delete this.sessions[session.sessionId]
  },
  // 清楚过期的session
  clean: function () {
    let sessions = this.sessions
    for (var session in sessions) {
      if (session.expires < new Date().getTime()) {
        this.remove(session)
      }
    }
  },
  // 取cookie
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
  // 初始化
  init: function (cookies, res) {
    let sessions = this.sessions
    this.session_id = this.getCookie(cookies, 'session_id')
    // 无则创建，有则更新
    let sessionId = this.session_id
    if (!sessionId) {
      this.add()
    } else if (sessions[sessionId].expires > new Date().getTime()) {
      this.update()
    } else {
      this.remove(sessions[sessionId])
    }
    this.set(res)
    return sessions[this.session_id]
  }
}

module.exports = sessionsModule
