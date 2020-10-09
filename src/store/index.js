import Vue from 'vue'
import Vuex from 'vuex'
import { getBanner, getRecommend, getClassify, getDetail, getCode, login, userInfo, updateUser, getAddress, addAddress, updateAddress } from '../utils/api' // 导入封装好的请求数据的函数
import { Toast } from 'vant'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bannerList: [],
    reCommendList: [],
    page: 1, // 设置当前请求的页数
    classifyList: [],
    datailInfo: [],
    loginState: false, // 登录的状态
    loginList: [],
    userList: [], // 用户的数据信息
    AddressList: [], // 收货地址的数据
    editAddress:{} // 用来存储需要修改的收货地址
  },
  mutations: {
    getBannerList(state, payload) {
      state.bannerList = payload.list // 将接收到的数据存储到 state中
    },
    getRecommendList(state, payload) {
      // 将新请求的数组和后请求的 数组合并
      state.reCommendList = state.reCommendList.concat(payload.list)
      state.page++  // 页数+1
    },
    getClassifyList(state, step) {
      state.classifyList = step
      console.log(state.classifyList);
    },
    getDetailList(state, step) {
      state.datailInfo = step
      console.log(state.datailInfo);
    },
    getloginList(state, step) {
      state.loginList = step
      console.log(state.loginList);
    },
    getUserInfo(state, step) {
      state.userList = step
      console.log(state.userList);
    },
    getAddressList(state, step) {
      state.AddressList = step
      console.log(state.AddressList);
    }
  },
  // 执行异步任务
  actions: {
    // 轮播图的异步任务
    async getBannerList({ commit }) {
      const res = await getBanner({}) // 执行请求函数
      commit('getBannerList', res.result) // 将数据提交到mutations的函数中
    },
    // 首页数据的异步任务
    async getRecommendList({ commit }, step) {
      const res = await getRecommend(step)
      commit('getRecommendList', res.result)
    },

    // 分类数据
    async getClassifyList(context, step) {
      const res = await getClassify(step)
      context.commit('getClassifyList', res.result)
    },

    // 详情页数据
    async getDetailList(context, step) {
      const res = await getDetail(step)
      context.commit('getDetailList', res.result)
    },

    // 发送验证码
    async getCode(context, payload) {
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

      if(res.status == '0') {
        sessionStorage.setItem('token', res.result.token) //存储token
        // 5f7e72cf059b6306b0de2e49
        context.commit('getloginList', res)
      }
    },

    // 获取用户个人信息
    async getUserInfo(context, payload) {
      const res = await userInfo(payload)
      context.commit('getUserInfo', res.result)
    },

    // 修改个人信息
    async updateUser(context, payload) {
      const res = await updateUser(payload)
      console.log(res);
      Toast(res.msg)
    },

    // 获取收货地址
    async getAddressList(context, payload) {
      const res = await getAddress(payload)
      context.commit('getAddressList', res.result)
      console.log(res);
    },

    // 新增收货地址
    async addAddressList(context, payload) {
      const res = await addAddress(payload)
      console.log(res);
      Toast(res.msg)
    },

    // 修改收货地址
    async updateAddressList(context, payload) {
      const res = await updateAddress(payload)
      console.log(res);
      Toast(res.msg)
    }
  },

  modules: {
  }
})



