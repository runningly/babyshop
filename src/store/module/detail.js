import { getDetail } from '../../utils/api'

// 详情页的模块
export default  {
  namespaced: true, // 启用命名空间
  state: {
    detailInfo: [],
  },
  mutations: {
    getDetailList(state, step) {
      state.detailInfo = step
      console.log(state.detailInfo);
    },
  },
  actions: {
    // 详情页数据
    async getDetailList(context, step) {
      const res = await getDetail(step)
      context.commit('getDetailList', res.result)
    },
  }
}

