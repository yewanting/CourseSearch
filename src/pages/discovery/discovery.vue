<template>
    <div>
        <!--添加页面顶部栏-->
      <div :class="isFixed===true?'fixed':''" id="header">
        <!-- 头部左边的logo -->
        <div class="left">
          <img  class = "zhuzilogo" src="../../../static/images/zhuzilogo.png" alt="logotext" />
          <div  class="btn" @click="gotohome">首页</div>
          <div class="btn checked">发现</div>
        </div>
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
        <!--添加轮播图-->
        <!-- <swiper :slides ="banners"></swiper>   -->
      
      <!--添加导航栏-->
      <div class="Navbar">
        <div class="eachnavber" v-for="(course,index) in coursetotallabel" :key="index">
            <!-- <a :href="'#'+course" class="aform"> -->
              <div class="navbaritem" @click="gotocourse(course)">
                  {{course}}
              </div>  
            <!-- </a> -->
        </div>
      </div>

        <div :class="isShowlogin===true||isShowregister===true?'op':''"></div>
        <loginpart v-show="isShowlogin"></loginpart> <!--登录-->
        <registerpart v-show="isShowregister"></registerpart> <!--注册-->
        <!--添加首页课程-->
        <!--分为这几类:'编程与开发','考研'，'产品与运营','设计创意','电商运营','职场提升','AI/数据科学','语言学习','职业考试','生活兴趣'-->
        <!--首页课程部分-->
        <div v-for="(courselabel,index) in coursetotallabel" :key="index" class="eachbigform" >
          <br>
            <div class="titleform" :id ="courselabel">{{courselabel}}</div>
            <div v-for="(items,index1) in  discoverygoods" :key="index1" class="totalform">
                  <div v-for="(course,index2) in items" v-show="course.coursetotallabel===courselabel" :key="index2" class="courseform" >
                       <!--传入商品对象数组-->
                      <a :href="course.coursevediohref" target="_blank">
                        <div class="toppart">
                          <img :src="course.courseimghref" :onerror = "errImg"/>
                          <!--商品的照片-->
                        </div>
                        <div class="bottompart">
                          <div class="title">{{course.coursetitle}}</div>
                          <!--商品的题目-->
                          <div class="content">{{course.coursedes}}</div>
                          <!--商品的简介-->
                          <i class="iconfont icon-RectangleCopy3"></i>
                          <!--个人的图标-->
                          <span>{{course.coursenumber}}</span>
                          <!--商品参加的人数-->
                          <div class="price">￥{{course.courseprice}}</div>
                          <!--商品的价格-->
                        </div>
                      </a>
                  </div>                
           </div>

        </div>
    </div>
</template>
<script>
// import swiper from '@/components/swiper.vue'   //引入轮播图组件
import loginpart from '@/components/login.vue'
import registerpart from '@/components/register.vue'
import axiospostsearch from "@/axios/axiosgetcourse.js"  //引入axios获得的课程
import axiosgethomegoods from '@/axios/axiosgethomegoods.js' //引入axios获得的home的课程
export default {
    components:{
        // swiper,
        loginpart,
        registerpart
    },
    data(){
        return{
            searchText: "", //搜索框的内容
            isFixed:false,   //一开始顶部搜索栏不固定
            coursetotallabel:['编程与开发','产品与运营','考研','设计创意','电商运营','职场提升','AI/数据科学','语言学习','职业考试','生活兴趣'],
            errImg:'this.src="' + '../static/images/zanwutupian.png' + '"',
            username:"",
            isShowusername:false,
        }
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
    computed:{
         discoverygoods(){
           return this.$store.state.discoverygoods
         },
          isShowlogin(){
             return this.$store.state.isShowlogin
          },
          isShowregister()
          {
            return this.$store.state.isShowregister;
          }

    },
     /*监听滑动块移动的距离，并判断是否固定顶部栏 */
    mounted(){
        window.addEventListener('scroll',this.handleScroll);
        this.gethomgoods(this.coursetotallabel);
    },
     /*移除监听滑动块 */
    destroyed(){
        window.removeEventListener('scroll',this.handleScroll)
    },
    methods:{

    gethomgoods(coursetotallabel){
      var totalgoods  = new Array();
      for(var i = 0 ; i < coursetotallabel.length ; i++)
      {    

            axiosgethomegoods(
          {
            searchtext: this.$store.state.searchText,
            curpage: 1,
            pagesize: this.$store.state.pagesize,
            searchwebsite: this.$store.state.searchwebsite,
            isFree: this.$store.state.isFree,
            isSort: this.$store.state.isSort,
            minprice: this.$store.state.minprice,
            maxprice: this.$store.state.maxprice,
            coursetotallabel:coursetotallabel[i]
          },
          goodsdata => {
            //将字符串转为JSON对象
            // this.$store.state.homegoods = JSON.parse(goodsdata)
            // this.$store.state.homegoods.push(JSON.parse(goodsdata)) 
            totalgoods.push(goodsdata);
            this.$store.commit('DISCOVERYGOODS',totalgoods)
            // console.log(totalgoods)
          }
        );
      }

    },
     handleScroll () {
            //scrollTop表示垂直滚动的距离
            let scrollTop = 
            window.pageYOffset ||  //pageYOffset 设置或返回当前页面相对于窗口显示区左上角的 Y 位置
            document.documentElement.scrollTop || //要获取当前页面的滚动条纵坐标位置,documentElement 对应的是 html 标签
            document.body.scrollTop //body 对应的是 body 标签。
            //所有主流浏览器都支持 pageXOffset 和 pageYOffset 属性。
            //IE 8 及 更早 IE 版本不支持该属性,但可以使用 document.documentElement.scrollLeft 
            //和 document.documentElement.scrollTop 属性 
            // const offsetTop = document.querySelector('#head').offsetTop
            // querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
            if (scrollTop >= 50) {
            this.isFixed = true;    //滑动超过100固定
            } else {
            this.isFixed = false;   //滑动没超出100不固定
            }

        },
        gotohome(){
          this.$router.push("/home");
      },
      gotocourse(id){
          console.log(id);
          document.getElementById(id).scrollIntoView();
         document.documentElement.scrollBy(0,-250)
      },
        //search()函数表示记录历史记录并跳转页面
         search() {
         if (this.$store.state.HistoryTags.indexOf(this.searchText.trim()) == -1) {
               this.$store.state.HistoryTags.unshift(this.searchText.trim());
         }
             // 更新数据
          if(this.searchText!=="")
          {
            sessionStorage.setItem("text",this.searchText)
            this.$router.push("/searchResult");
          }
         
        // 也可以写成这种形式
        // this.$router.push({path:'/searchResult'})
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
}
</script>

<style scoped>

/*顶部搜索栏的样式 */
.fixed{     /*固定顶部搜索栏 */
    position: fixed;
    top:0;
    z-index: 1000;
    box-shadow: 0px 0px 10px  rgb(221, 216, 216);
}
.op{   /*遮罩层 */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(80, 77, 83, 0.3);
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
  /* box-shadow: 0px 15px 10px -15px #ccc; */
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
  width: 35%;
}
#header .left .btn{
   width: 10%;
   margin-top: 8%;
   margin-left: 5%;
   font-size: 100%;
   color: #b88b8b;
}
#header .left .btn:hover{
  font-weight: bold;
  cursor: pointer;
  padding-bottom: 5px;
  border-bottom: 1px solid #b88b8b;
}
#header .mid {
  /*顶部栏中间搜索框的样式 */

  display: flex;
  float: left;
  height: 35px;
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
  padding-top: 1%;
  box-sizing: border-box;
  margin-right: 5px;
  width: 5%;
  color: grey;
  font-size: 16px;
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
  margin-top: 0.6%;
  margin-left: 0.5%;
}
#header .mid .searchbutton span {
  /*顶部栏中间搜索框右侧按钮内部文字的样式 */
  padding-left: 5px;
  font-size: 15px;
  color: #b88b8b;
}
#header .mid .searchbutton:hover {
  cursor: pointer;
  font-weight: bolder;
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
.checked{
  font-weight:bold;
  padding-bottom: 3px;
  border-bottom: 1px solid #b88b8b;
}
.Navbar{
  clear: both;
  margin-top: 3%;
  background-size: 25% 100%;
  background-image: url('../../../static/images/navbarbg2.png');
  width: 98.7vw;
  height: 8vh;
  border-top: 1px solid #ccc;
  box-shadow: 0px 15px 10px -15px #ccc;
}
.eachnavber{
    float: left;
    font-size: 100%;
    margin-left: 2%;
    height: 50%;
    font-weight: bold;
    color:#b88b8b;
    width: 8%;
}
.aform{
  text-decoration:none;
  color:#b88b8b;
}
.navbaritem{
    width: 100%;
    margin-top: 30%;
}
.eachnavber:hover{
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 180%;
  background-image: url('../../../static/images/navbarhover3.png');
}
.eachbigform{
  clear: both;
}

.titleform{
    font-size: 20px;
    margin-left: 5%;
    font-weight: bolder;
    color: #111111;
    margin-top: 5%;
    clear: both;
}
.totalform{
    clear: both;
    float: left;
    /* margin-top: 1%; */
    margin-left:3%;
}

.courseform {
  box-shadow: 0px 0px 10px  rgb(221, 216, 216);
  width: 22%;
  /* width: 350px; */
  height: 320px;
  float: left;
  margin:1%;
  background-color: #ffffff;
}
.courseform:hover{
  cursor: pointer;
  box-shadow:2px 2px 40px 5px gray; ;
}
.courseform a {
  text-decoration: none;
  color: black;
}

.courseform a:hover {
  color: rgb(25, 139, 124);
  opacity: 0.8;
}



.courseform .toppart {
  width: 100%;
  /* width: 350px; */
  overflow: hidden;
}

.courseform .toppart img {
  width: 100%;
  height: 170px;
}

.courseform .toppart img:hover {
  transition: 0.6s;
  transform: scale(1.2);
}

.courseform .bottompart .title {
  font-size: 18px;
  font-weight: 400;
  padding-top: 5px;
  padding-left: 5px;
}

.courseform .bottompart .content {
  padding-left: 5px; 
  font-size: 12px;
  color: gray;
  padding-top: 5px;
}

.courseform .bottompart .price {
  padding-left: 5px;
  font-size: 12px;
  color: orangered;
  padding-top: 5px;
}

.icon-RectangleCopy3 {
  /*个人的小图标 */
  padding-left: 5px;
  font-size: 10px;
  color: gray;
}
.bottompart span {
  font-size: 10px;
  color: gray;
}


</style>