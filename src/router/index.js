import Vue from 'vue'
import Router from 'vue-router'
import Recommand from 'components/recommand/recommand'
import Rank from 'components/rank/rank'
import Singer from 'components/singer/singer'
import Search from 'components/search/search'
// 注册
Vue.use(Router)
// 四个路由
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommand'
    },
    {
      path: '/recommand',
      component: Recommand
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/rank',
      component: Rank
    }
  ]
})
