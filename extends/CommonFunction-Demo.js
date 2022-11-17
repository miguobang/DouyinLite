module.exports = function (innerFunctions) {

  /**
   * 杀死当前APP 自行扩展
   */
  innerFunctions.killCurrentApp = function () {
    // 打开最近任务
    recents()
    sleep(1000)
    // 手势滑动持续时间320毫秒，位置从x:240,y:1000滑动到x:800,y:1000 也就是从左侧向右滑动
    // 不同设备手势各不相同，请按实际情况进行调整
    // 调整完毕可以运行 test/测试杀死当前应用.js 进行测试
    gesture(320, [240, 1000], [800, 1000])
  }

  return innerFunctions

}