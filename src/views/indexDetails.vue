<template>
  <transition>
   <div class="index-detail">
       <!-- songs从父组件拿到的数据 -->
       <musiclist :songs="songs" :title="title" :bgImage="bgImage"></musiclist>
   </div>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getRecommendDetail} from '../api/index'
import musiclist from '../base/music-list'
import { settingSong } from '../common/js/song'
export default {
    data(){
        return {
            songs:[]
        }
    },
    components:{
        musiclist
    },
    computed:{
        ...mapGetters([
            'recommend'
        ]),
        title(){
            return this.recommend.name
        },
         bgImage(){
            return this.recommend.picUrl
        },
        
    },
    created(){
        //this.recommend 这个输出的结果是首页传来的
        console.log(this.recommend)
        this._getRecommendDetail()
    },
    methods:{
        // 获取到当前歌单数据
        _getRecommendDetail(){
          //    如果recommend.id为underfed的时候就返回到首页那，不然数据获取不了
      
              if(!this.recommend.id){
                   this.$router.push('/index')
                   
               }
            getRecommendDetail(this.recommend.id).then((res)=>{
                if(res.status === 200){
                    // 这里为_RecommendDetailSetting的实参
                    this.songs=this._RecommendDetailSetting( res.data.playlist.tracks)
                    console.log(this.songs)
                }
            })
        },
        // 处理歌手信息，把他返回到一个数组中保存
        _RecommendDetailSetting(list){
            let result = [];
            list.forEach((musicData)=>{
                result.push(settingSong(musicData))
            })
            return result
        },
        // 处理歌手信息，并返回需要的值
        // _formatSong(musicData){
        //     return({
        //         id:musicData.id,
        //         singer:musicData.ar[0].name,
        //         name:musicData.name,
        //         album:musicData.name
        //     })
        // }
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