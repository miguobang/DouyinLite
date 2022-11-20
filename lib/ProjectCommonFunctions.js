/**
 * 每个项目里面新增或者修改的方法集合
 */

let singletonRequire = require('./SingletonRequirer.js')(runtime, this)
let storageFactory = singletonRequire('StorageFactory')
let BaseCommonFunction = require('./BaseCommonFunctions.js')
const WATCHED_RANK = "WATCHED_RANK"
/**
 * 项目新增的方法写在此处
 */
const ProjectCommonFunction = function () {
  BaseCommonFunction.call(this)

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
}

module.exports = ProjectCommonFunction