/**

 ------WebKitFormBoundaryeCpoMaySNpv7XIi3
 Content-Disposition: form-data; name="file"; filename="test.gif"
 Content-Type: image/gif

 GIF89aÿÿÿ,D;
 ------WebKitFormBoundaryeCpoMaySNpv7XIi3
 Content-Disposition: form-data; name="name"

 garven
 ------WebKitFormBoundaryeCpoMaySNpv7XIi3
 Content-Disposition: form-data; name="file"; filename="test.gif"
 Content-Type: image/gif

 GIF89aÿÿÿ,D;
 ------WebKitFormBoundaryeCpoMaySNpv7XIi3
 Content-Disposition: form-data; name="age"

 20
 ------WebKitFormBoundaryeCpoMaySNpv7XIi3--

 转化为utf8字符串为：

 '------WebKitFormBoundary6tra3G2ao5YXxZPX\r\nContent-Disposition: form-data; name="file"; filename="test.gif"\r\nContent-Type: image/gif\r\n\r\nGIF89a\u0001\u0000\u0001\u0000�\u0000\u0000���\u0000\u0000\u0000,\u0000\u0000\u0000\u0000\u0001\u0000\u0001\u0000\u0000\u0002\u0002D\u0001\u0000;\r\n------WebKitFormBoundary6tra3G2ao5YXxZPX\r\nContent-Disposition: form-data; name="name"\r\n\r\ngarven\r\n------WebKitFormBoundary6tra3G2ao5YXxZPX\r\nContent-Disposition: form-data; name="file"; filename="test.gif"\r\nContent-Type: image/gif\r\n\r\nGIF89a\u0001\u0000\u0001\u0000�\u0000\u0000���\u0000\u0000\u0000,\u0000\u0000\u0000\u0000\u0001\u0000\u0001\u0000\u0000\u0002\u0002D\u0001\u0000;\r\n------WebKitFormBoundary6tra3G2ao5YXxZPX\r\nContent-Disposition: form-data; name="age"\r\n\r\n20\r\n------WebKitFormBoundary6tra3G2ao5YXxZPX--\r\n'

 */
class FormDataParser {
  constructor (req, cb) {
    this.req = req  // req请求
    this.cb = cb  // 回调
    this.data = null  // 数据
    this.str = ''   // 转化为utf8字符串
    this.result = []  // 分成field
    // 初始化
    this.init()
  }
  /**
   * 获取数据
   */
  init () {
    let req = this.req
    let arr = []
    // 收集数据块
    req.on('data', chunk => {
      arr.push(chunk)
    })
    // 数据接收结束
    req.on('end', () => {
      // 若无数据，如OPTION请求
      if (arr.length === 0) {
        return
      }
      // 若是JSON格式
      try {
        this.cb(JSON.parse(arr.join('')))
      } catch (e) {
        // 拼接数据块成完整数据
        this.data = Buffer.concat(arr)
        // 转化成utf8字符串，提取关键
        this.str = this.data.toString()
        this.getInfo()
        this.getBinary()
      }
    })
  }
  /**
   * 获取非binary信息
   */
  getInfo () {
    // boundary
    let boundary = this.str.split('\r\n')[0]
    // 分成filed
    let filed = this.str.split(boundary)
    filed = filed.slice(1, filed.length - 1)  // 去掉开头('')，结尾('--')
    // 提取非binary信息
    this.result = filed.map(item => {
      return {
        desposition: /^\r\nContent-Disposition:\s(.+?);\s/.exec(item)[1],
        name: /\sname="(.+?)"/.exec(item)[1],
        filename: item.indexOf('filename') > -1 ? encodeURIComponent(/\sfilename="(.+?)"\r\n/.exec(item)[1]) : '',
        data: null,
        contentType: item.indexOf('Content-Type') > -1 ? /\r\nContent-Type:\s(.+?)\r\n/.exec(item)[1] : ''
      }
    })
  }
  /**
   * 获取二进制数据
   */
  getBinary () {
    let position = 0 // binary读取位置记录
    let nrBuf = new Buffer('\r\n\r\n')  // binary数据开头
    let nrBufEnd = new Buffer('\r\n------') // binary数据结尾
    // 读取并加入bianry数据
    this.result.forEach((item, index) => {
      let start = this.data.indexOf(nrBuf, position) + 4  // 开始读取位置 ； 4为 \r\n\r\n 字节数
      let end = this.data.indexOf(nrBufEnd, position)   // 结束位置

      position = end + 8

      // 截取
      item.data = item.filename ? this.data.slice(start, end) : this.data.slice(start, end).toString()
    })
    // 将数组重新格式化为对象
    let ret = {}
    this.result.forEach(item => {
      ret[item.name] = item
    })
    // 返回
    this.cb(ret)
  }
}

module.exports = FormDataParser
