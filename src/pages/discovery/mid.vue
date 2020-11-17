<template>
  <v-row>
    <v-col cols="12" v-for="(course, index) in app_disco_goods" :key="index">
      <v-card class="card_form">
        <a :href="course.coursevediohref" target="_blank">
          <v-img
            class="img align-end"
            :src="course.courseimghref"
            height="120"
            lazy-src="../../public/images/zanwutupian.png"
          >
          
          </v-img>
          <v-card-title
            class="text--primary"
            dense
          >
            {{ course.coursetitle }}</v-card-title
          >

        </a>
        <v-card-actions>
          <v-row justify="start" dense>
            <v-col>
              <i class="iconfont icon-RectangleCopy3"></i>
              <!--个人的图标-->
              <span>{{ course.coursenumber }}</span>
              <!--商品参加的人数-->
            </v-col>
            <v-col cols="12" class="price" 
              >￥{{ course.courseprice }}</v-col
            >
            <!--商品的价格-->
          </v-row>
        </v-card-actions>
      </v-card>
      <v-divider></v-divider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
     
    };
  },
  props:["app_disco_goods"]
  

};
</script>

<style scoped>
.price{
   color: orangered;
}
a {
  text-decoration: none;
}
.text {
  color: #b88b8b;
}
.card_form {
  height: 100%;
  overflow: hidden;
}
.card_form:hover {
  box-shadow: 2px 2px 40px 5px gray;
}
.img:hover {
  transition: 0.6s;
  transform: scale(1.2);
}
</style>