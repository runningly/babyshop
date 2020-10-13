import { getAddress, addAddress, updateAddress } from '../../utils/api'
import { Toast } from 'vant'

export default {
  namespaced: true, // 启用命名空间
  state: {
    AddressList: [], // 收货地址的数据
    editAddress: {} // 用来存储需要修改的收货地址
  },
  mutations: {
    getAddressList(state, step) {
      state.AddressList = step
      console.log(state.AddressList);
    }
  },
  actions: {
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
  }
}