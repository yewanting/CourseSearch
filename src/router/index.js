import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/home.vue'
import app_home from '@/pages/home/app_home.vue'
import discovery from '@/pages/discovery/discovery.vue'
// import app_discovery from '@/pages/discovery/app_discovery.vue'
import searchResult from '@/pages/search/searchResult.vue'
import app_searchResult from '@/pages/search/app_searchResult.vue'
import center from '@/pages/center/center.vue'
import app_center from '@/pages/center/app_center.vue'
import '../../public/css/index.css'
Vue.use(Router);

const app_discovery = ()=>import("@/pages/discovery/app_discovery.vue")

var router = new Router({
    mode:'history',
    routes:[
        {
            path:'/home',
            name:'home',
            component:home
        },
        {
            path:'/app_home',
            name:'app_home',
            component:app_home
        },
        {
            path:'/discovery',
            name:'discovery',
            component:discovery
        },
        {
            path:'/app_discovery',
            name:'app_discovery',
            component:app_discovery
        },
        {
            path:'/center',
            name:'center',
            component:center
        },
        {
            path:'/app_center',
            name:'app_center',
            component:app_center
        },
        {
            path:'/searchResult',
            name:'searchResult',
            component:searchResult
        },
        {
            path:'/app_searchResult',
            name:'app_searchResult',
            component:app_searchResult
        },
        {
            path:'*',
            redirect:'home'
        }
    ]
})

export default router