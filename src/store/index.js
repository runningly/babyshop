import Vue from 'vue'
import Vuex from 'vuex'

import home from './module/home'
import classify from './module/classify'
import detail from './module/detail'
import goLogin from './module/login'
import user from './module/user'
import address from './module/address'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    classify,
    detail,
    goLogin,
    user,
    address,
  }
})



