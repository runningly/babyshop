import { getClassify } from '../../utils/api'

// 分类的模块
export default {
  namespaced: true, // 启用命名空间
  state: {
    classifyList: []
  },
  mutations: {
    getClassifyList(state, step) {
      state.classifyList = step
      console.log(state.classifyList);
      
    },
  },
  actions: {
    // 分类数据
    async getClassifyList(context, step) {
      const res = await getClassify(step)
      context.commit('getClassifyList', res.result)
    },
  }
}