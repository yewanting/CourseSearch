import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/home.vue'
import searchResult from '@/pages/search/searchResult.vue'
import discovery from '@/pages/discovery/discovery.vue'
import center from '@/pages/center/center.vue'
Vue.use(Router)

var router =  new Router({
  mode: 'history',
  routes: [
    {

      path: '/home',
      name: 'home',
      component: home
    },
    {
      path:'/discovery',
      name:'discovery',
      component:discovery
    },
    {
      path:'/searchResult',
      name:'searchResult',
      component:searchResult
    },
    {
      path:'/center',
      name:'center',
      component:center
    },
    {
      path:'*',
      redirect:"home"
    }
  ]
})

export default router

