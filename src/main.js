import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router/index.js'
import store from './store'
import echarts from 'echarts'


import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.component('RecycleScroller', RecycleScroller)
import '@/assets/iconfont/iconfont.css'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
