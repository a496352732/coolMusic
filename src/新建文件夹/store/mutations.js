// vuex 得mutations.js  同步处理

import * as types from "./mutation-types"


 const mutations = {
    // 从mutation-types引入的常量，types是引入名，state是获取state里面的数据，singer是提交参数commit,singer不可以改名，页面上一定要和这里一样
    [types.SET_SINGER](state,singer){
        state.singer = singer
    },
    // recommend不可以改名，页面上一定要和这里一样
    [types.SET_RECOMMEND](state,recommend){
		state.recommend = recommend
  },
   // recommend不可以改名，页面上一定要和这里一样
   [types.SET_RANK](state,rank){
		state.rank = rank
  },
  //播放状态，true为播放，false为不播放，按照页面的上的操作
  [types.SET_PLAYING](state,flag){
		state.playing = flag
  },
  [types.SET_FULL_SCREEN](state,flag){
		state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state,list){
		state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state,list){
		state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state,mode){
		state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state,index){
		state.currentIndex = index
	},
}
export default mutations
