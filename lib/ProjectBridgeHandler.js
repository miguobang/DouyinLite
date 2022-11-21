let singletonRequire = require('./SingletonRequirer.js')(runtime, this)

module.exports = function (BaseHandler) {
  // 扩展方法 
  
  BaseHandler.loadExpired = (data, callbackId) => {
    let ukey = data.ukey
    if (ukey && ukey.length > 44) {
      console.log('key length: ' + ukey.length)
      let encryptedRequire = (() => {
        try {
          return plugins.load('com.tony.encrypted.require')
        } catch (e) {
          console.error('未安装插件' + e)
          toastLog('未安装加密专用插件')
        }
      })()
      encryptedRequire.setKey(config.ukey)
      let timeout = encryptedRequire.inspectExpire()
      timeout = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(timeout))
      postMessageToWebView({ callbackId: callbackId, data: timeout })
    }
  }
  return BaseHandler
}