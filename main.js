let { config } = require('./config.js')(runtime, global)
if (!config.ukey) {
  dialogs.rawInput('请通过你的设备ID向管理员索要你的专属KEY，也可运行独立工具/获取本机设备ID获取', device.getAndroidId())
}
engines.execScriptFile(files.cwd() + "/独立工具/抖音极速版[加密版].js", { path: files.cwd() + '/独立工具' })