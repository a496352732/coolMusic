<template>
    <div class="song-list">
        <ul>
            <li @click="selectItem(song,index)" class="item" v-for="(song,index) of songs" :key="index" >
                <div class="list">
                    <h2 class="name">{{song.name}}</h2>
                    <!-- 这里song为实参，类似e.target作用 -->
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        songs:{
            type:Array,
            default:[]
        }
    },
 methods:{
     getDesc(song){
         return `${song.singer} - ${song.album}`
     },
     selectItem(item,index){
         this.$emit('select',item,index)
     }
 }
}
</script>
<style lang="stylus" scoped>
@import "../common/stylus/variable"
    .song-list
        .item //歌曲列表样式
            display flex
            align-items center
            box-sizing border-box
            height 64px
            font-size $font-size-medium
            border-bottom 1px solid #ccc
            .list
                display 1 //平分宽高
                line-height 20px
                overflow hidden
                .name
                    color:$color-text
                .desc
                    color $color-text-d
                    margin-top 4px

</style>