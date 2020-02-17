// rank接口
import axios from 'axios'
// 获取服务器端口
import {  HOST} from '../common/js/config'

// 获取排行
// 函数名后是形参要外部传入
export function getRank(id){
    const url = HOST +`/top/list?idx=${id}`
    return axios.get(url)
}