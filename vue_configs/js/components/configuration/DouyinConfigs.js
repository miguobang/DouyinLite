
/**
 * 开发模式
 */
 const DouyinConfig = {
  mixins: [mixin_common],
  data () {
    return {
      configs: {
        automatic_look_threshold: 90,
        sleep_in_automatic: 15,
        countdown_id: 'com.ss.android.ugc.aweme.lite:id/mi',
        ukey: '',
      },
      timeoutDate: '2022-11-11 19:00:00'
    }
  },
  watch: {
    'configs.ukey': function () {
      this.loadExpired()
    },
  },
  methods: {
    loadExpired: function () {
      $nativeApi.request('loadExpired', {ukey:this.configs.ukey}).then(resp => {
        this.timeoutDate = resp
      })
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
      纯自动模式不建议一次性运行太久，默认90分钟休息15分钟，但是样本数太少无法准确评估多久最合适，这个时间可能还是太久，建议自行调整一个最合适的时间。
    </tip-block>
    <number-field label="纯自动模式最大持续时间" v-model="configs.automatic_look_threshold" label-width="12em" />
    <number-field label="休息时间" v-model="configs.sleep_in_automatic" label-width="12em" />
    <van-field v-model="configs.countdown_id" label="逛街界面倒计时控件ID" label-width="10em" type="text" placeholder="请输入" input-align="right" stop-propagation />
  </van-cell-group>
  </div>`
}