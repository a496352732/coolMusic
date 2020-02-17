// vuex state vuex的公共数据和data一样
import {playMode} from '../common/js/config'
const state = {
    singer:{},
    recommend: {},
    rank: {},
    // 是否进行播放
    playing:false,
    // 是否全屏
    fullScreen:false,
    // 播放列表
    playlist:[],
    //顺序播放的列表
    sequenceList:[],
    //播放形式
    mode:playMode.sequence,
    // 现在播放的下标
    currentIndex:-1
}
export default state