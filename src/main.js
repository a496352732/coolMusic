// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/stylus/index.styl'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import store from "./store"
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, )
// 图片懒加载
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
 loding:require("./common/image/default.png")
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
