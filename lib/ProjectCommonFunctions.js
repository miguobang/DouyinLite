/**
 * 每个项目里面新增或者修改的方法集合
 */

let singletonRequire = require('./SingletonRequirer.js')(runtime, this)
let storageFactory = singletonRequire('StorageFactory')
let BaseCommonFunction = require('./BaseCommonFunctions.js')
const WATCHED_RANK = "WATCHED_RANK"
const KNOWN_CHECK = "KNOWN_CHECK"
const SIGN_CHECK = "SIGN_CHECK"
/**
 * 项目新增的方法写在此处
 */
const ProjectCommonFunction = function () {
  BaseCommonFunction.call(this)
  let _this = this
  this.keyList = [WATCHED_RANK]

  this.getWatched = function () {
    return this.getTodaysRuntimeStorage(WATCHED_RANK) || []
  }

  this.checkIsWatched = function (videoContent) {
    return (this.getTodaysRuntimeStorage(WATCHED_RANK) || []).indexOf(videoContent) > -1
  }

  this.setWatched = function (videoContent) {
    let watched = (this.getTodaysRuntimeStorage(WATCHED_RANK) || [])
    if (typeof watched != 'object') {
      watched = [watched]
    }
    watched.push(videoContent)
    this.updateRuntimeStorage(WATCHED_RANK, watched)
  }

  function setChecked (KEY) {
    let checkInfo = _this.getTodaysRuntimeStorage(KEY)
    checkInfo.checked = true
    _this.updateRuntimeStorage(KEY, checkInfo)
  }

  function isChecked (KEY) {
    let checkInfo = _this.getTodaysRuntimeStorage(KEY)
    return checkInfo.checked || checkInfo.count > 5
  }

  function increaseCheck (KEY) {
    let knownCheck = _this.getTodaysRuntimeStorage(KEY)
    knownCheck.count += 1
    _this.updateRuntimeStorage(KEY, knownCheck)
  }

  this.setKnownChecked = function () {
    setChecked(KNOWN_CHECK)
  }

  this.setSignChecked = function () {
    setChecked(SIGN_CHECK)
  }

  this.isKnownChecked = function () {
    return isChecked(KNOWN_CHECK)
  }

  this.isSignChecked = function () {
    return isChecked(SIGN_CHECK)
  }

  this.increaseKnownCheck = function () {
    increaseCheck(KNOWN_CHECK)
  }

  this.increaseSignCheck = function () {
    increaseCheck(SIGN_CHECK)
  }
}

ProjectCommonFunction.prototype = Object.create(BaseCommonFunction.prototype)
ProjectCommonFunction.prototype.constructor = ProjectCommonFunction

/**
 * 初始化存储
 */
ProjectCommonFunction.prototype.initStorageFactory = function () {
  // 初始化值
  // storageFactory.initFactoryByKey($key, $defaultVal)
  storageFactory.initFactoryByKey(WATCHED_RANK, [])
  storageFactory.initFactoryByKey(KNOWN_CHECK, { count: 0, checked: false })
  storageFactory.initFactoryByKey(SIGN_CHECK, { count: 0, checked: false })
}

module.exports = ProjectCommonFunction