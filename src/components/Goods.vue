<template>
  <div class="totalform">
    <div v-for="(goodsitem,index) in goods" :key="index" class="courseform">
      <!--传入商品对象数组-->
      <a :href="goodsitem.coursevediohref" target="_blank">
        <div class="toppart">
          <img :src="goodsitem.courseimghref" :onerror = "errImg" />
          <!--商品的照片-->
        </div>
        <div class="bottompart">
          <div class="title">{{goodsitem.coursetitle}}</div>
          <!--商品的题目-->
          <div class="content">{{goodsitem.coursedes}}</div>
          <!--商品的简介-->
          <i class="iconfont icon-geren"></i>
          <!--个人的图标-->
          <span>{{goodsitem.coursenumber}}</span>
          <!--商品参加的人数-->
          <div class="price">￥{{goodsitem.courseprice}}</div>
          <!--商品的价格-->
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  
  data(){
    return{
        errImg:'this.src="' + '../static/images/zanwutupian.png' + '"'
    }
    
  },
  computed: {
    goods() {
      // console.log(this.$store.state.goodsdata)
      return this.$store.state.goodsdata;
    }
  }
};
</script>

<style scoped>
.totalform{
    clear: both;
    margin-top: 1%;
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

/* .courseform a:first-child {
  clear: both;
} */

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

.icon-geren {
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