<template>
  <div class="totalbg">
    <div class="top">
      <img src="../../../static/images/zhuzilogo.png" class="logo" />
      <div class="btnhome">首页</div>
      <div class="btndiscovery" @click="gotodiscovery">发现</div>
      <!-- <div class="toprightbtn">
         <div class="btn"><div>登录</div></div>
         <div class="btn"><div>注册</div></div>
      </div> -->
    </div>
    <div class="middle">
      <div class="title">竹子课堂，陪你一起开拓学习视野</div>
      <p class="content">竹子课堂有10W+的课程，涵盖了编程与开发、AI/数据科学、产品与运营、</p>
      <p class="content">设计创意、电商运营、语言学习、职业考试、生活兴趣、考研、初高中等各方面的课程，应有尽有。</p>
      <div class="search-box">
        <i class="iconfont icon-sousuo"></i>
        <input
          type="text"
          v-model="searchText"
          class="search-form"
          @keyup.enter="search"
          placeholder="搜索你想要的课程"
        />
        <div class="searchbutton" @click="search">
          <span>搜 索</span>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data(){
      return{
          searchText:""
      }
  },
  methods: {
    search() {
      if (this.searchText != "") {
          console.log(this.searchText)
        sessionStorage.setItem("text", this.searchText);
        this.$router.push("/searchResult");
      }
    },
    gotodiscovery(){
        this.$router.push("/discovery");
    }
  }
};
</script>



<style scoped>
.totalbg {

  width: 99vw;
  height: 98vh;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../../../static/images/bg2.jpg");
}
.top {
  margin-top: 0;
  height: 15%;
}
.top .logo {
  float: left;
  width: 8%;
  height: 100%;
  margin-left: 9%;
  margin-top: 1%;
}

.top .btnhome{
    margin-top: 4%;
    margin-left: 1%;
    float: left;
    color: #b88b8b;
    padding-bottom: 3px;
    border-bottom: 1px solid #b88b8b;
}
.top .btndiscovery{
    margin-top: 4%;
    margin-left: 1%;
    float: left;
    padding-bottom: 3px;
    color: #b88b8b;
}
.top .btnhome:hover,.top .btndiscovery:hover{
    cursor: pointer;
    border-bottom: 1px solid #b88b8b;
} 

.middle {
  margin-top: 5%;
  width: 100%;
  height: 40%;
  text-align: center;

}
.middle .title{
    font-family:'Times New Roman', Times, serif;
    color: #b88b8b;
    font-size: 35px;
    margin-bottom: 10px;
}
.middle .content{
    color: #b88b8b;
    font-size: 12px;
}
.middle .search-box {
  position: absolute;
  left: 25%;
  top:  45%;
  background-color: #ffffff;
  width: 50%;
  height: 5%;
  border-radius: 3px;
  box-shadow: 0px 15px 10px -15px #ccc;
}
.middle .icon-sousuo {
  margin-left: 1.5%;
  margin-top: 1.5%;
  font-size: 20px;
  float: left;
}
.middle .search-form {
  margin-left: 1%;
  margin-top: 1.7%;
  width: 80%;
  outline: none;
  background: transparent;
  border: 0;
  float: left;
}
.middle .searchbutton {
  margin-right: 1%;
  margin-top:1.5%;
  float: right;
  color: #775656;
}
.middle .searchbutton:hover {
  cursor: pointer;
}
</style>