import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
    searchText:"",//搜索框的内容
    goodsdata:[],//课程产品
    HistoryTags:[],//历史搜索记录
    searchwebsite:['中国大学MOOC','网易云课堂','CSDN','计算机慕课网','学而思网校','沪江网校'],//选了哪些商城网站
    isShowpager:false,//是否展示分页
    curpage:1, //当前的页码
    pagesize:20,//一页显示的数量
    pagerstotal:"",//总共的数量
    showparge:[],//中间显示的页码部分
    pagers:"",//总共的页数
    isFree:-1,//-1表示综合，0表示免费，1表示付费
    isSort:0,//0表示综合，1表示价格从di到高，2表示价格从高到低，3表示销量从高到底
    minprice:"",//最低价
    maxprice:"", //最高价
    discoverygoods:[] //发现页的商品
}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})