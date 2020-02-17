<template>
  <transition>
        <!-- 把参数传到musicList里面 父传子 -->
        <musicL :songs="songs" :title="title" :bgImage="bgImage"></musicL>
    
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from '../api/singer'
import {settingSong} from '../common/js/song'
import musicL from '../base/music-list'
export default {
    data(){
        return {
            songs:[]
        }
    },
    components:{
        musicL
    },
    computed:{
        // 拿到mutation的数据
        ...mapGetters([
            'singer'
        ]),
        title(){
            return this.singer.name
        },
        bgImage(){
            return this.singer.avatar
        }
    },
    created(){
        console.log(this.singer)
        console.log("上面是详情页的数据singer")
        // 拿到歌手详情页数据
        this._getSingerDetail()
    },
    methods:{
        // 获取歌手详情页歌曲列表
       _getSingerDetail(){
           if(!this.singer.id){
               this.$router.push('/singer')
           }
           getSingerDetail(this.singer.id).then((res)=>{
            //    如果singer.id为underfed的时候就返回到歌手列表那，不然数据获取不了
               if(!this.singer.id){
                   this.$router.push('/singer')
               }
               if(res.status === 200){
                //    歌曲列表 需要查看歌曲数据可以解除下面注释
                //  this.songs = res.data.list
                // res.data.hotSongs是传入下面的list中
                 this.songs =this._getSingerDetailSetting(res.data.hotSongs)
                //  打印歌曲信息
                   console.log(this.songs)
               }
           })
       },
    
        // 设置歌手详情页面的歌曲列表,list的实参是res.data.songs
       _getSingerDetailSetting(list){
           let result = []
        //    item指向当前元素
           list.forEach((item)=>{
            result.push(settingSong(item))
           })
           return result
       }
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