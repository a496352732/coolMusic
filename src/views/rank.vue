<template>
<transition>
  <div class="rank">
    <Tab></Tab>
    <scroll class="topList">
      <ul>
        <li @click="selectItem(item)" v-for="item of rankList" :key="item.id" class="item"  >
          <div class="icon">
            <img :src="item.coverImgUrl" width="100px" height="100px" alt="">
          </div>
          <ul class="song-list">
            <!-- 双v-for循环 -->
            <li  class="song" v-for="(song,index) of item.rank" :key="index" >
              <!-- 序号 -->
              <span>{{index+1}}</span>
              <!-- 歌曲名 -->
              <span>{{song.name}} - {{song.ar[0].name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <router-view></router-view>
    </scroll>
  </div>
</transition>
</template>
<script>
import Tab from "../components/tab";
import { getRank } from "../api/rank";
import Scroll from "../base/scroll"
import {mapMutations} from 'vuex'
const Rank_Number = [0, 1, 2, 3, 4, 7,22, 23,26];
export default {
  components: {
    Tab,
    Scroll
  },
  data() {
    return {
      rankList: []
    };
  },
  created() {
    this.getRank();
  },
  methods: {
    //   循环遍历上面RankNumber来获取接口数据
    getRank() {
      //   为什么要用let不用var，因为用var是最后一个数字重复7次，而不是1，2，3，4这样
      for (let i = 0; i < Rank_Number.length; i++) {
        //  这里是传值到服务器getRank接口ID形参那里
        getRank(Rank_Number[i]).then(res => {
          let list = res.data.playlist;
          this.rankList.push(list);
          // 获取右边音乐数据,slice是截取前三条，list.rank是强行赋值
          list.rank = res.data.playlist.tracks.slice(0, 3);
        });
      }
    },
     // 入口
  selectItem(item){
    this.$router.push({
      path:`/rank/${item.id}`
    })
    this.setRank(item)
  },
  ...mapMutations({
    setRank:"SET_RANK"
  })
  },
 
};
</script>
<style lang="stylus" scoped>
@import "../common/stylus/variable"
  .v-enter-active,.v-leave-active
    transition all 0.45s
  .v-enter,.v-leave-to
    transform translate3d(50%,0,0)
    opacity: 0;
  .rank
    top 44px
    bottom 0
    width 100%
    .topList
      height 100%
      padding-top 5px
      .item
        display flex
        margin 0 10px
        padding 3px 0
        border-bottom 1px solid #e4e4e4
        .icon
          flex 0 0 100px
          height 100%
          width 100%
        .song-list
          flex 1
          display flex
          // 垂直的弹性布局
          flex-direction column
          justify-content center
          padding 0 20px
          height 100px
          color $color-text
          font-size $font-size-small-x
          .song
            padding 10px 0
            text-overflow ellipsis //这三行都是文字过长的处理
            white-space nowrap
            overflow hidden        
</style>