
runtime.loadDex('../lib/encrypt.dex')
importClass(com.tony.autojs.tool.encrypt.DecryptRunner)
let encryptedRequire = (() => {
  try {
    return plugins.load('com.tony.encrypted.require')
  } catch (e) {
    console.error('未安装插件' + e)
    toastLog('请安装加密专用插件')
    printExceptionStack(e)
    exit()
  }
})()
let { config } = require('../config.js')(runtime, this)
let decryptRunner = new DecryptRunner(runtime, context)
let key = dialogs.rawInput('请输入你的专属Key', config.ukey)
if (!key || key.length != 44) {
  toastLog('key值不正确，请重新获取')
  exit()
}
config.overwrite('ukey', key)
config.ukey = key
encryptedRequire.setKey(config.ukey)
encryptedRequire.checkExpired()
let timeout = encryptedRequire.inspectExpire()
toastLog('过期时间：' + new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(timeout)))
decryptRunner.decryptAndRunByPlugin(encryptedRequire.javaEncrypt, files.cwd() + "/抖音极速版.ejs", files.cwd())

