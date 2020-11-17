<template>
  <v-app id="app">
    <v-app-bar height="70" app dense flat color="#9198e5">
      <v-row justify="center" align="center">
        <v-col cols="10">
          <v-text-field
            rounded
            hide-details
            flat
            dense
            v-model="searchText"
            placeholder="搜索您想要的课程"
            prepend-inner-icon="mdi-magnify"
            @keyup.enter="search"
            solo
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="11">
            <v-carousel
              cycle
              hide-delimiter-background
              show-arrows-on-hover
              class="rounded-xl contain"
              height="150"
            >
              <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"
                :src="slide.imgSrc"
              >
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
        <v-row dense class="text-center">
          <v-col cols="3" v-for="(item, index) in menu" :key="index">
            <v-btn
              dark
              fab
              :color="item.color"
              @click="goto_classfy_course(item.title)"
            >
              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
            <v-row justify="center">{{ item.title }}</v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <h3 class="text_form">好课推荐</h3>
          </v-col>
          <v-col cols="2">
            <v-btn icon>
              更多
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
          <v-col  v-for="(course, index) in good_course" :key="index" :cols="(index==0?12:6)">
           <a :href="course.coursevediohref" target="_blank">
            <v-card>
              <v-img
                 :src=course.courseimghref
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                :height="(index==0)?150:100"
              >
                <v-card-title v-text="course.coursetitle"></v-card-title></v-img
              >
            </v-card>
           </a>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <h3 class="text_form">热门课程</h3>
          </v-col>
          <v-col cols="2">
            <v-btn icon>
              更多
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" v-for="(course, index) in hot_course" :key="index">
            <v-card>
              <a :href="course.coursevediohref" target="_blank">
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-img
                  class="img"
                  :src="course.courseimghref"
                  height="auto"
                  width="150"
                  contain
                  max-width="150"
                  lazy-src="../../../public/images/zanwutupian.png"
                ></v-img>
                <div>
                  <v-card-title class="text--primary">
                    {{ course.coursetitle }}</v-card-title
                  >
                  <v-card-actions class="text">
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
                </div>
              </div>
              </a>
            </v-card>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <h3 class="text_form">免费课程</h3>
          </v-col>
          <v-col cols="2">
            <v-btn icon>
              更多
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6" v-for="(course, index) in free_course" :key="index">
            <v-card class="card_form" height="240">
              <a :href="course.coursevediohref" target="_blank">
              <v-img
                class="img"
                :src="course.courseimghref"
                height="100"
                
                lazy-src="../../../public/images/zanwutupian.png"
              ></v-img>
              <v-card-title class="text--primary">
                {{ course.coursetitle }}</v-card-title
              >
              <v-card-actions class="text">
                <v-row justify="start" dense>
                  <v-col>
                    <i class="iconfont icon-RectangleCopy3"></i>
                    <!--个人的图标-->
                    <span>{{ course.coursenumber }}</span>
                    <!--商品参加的人数-->
                  </v-col>
                 
                </v-row>
              </v-card-actions>

              </a>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-bottom-navigation app :value="value" color="#9198e5" grow>
        <v-btn>
          <span>首页</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn @click="gotodiscovery">
          <span>分类</span>

          <v-icon>mdi-widgets</v-icon>
        </v-btn>

        <v-btn @click="gotocenter">
          <span>个人中心</span>

          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <v-btn
        fixed
        class="float_btn"
        right
        color="pink"
        fab
        v-show="show_gotop == true"
        @click="gotop()"
      >
        <v-icon color="#ffffff"> mdi-chevron-up</v-icon>
      </v-btn>
    </v-main>
  </v-app>
</template>


<script>
import axiosgetappfreegoods from "../../axios/get_app_free_course";
import axiosgetapptopgoods from "../../axios/get_app_top_course";
import axiosgetappgoodgoods from "../../axios/get_app_good_course"
export default {
  data() {
    return {
      searchText: "",
      value: 0,
      slides: [
        { imgSrc: require("../../../public/images/banner1.png") },
        { imgSrc: require("../../../public/images/banner2.png") },
        { imgSrc: require("../../../public/images/banner3.png") },
        { imgSrc: require("../../../public/images/banner4.png") },
      ],
      menu: [
        {
          title: "编程开发",
          color: "#f0c5ea",
          icon: "mdi-laptop",
        },
        {
          title: "产品运营",
          color: "#b18296",
          icon: "mdi-format-list-bulleted-square",
        },
        {
          title: "设计创意",
          color: "#d37070",
          icon: "mdi-pencil",
        },
        {
          title: "语言学习",
          color: "#dd6767",
          icon: "mdi-translate",
        },
        {
          title: "职业考试",
          color: "#f3c683",
          icon: "mdi-calendar-today",
        },
        {
          title: "生活兴趣",
          color: "#cf8989",
          icon: "mdi-heart",
        },
        {
          title: "考研",
          color: "#dd9972",
          icon: "mdi-book",
        },
        {
          title: "更多",
          color: "#856eaa",
          icon: "mdi-widgets",
        },
      ],
      show_gotop: false,
    };
  },
  beforeDestroy() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
    window.removeEventListener("scroll", this.handle);
  },

  mounted() {
    this.onResize();
    window.addEventListener("scroll", this.handle);
    window.addEventListener("resize", this.onResize, { passive: true });
    this.get_app_free_goods();
     this.get_app_top_goods();
     this.get_app_good_goods();
  },
  computed: {
    free_course() {
      return this.$store.state.free_course;
    },
    hot_course(){
      return this.$store.state.hot_course;
    },
    good_course(){
      return this.$store.state.good_course;
    }
  },
  methods: {
    search() {
      if (this.searchText != "") {
        this.$store.commit("ISFREE", 0);
        sessionStorage.setItem("text", this.searchText);
        this.$router.push("/app_searchResult");
      }
    },
    goto_classfy_course(item) {
      let index = 0;
      if (item == "编程开发" || item == "更多") item = "编程与开发";
      if (item == "产品运营") item = "产品与运营";

      this.$store.commit("COURSETOTALLABEL", item);

      if (item == "编程开发" || item == "更多") index = 0;
      if (item == "产品运营") index = 1;
      if (item == "设计创意") index = 2;
      if (item == "电商运营") index = 3;
      if (item == "职场提升") index = 4;
      if (item == "人工智能") index = 5;
      if (item == "语言学习") index = 6;
      if (item == "职场考试") index = 7;
      if (item == "生活兴趣") index = 8;
      if (item == "考研") index = 9;

      this.$store.commit("CLASSIFYSELECTED", index);

      this.$router.push("/app_discovery");
    },
    gotodiscovery() {
      this.$store.commit("COURSETOTALLABEL", "编程与开发");
       this.$store.commit("CLASSIFYSELECTED", 0);
      this.$router.push("/app_discovery");
    },
    gotocenter() {
      this.$router.push("/app_center");
    },
    onResize() {
      if (
        this.$vuetify.breakpoint.name == "md" ||
        this.$vuetify.breakpoint.name == "lg" ||
        this.$vuetify.breakpoint.name == "xl"
      ) {
        this.$router.push("/home");
      }
    },
    get_app_free_goods() {
      var totalgoods = new Array();
      axiosgetappfreegoods(
        {
          searchtext: this.$store.state.searchText,
          curpage: 1,
          pagesize: this.$store.state.pagesize,
          searchwebsite: this.$store.state.searchwebsite,
          isFree: this.$store.state.isFree,
          isSort: this.$store.state.isSort,
          minprice: this.$store.state.minprice,
          maxprice: this.$store.state.maxprice,
          coursetotallabel: this.coursetotal_label,
        },
        (goodsdata) => {
          //将字符串转为JSON对象
          // this.$store.state.homegoods = JSON.parse(goodsdata)
          // this.$store.state.homegoods.push(JSON.parse(goodsdata))
          // totalgoods.push(goodsdata);
          totalgoods.push(goodsdata);
          this.$store.commit("FREECOURSE", totalgoods[0]);
          // console.log(totalgoods)
        }
      );
    },
     get_app_top_goods() {
      var totalgoods = new Array();
      axiosgetapptopgoods(
        {
          searchtext: this.$store.state.searchText,
          curpage: 1,
          pagesize: this.$store.state.pagesize,
          searchwebsite: this.$store.state.searchwebsite,
          isFree: this.$store.state.isFree,
          isSort: this.$store.state.isSort,
          minprice: this.$store.state.minprice,
          maxprice: this.$store.state.maxprice,
          coursetotallabel: this.coursetotal_label,
        },
        (goodsdata) => {
          //将字符串转为JSON对象
          // this.$store.state.homegoods = JSON.parse(goodsdata)
          // this.$store.state.homegoods.push(JSON.parse(goodsdata))
          // totalgoods.push(goodsdata);
          totalgoods.push(goodsdata);
          this.$store.commit("HOTCOURSE", totalgoods[0]);
          // console.log(totalgoods)
        }
      );
    },
     get_app_good_goods() {
      var totalgoods = new Array();
      axiosgetappgoodgoods(
        {
          searchtext: this.$store.state.searchText,
          curpage: 1,
          pagesize: this.$store.state.pagesize,
          searchwebsite: this.$store.state.searchwebsite,
          isFree: this.$store.state.isFree,
          isSort: this.$store.state.isSort,
          minprice: this.$store.state.minprice,
          maxprice: this.$store.state.maxprice,
          coursetotallabel: this.coursetotal_label,
        },
        (goodsdata) => {
          //将字符串转为JSON对象
          // this.$store.state.homegoods = JSON.parse(goodsdata)
          // this.$store.state.homegoods.push(JSON.parse(goodsdata))
          // totalgoods.push(goodsdata);
          totalgoods.push(goodsdata);
          this.$store.commit("GOODCOURSE", totalgoods[0]);
          // console.log(totalgoods)
        }
      );
    },
    gotop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    handle() {
      var oTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (oTop > 100) {
        // 当滚动条滑动距离大于100，则显示
        this.show_gotop = true;
      } else {
        //否则不显示
        this.show_gotop = false;
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.text {
  color: #b88b8b;
}
.text_form {
  color: #9198e5;
}
.price {
  color: orangered;
}
.float_btn {
  bottom: 100px;
}
</style>