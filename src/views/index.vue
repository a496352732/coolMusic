<template>
<transition>

  <div class="index">
    <!-- tab 栏 -->
    <Tab></Tab>
    <scroll class="neirong">
      <div>
            <!-- 轮播图 -->
        <div class="slider-wrap">
            <slider></slider>
        </div>
        <!-- 轮播图end -->
        <!-- 歌单 -->
        <div class="recommendlist">
          <h1 class="list-title">推荐歌单</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item of recommendList" :key="item.id" class="item">
                <div class="icon">
                  <img v-lazy="item.picUrl" alt="" >
                </div>
                <!-- 播放量盒子 -->
                <p class="count">
                  <i class="iconfont icon-search"></i>
                  <!-- 播放量 -->
                  {{Math.floor(item.playCount/10000)}}万
                </p>
                <!-- end -->
                <!-- 歌名盒子 -->
                <div class="text">
                  <!-- 歌名 -->
                  <p class="name">{{item.name}}</p>
                </div>
                <!-- end -->
            </li>
          </ul>
        </div>
        <!-- 歌单end -->
        <!-- 推荐歌曲 -->
           <!-- <div class="recommend-music">
          <h1 class="list-title">推荐歌曲</h1>
          <ul>
            <li v-for="item of recommendMusic" :key="item.id" class="item">
              <div class="icon">
                <img v-lazy="item.song.album.picUrl" alt="">
              </div>
              <p class="text">{{item.name}}</p>
              <p class="singer">{{item.song.artists[0].name}}</p>
            </li>
          </ul>
        </div> -->
        <!-- 推荐歌曲end -->
      </div>
      <!-- 如果推荐歌单没全加载完毕就一直存在 -->
      <div class="loading-content" v-if="!recommendList.length">
              <loding></loding>
      </div>
      <!-- 详情页 -->
      <router-view></router-view>
    </scroll>
  </div>
</transition>
</template>
<script>
import Tab from "../components/tab";
import slider from "../base/slider";
import loding from "../base/loding";
import { getRecommendList } from "../api/index";
import Scroll from "../base/scroll"
import {mapMutations} from 'vuex'
import indexdetail from './indexDetails'
export default {
  data(){
    return {
      recommendList:[],
      // recommendMusic:[]
    }
  },
  components: {
    Tab,
    slider,
    Scroll,
    loding,
    indexdetail
  },
     created() {
      //  推荐歌曲歌单
      this._getRecommendList()
      // this._getRecommendMusic()
    },

  methods:{
    // 推荐歌单
 _getRecommendList(){
        getRecommendList().then(res => {
          if(res.status===200){
            this.recommendList  = res.data.result
             console.log( this.recommendList  )
          }
        })
    },
    // 根据不同的id跳转到不同的歌单详情页
    selectItem(recommend){
      this.$router.push({
        path:`/index/${recommend.id}`
      })
       this.setrecommend(recommend)
    },
    	...mapMutations({
				setrecommend: 'SET_RECOMMEND'
			})
        // 推荐歌曲
  //  _getRecommendMusic(){
  //      getRecommendMusic().then(res => {
  //         if(res.status===200){
  //           this.getRecommendMusic  = res.data.result
  //           console.log( this.getRecommendMusic  )
  //         }
  //       })
  //   },

      }
};
</script>
<style lang="stylus" scoped>
@import "../common/stylus/variable"
 .v-enter-active,.v-leave-active
    transition all 0.45s
  .v-enter,.v-leave-to
    transform translate3d(50%,0,0)
    opacity: 0;
  .index
    position fixed //固定定位
    width 100% 
    top 44px
    bottom 0
    z-index 100
    .neirong
      width 100%
      height 100%
      overflow hidden
      .slider-wrap
        width 100%
        margin 0 auto
        border-radius 5px
        overflow hidden
        background-color $color-background
      .recommendlist
        position relative
        box-sizing border-box
        width 100%
        text-align center
        .list-title
          height 65px
          line-height 65px
          padding-left 1.5%
          text-align left 
          font-size $font-size-medium
          font-weight bold
          color $color-text
        .item
          display inline-block
          position relative
          box-sizing border-box
          width 33%
          padding 0 1%
          .icon
            position relative
            display inline-block
            width 100%
            margin bottom 5px
            img 
              width 100%
              height 100%
              border-radius 3px
          .count
              position absolute
              top 5px
              font-size $font-size-small-s
              color $color-text-l
              right 8px
          .text
            height 40px
            line-height 40px
            text-align left 
            margin-bottom 10px
            font-size $font-size-small
            float left 
            overflow hidden
     .loading-content
      position absolute
      width 100%
      top 50%
      transform translateY(50%)   
</style>