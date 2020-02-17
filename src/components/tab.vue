<template>
    <div class="tab">
        <router-link  tag="div" class="item" to="/index">
        <span>推荐</span>
        </router-link>
         <router-link  tag="div" class="item" to="/rank">
        <span>排行</span>
        </router-link>
         <router-link  tag="div" class="item" to="/singer">
        <span>歌手</span>
        </router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus" scoped>
@import "../common/stylus/variable"
    .tab
        display flex //父元素弹性布局
        height 44px  //高度
        line-height 44px //垂直对齐
        width 100%  //宽度
        font-size $font-size-medium //从cmoom那拿到字体尺寸
        background-color $color-theme //背景颜色从common拿
        .item    //tab的下一级
          flex 1  //因为父元素已设置了弹性布局，所以这里只需要写1就代表占33.33%
          text-align center  //水平居中
          color $color-text-l 
          background-color $color-theme
          &.router-link-active
            span
             font-weight bold  //变粗
             color $color-text-l  
             border-bottom 2px solid $color-text-l
             padding-bottom 5px  //距离下内边距5px
</style>