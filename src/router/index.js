import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/home.vue'
import searchResult from '@/pages/search/searchResult.vue'
import faxian from '@/pages/discovery/discovery.vue'

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
      component:faxian
    },
    {
      path:'/searchResult',
      name:'searchResult',
      component:searchResult
    },
    {
      path:'*',
      redirect:"home"
    }
  ]
})

export default router

