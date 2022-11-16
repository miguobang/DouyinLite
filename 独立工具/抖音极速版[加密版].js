
// runtime.loadDex('../lib/encrypt.dex')
// importClass(com.tony.autojs.tool.encrypt.DecryptRunner)
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

let singletonRequire = require('../lib/SingletonRequirer.js')(runtime, global)
let commonFunctions = singletonRequire('CommonFunction')
try {
  if (!commonFunctions.ensureAccessibilityEnabled()) {
    errorInfo('获取无障碍权限失败')
    exit()
  }
} catch (e) {
  toastLog('无障碍异常 重新启动' + e)
  commonFunctions.disableAccessibilityAndRestart()
}
// let decryptRunner = new DecryptRunner(runtime, context)
let args = engines.myEngine().execArgv
console.log('来源参数：' + JSON.stringify(args))
let executeByTimeTask = args.executeByTimeTask
if (!executeByTimeTask) {
  let key = dialogs.rawInput('请输入你的专属Key', config.ukey)
  if (!key || key.length != 44) {
    toastLog('key值不正确，请重新获取')
    exit()
  }
  config.overwrite('ukey', key)
  config.ukey = key
}
encryptedRequire.setKey(config.ukey)
encryptedRequire.checkExpired()
let timeout = encryptedRequire.inspectExpire()
toastLog('过期时间：' + new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(timeout)))

encryptedRequire.javaEncrypt.decryptAndRun(runtime, files.cwd() + "/抖音极速版.ejs", fillConfig({ path: files.cwd(), arguments: args}))


function fillConfig(c){
  var config = new com.stardust.autojs.execution.ExecutionConfig();
  c = c || {};
  c.path = c.path || files.cwd();
  if(c.path){
     config.workingDirectory = c.path;
  }
  config.delay = c.delay || 0;
  config.interval = c.interval || 0;
  config.loopTimes = (c.loopTimes === undefined)? 1 : c.loopTimes;
  if(c.arguments){
      var arguments = c.arguments;
      for(var key in arguments){
          if(arguments.hasOwnProperty(key)){
              config.setArgument(key, arguments[key]);
          }
      }
  }
  return config;
}

