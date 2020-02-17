<template>
    <div class="searchBox">
        <input type="text" class="box" :placeholder="placeholder" v-model="query">
        <!-- v-show 当输入框有内容的时候显示，没有就不显示 -->
        <i class="icon-delete" v-show="query" @click="clear"></i>
    </div>
</template>
<script>
export default {
    data(){
        return{
            query:''
        }
    },
    props :{
        placeholder:{
            type:String,
            default:"搜索歌曲、搜索歌手"
        }
    },
    methods:{
        clear(){
            this.query=''
        },
        setQuery(query){
            this.query=query
        }
    },
    created(){
        // 监听输入框，如果有新内容就把内容传到父组件上通过emit
        this.$watch('query',(newValue)=>{
            this.$emit('query',newValue)
        })
    }  
}
</script>
<style lang="stylus" scoped>
@import "../common/stylus/variable"
    .searchBox
        display flex
        align-items center
        box-sizing border-box
        width 100%
        height 25px
        .box
            flex 1
            line-height 25px
            background $color-theme
            color #ffffff
            font-size $font-size-medium
            border-bottom  1px solid rgb(235,235,235)
            outline 0
            &::placeholder
                color rgba(255,255,255,.6)
        .icon-delete
            position absolute
            right 12px
            font-size 14px
            color rgba(255,255,255,.8)

</style>