<template>
   <transition>
      <!-- 父组件传子组件 -->
    <musiclist :songs="songs" :title="title" :bgImage="bgImage"></musiclist>   
   </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import musiclist from '../base/music-list'
import { settingSong } from '../common/js/song'
export default {
   data(){
       return {
          songs:[]
       }
   },
    computed:{
       ...mapGetters([
          'rank'
       ]),

      //  music list的参数 this.rank是从rank那里得来的数据
       title(){
          return this.rank.name
       },
       bgImage(){
         //  排行详情页背景图
          return this.rank.coverImgUrl
       }
    },
    components:{
       musiclist
    },
    created(){
      //  this.rank是从父组件拿来数据
       console.log(this.rank)
      //  处理得到来的数据
       this._rankDetail(this.rank.tracks)
    },
    methods:{
      //  处理得到的数据
       _rankDetail(list){
         //  如果没有得到这个id就返回rank
          if(!this.rank.id){
             this.$router.push("/rank")
          }
          let result = []
          list.forEach((item)=>{
             result.push(settingSong(item))
          })
          this.songs = result
       },
      //  取到自己想要的数据
      //  _formatSong(musicData){
      //     return({
      //        id:musicData.id,
      //        singer:musicData.ar[0].name,
      //        name:musicData.name,
      //        album:musicData.name
      //     })
      //  }
    }
}
</script>
<style lang="stylus" scoped>
@import "../common/stylus/variable"
 .v-enter-active,.v-leave-active
    transition all 0.45s
  .v-enter,.v-leave-to
    transform translate3d(50%,0,0)
    opacity: 0;

</style>