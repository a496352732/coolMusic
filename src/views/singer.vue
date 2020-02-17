<template>
<transition>

    <div class="singer">
        <Tab></Tab>
        <!-- 父向子传参 :data-->
  <singerL :data="singerList" @select="selectSinger"></singerL>
  <router-view></router-view>
    </div>
</transition>
</template>
<script>
// 导入pinyin插件
const pinyin =require('pinyin')
import Tab from "../components/tab"
// 引入getSingler
import {getSinger} from "../api/singer"
// 引入Singer构造函数
import Singer from "../common/js/singer"
// 引入singerlist组件
import singerL from "../base/singerlist"
import {mapMutations} from 'vuex'
// 热门的数量和标题
const Hot_name="热门"
const Hot_name_length=10
export default {
components:{
    Tab,
    singerL
  },
  data(){
    return{
      singerList:[]
    }
  },
  created() {
    this.getSinger()
  },
  methods:{
    // 得到歌手列表
    getSinger(){
      getSinger().then((res)=>{
       let list = res.data.artists
       list.map(item=>{
        //  获取名字的拼音首字母
         let py = pinyin(item.name[0],{
          //  然后通过此插件的到名字首字母
          style:pinyin.STYLE_FIRST_LETTER
       })
      //  将字母转化成大写
       item.Findex=py[0][0].toUpperCase()     
      })
      this.singerList=this.singerListSetting(list)
       console.log(this.singerList)
      })
    },
    // 设置歌手列表
    singerListSetting(list){
      // page使用来存储热门数据和普通数据
      let page={
        hot:{
          title:Hot_name,
          lists:[]
        }
      }
      list.forEach((item,index) => {
        // 截取前10热门,就把热门内容追加上
        if(index < Hot_name_length){
          page.hot.lists.push(
          new Singer({
             id:item.id,
             name:item.name,
             avatar:item.img1v1Url
            }
          ))
        }
        // 当前key等于26个字母
        const key = item.Findex
        // 当普通数据=不存在 undefine的时候就添加上
        if(!page[key]){
          page[key] ={
            title:key,
            lists:[]
          }
        }
        // 追加普通数据
        page[key].lists.push(
           new Singer({
               id:item.id,
             name:item.name,
             avatar:item.img1v1Url
            })
        )
      });
      console.log(page)
      // 排序
      let hot =[] //热门
      let nohot = [] //非热门
      for(let k in page){ //遍历page，page包括热门和非热门数据
      // value是A-Z中的歌手数据
        let value = page[k]
        // console.log(value)
        
        if(value.title.match(/[a-zA-Z]/)){
          nohot.push(value)
          // 如果遍历结果中的title包含热门两字就放进热门的数组中
        }else if(value.title === Hot_name){
          hot.push(value)
        }
      }
      // 非热门按字母排序
      nohot.sort((a,b)=>{
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      // 返回热门拼接非热门数组
      return hot.concat(nohot)
    },
    // 歌手详情页点击入口
    selectSinger(singer){
      this.$router.push({
      	path: `/singer/${singer.id}`
      })
      // 执行了mutation的函数,然后这里的singer是传回state里面的
      this.setsinger(singer)
    },
    ...mapMutations({
      // 对象映射
      setsinger:'SET_SINGER'
    })
  }
  }
</script>
<style lang="stylus" scoped>
 .v-enter-active,.v-leave-active
    transition all 0.45s
  .v-enter,.v-leave-to
    transform translate3d(50%,0,0)
    opacity: 0;
  .singer
    position fixed
    top 44px
    bottom 0
    width 100%
    
</style>