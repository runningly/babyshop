import { userInfo, updateUser } from '../../utils/api'

import { Toast } from 'vant'
// 用户数据的模块
const user = {
  namespaced: true, // 启用命名空间
  state: {
    userList: [], // 用户的数据信息
  },
  mutations: {
    getUserInfo(state, step) {
      state.userList = step
      console.log(state.userList);
    },
  },
  actions: {
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
  }
}

export default user