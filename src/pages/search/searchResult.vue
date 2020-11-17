<template>
  <div class="divform">
    <!--搜索页头部三大块:页面顶部搜索框，网站选择和排序选择-->
    <div class="wholetopbar">
      <!-- 添加页面顶部栏 -->
      <div :class="isFixed===true?'fixed':''" id="header">
        <!-- 头部左边的logo -->
        <div class="left">
          <!-- <img  class = "logo" src="../../../static/images/logo.jpg" alt="logo" /> -->
          <img  class = "zhuzilogo" src="../../../static/images/zhuzilogo.png" alt="logotext" />
          <div  class="btn" @click="gotohome">首页</div>
          <div class="btn" @click="gotodiscovery">发现</div>
        </div>


         <!-- <div class="suosouimgform">
            <img src="../../../static/images/sousoubg.png">
          </div> -->
        <!-- 头部中间的大搜索框 -->
        <!-- search()函数表示记录历史记录并跳转页面 -->
        <div class="mid">
          <i class="iconfont icon-RectangleCopy1"></i>
          <input
            v-model="searchText"
            type="text"
            class="search-form"
            @keyup.enter="search"
            placeholder="搜索您想要的课程"
          />
          <div class="searchbutton" @click="search()">
            <span>搜 索</span>
          </div>

        </div>

        <!-- 头部右边的登录/个人中心 -->
        <div class="right">
          <div v-if="isShowusername" class="uesrnameform">
               <div class="usernameitem" @click="gotocenter">{{username}}</div>
               <div class="outlogin" @click="outoflogin">退出登录</div>
          </div>
             <div class = "btn" @click="login" v-if="!isShowusername">登录</div>
             <div class = "btn" @click="register" v-if="!isShowusername">注册</div>
         

          <!-- <div><i class="iconfont icon-RectangleCopy3"></i></div> -->
        </div>
      </div>
      <div :class="isShowlogin===true||isShowregister===true?'op':''"></div>
      <loginpart v-show="isShowlogin"></loginpart><!--登录-->
      <registerpart v-show="isShowregister"></registerpart> <!--注册-->
      <!--添加网站选项-->
      <searchwebsitebar></searchwebsitebar>
      <!--商品排序选项按钮栏-->
      <searchsortbar></searchsortbar>
    </div>
     
    <!--添加商品-->
      <Goods></Goods>


    <!--添加分页-->
    <div v-show="isShowpager">
      <ul class="paging">
        <li class="paging-item">共 {{pagerstotal}} 条</li>
        <!--上一页-->
        <li
          class="paging-item paging-item-prev"
          :class="{'paging-item-disabled': curpage===1}"
          @click="prev"
        >上一页</li>

        <!--首页-->
        <li
          class="paging-item paging-item-prev"
          :class="{'paging-item-disabled': curpage===1}"
          @click="first"
        >首页</li>

        <li
          class="paging-item"
          :class="{'paging-item-cur': curpage === pager}"
          v-for="(pager,index) in showparge"
          :key="index"
          @click="go(pager)"
        >{{pager}}</li>

        <!--末页-->
        <li
          class="paging-item paging-item-last"
          :class="{'paging-item-disabled': curpage===pagers}"
          @click="last"
        >末页</li>

        <!--下一页-->
        <li
          class="paging-item paging-item-next"
          :class="{'paging-item-disabled': curpage===pagers}"
          @click="next"
        >下一页</li>
      </ul>
    </div>

    <!--添加返回顶部-->
    <gotop></gotop>
  </div>
</template>

<script>
import searchwebsitebar from "@/components/searchwebsitebar.vue";
import searchsortbar from "@/components/searchsortbar.vue";
import Goods from "@/components/Goods.vue";
import gotop from "@/components/gotop.vue";
import loginpart from '@/components/login.vue'
import registerpart from '@/components/register.vue'
import axiospostsearch from "@/axios/axiosgetcourse.js"; //引入axios获得的课程
import axiosgetcount from "@/axios/axiosgetcount.js"; //引入axios获得的课程总数
export default {
  data() {
    return {
      isFixed: false, //是否固定头部搜索栏
      searchText: "", //搜索框的内容
      username:"",
      isShowusername:false,
    };
  },
  components: {
    searchwebsitebar, //搜索页面checkbox网站选择那里的组件
    searchsortbar, // 搜索页面排序按钮那里
    Goods, //商品列表
    gotop, //返回顶部
    loginpart, //登录页面
    registerpart,//注册页面
  },
  created(){
     this.username = sessionStorage.getItem("curusername");
     this.isShowusername = sessionStorage.getItem("isShowusername");
     if(this.isShowusername==null){
       this.isShowusername=false
       this.username=""
     }
     if(this.isShowusername=="false"){
       this.isShowusername=false
       this.username=""
     }
  },
  computed: {
    isShowpager(){
        return this.$store.state.isShowpager
    },
    curpage() {
      //当前的页码
      return this.$store.state.curpage;
    },
    pagesize() {
      //一页的数量
      return this.$store.state.pagesize;
    },
    showparge() {
      //中间显示的部分页码
      return this.$store.state.showparge;
    },
    pagerstotal() {
      //总共的数量
      return this.$store.state.pagerstotal;
    },
    pagers() {
      //总共的页数
      return this.$store.state.pagers;
    },
     isShowlogin(){
         return this.$store.state.isShowlogin
      },
       isShowregister()
      {
        return this.$store.state.isShowregister;
      },
  },
  mounted() {
    /*监听滑动块移动的距离，并判断是否固定顶部栏 */
    window.addEventListener("scroll", this.handleScroll);

    /*获取到首页搜索框的值 */
    this.searchText = sessionStorage.getItem("text", "");
    this.search();
  },
  /*移除监听滑动块 */
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      //scrollTop表示垂直滚动的距离
      let scrollTop =
        window.pageYOffset || //pageYOffset 设置或返回当前页面相对于窗口显示区左上角的 Y 位置
        document.documentElement.scrollTop || //要获取当前页面的滚动条纵坐标位置,documentElement 对应的是 html 标签
        document.body.scrollTop; //body 对应的是 body 标签。
      //所有主流浏览器都支持 pageXOffset 和 pageYOffset 属性。
      //IE 8 及 更早 IE 版本不支持该属性,但可以使用 document.documentElement.scrollLeft
      //和 document.documentElement.scrollTop 属性
      // const offsetTop = document.querySelector('#head').offsetTop
      // querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。

      if (scrollTop >= 100) {
        this.isFixed = true; //滑动超过100固定
      } else {
        this.isFixed = false; //滑动没超出100不固定
      }
    },
    gotohome(){
        this.$router.push("/home");
    },
    gotodiscovery(){
      this.$router.push("/discovery");
    },
    //search()函数表示记录历史记录并跳转页面
    search() {
      this.$store.commit("ISFREE", -1);
      this.$store.commit("SEARCHTEXT", this.searchText);
      if (this.$store.state.HistoryTags.indexOf(this.searchText.trim()) == -1) {
        this.$store.state.HistoryTags.unshift(this.searchText.trim());
      }
      // 更新数据
      if (this.searchText !== "") {
        sessionStorage.setItem("text", this.searchText);
        //搜索的时候，页面变成第一页      
      }
        this.$store.commit("CURPAGE", 1);
        this.gopage(1);
      },
    prev() {
      if (this.$store.state.curpage > 1) {
        this.go(this.$store.state.curpage - 1);
      }
    },
    first() {
      if (this.$store.state.curpage !== 1) {
        this.go(1);
      }
    },
    last() {
      if (this.$store.state.curpage != this.$store.state.pagers) {
        this.go(this.$store.state.pagers);
      }
    },
    next() {
      if (this.$store.state.curpage < this.$store.state.pagers) {
        this.go(this.$store.state.curpage + 1);
      }
    },
    go(page) {
      if (this.$store.state.curpage !== this.$store.state.pagers + 1) {
        this.$store.commit("CURPAGE", page);
        this.gopage(this.$store.state.curpage);
      }
    },
        gopage(tcurpage) {
          console.log(this.$store.state.searchwebsite)
         axiosgetcount(
        {
          searchtext: this.$store.state.searchText,
          curpage: tcurpage,
          pagesize: this.$store.state.pagesize,
          searchwebsite: this.$store.state.searchwebsite,
          isFree: this.$store.state.isFree,
          isSort: this.$store.state.isSort,
          minprice: this.$store.state.minprice,
          maxprice: this.$store.state.maxprice,
          
        },
        goodscount => {
          this.$store.state.goodscount = goodscount["COUNT(*)"];
          //获取课程总数
          var tmppagerstotal = goodscount["COUNT(*)"];
          var tmppagersize = this.$store.state.pagesize;
          //获取页数
          var tmppagers = Math.ceil(tmppagerstotal / tmppagersize);

          this.$store.commit("PAGERSTOTAL", tmppagerstotal);
          this.$store.commit("PAGERS", tmppagers);
          // console.log(this.$store.state.pagerstotal);

          //分页
          var li = [];
          var tmpcurpage = this.$store.state.curpage;
          for (
            var i = Math.min(Math.max(1, tmpcurpage - 2), tmppagers);
            i <=
            Math.min(
              tmpcurpage + (tmpcurpage < 3 ? 5 - tmpcurpage : 2),
              tmppagers
            );
            i++
          ) {
            li.push(i);
          }
          if (li.length == 0) li.push(1);

          this.$store.commit("SHOWPAGERS", li);
        }
      );
      axiospostsearch(
        {
          searchtext: this.$store.state.searchText,
          curpage: tcurpage,
          pagesize: this.$store.state.pagesize,
          searchwebsite: this.$store.state.searchwebsite,
          isFree: this.$store.state.isFree,
          isSort: this.$store.state.isSort,
          minprice: this.$store.state.minprice,
          maxprice: this.$store.state.maxprice,
        },
        goodsdata => {
          //将字符串转为JSON对象
          this.$store.state.goodsdata = JSON.parse(goodsdata);
          this.$store.commit('ISSHOWPAGER',true);
        }
      );
    },
      login(){
        this.$store.commit("ISSHOWLOGIN",true)
      },
      register(){
        this.$store.commit("ISSHOWREGISTER",true)
      },
      outoflogin(){  
         sessionStorage.setItem("curusername", ""); 
         sessionStorage.setItem("isShowusername",false);
         sessionStorage.setItem("token","");  
        this.$router.go(0)
      },
      gotocenter(){
        this.$router.push({path:'./center'});
      }
  }
};
</script>

<style scoped>
/*整个搜索页面的样式 */
.divform {
  width: 100%;
  margin: 0;
  padding: 0;
}

/*搜索页面头部三大块的总样式：头部搜索栏、网站选择和价格排序 */
.wholetopbar {
  margin: 0;
  padding-bottom: 5px;
  box-shadow: 0px 15px 10px -15px #ccc; /*让整个topbar部分下面生成阴影部分 */
}
/*固定头部搜索栏的样式 */
.divform .wholetopbar .fixed {
  position: fixed;
  top: 0;
  z-index: 1000;
   box-shadow: 0px 15px 10px -15px #ccc; 
}
#header {
  /*顶部栏的样式 */
  background-color: #ffffff;
  height: 90px;
  width: 100%;
  box-sizing: border-box;
  background-size: 50% 100%;
  background-repeat: no-repeat;
  background-position:75%;
  background-image: url("../../../static/images/sousuobg.png");
}
#header div {
  /*顶部栏里每个小块的样式，总共有三个小块，左、中、右 */
  float: left;
  box-sizing: border-box;
}
#header .left {
  /*顶部栏左侧详细的样式 */
  float: left;
  height: 100%;
  width: 22%;
  box-sizing: border-box;
  padding-left: 20px;
  /* padding-top: 10px; */
}


#header .left .zhuzilogo{
  float: left;
  margin-left: 1%;
  height:100%;
  width: 30%;
}
#header .left .btn{
   width: 12%;
   margin-top: 8%;
   margin-left: 5%;
   font-size: 100%;
   color: #b88b8b;
}
#header .left .btn:hover{
  cursor: pointer;
  padding-bottom: 5px;
  border-bottom: 1px solid #b88b8b;
}
.wholetopbar #header .mid {
  /*顶部栏中间搜索框的样式 */

  display: flex;
  float: left;
  height: 30px;
  border-radius: 5px;
  width: 50%;
  box-sizing: border-box;
  margin-top: 30px;
  z-index: 100;
  border: 1px solid #bba8a8;


}
.suosouimgform img{
  float: left;
  margin-left: 10px;
  /* position: absolute; */
  height: 70px;
}
#header .mid .icon-RectangleCopy1 {
  /*顶部栏中间搜索框左侧的搜索图标的样式 */
  z-index: 100;
  color: #b88b8b;
  margin-left: 1%;
  float: left;
  height: 100%;
  padding-left: 1%;
  padding-top: 7px;
  box-sizing: border-box;
  margin-right: 5px;
  width: 5%;
  color: grey;
  font-size: 15px;
}
#header .mid .search-form {
  /*顶部栏中间搜索框中间的框框的样式 */
  z-index: 100;
  padding-top: 1px;
  float: left;
  height: 100%;
  width: 10px;
  flex-grow: 1;
  background-color: transparent;
  font-size: 15px;
  border: 0px;
  outline: none;
}
#header .mid .searchbutton {
  /*顶部栏中间搜索框右侧按钮的样式 */
  z-index: 100;
  float: left;
  width: 45px;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  color: #6b4242;
  /* padding-bottom: 3px; */
  padding-left: 5px;
}
#header .mid .searchbutton span {
  /*顶部栏中间搜索框右侧按钮内部文字的样式 */
  font-size: 15px;
  font-weight: bold;
  color: #b88b8b;
}
#header .mid .searchbutton:hover {
  cursor: pointer;
}

#header .right {
  /*顶部栏右侧样式 */
  float: right;
  margin-top: 35px;
  box-sizing: border-box;
  list-style: none;
  padding: 0;
  display: table;
  padding-right: 4%;
}
#header .right .btn {
  /*顶部栏右侧内部的样式 */
  font-size: 15px;
  text-align: center;
  display: table-cell;
  color: #b88b8b;
  width: 70px;
  height: 25px;
  padding-top: 3px;
  margin-top: 5px;
  border-radius: 20px;
  border: 1px solid rgb(182, 179, 179);
  margin-left: 10px;
}

#header .right div:hover {
  font-weight: bolder;
  cursor: pointer;
  
}
#header .right .uesrnameform{
  font-size: 15px;
  color: #b88b8b;
  width: 70px;
  height: 25px;
  padding-top: 3px;
  border-radius: 20px;
  border: 1px solid rgb(182, 179, 179);
  margin-left: 10px;
  font-weight: bold;
}
#header .right .uesrnameform .usernameitem{
  margin-left: 25%;
}
#header .right .outlogin{
  opacity: 0;
  border: 0px;
}
#header .right .uesrnameform:hover .outlogin{
  font-size: 16px;
  opacity: 1;
  border: 0px;
}
.op{   /*遮罩层 */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(80, 77, 83, 0.3);
}
/*分页的总样式 */
.paging {
  margin-top: 20px;
  clear: both;
  list-style: none;
}
/* 分页的各个小块的样式 */
.paging .paging-item {
  float: left;
  margin: 1%;
  color: rgb(90, 87, 87);
  font-size: 15px;
}
.paging .paging-item:hover:first-child {
  cursor: default;
}
/* 鼠标移到分页小块时的样式 */
.paging .paging-item:hover {
  color: rgb(27, 142, 146);
  cursor: pointer;
}
/* 禁用时的样式 */
.paging .paging-item-disabled:hover {
  cursor: not-allowed;
}
/* 当前分页选中的的样式 */
.paging .paging-item-cur {
  color: rgb(27, 142, 146);
}
</style>