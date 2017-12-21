import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import * as getters from './getter'
import state from './states'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 再生产环境下使用 ？？
const debug = process.env.NODE_ENV !== 'production'
// 严格模式调试
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
