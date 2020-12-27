<template>
  <v-row>
    <v-col
      v-for="(goodsitem, index) in goods"
      :key="index"
      xl="3"
      lg="3"
      md="4"
      sm="6"
    >
      <!-- <v-lazy transition="fade-transition"> -->
      <v-card class="card_form" height="auto">
        <a :href="goodsitem.coursevediohref" target="_blank">
          <v-img
            class="img align-end"
            :src="goodsitem.courseimghref"
            :height="img_height"
            lazy-src="../../public/images/zanwutupian.png"
          >
            <v-card-title
              class="white--text d-flex d-lg-none"
              :class="title_class"
              dense
              >{{ goodsitem.coursetitle }}</v-card-title
            >
          </v-img>
          <v-card-title
            class="text--primary d-none d-lg-flex"
            :class="title_class"
            dense
          >
            {{ goodsitem.coursetitle }}</v-card-title
          >

          <v-card-text
            style="color: grey"
            :class="p_class"
            class="d-none d-lg-flex"
          >
            <div :class="p_class">{{ goodsitem.coursedes }}</div>
          </v-card-text>
        </a>
        <v-card-actions>
          <v-row justify="start" dense>
            <v-col cols="12">
              <i class="iconfont icon-RectangleCopy3"></i>
              <!--个人的图标-->
              <span :class="p_class">{{ goodsitem.coursenumber }}</span>
              <!--商品参加的人数-->
            </v-col>
            <v-col cols="11" class="price" :class="p_class"
              >￥{{ goodsitem.courseprice }}
            </v-col>
            <!--商品的价格-->
            <v-col cols="1">
              <i
                v-show="!startlist[index]"
                class="iconfont icon-xiangkan"
                @click="Start(index, goodsitem.id)"
              ></i>
              <i
                v-show="startlist[index]"
                class="iconfont icon-aixin"
                @click="UnStart(index, goodsitem.id)"
              ></i>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      <!-- </v-lazy> -->
    </v-col>
    <v-snackbar v-model="snackbar" :timeout="timeout" centered>
        {{ totasttext }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
  </v-row>
</template>

<script>
import axioscanceluserstar from "@/axios/axioscanceluserstar.js";
import axiospostuserstar from "@/axios/axiospostuserstar.js";
import axiosselectuserstar from "@/axios/axiosselectuserstar.js";
export default {
  data() {
    return {
      startlist: [],
       totasttext: "",
      snackbar: false,
      timeout: 2000,
    };
  },
  computed: {
    goods() {
      var token = sessionStorage.getItem("token");
      var userstarinfo = {
        token: token,
      };
      axiosselectuserstar(userstarinfo, (IfExitsStar) => {
        this.startlist = [];

        for (let i = 0; i < this.$store.state.goodsdata.length; i++) {
          var flag = false;
          for (let k = 0; k < IfExitsStar.length; k++) {
            if (this.$store.state.goodsdata[i].id == IfExitsStar[k].id) {
              flag = true;
              break;
            }
          }
          this.startlist.push(flag);
        }
      });

      return this.$store.state.goodsdata;
    },

    card_height() {
      let size = 0;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          size = 200;
          break;
        case "sm":
          size = 250;
          break;
        case "md":
          size = 250;
          break;
        case "lg":
          size = 350;
          break;
        case "xl":
          size = 350;
      }
      return size;
    },
    img_height() {
      let size = 0;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          size = 100;
          break;
        case "sm":
          size = 150;
          break;
        case "md":
          size = 180;
          break;
        case "lg":
          size = 180;
          break;
        case "xl":
          size = 180;
      }
      return size;
    },
    title_class() {
      let title_form = 0;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          title_form = "text-sm-h6";
          break;
        case "sm":
          title_form = "text-sm-h6";
          break;
        case "md":
          title_form = "text-md-h6";
          break;
        case "lg":
          title_form = "text-lg-h6";
          break;
        case "xl":
          title_form = "text-xl-h6";
      }
      return title_form;
    },
    p_class() {
      let p_form = 0;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          p_form = "text-xs-caption";
          break;
        case "sm":
          p_form = "text-sm-caption";
          break;
        case "md":
          p_form = "text-md-caption";
          break;
        case "lg":
          p_form = "text-lg-caption";
          break;
        case "xl":
          p_form = "text-xl-caption";
      }
      return p_form;
    },
  },
  methods: {
    Start(index, courseid) {
      var curuser = sessionStorage.getItem("isShowusername");
      if (curuser != "true") {
        this.totasttext = "请先登录！";
        this.snackbar = true;
      } else {
        this.startlist[index] = true;
        this.$forceUpdate();
        var token = sessionStorage.getItem("token");
        var userstarinfo = {
          token: token,
          courseid: courseid,
        };
        axiospostuserstar(userstarinfo, (IfStar) => {
          if (IfStar == "1") {
            this.totasttext = "收藏成功！";
            this.snackbar = true;
          } else {
            this.totasttext = "没有权限！";
            this.snackbar = true;
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
        courseid: courseid,
      };
      axioscanceluserstar(userCancelstarinfo, (IfCancelStar) => {
        if (IfCancelStar == "1") {
          this.totasttext = "取消收藏成功！";
          this.snackbar = true;
        } else {
          this.totasttext = "您没有权限取消收藏成功！";
          this.snackbar = true;
        }
      });
    },
  },
};
</script>

<style scoped>
.icon-xiangkan,
.icon-aixin {
  font-size: 25px;
  color: red;
}
.icon-xiangkan:hover,
.icon-aixin:hover {
  cursor: pointer;
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
.price {
  color: orangered;
}
</style>