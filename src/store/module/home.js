
import { getBanner, getRecommend } from '../../utils/api'
// 首页的数据
export default {
  namespaced: true, // 启用命名空间
  state: {
    bannerList: [], // 轮播图数据
    reCommendList: [], // 列表数据
    page: 1, // 设置当前请求的页数
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
  },
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
  }
}