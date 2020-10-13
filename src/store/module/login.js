import { getCode, login } from '../../utils/api'
import { Toast } from 'vant'

export default {
  namespaced: true, // 启用命名空间
  state: {
    loginState: false, // 登录的状态
    loginList: [],
  },
  mutations: {
    getloginList(state, step) {
      state.loginList = step
    },
  },
  actions: {
    // 发送验证码
    async getCodeInfo(context, payload) {
      const res = await getCode({
        phone: payload,
        templateId: '537707'
      })
      console.log(res);
      res.msg == 'OK' ? Toast('发送成功') : Toast('发送失败')
    },
    // 登录
    async login(context, payload) {
      const res = await login(payload)
      Toast(res.msg) // 轻提示

      if (res.status == '0') {
        sessionStorage.setItem('token', res.result.token) //存储token
        context.commit('getloginList', res)
      }
    },
  }
}