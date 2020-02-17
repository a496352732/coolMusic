<template>
<!-- 轮播图组件 -->
  <div class="slider">
    <swiper :options="swiperOption" ref="mySwiper" v-if="bannerList.length">
      <!-- slides -->
      <!-- v-for 循环接口数据bannerList -->
      <swiper-slide v-for="item of bannerList" :key="item.id">
        <!-- 图片来源item.imgurl -->
        <img :src="item.imageUrl" alt class="slider-img" />
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
// 引入banner
import { getBanner } from "../api/index";
export default {
  data() {
    return {
      bannerList: [],
      swiperOption: {
        loop: true, //是否循环
        autoplay: {
          delay: 3000 //循环秒数
        },
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  created() {
    // 刚创建就调用此方法
    this.getBanner();
  },
  methods: {
    getBanner() {
      getBanner().then(res => {
        if (res.status === 200) {
            // 接收接口数据并渲染上页面，slice可以剔除多余接收的图片
          this.bannerList = res.data.banners.slice(3);
          // console.log(this.bannerList);
        }
      });
    },
   
  }
};
</script>
<style lang="stylus" scoped>

.slider-img
 width 100%

</style>