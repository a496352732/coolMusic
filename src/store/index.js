// vuex的入口文件

import Vue from 'vue'
import Vuex from 'vuex'
// *号代表所有的内容
import * as actions from './actions'
import * as getters from './getters'

import  state from './state'
import  mutations from './mutations'

Vue.use(Vuex)

// 导出
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})