<template>
<!-- :data 接受父组件传来的参数 -->
    <scroll class="singerlist" :data="data" ref="singList">
        <div>
        <ul>
            <!-- 所以这个v-for其实是遍历父组件中的singerlist -->
            <li v-for="(list,i) of data" :key="i" class="list" ref="list">
                <!-- 顶部 ABC 热门这些 -->
                <h1 class="list-title">{{list.title}}</h1>
                <!-- 歌手信息 -->
                <ul>
                    <!-- 这个单击事件是触发一个函数 -->
                    <li v-for="(item,i) of list.lists" :key="i" class="list-item" @click="selectItem(item)">
                        <img :src="item.avatar" alt="" class="avatar" >
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
                <!-- 歌手信息end -->
            </li>
        </ul>
        </div>
        <!-- 右边带字母的导航栏 -->
        <div class="list-scroll" @touchstart="scrollTouchStart">
            <ul>
                <li class="item" v-for="(item,index) of scrolllist" :key="index" :data-index="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </scroll>
</template>
<script>
import Scroll from "../base/scroll"
import {getIndex} from "../common/js/dom"
export default {
    computed:{
        scrolllist(){
            // 获取字母
            // data是父元素中的getsinglist里面的数组
            return this.data.map((item)=>{
                // 获取数据中title的ABC和热
                return item.title.substr(0,1)
            })
        }
    },
    created(){
        this.touch ={}
    },
    methods:{
        // 点击跳转 子传父 item指的是当前元素
        selectItem(item){
            // 父元素找到select这个动作名
            this.$emit("select",item)
        },
        // 点击右边索引
        scrollTouchStart(e){
            // getIndex是从上面引入
            let target=getIndex(e.target,"index")
            
            // scrollToElement是从scroll引入的方法
            // 获取上面元素的ref属性来实现点击字母跳转
            this.$refs.singList.scrollToElement(this.$refs.list[target],0)
        },
        // 滑动导航栏可以，随时跳到指定地方,不懂
       
    },
    // props是从父元素拿到的数据
    props:{
        // data是父元素请求回来的数据
        data:{
            type:Array,
            default:[]
        }
    },
    components:{
        Scroll
    }
}
</script>
<style lang="stylus" scoped>
@import "../common/stylus/variable"
    .singerlist //歌手列表
        position relative //相对定位
        width 100% 
        height 100%
        overflow hidden
        background-color $color-background
        .list
            .list-title //歌手标题
                height 25px
                padding-left 13px
                margin-bottom 9px
                font-size $font-size-small
                color white
                line-height 25px
                background-color rgba(0,0,0,0.3)
            .list-item
                display flex
                align-items center
                margin 0 5px
                padding 5px 0
                border-bottom 1px solid rgba(0,0,0,0.15)

                &:last-child //底部
                    border none
                    margin-bottom 10px

                .avatar
                    width 66px
                    height 66px
                    border-radius 3px
                .name
                    font-size $font-size-medium
                    margin-left 20px
                    color $color-text
        .list-scroll //右边固定导航栏
            position fixed //固定定位
            z-index 50
            right 3px
            top 50%
            transform translateY(-50%)
            width 20px
            padding 200px 0
            border-radius 3px
            text-align center
            .item
                padding 3.5px
                line-height 1 //默认字体大小
                color $color-txet
                font-size $font-size-small
                font-weight bold 
</style>