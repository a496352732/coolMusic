<template>
    <scroll :data="songs" class="search-result"
    :pullup="pullup" @scrolToEnd="searchMore"
    >
        <ul class="search-list">
            <li v-for="(item,i) of songs" :key="i" class="search-item">
                <div class="icon">
                    <i class="icon-music"></i>
                </div>
                <div class="name">
                    <p class="song">{{item.songname}}</p>
                    <p class="singer">{{item.singer[0].name}}</p>
                </div>
            </li>
        </ul>
        <loading v-show="hasMore"></loading>
    </scroll>
</template>
<script>
import {getSearchResult} from '../api/search'
import Scroll from "../base/scroll"
import loading from '../base/loding'
const perpage=100

export default {
    data(){
        return{
            page:1,
            songs:[],
            pullup:true,
            hasMore:true
        }
    },
    components:{
        Scroll,
        loading
    },
    props:{
      query:{
          type:String,
          default:''
      },
      showsinger:{
          type:Boolean,
          default:true
      }
    },
    methods:{
        _getSearchResult(){
            getSearchResult(this.query,this.page,this.showsinger,perpage).then((res)=>{
                if(res.code ===0){
                   this.songs  = this._searchSetting(res.data)
                    console.log(this.songs)
                }
            })
        },
        _searchSetting(data){
            let ret = []
            if(data.song){
                ret = ret.concat(data.song.list)
            }
            return ret
        },
        // 搜索更多内容 下拉加载
        searchMore(){
            // 如果没有更多内容就直接结束
            if(!this.hasMore){
                return
            }
            // 否则加载下一页内容
            this.page++
              getSearchResult(this.query,this.page,this.showsinger,perpage).then((res)=>{
                if(res.code ===0){
                   this.songs  = this.songs.concat(this._searchSetting(res.data))
                    this._checkResult(res.data)
                }
            })
        },
        // 检查是否有下一页
        _checkResult(data){
            const song = data.song
            // song.list是个数组如果没有了就返回false
            if(!song.list.length){
                this.hasMore=false
            }
        }
    },
    watch:{
        query(){
            this._getSearchResult()
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "../common/stylus/variable"
    .search-result
        height 100%
        overflow hidden
        .search-list
            padding-bottom 30px
            .search-item
                display flex
                align-items center
                padding 3px 20px
                height 50px
                border-bottom 1px solid rgb(228,228,228)
                .icon
                    flex 0 0 30px
                    width 30px
                    .icon-music
                        font-size:14px
                        color $color-text-d

                .name
                    flex 1
                    font-size $font-size-medium
                    color $color-text-d
                    overflow hidden
                    .song
                        font-size $font-size-medium-x
                        color $color-text
                        white-space nowrap
                        overflow hidden
                        text-overflow ellipsis
                        padding-bottom 5px
                    .singer
                        font-size 12px
                        color $color-text-g
</style>