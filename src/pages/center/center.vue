<template>
  <div>
    <!--添加页面顶部栏-->
    <div :class="isFixed===true?'fixed':''" id="header">
      <!-- 头部左边的logo -->
      <div class="left">
        <img class="zhuzilogo" src="../../../static/images/zhuzilogo.png" alt="logotext" />
        <div class="btn" @click="gotohome">首页</div>
        <div class="btn" @click="gotodiscovery">发现</div>
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
          <div class="usernameitem">{{username}}</div>
          <div class="outlogin" @click="outoflogin">退出登录</div>
        </div>
        <div class="btn" @click="login" v-if="!isShowusername">登录</div>
        <div class="btn" @click="register" v-if="!isShowusername">注册</div>
        <!-- <div><i class="iconfont icon-RectangleCopy3"></i></div> -->
      </div>
    </div>


    <div :class="isShowlogin===true||isShowregister===true||isShowplanbianji===true||isShowdiscusschoice===true?'op':''"></div>
    <loginpart v-show="isShowlogin"></loginpart>
    <!--登录-->
    <registerpart v-show="isShowregister"></registerpart>
    <!--注册-->


    <!--添加“我的收藏”、“我的计划”、“我的讨论”-->
    <div class="totalitem">
      <div :class="(myStar===true)?'item checked':'item'"  @click="clickMyStar">我的收藏</div>
      <div :class="(myPlan===true)?'item checked':'item'"  @click="clickMyPlan">我的计划</div>
      <div :class="(myDiscuss===true)?'item checked':'item'"  @click="clickMyDiscuss">我的讨论</div>
    </div>

    <div>
      <div v-show="myStar" class="myStarform">
        <star></star>
      </div>

      <div v-show="myPlan" class="myPlanform">
        <plan></plan>
      </div>
        
      <div v-show="myDiscuss" class="myDiscussfrom">
        <discuss></discuss>
      </div>
    </div>
  </div>
</template>

<script>
import loginpart from "@/components/login.vue";
import registerpart from "@/components/register.vue";
import star from "@/components/star.vue";
import plan from "@/components/plan.vue";
import discuss from "@/components/discuss.vue";
import axiosgetuserluntanname from '@/axios/axiosgetuserluntanname.js'
import axiosgetluntancontent from "@/axios/axiosgetluntancontent.js"
export default {
  components: {
    loginpart,
    registerpart,
    star,
    plan,
    discuss
  },
  data() {
    return {
      searchText: "", //搜索框的内容
      isFixed: false, //一开始顶部搜索栏不固定
      myStar: true,
      myPlan: false,
      myDiscuss: false,
    };
  },

  created() {
    this.username = sessionStorage.getItem("curusername");
    this.isShowusername = sessionStorage.getItem("isShowusername");
    if (this.isShowusername == null) {
      this.isShowusername = false;
      this.username = "";
    }
    if (this.isShowusername == "false") {
      this.isShowusername = false;
      this.username = "";
    }
  },
  computed: {
    isShowlogin() {
      return this.$store.state.isShowlogin;
    },
    isShowregister() {
      return this.$store.state.isShowregister;
    },
    isShowplanbianji(){
      return this.$store.state.isShowplanbianji;
    },
    isShowdiscusschoice(){
      return this.$store.state.isShowdiscusschoice;
    },
    luntanname(){
      return this.$store.state.luntan_name
    }
  },
  /*监听滑动块移动的距离，并判断是否固定顶部栏 */
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
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
      if (scrollTop >= 50) {
        this.isFixed = true; //滑动超过100固定
      } else {
        this.isFixed = false; //滑动没超出100不固定
      }
    },

    gotohome() {
      this.$router.push("/home");
    },
    gotodiscovery(){
      this.$router.push("/discovery");
    },
    //search()函数表示记录历史记录并跳转页面
    search() {
      if (this.$store.state.HistoryTags.indexOf(this.searchText.trim()) == -1) {
        this.$store.state.HistoryTags.unshift(this.searchText.trim());
      }
      // 更新数据
      if (this.searchText !== "") {
        sessionStorage.setItem("text", this.searchText);
        this.$router.push("/searchResult");
      }

      // 也可以写成这种形式
      // this.$router.push({path:'/searchResult'})
    },
    login() {
      this.$store.commit("ISSHOWLOGIN", true);
    },
    register() {
      this.$store.commit("ISSHOWREGISTER", true);
    },
    outoflogin() {
      sessionStorage.setItem("curusername", "");
      sessionStorage.setItem("isShowusername", false);
      sessionStorage.setItem("token", "");
      this.$router.push("/");
    },
    clickMyStar(){
        this.myStar = true
        this.myPlan = false
        this.myDiscuss = false

    },
    clickMyPlan(){
        this.myStar = false
        this.myPlan = true
        this.myDiscuss = false
      
    },
    clickMyDiscuss(){
        this.myStar = false
        this.myPlan = false
        var token = sessionStorage.getItem("token")
        var info = {
            "token":token
        }
        axiosgetuserluntanname(info,IfGetName=>{
            if(IfGetName.length==0)
            {
                this.$store.commit("ISSHOWEMPTY",true)
            }else{
              this.$store.commit("LUNTANNAME",IfGetName)
                 var curtime = this.gettime()
                 var info2 = {
                    "token":token,
                    "curtime":curtime,
                    "luntanname":this.luntanname[0]["luntanname"]
                }
                axiosgetluntancontent(info2,IfGetContent=>{
                        this.$store.commit("TOTALCONTENT",IfGetContent)
                        // console.log(IfGetContent)
                    })
            }
        })
     
            
        this.myDiscuss = true

    },
        gettime(){
                var date = new Date(); //获取当前时间
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 1 && strDate <= 9) {
                    strDate = "0" + strDate;
                }

                var hour = date.getHours();//获取系统时间
                var minute = date.getMinutes(); //分
                var second = date.getSeconds();//秒
                 if (hour >= 1 && hour <= 9) {
                    hour = "0" + hour;
                }
                 if ( minute >= 1 &&  minute <= 9) {
                     minute = "0" +  minute;
                }
                 if ( second >= 1 &&  second <= 9) {
                    second = "0" + second;
                }
                var curtime = year + seperator1 + month + seperator1 + strDate+" "+hour+":"+minute+":"+second;
                return curtime;
        }
  }
};
</script>

<style scoped>
/*顶部搜索栏的样式 */
.fixed {
  /*固定顶部搜索栏 */
  position: fixed;
  top: 0;
  z-index: 1000;
  box-shadow: 0px 0px 10px rgb(221, 216, 216);
}
.op {
  /*遮罩层 */
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
  background-position: 75%;
  background-image: url("../../../static/images/sousuobg.png");
  /* box-shadow: 0px 15px 10px -15px #ccc; */
  border-bottom: 1px solid rgb(216, 215, 215);
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

#header .left .zhuzilogo {
  float: left;
  margin-left: 1%;
  height: 100%;
  width: 35%;
}
#header .left .btn {
  width: 10%;
  margin-top: 8%;
  margin-left: 5%;
  font-size: 100%;
  color: #b88b8b;
}
#header .left .btn:hover {
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
.suosouimgform img {
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
#header .right .uesrnameform {
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
#header .right .uesrnameform .usernameitem {
  margin-left: 25%;
}
#header .right .outlogin {
  opacity: 0;
  border: 0px;
}
#header .right .uesrnameform:hover .outlogin {
  font-size: 16px;
  opacity: 1;
  border: 0px;
}
.checked {
  font-weight: bold;
  padding-bottom: 3px;
  border-bottom: 3px solid #b88b8b;
}
.totalitem {
  height: 50px;
  box-shadow: 0px 15px 10px -15px #ccc;
}
.item {
  color: #b88b8b;
  margin: 20px 40px;
  font-size: 18px;
  float: left;
}
.item:hover {
  cursor: pointer;
  font-weight: bold;
  padding-bottom: 3px;
  border-bottom: 3px solid #b88b8b;
}
</style>