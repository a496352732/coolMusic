<template>
    <div class="music-header">
    <h1 class="text">网易云音乐</h1>
    <router-link tag="div" to="/search" class="search">
    <i class="iconfont icon-search"></i>
    </router-link>
    </div>
</template>
<script>

export default {
    
}
</script>
<style lang="stylus" scoped>
@import "../common/stylus/variable"
 .music-header //最外层
     position relative;  //父元素相对定位
     height 44px  //高度
     width 100%   //宽度
     text-align center //文本居中
     background-color $color-theme //从common中得到
    .text  //标题文字
     line-height 44px //行高
     font-size bold //文字大小
     color $color-text-l //从common中得到的颜色
     letter-spacing 3px //字体间隔
    .search
     position absolute //绝对定位,脱离文档流
     top 0
     right 2px
     .iconfont
      display block //使它获得块级功能
      padding 12px
      font-size 20px
      color $color-text-l
</style>