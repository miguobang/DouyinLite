var { default_config, config, storage_name: _storage_name } = require('../config.js')(runtime, global)
let singletonRequire = require('../lib/SingletonRequirer.js')(runtime, global)
var configStorage = storages.create(_storage_name)
let FileUtils = singletonRequire('FileUtils')
let commonFunctions = singletonRequire('CommonFunction')
let { logInfo, errorInfo, warnInfo, debugInfo, infoLog, debugForDev, clearLogFile, flushAllLogs } = singletonRequire('LogUtils')
config.not_lingering_float_window = true
if (!commonFunctions.ensureAccessibilityEnabled()) {
  errorInfo('获取无障碍权限失败')
  exit()
}
let unlocker = require('../lib/Unlock.js')
unlocker.exec()

let mainScriptPath = FileUtils.getRealMainScriptPath(true)
let configuration = {
  executeByTimeTask: true,
  needRelock: unlocker.needRelock(),
  exitInMinutes: 240,
  // 只逛街
  shoppingOnly: true,
  // 不看视频
  noVideoWatch: true,
}
ui.run(function () {
  engines.execScriptFile(mainScriptPath + "/独立工具/抖音极速版[加密版].js", { path: mainScriptPath + "/独立工具/", arguments: configuration })
})
