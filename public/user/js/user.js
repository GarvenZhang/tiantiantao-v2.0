(function () {
  /**
   * 创建修改密码模板
   * @param parent
   */
  function createPswTpl (parent) {
    let str = ` <form class="form">
                   <div class="form-item clearfix">
                       <label class="form-label">旧密码</label><input type="password" name="oldPsw" class="form-input">
                   </div>
                   <div class="form-item clearfix">
                       <label class="form-label">新密码</label><input type="password" name="newPsw" class="form-input">
                   </div>
                   <div class="form-item clearfix">
                       <label class="form-label">再次确认密码</label><input type="password" name="surePsw" class="form-input">
                   </div>
                   <div class="form-item clearfix">
                       <button class="form-btn" type="button" id="js-sure">确认</button>
                   </div>
               </form>`
    parent.innerHTML = str
  }

  /**
   * 创建修改手机号码模板
   * @param parent
   */
  function createPhoneTpl (parent) {
    let str = ` <form class="form">
                   <div class="form-item clearfix">
                       <label class="form-label">手机号码</label><input type="text" name="mobile" class="form-input">
                   </div>
                   <div class="form-item clearfix">
                       <button class="form-btn" type="button" id="js-sure">确认</button>
                   </div>
               </form>`
    parent.innerHTML = str
  }

  /**
   * 创建修改地址模板
   * @param parent
   */
  function createAddressTpl (parent) {
    let str = ` <form class="form">
                   <div class="form-item clearfix">
                       <label class="form-label">地址</label><input type="text" name="address" class="form-input">
                   </div>
                   <div class="form-item clearfix">
                       <button class="form-btn" type="button" id="js-sure">确认</button>
                   </div>
               </form>`
    parent.innerHTML = str
  }

  /**
   * 创建修改邮箱模板
   * @param parent
   */
  function createEmailTpl (parent) {
    let str = ` <form class="form">
                   <div class="form-item clearfix">
                       <label class="form-label">邮箱</label><input type="text" name="email" class="form-input">
                   </div>
                   <div class="form-item clearfix">
                       <button class="form-btn" type="button" id="js-sure">确认</button>
                   </div>
               </form>`
    parent.innerHTML = str
  }

  /**
   * 确认修改表单
   * @param fn
   */
  function submit (fn) {
    const sure = $('.form-btn')[0]
    sure.onclick = () => {
      fn && fn()
    }
  }

  /**
   * 提交数据
   * @param url
   * @param data
   * @param form
   */
  function postData (url, data, form) {
    console.log(JSON.stringify(data))
    ajax({
      method: 'post',
      url: url,
      data: JSON.stringify(data),
      headers: [
        {
          name: 'Content-Type',
          value: 'application/json'
        }
      ],
      fn: function (data) {
        const result = JSON.parse(data)
        if (result.status) {
          alert('修改成功！')
          form.reset()
        } else {
          alert('请先登录')
          location.href = '/src/login.html'
        }
      }
    })
  }

  /**
   * 进入用户中心
   * @param username
   */
  function enterUserCenter (username) {
    const jsUserCenter = $('#js-user-center')[0]

    if (jsUserCenter) {
      jsUserCenter.onclick = () => {
        if (username) {
          location.href = '/src/user.html'
        } else {
          alert('请先登录')
          location.href = '/src/login.html'
        }
      }
    }
  }

  /**
   * 判断是否登录了
   * @param username
   */
  function isLogin (username) {
    if (username) {
      userInfo.innerHTML = `<span>${username},</span><a href="javascript:;" id="logout">退出登录</a>`
      const logout = $('#logout')[0]
      logout.onclick = () => {
        ajax({
          method: 'GET',
          url: '/user/logout',
          fn: function (data) {
            const result = JSON.parse(data)
            if (result.status) {
              location.href = '/src/login.html'
            }
          }
        })
      }
    } else {
      userInfo.innerHTML = `<span></span><a href="/src/login.html">登录</a>`
    }
  }

  // 获取元素
  const userInfo = $('#userInfo')[0]
  const headerTi = $('.header-ti')[0]
  const userCenterArea = $('#user-center-area')[0]
  const form = $('.form')[0]
  const modifyPsw = $('#modifyPsw')[0]
  const modifyMobile = $('#modifyMobile')[0]
  const modifyAddress = $('#modifyAddress')[0]
  const modifyEmail = $('#modifyEmail')[0]
  const username = getCookie(document.cookie, 'username')

  // 进入用户中心
  enterUserCenter(username)

  // 判断是否登录
  isLogin(username)

  // 初始化用户中心为修改密码
  if (form) {
    submit(() => {
      postData('/user/modify/psw', {
        password: md5(form.newPsw.value.trim())
      }, form)
    })
  }

  // 修改密码
  if (modifyPsw) {
    modifyPsw.onclick = () => {
      headerTi.innerHTML = '修改密码'
      createPswTpl(userCenterArea)
      const form = $('.form')[0]
      submit(() => {
        postData('/user/modify/psw', {
          password: md5(form.newPsw.value.trim())
        }, form)
      })
    }
  }

  // 修改手机号码
  if (modifyMobile) {
    modifyMobile.onclick = () => {
      headerTi.innerHTML = '修改手机号码'
      createPhoneTpl(userCenterArea)
      const form = $('.form')[0]
      submit(() => {
        postData('/user/modify/mobile', {
          mobile: form.mobile.value.trim()
        }, form)
      })
    }
  }

  // 修改地址
  if (modifyAddress) {
    modifyAddress.onclick = () => {
      headerTi.innerHTML = '修改地址'
      createAddressTpl(userCenterArea)
      const form = $('.form')[0]
      submit(() => {
        postData('/user/modify/address', {
          address: form.address.value.trim()
        }, form)
      })
    }
  }

  // 修改邮箱
  if (modifyEmail) {
    modifyEmail.onclick = () => {
      headerTi.innerHTML = '修改邮箱'
      createEmailTpl(userCenterArea)
      const form = $('.form')[0]
      submit(() => {
        postData('/user/modify/email', {
          email: form.email.value.trim()
        }, form)
      })
    }
  }
})()
