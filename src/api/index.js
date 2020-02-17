// 首页接口
import axios from 'axios'
// 获取服务器端口
import {  HOST} from '../common/js/config'
// 获取轮播数据
export function getBanner() {
  // 使用拼接来获取接口数据
  const url = HOST + '/banner';
  return axios.get(url)
}
// 获取推荐歌单
export function getRecommendList() {
  // 使用拼接来获取接口数据
  const url = HOST + '/personalized'
  return axios.get(url)
}
// 获取推荐歌曲
// export function getRecommendMusic() {
//     const url = HOST + '/personalized/newsong'
//     return axios.get(url)
//   }

  // 获取推荐歌单详情页
  export function getRecommendDetail(id){
    const url = HOST + `/playlist/detail?id=${id}`
        return axios.get(url)
  }