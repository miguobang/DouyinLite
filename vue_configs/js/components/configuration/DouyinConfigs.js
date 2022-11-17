
/**
 * 开发模式
 */
 const DouyinConfig = {
  mixins: [mixin_common],
  data () {
    return {
      configs: {
        automatic_loop_threshold: 60,
        sleep_in_automatic: 15,
        countdown_id: 'com.ss.android.ugc.aweme.lite:id/mi',
        ukey: '',
        log_font_size: 25,
      },
      timeoutDate: '2022-11-11 19:00:00',
      validations: {
        sleep_in_automatic: {
          validate: () => false,
          message: v => {
            if (v) {
              let reactiveTime = this.configs.sleep_in_automatic
              let rangeCheckRegex = /^(\d+)-(\d+)$/
              if (isNaN(reactiveTime)) {
                if (rangeCheckRegex.test(this.configs.sleep_in_automatic)) {
                  let execResult = rangeCheckRegex.exec(this.configs.sleep_in_automatic)
                  let start = parseInt(execResult[1])
                  let end = parseInt(execResult[2])
                  if (start > end || start <= 0) {
                    return '随机范围应当大于零，且 start < end'
                  }
                } else {
                  return '随机范围请按此格式输入: 5-10'
                }
              } else {
                if (parseInt(reactiveTime) <= 0) {
                  return '请输入一个正数'
                }
              }
            }
            return ''
          }
        },
      }
    }
  },
  watch: {
    'configs.ukey': function () {
      if (this.configs.ukey && this.configs.ukey.length == 44) {
        this.loadExpired()
      }
    },
  },
  methods: {
    loadExpired: function () {
      $nativeApi.request('loadExpired', {ukey:this.configs.ukey}).then(resp => {
        this.timeoutDate = resp
      })
    }
  },

  computed: {
    sleepTimeDisplay: function () {
      if (this.configs.sleep_in_automatic) {
        let rangeCheckRegex = /^(\d+)-(\d+)$/
        if (isNaN(this.configs.sleep_in_automatic)) {
          if (rangeCheckRegex.test(this.configs.sleep_in_automatic)) {
            let execResult = rangeCheckRegex.exec(this.configs.sleep_in_automatic)
            let start = parseInt(execResult[1])
            let end = parseInt(execResult[2])
            if (start < end && start > 0) {
              return '当前设置为从 ' + start + ' 到 ' + end + ' 分钟的随机范围'
            }
          }
        } else {
          return '当前设置为' + this.configs.sleep_in_automatic + '分钟'
        }
      }
      return ''
    }
  },
  mounted() {
    this.loadExpired()
  },
  template: `
  <div>
  <van-cell-group>
    <van-field label="专属KEY" v-model="configs.ukey" />
    <van-field :readonly="true" :value="timeoutDate" label="到期时间" label-width="10em" type="text" input-align="right" />
    <tip-block>
      为了正常显示，请不要随便乱设置
    </tip-block>
    <number-field label="日志字体大小" v-model="configs.log_font_size" label-width="12em" />
    <tip-block>
      纯自动模式不建议一次性运行太久，默认60分钟休息15分钟，但是样本数太少无法准确评估多久最合适，这个时间可能还是太久，建议自行调整一个最合适的时间。
    </tip-block>
    <number-field label="纯自动模式最大持续时间" v-model="configs.automatic_loop_threshold" label-width="12em" >
      <template #right-icon><span>分</span></template>
    </number-field>
    <tip-block>休息时间可以选择随机范围，按如下格式输入即可：30-40。{{sleepTimeDisplay}}</tip-block>
    <van-field v-model="configs.sleep_in_automatic" :error-message="validationError.sleep_in_automatic" error-message-align="right" label="休息时间" type="text" placeholder="请输入休息间隔" input-align="right" >
      <template #right-icon><span>分</span></template>
    </van-field>
    <van-field v-model="configs.countdown_id" label="逛街界面倒计时控件ID" label-width="10em" type="text" placeholder="请输入" input-align="right" stop-propagation />
  </van-cell-group>
  </div>`
}