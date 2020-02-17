<template>
    <div class="player"  v-show="playlist.length>0">
<transition name=max>
        <div class="max-player" v-show="fullScreen">
            <div class="background">
                <div class="filter-box"></div>
                <img src="" alt="" width="100%" height="100%">
            </div>
            <div class="top">
                <div class="back" @click="back"><span>&lt;</span></div>
                <h1 class="title">{{currentSong.name}}</h1>
                <h2 class="subtitle">{{currentSong.singer}}</h2>
            </div>
            <div class="middle">
                <div class="middle-left">
                    <div class="cd-box">
                        <div class="cd" :class="cdR">
                            <img :src="currentSong.image" alt="" class="image">
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="progress-box">
                    <span class="time time-left">{{format(currentTime)}}</span>
                    <div class="progress-bar"><jdt :percent="percent"></jdt></div>
                        <span class="time time-right">{{format(duration)}}</span>
                
                </div>
                <div class="settings">
                    <div class="icon i-left"><i class="iconfont icon-sequence"></i></div>
                    <div class="icon i-left"><i  @click="prev" class="iconfont icon-prev"></i></div>
                    <div class="icon i-center"><i :class="playIcon" @click="togglePlay"></i></div>
                    <div class="icon i-right"><i  @click="next" class="iconfont icon-next"></i></div>
                    <div class="icon i-right"><i class="iconfont icon-not-favorite"></i></div>
                </div>
            </div>
        </div>

</transition>
    <transition name="min">
        <div class="min-player" v-show="!fullScreen"  @click="open">
            <div class="icon"  >
                <img :class="cdR" :src="currentSong.image" alt="" width="40" height="40">
            </div>
            <div class="text">
                <h2 class="name">{{currentSong.name}}</h2>
                <p class="desc">{{currentSong.singer}}</p>
            </div>
            <div class="control" >
                <i :class="MinIcon" style="font-size:30px" @click.stop="togglePlay">
                </i>
            </div>
            <div class="control">
                <i class="iconfont icon-playlist"></i>
            </div>
        </div>
    </transition>
    <audio ref="audio" @timeupdate="updateTime"></audio>
    </div>
</template>
<script>
import { mapGetters,mapMutations } from 'vuex'
import {getSong}  from '../api/song'
import jdt from '../base/jdt'
import progressCircle from '../base/circle'
export default {
    data(){
        return{
            url:'',
            currentTime:0,
            duration:0,
            percent:0
        }
    },
    components:{
        jdt,
        progressCircle
    },
 computed:{
     ...mapGetters([
         'fullScreen',
         'playlist',
         'currentSong',
         'playing',
         'currentIndex'
     ]),
     playIcon(){
        //  按照playing样式改变图标
         return this.playing? 'icon-pause' : 'icon-play'
     },
     MinIcon(){
         return this.playing? 'icon-pause-mini' :'icon-play-mini'
     },
     cdR(){
         return this.playing? 'play' :'play pause'
     }
 },
 created(){
     console.log(this.playlist)
     console.log(this.currentSong)
 },
 methods:{
     back(){
        //  关闭全屏
         this.setFullScreen(false)
     },
     open(){
        //  开启全屏
         this.setFullScreen(true)
     },
      prev() {
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playlist.length - 1;
      }
      this.setCurrentIndex(index);
    },
     next(){
        //  各取索引 下一手
        let index = this.currentIndex + 1
        if(index === this.playlist.length){
            index = this.playlist.length +1
        }
        this.setCurrentIndex(index)
     },
    //  得到歌曲
     _getSong(id){
         getSong(id).then(res=>{
             this.url = res.data.data[0].url
         })
     },
     ...mapMutations({
        //  控制是否全屏
         setFullScreen:"SET_FULL_SCREEN",
        //  控制音乐是否播放
         setPlaying:'SET_PLAYING',
        //  歌曲索引
        setCurrentIndex:"SET_CURRENT_INDEX"
     }),
    //  暂停播放
     togglePlay(){
         const audio =this.$refs.audio
         this.setPlaying(!this.playing)
         this.playing?audio.play() :audio.pause()
     },
    //  播放时长
      updateTime(e){
        this.currentTime=e.target.currentTime
      },
    //   修改播放时长格式
        format(time) {
      time = time | 0;
      let minute = (time / 60) | 0;
      let second = time % 60;
      if (second < 10) {
        second = '0' + second;
      }
      return minute + ':' + second;
    },
 },
 watch:{
     currentSong(newVal){
         this._getSong(newVal.id)
     },
    //  刚监听到url就播放
     url(newUrl){
        //  将上面的audio的src
         this.$refs.audio.src=newUrl
         this.$refs.audio.play()
        //  true为播放
         this.setPlaying(true)
        //  获取总时长
         setTimeout(()=>{
            this.duration=this.$refs.audio.duration
         },150)
     },
    //  监听到现在播放歌曲的总时长变化就改变进度条
     currentTime(){
         this.percent = this.currentTime/this.duration
     }
 }    
}
</script>
<style lang="stylus" scoped>
@import "../common/stylus/variable"
    .max-player
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        z-index 150
        background $color-background
        .background //背景图片
            .filter-box //滤镜
                position absolute
                width 100%
                height 100%
                background-color black
                opacity .6
        .top
            position relative
            margin-bottom 25px
            .back
                position absolute
                top 0
                left 6px
                z-index 50
                padding 10px
                font-size $font-size-large-x
                color #fff
            .title
                width 70%
                margin auto
                padding-top 13px
                line-height 20px
                text-align center
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
                font-size $font-size-large
                font-weight bold
                color $color-text-l 
            .subtitle
                width 70%
                margin auto
                line-height 20px
                text-align center
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
                font-size $font-size-small-x
                color $color-text-l 
        .middle
            position fixed
            width 100%
            top 80px
            bottom 170px
            display flex
            align-items center //中间显示
            .middle-left
                display inline-block
                vertical-align top
                position relative
                width 100%
                height 0
                padding-top 80%
                .cd-box
                    position absolute
                    left 10%
                    top 0
                    width 80%
                    height 100%
                    .cd
                        width 100%
                        height 100%
                        box-sizing border-box
                        border-radius 50%
                        border 15px solid rgba(255,255,255,.1)
                        &.play
                            animation rotate 20s linear infinite
                        &.pause
                            animation-play-state paused
                        .image
                            border-radius 50%
                            position absolute
                            left 0
                            top 0
                            right 100%
                            height 100%
        .bottom       
            position absolute
            bottom 50px
            width 100%
            .progress-box
                display flex
                align-items center
                width 80%
                margin auto
                padding 10px 0
                .time
                    color $color-text-l
                    font-size $font-size-small
                    flex 0 0 30px
                    line-height 30px
                    width 30px
                    &.time-left
                     text-align left
                    &.time-right
                     text-align right
                .progress-bar
                    flex 1
            .settings
                display flex
                align-items center
                .icon
                    flex 1  //平分
                    color color-theme-l
                    i 
                        font-size 30px
                    &.i-left
                        text-align right 
                    &.i-center
                        padding 0 20px
                        text-align center
                        i
                            font-size 40px
                    &.i-right
                        text-align left 

    .min-player
        height 60px
        width 100%
        display flex
        align-items center
        position fixed
        left 0
        bottom 0
        z-index 250
        background rgba(255,255,255,.85)
        .icon
         flex 0 0 40px;
         width 40px
         padding 0 10px 0 20px
         img 
            border-radius 50%
            &.play
                animation rotate 20s linear infinite
            &.pause
                animation-play-state paused
        .text
            display flex
            flex-direction column //垂直弹性布局
            justify-content center
            flex 1
            overflow hidden
            .name
                margin-bottom 2px
                line-height 14px
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
                font-size $font-size-medium
                color $color-text
            .desc
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
                font-size $font-size-small
                color $color-text
        .control
            flex 0 0 30px
            width 30px
            padding 0 10px
            .iconfont
                position relative
                left -5px
                top -3px
                font-size 30px
@keyframes rotate 
    0%
        transform  rotate(0)
    100%
        transform rotate(360deg)

         </style>