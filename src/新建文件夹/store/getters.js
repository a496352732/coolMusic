// vue getters.js vue里面的计算属性 根据依赖变化

export const singer = state=>state.singer

export const recommend = state => state.recommend

export const rank = state => state.rank

export const playing = state =>state.playing

export const fullScreen = state =>state.fullScreen

export const playlist = state =>state.playlist

export const sequenceList = state =>state.sequenceList

export const mode = state =>state.mode

export const currentIndex = state =>state.currentIndex

export const currentSong = (state)=>{
    return state.playlist[state.currentIndex] || {}
}




