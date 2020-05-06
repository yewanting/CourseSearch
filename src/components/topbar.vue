<template>
  <div id="header" class="fixed">
    <!-- 头部左边的logo -->
    <div class="left">
      <img src="../../static/images/logo.jpg" alt="logo" />
      <img src="../../static/images/logotext.jpg" alt="logotext" />
    </div>

    <!-- 头部中间的大搜索框 -->
    <!-- search()函数表示记录历史记录并跳转页面 -->
    <div class="mid">
      <i class="iconfont icon-RectangleCopy1"></i>
      <input type="text" v-model="searchText" class="search-form" @keyup.enter="search" placeholder="搜索您想要的课程"/>
      <div class="searchbutton" @click="search"><span>搜 索</span></div>
    </div>

    <!-- 头部右边的登录/个人中心 -->
    <div class="right">
      <div>登录</div>
      <div>注册</div>
      <!-- <div><i class="iconfont icon-RectangleCopy3"></i></div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "", //搜索框的内容
    };
  },
 
  methods: {
    //search()函数表示记录历史记录并跳转页面
    search() {
      if (this.$store.state.HistoryTags.indexOf(this.searchText.trim()) == -1) {
        this.$store.state.HistoryTags.unshift(this.searchText.trim());
      }
      this.$router.push("/searchResult");
      // 也可以写成这种形式
      // this.$router.push({path:'/searchResult'})
    },

  }
};
</script>

<style scoped>
#header {       /*顶部栏的样式 */
  background-color: #ffffff;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  position: relative;
}
#header div { /*顶部栏里每个小块的样式，总共有三个小块，左、中、右 */
  float: left;
  box-sizing: border-box;
}
#header .left { /*顶部栏左侧详细的样式 */
  float: left;
  height: 100%;
  width: 25%;
  box-sizing: border-box;
  padding-left: 20px;
}

#header .left img { /*顶部栏左侧logo图片的样式 */
  float: left;
  box-sizing: border-box;
  height: 42px;
  width: 60px;
}
#header .mid {  /*顶部栏中间搜索框的样式 */
  display: flex;
  float: left;
  height: 25px;
  border-radius: 50px;
  width: 50%;
  box-sizing: border-box;
  margin-top: 10px;
  border: 1px solid green;
}

#header .mid .icon-RectangleCopy1 { /*顶部栏中间搜索框左侧的搜索图标的样式 */
  margin-left: 1%;
  float: left;
  height: 100%;
  padding-left: 1%;
  padding-top: 4px;
  box-sizing: border-box;
  margin-right: 5px;
  width: 5%;
  color: grey;
  font-size: 12px;
}
#header .mid .search-form {   /*顶部栏中间搜索框中间的框框的样式 */
  padding-top: 1px;
  float: left;
  height: 100%;
  width: 10px;
  flex-grow: 1;
  background-color: transparent;
  font-size: 9px;
  border: 0px;
  outline: none;
}
#header .mid .searchbutton {  /*顶部栏中间搜索框右侧按钮的样式 */
  float: left;
  width: 45px;
  height: 100%;
  box-sizing: border-box;
  background-color:rgb(7, 173, 7);
  border-top-right-radius: 50px;
  padding: 0;
  margin: 0;
  border-bottom-right-radius: 50px;
  color: #ffffff;
  padding-bottom: 5px;
  padding-left: 5px;
}
#header .mid .searchbutton span{  /*顶部栏中间搜索框右侧按钮内部文字的样式 */
    padding-left: 5px;
    font-size: 10px;
}
#header .mid .searchbutton:hover {
  cursor: pointer;
  opacity: 0.6;
}

#header .right {    /*顶部栏右侧样式 */
  float: right;
  margin-top: 15px;
  box-sizing: border-box;
  list-style: none;
  padding: 0;
  display: table;
  padding-right: 4%;
}
#header .right div {   /*顶部栏右侧内部的样式 */
  font-size: 10px;
  text-align: center;
  display: table-cell;
  color: gray;
  width: 45px;
  height: 18px;
  padding-top: 1px;
  border-radius: 20px;
  border:1px solid rgb(182, 179, 179);
  margin-left: 10px;
}


#header .right div:hover {
  cursor: pointer;
  color: orange;
}

</style>