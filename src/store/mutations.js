const SEARCHTEXT = 'SEARCHTEXT'
const SEARCHWEBSITE = 'SEARCHWEBSITE'
const ISFREE = 'ISFREE'
const ISSORT = 'ISSORT'
const MINPRICE = 'MINPRICE'
const MAXPRICE = 'MAXPRICE'
const ISSHOWPAGER = 'ISSHOWPAGER'
const CURPAGE = 'CURPAGE'
const PAGESIZE = 'PAGESIZE'
const PAGERSTOTAL = 'PAGERSTOTAL'
const PAGERS = 'PAGERS'
const SHOWPAGERS = 'SHOWPAGERS'
const DISCOVERYGOODS = 'DISCOVERYGOODS'
const ISSHOWLOGIN = 'ISSHOWLOGIN'
const ISSHOWREGISTER = 'ISSHOWREGISTER'
const TOASTREGISTERINFO = 'TOASTREGISTERINFO'
const TOASTLOGININFO = 'TOASTLOGININFO'
const ISSHOWREGISTERTOAST = 'ISSHOWREGISTERTOAST'
const ISSHOWLOGINTOAST = 'ISSHOWLOGINTOAST'
const TOASTINFO = 'TOASTINFO'
const ISSHOWTOAST = 'ISSHOWTOAST'
const ISSHOWPLANBIANJI = 'ISSHOWPLANBIANJI'
const PLANSCORE = 'PLANSCORE'
const PLANDATE = 'PLANDATE'
const COUNTYES = 'COUNTYES'
const COUNTNO = 'COUNTNO'
const ISSHOWDISCUSSCHOICE = 'ISSHOWDISCUSSCHOICE'
const ISSHOWEMPTY = 'ISSHOWEMPTY'
const LUNTANNAME = 'LUNTANNAME'
const TOTALCONTENT = 'TOTALCONTENT'

export default {
    [SEARCHTEXT](state,res){
        state.searchText = res   //搜索框的文本内容
    },
    [SEARCHWEBSITE](state,res){   //选中的网站商城
        state.searchwebsite = res
    },
    [ISFREE](state,res){    //是否是免费课程
        state.isFree = res
    },
    [ISSORT](state,res){  //综合、价格从低到高、价格从高到低、销量从高到低
        state.isSort = res
    },
    [MINPRICE](state,res){  //区间选择价格的最小值
        state.minprice = res
    },
    [MAXPRICE](state,res){  //区间选择价格的最大值
        state.maxprice = res
    },
    [ISSHOWPAGER](state,res){
        state.isShowpager = res
    },
    [CURPAGE](state,res){
        state.curpage = res
    },
    [PAGESIZE](state,res){
        state.pagesize = res
    },
    [PAGERSTOTAL](state,res){
        state.pagerstotal = res
    },
    [PAGERS](state,res){
        state.pagers = res
    },
    [SHOWPAGERS](state,res){
        state.showparge = res
    },
    [DISCOVERYGOODS](state,res){
        state.discoverygoods = res
    },
    [ISSHOWLOGIN](state,res){
        state.isShowlogin = res
    },
    [ISSHOWREGISTER](state,res){
        state.isShowregister = res
    },
    [TOASTREGISTERINFO](state,res){
        state.toastregisterinfo = res
    },
    [TOASTLOGININFO](state,res){
        state.toastlogininfo = res
    },
    [ISSHOWREGISTERTOAST](state,res){
        state.isShowRegisterToast = res
    },
    [ISSHOWLOGINTOAST](state,res){
        state.isShowLoginToast = res
    },
    [TOASTINFO](state,res){
        state.toastinfo = res
    },
    [ISSHOWTOAST](state,res){
        state.isShowToast = res
    },
    [ISSHOWPLANBIANJI](state,res){
        state.isShowplanbianji = res
    },
    [PLANSCORE](state,res){
        state.planscore = res
    },
    [PLANDATE](state,res){
        state.plandate = res
    },
    [COUNTYES](state,res){
        state.countyes = res
    },
    [COUNTNO](state,res){
        state.countno = res
    },
    [ISSHOWDISCUSSCHOICE](state,res){
        state.isShowdiscusschoice = res
    },
    [ISSHOWEMPTY](state,res){
        state.isShowEmpty = res
    },
    [LUNTANNAME](state,res){
        state.luntan_name = res
    },
    [TOTALCONTENT](state,res){
        state.totalcontent = res
    }
    
}