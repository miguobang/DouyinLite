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

// let decryptRunner = new DecryptRunner(runtime, context)
let args = engines.myEngine().execArgv
console.log('来源参数：' + JSON.stringify(args))
let singletonRequire = require('../lib/SingletonRequirer.js')(runtime, global)
let commonFunctions = singletonRequire('CommonFunction')
let logUtils = singletonRequire('LogUtils')
try {
  if (!commonFunctions.ensureAccessibilityEnabled()) {
    errorInfo('获取无障碍权限失败')
    exit()
  }
  auto()
} catch (e) {
  toastLog('无障碍异常 重新启动' + e)
  commonFunctions.setTaskArgs(args)
  commonFunctions.disableAccessibilityAndRestart()
}
if (!args.intent && !args.executeByTimeTask) {
  let key = dialogs.rawInput('请输入你的专属Key', config.ukey)
  if (!key || key.length < 44) {
    toastLog('key值不正确，请重新获取')
    exit()
  }
  config.overwrite('ukey', key)
  config.ukey = key
} else {
  if (!args.executeByTimeTask) {
    args = JSON.parse(commonFunctions.getTaskArgs())
    logUtils.debugInfo(['从缓存中重新获取配置信息：{}', args])
  }
}
encryptedRequire.setKey(config.ukey)
encryptedRequire.checkExpired()
let timeout = encryptedRequire.inspectExpire()
toastLog('过期时间：' + new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(timeout)))

function fillConfig(c) {
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


encryptedRequire.javaEncrypt.decryptAndRun(runtime, files.cwd() + "/今日头条极速版.ejs", fillConfig({ path: files.cwd(), arguments: args}))
