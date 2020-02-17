// vuex得actions  可以异步操作
import * as types from './mutation-types'

// 第一个参数中commit为提交，state为属性，第二个参数都在页面上获取，list代表是什么列表，index是位置
export const clickPlay = function({commit,state},{list,index}){
    // 顺序播放
    commit(types.SET_SEQUENCE_LIST,list),
    // 播放列表
    commit(types.SET_PLAYLIST,list),
    // 索引点击列表中哪首歌，就播放哪首
    commit(types.SET_CURRENT_INDEX,index),
    //是否全屏显示，true为全屏 
    commit(types.SET_FULL_SCREEN,true),
    //播放状态 true
    commit(types.SET_PLAYING,true)
}