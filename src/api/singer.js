import axios from 'axios'
import {HOST} from '../common/js/config'

// 获取歌手列表
export function getSinger(){
  const url =HOST+'/top/artists?limit=70'
  return axios.get(url)
}

// 获取歌手的歌曲列表
export function getSingerDetail(id){
  const url = HOST + `/artists?id=${id}`
  return axios.get(url)
} 


// import jsonp from "../common/js/jsonp"
// import {params,options} from "./config"
// export function getSinger(){
//     // QQ音乐官方接口 
//     // 获取歌手列表
//     const url ="https://c.y.qq.com/v8/fcg-bin/v8.fcg"
//     const data = Object.assign({},params,{
//             g_tk: 1664029744,
//             channel: 'singer',
//             page: 'list',
//             key: 'all_all_all',
//             pagesize: 100,
//             pagenum: 1,
//             hostUin: 0,
//             needNewCode: 0,
//             platform: 'yqq'
//           })
//           return jsonp(url,data,options)
//         }

        // // 获取歌手详情信息
        // export function getSingerDetail(singerId){
        //   const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
        
        //   const data = Object.assign({},params,{
        //     hostUin: 0,
        //     g_tk: 1664029744,
        //     needNewCode: 0,
        //     platform: 'yqq',
        //     order: 'listen',
        //     begin: 0,
        //     num: 100,
        //     songstatus: 1,
        //     // singerid是传进来的
        //     singermid: singerId
        //   })
        //   return jsonp(url,data,options)
        // }
        