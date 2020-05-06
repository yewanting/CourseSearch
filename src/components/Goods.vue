<template>
  <div class="totalform">
    <div class="toastform" v-show="isShowToast">
      <!--用于提示用户是否登录成功-->
      <div style="margin-top:25%">{{toastinfo}}</div>
    </div>
    <div v-for="(goodsitem,index) in goods" :key="index" class="courseform">
      <!--传入商品对象数组-->
      <a :href="goodsitem.coursevediohref" target="_blank">
        <div class="toppart">
          <img :src="goodsitem.courseimghref" :onerror="errImg" />
          <!--商品的照片-->
        </div>
        <div class="bottompart">
          <div class="title">{{goodsitem.coursetitle}}</div>
          <!--商品的题目-->
          <div class="content">{{goodsitem.coursedes}}</div>
          <!--商品的简介-->
          <i class="iconfont icon-RectangleCopy3"></i>
          <!--个人的图标-->
          <span>{{goodsitem.coursenumber}}</span>
          <!--商品参加的人数-->
          <div class="price">￥{{goodsitem.courseprice}}</div>
          <!--商品的价格-->
        </div>
      </a>
      <div class="Starttotalform">
        <i
          v-show="!startlist[index]"
          class="iconfont icon-xiangkan"
          @click="Start(index,goodsitem.id)"
        ></i>
        <i
          v-show="startlist[index]"
          class="iconfont icon-aixin"
          @click="UnStart(index,goodsitem.id)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import axiospostuserstar from "@/axios/axiospostuserstar.js";
import axioscanceluserstar from "@/axios/axioscanceluserstar.js";
import axiosselectuserstar from "@/axios/axiosselectuserstar.js";
export default {
  data() {
    return {
      errImg: 'this.src="' + "../static/images/zanwutupian.png" + '"',
      startlist: []
    };
  },
  computed: {
    goods() {
      var token = sessionStorage.getItem("token");
      var userstarinfo = {
        token: token
      };
      axiosselectuserstar(userstarinfo, IfExitsStar => {
        
        this.startlist = [];

        for (let i = 0; i < this.$store.state.goodsdata.length; i++){
          var flag = false
          for (let k = 0; k < IfExitsStar.length; k++) {
            if (this.$store.state.goodsdata[i].id == IfExitsStar[k].id){
              flag=true
              break
            }
          }
          this.startlist.push(flag)
        }
      });

      return this.$store.state.goodsdata;
    },
    toastinfo() {
      return this.$store.state.toastinfo;
    },
    isShowToast() {
      return this.$store.state.isShowToast;
    }
  },
  methods: {
    Start(index, courseid) {
      var curuser = sessionStorage.getItem("isShowusername");
      if (curuser != "true") {
        this.$store.commit("TOASTINFO", "请先登录！");
        this.$store.commit("ISSHOWTOAST", true);

        setTimeout(() => {
          this.$store.commit("ISSHOWTOAST", false);
        }, 1500);
      } else {
        this.startlist[index] = true;
        this.$forceUpdate();
        var token = sessionStorage.getItem("token");
        var userstarinfo = {
          token: token,
          courseid: courseid
        };
        axiospostuserstar(userstarinfo, IfStar => {
          if (IfStar == "1") {
            this.$store.commit("TOASTINFO", "收藏成功！");
            this.$store.commit("ISSHOWTOAST", true);

            setTimeout(() => {
              this.$store.commit("ISSHOWTOAST", false);
            }, 1500);
            console.log("添加收藏！");
          } else {
            this.$store.commit("TOASTINFO", "无权限！");
            this.$store.commit("ISSHOWTOAST", true);

            setTimeout(() => {
              this.$store.commit("ISSHOWTOAST", false);
            }, 1500);
            console.log("您没有权限收藏！");
          }
        });
      }
    },
    UnStart(index, courseid) {
      this.startlist[index] = false;
      this.$forceUpdate();
      var token = sessionStorage.getItem("token");
      var userCancelstarinfo = {
        token: token,
        courseid: courseid
      };
      axioscanceluserstar(userCancelstarinfo, IfCancelStar => {
        if (IfCancelStar == "1") {
          this.$store.commit("TOASTINFO", "取消收藏成功！");
          this.$store.commit("ISSHOWTOAST", true);

          setTimeout(() => {
            this.$store.commit("ISSHOWTOAST", false);
          }, 1500);
          console.log("取消收藏！");
        } else {
          console.log("您没有权限取消收藏！");
        }
      });
    }
  }
};
</script>

<style scoped>
.totalform {
  clear: both;
  margin-top: 1%;
  margin-left: 3%;
}
.courseform {
  box-shadow: 0px 0px 10px rgb(221, 216, 216);
  width: 21vw;
  /* width: 350px; */
  height: 320px;
  float: left;
  margin: 1%;
  background-color: #ffffff;
}
.courseform:hover {
  cursor: pointer;
  box-shadow: 2px 2px 40px 5px gray;
}
.courseform a {
  text-decoration: none;
  color: black;
}

.courseform a:hover {
  color: rgb(25, 139, 124);
  opacity: 0.8;
}

.Starttotalform {
  float: right;
}
.icon-xiangkan,
.icon-aixin {
  font-size: 25px;
  color: red;
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
.toastform {
  position: fixed;
  background-color: #ffffff;
  text-align: center;
  top: 30%;
  left: 35%;
  font-size: 18px;
  color: #b88b8b;
  width: 25%;
  height: 25%;
  font-weight: bold;
  box-shadow: 0px 10px 30px gray;
  z-index: 100;
}
</style>