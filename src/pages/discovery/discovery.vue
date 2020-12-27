<template>
  <v-app id="inspire">
    <v-app-bar :height="app_bar_height" app color="#ffffff" hide-on-scroll>
      <v-row align="center" class="mid_form d-none d-md-flex">
        <v-col cols="1">
          <v-img src="../../../public/images/zhuzilogo.png"></v-img>
        </v-col>
        <v-col cols="1">
          <v-btn color="#b88b8b" text class="btn" @click="gotohome">首页</v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn color="#b88b8b" text class="btn checked">发现</v-btn>
        </v-col>
        <v-col cols="7">
          <v-text-field
            v-model="searchText"
            label="Solo"
            placeholder="搜索您想要的课程"
            prepend-inner-icon="mdi-magnify"
            @keyup.enter="search"
            solo
          >
          </v-text-field>
        </v-col>
        <v-col cols="1" v-if="!isShowusername">
          <login></login>
        </v-col>
        <v-col cols="1" v-if="!isShowusername">
          <register></register>
        </v-col>
        <v-col cols="1" v-if="isShowusername"
          ><v-btn
            class="btn"
            @click="gotocenter"
            >{{ username }}</v-btn
          >
        </v-col>
        <v-col cols="1" @click="outoflogin"> <v-btn text class="btn">退出登录</v-btn></v-col>

        <v-col cols="12">
          <!--添加导航栏-->
          <div class="Navbar">
            <div
              class="eachnavber"
              v-for="(course, index) in coursetotallabel"
              :key="index"
            >
              <!-- <a :href="'#'+course" class="aform"> -->
              <div class="navbaritem" @click="gotocourse(course)">
                {{ course }}
              </div>
              <!-- </a> -->
            </div>
          </div>
        </v-col>
      </v-row>
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-row align="center" justify="center" class="mid_form d-flex d-md-none">
        <v-col cols="11">
          <v-text-field
            label="Solo"
            v-model="searchText"
            placeholder="搜索您想要的课程"
            prepend-inner-icon="mdi-magnify"
            hide-details
            solo-inverted
            @keyup.enter="search"
            background-color="transparent"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
      class="d-flex d-md-none"
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-brown--text text--accent-4"
          color="#b88b8b"
        >
          <v-list-item v-for="(course, index) in coursetotallabel" :key="index">
            <v-list-item-title @click="gotocourse(course)">{{
              course
            }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="ma-15">
      <v-row v-for="(courselabel, index) in coursetotallabel" :key="index">
        <v-col cols="11" :id="courselabel">
          <h1>{{ courselabel }}</h1>
        </v-col>
        <v-col
          v-for="(course, index1) in discoverygoods[courselabel]"
          :key="index1"
          xl="3"
          lg="3"
          md="4"
          sm="6"
          xs="1"
        >
          <v-card class="card_form" :height="card_height">
            <a :href="course.coursevediohref" target="_blank">
              <v-img
                class="img"
                :src="course.courseimghref"
                height="200"
                lazy-src="../../../public/images/zanwutupian.png"
              ></v-img>
              <v-card-title class="text--primary">
                {{ course.coursetitle }}</v-card-title
              >
              <v-card-text style="color: grey">
                <div>{{ course.coursedes }}</div>
              </v-card-text>
              <v-card-text> </v-card-text>
            </a>
          </v-card>
        </v-col>
      </v-row>
    </v-main>

    <v-btn
      fixed
      bottom
      right
      color="pink"
      fab
      v-show="show_gotop == true"
      @click="gotop()"
    >
      <v-icon color="#ffffff"> mdi-chevron-up</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
// import axiospostsearch from "@/axios/axiosgetcourse.js"; //引入axios获得的课程
import axiosgethomegoods from "@/axios/axiosgethomegoods.js"; //引入axios获得的home的课程
import register from "@/components/register.vue";
import login from "@/components/login.vue";
export default {
  data() {
    return {
      drawer: false,
      group: null,
      coursetotallabel: [
        "编程与开发",
        "产品与运营",
        "考研",
        "设计创意",
        "电商运营",
        "职场提升",
        "AI/数据科学",
        "语言学习",
        "职业考试",
        "生活兴趣",
      ],
      show_gotop: false,
      errImg: "this.src='" + "../../../public/images/zanwutupian.png" + "'",
      searchText: "", //搜索框的内容
      value: 0,
      username: "",
      isShowusername:false,
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
  watch: {
    group() {
      this.drawer = false;
    },
  },
  components: {
    register,
    login,
  },
  computed: {
    discoverygoods() {
      let classify_discoverygoods = {
        编程与开发: [],
        产品与运营: [],
        考研: [],
        设计创意: [],
        电商运营: [],
        职场提升: [],
        "AI/数据科学": [],
        语言学习: [],
        职业考试: [],
        生活兴趣: [],
      };

      let unclassify_discoverygoods = this.$store.state.discoverygoods;
      for (let i = 0; i < unclassify_discoverygoods.length; i++) {
        for (let j = 0; j < unclassify_discoverygoods[i].length; j++) {
          if (
            unclassify_discoverygoods[i][j]["coursetotallabel"] == "编程与开发"
          ) {
            classify_discoverygoods["编程与开发"].push(
              unclassify_discoverygoods[i][j]
            );
          }
          if (
            unclassify_discoverygoods[i][j]["coursetotallabel"] == "产品与运营"
          ) {
            classify_discoverygoods["产品与运营"].push(
              unclassify_discoverygoods[i][j]
            );
          }
          if (unclassify_discoverygoods[i][j]["coursetotallabel"] == "考研") {
            classify_discoverygoods["考研"].push(
              unclassify_discoverygoods[i][j]
            );
          }
          if (
            unclassify_discoverygoods[i][j]["coursetotallabel"] == "设计创意"
          ) {
            classify_discoverygoods["设计创意"].push(
              unclassify_discoverygoods[i][j]
            );
          }
          if (
            unclassify_discoverygoods[i][j]["coursetotallabel"] == "电商运营"
          ) {
            classify_discoverygoods["电商运营"].push(
              unclassify_discoverygoods[i][j]
            );
          }
          if (
            unclassify_discoverygoods[i][j]["coursetotallabel"] == "职场提升"
          ) {
            classify_discoverygoods["职场提升"].push(
              unclassify_discoverygoods[i][j]
            );
          }
          if (
            unclassify_discoverygoods[i][j]["coursetotallabel"] == "AI/数据科学"
          ) {
            classify_discoverygoods["AI/数据科学"].push(
              unclassify_discoverygoods[i][j]
            );
          }
          if (
            unclassify_discoverygoods[i][j]["coursetotallabel"] == "语言学习"
          ) {
            classify_discoverygoods["语言学习"].push(
              unclassify_discoverygoods[i][j]
            );
          }
          if (
            unclassify_discoverygoods[i][j]["coursetotallabel"] == "职业考试"
          ) {
            classify_discoverygoods["职业考试"].push(
              unclassify_discoverygoods[i][j]
            );
          }
          if (
            unclassify_discoverygoods[i][j]["coursetotallabel"] == "生活兴趣"
          ) {
            classify_discoverygoods["生活兴趣"].push(
              unclassify_discoverygoods[i][j]
            );
          }
        }
      }

      return classify_discoverygoods;
    },
    app_bar_height() {
      let size = 0;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          size = 100;
          break;
        case "sm":
          size = 100;
          break;
        case "md":
          size = 300;
          break;
        case "lg":
          size = 300;
          break;
        case "xl":
          size = 300;
      }
      return size;
    },
    card_height() {
      let size = 0;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          size = 350;
          break;
        case "sm":
          size = 350;
          break;
        case "md":
          size = 350;
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
          size = 180;
          break;
        case "sm":
          size = 180;
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
  },
  mounted() {
    this.gethomgoods(this.coursetotallabel);
    window.addEventListener("scroll", this.handle);
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handle);
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    gotocourse(id) {
      console.log(id);
      document.getElementById(id).scrollIntoView();
      document.documentElement.scrollBy(0, -250);
    },
    gethomgoods(coursetotallabel) {
      var totalgoods = new Array();
      for (var i = 0; i < coursetotallabel.length; i++) {
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
            coursetotallabel: coursetotallabel[i],
          },
          (goodsdata) => {
            //将字符串转为JSON对象
            // this.$store.state.homegoods = JSON.parse(goodsdata)
            // this.$store.state.homegoods.push(JSON.parse(goodsdata))
            totalgoods.push(goodsdata);
            this.$store.commit("DISCOVERYGOODS", totalgoods);
            // console.log(totalgoods)
          }
        );
      }
    },
    validate() {
      this.$refs.form.validate();
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
    gotop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    search() {
      if (this.searchText != "") {
        sessionStorage.setItem("text", this.searchText);
        this.$router.push("/searchResult");
      }
    },
    gotohome() {
      this.$router.push("/home");
    },
    onResize() {
      if (
        this.$vuetify.breakpoint.name == "xs" ||
        this.$vuetify.breakpoint.name == "sm"
      ) {
        this.$router.push("/app_discovery");
      }
    },
    outoflogin() {
      sessionStorage.setItem("curusername", "");
      sessionStorage.setItem("isShowusername", false);
      sessionStorage.setItem("token", "");
      this.isShowusername = false;
      this.username = "";
      this.$router.go(0);
    },
    gotocenter() {
      this.$router.push({ path: "./center" });
    },
  },
};
</script>

<style scoped>
.mid_form {
  background-image: url("../../../public/images/sousuobg.png");
  background-size: 70% 90%;
  background-position-x: right;
}
.btn {
  color: #b88b8b;
  font-size: 1rem;
}
.btn:hover {
  border-bottom: 1px solid #b88b8b;
}
.checked {
  border-bottom: 1px solid #b88b8b;
}
.seperator {
  width: 100vw;
  height: 1px;
  background-color: grey;
}
.Navbar {
  background-size: 25% 100%;
  background-repeat: repeat-x;
  background-image: url("../../../public/images/navbarbg2.png");
  border-top: 1px solid #ccc;
  box-shadow: 0px 15px 10px -15px #ccc;
}

.eachnavber {
  float: left;
  font-size: 100%;
  margin-left: 2%;
  height: 50%;
  font-weight: bold;
  color: #b88b8b;
  width: 8%;
}
.navbaritem {
  width: 100%;
  margin-top: 30%;
}
.eachnavber:hover {
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 110%;
  background-image: url("../../../public/images/navbarhover3.jpg");
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
.text_form {
  color: #b88b8b;
}
</style>