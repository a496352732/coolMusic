import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index'
import rank from '../views/rank'
import singer from '../views/singer'
import singerDetail from '../views/singDetails'
import indexDetail from '../views/indexDetails'
import rankDetail from '../views/rankDetails'
import search from '../views/search'
Vue.use(Router)

export default new Router({
  mode: 'hash', 
  routes: [
    {
      path: '/',
      component: index,
   
    },
    {
      path: '/index',
      component: index,
      children:[
        {path:":id",
        component:indexDetail
      }
      ]
    },
    {
      path: '/rank',
      component: rank,
      children:[
        {path:":id",
        component:rankDetail
      }
      ]
    },
    {
      path: '/singer',
      component: singer,
      children:[{
        path:":id",
        component:singerDetail
      }   
    ]
    },
    {
      path: '/search',
      component: search,   
    },
  ]
})
