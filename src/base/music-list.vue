<template>
    <div class="music-list">
        <div class="back" @click="back">
            <span class="iconback">&lt;</span>
        </div>
        <h1 class="title">{{title}}</h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage"></div>
        <scroll class="list" ref="list">
            <div class="song-list-warpper">
                <!-- 从父组件获取的数据 -->
                <song-list :songs="songs" @select="selectItem"></song-list>
            </div>
            <!-- loading -->
            <!-- 没有数据的时候显示，有数据消失 -->
            <div class="loading-container" v-show="!songs.length">
                <loading></loading>
            </div>
            <!-- loading end -->
        </scroll>
    </div>
</template>
<script>
import SongList from '../base/song-list'
import Scroll from '../base/scroll'
import loading from './loding'
import {mapActions} from 'vuex'
export default {
    // props接受父元素属性
    props:{
        title:{
            type:String,
            default:""
        },
        bgImage:{
            type:String,
            default:''
        },
        songs:{
            type:Array,
            default:[]
        }
    },
    components:{
        SongList,
        Scroll,
        loading
    },
    methods:{
        back(){
            this.$router.back()
        },
        selectItem(item,index){      
            this.clickPlay({
                list:this.songs,
                index:index
            }) 
        },
        ...mapActions([
            'clickPlay'
        ])
    },
    computed:{
        bgStyle(){
return `background-image:url(${this.bgImage})`      
  }
    },
    mounted(){
    }
}
</script>
<style lang="stylus" scoped>
@import "../common/stylus/variable"
 .music-list
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background
    .back
        position absolute
        top 0
        left 6px
        z-index 50
        .iconback
            display block
            padding 10px
            font-size $font-size-large-x
            color #fff
    .title
        position absolute
        top 2px
        left 10%
        z-index 40
        width 80%
        text-overflow ellipsis //多余就隐藏
        overflow hidden
        white-space nowrap
        text-align center //水平居中
        line-height 40px
        font-size $font-size-large
        color #fff
    .bg-image
        position relative
        width 100%
        height 0
        padding-top 70%
        background-size cover
        transform-origin top 
    .list
        position fixed
        top 265px
        bottom 0
        width 100%
        background $color-background
        overflow hidden
        .song-list-warpper
            padding 20px 30px
        .loading-container
            position absolute
            width 100%
            top 50%
            transform translateY(-50%)
</style>