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
    <v-main>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12">
            <v-toolbar color="transparent" flat dense>
              <v-tabs centered grow>
                <v-tabs-slider hidden></v-tabs-slider>
                <v-tab>
                  <v-menu offset-y>
                    <template v-slot:activator="{ attrs, on }">
                      <span v-bind="attrs" v-on="on" @click="free">
                        免费课程
                      </span>
                    </template>
                    <v-list>
                      <v-list-item link>
                        <v-list-item-title
                          @click="sortselect(0)"
                          style="color: #9198e5"
                          >综合</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item link>
                        <v-list-item-title
                          @click="sortselect(3)"
                          style="color: #9198e5"
                          >销量从高到低</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-tab>
                <v-tab>
                  <v-menu offset-y>
                    <template v-slot:activator="{ attrs, on }">
                      <span v-bind="attrs" v-on="on" @click="nofree"
                        >付费课程</span
                      >
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(title, index) in unfree_choice"
                        :key="index"
                        link
                      >
                        <v-list-item-title
                          style="color: #9198e5"
                          @click="sortselect(index)"
                          >{{ title }}</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-tab>
              </v-tabs>
            </v-toolbar>
          </v-col>
        </v-row>
        <v-row v-show="list.length > 0" >
          <v-col cols="12" >
             <RecycleScroller
              class="scroller"
              :items="list"
              :item-size="300"
              key-field="id"
              v-slot="{ item }"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="busy"
              infinite-scroll-distance="10"
              id = "content"
            >
              <v-card class="card_form">
                <a :href="item.coursevediohref" target="_blank">
                  <v-img
                    class="img align-end"
                    :src="item.courseimghref"
                    height="120"
                    lazy-src="../../../public/images/zanwutupian.png"
                  >
                  </v-img>
                  <v-card-title class="text--primary" dense>
                    {{ item.coursetitle }}</v-card-title
                  >
                  <v-card-text class="text--primary" dense>{{item.coursedes}}</v-card-text>
                </a>
                <v-card-actions>
                  <v-row justify="start" dense>
                    <v-col>
                      <i class="iconfont icon-RectangleCopy3"></i>

                      <span>{{ item.coursenumber }}</span>
                    </v-col>
                    <v-col cols="12" class="price"
                      >￥{{ item.courseprice }}</v-col
                    >
                  </v-row>
                </v-card-actions>
              </v-card>
            </RecycleScroller>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-bottom-navigation app color="#9198e5" grow>
      <v-btn @click="gotohome">
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
  </v-app>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";
import axiosgetappsearchgoods from "@/axios/get_app_searchgood.js"; //引入axios获得的课程
export default {
  directives: { infiniteScroll },
  data() {
    return {
      searchText: "",
      show_gotop: false,
      unfree_choice: ["综合", "价格从低到高", "价格从高到低", "销量从高到低"],
      free_choice: ["综合", "销量从高到低"],
      websitename: [
        "中国大学MOOC",
        "网易云课堂",
        "CSDN",
        "计算机慕课网",
        "学而思网校",
        "沪江网校",
      ],
      list: [],
      busy: false,
    };
  },
  watch: {
    goods: "initValue",
  },
  computed: {
    goods() {
      return this.$store.state.search_goods;
    },
  },
  mounted() {
   
    document.getElementById("content").addEventListener("scroll", this.handle,true);
    /*获取到首页搜索框的值 */
    this.searchText = sessionStorage.getItem("text", "");
    this.search();
  },
//   destroyed() {
//     window.removeEventListener("scroll", this.handle);
//   },
  methods: {
    search() {
      this.$store.commit("SEARCHTEXT", this.searchText);
      if (this.searchText !== "") {
        sessionStorage.setItem("text", this.searchText);
        this.$store.commit("SEARCHWEBSITE", this.websitename);
        this.get_app_search_goods();
      }
    },
    initValue() {
      this.list = [];

      this.loadMore();
    },
    gotohome() {
      this.$router.push("/app_home");
    },
    gotodiscovery() {
      this.$store.commit("COURSETOTALLABEL", "编程与开发");
      this.$store.commit("CLASSIFYSELECTED", 0);
      this.$router.push("/app_discovery");
    },
    gotocenter() {
      this.$router.push("/app_center");
    },
    free() {
      this.$store.commit("ISFREE", 0);
    },
    nofree() {
      this.$store.commit("ISFREE", 1);
    },
    loadMore: function () {
      this.busy = true;
      const length = this.list.length;
      const maxlen = this.goods.length;
      const valuelen = Math.min(length + 20, maxlen);
      for (var i = length; i < valuelen; i++) {
        this.list.push({
          id: i,
          coursevediohref: this.goods[i]["coursevediohref"],
          courseimghref: this.goods[i]["courseimghref"],
          coursetitle: this.goods[i]["coursetitle"],
          coursedes: this.goods[i]["coursedes"],
          coursenumber: this.goods[i]["coursenumber"],
          courseprice: this.goods[i]["courseprice"],
        });
      }
      this.busy = false;
    },
    sortselect(index) {
      this.cur = index;
      //0表示综合，1表示价格从di到高，2表示价格从高到低，3表示销量从高到底
      this.$store.commit("ISSORT", index);
      this.search();
    },
    gotop() {
        document.getElementById("content").scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    handle() {

      var oTop =  document.getElementById("content").scrollTop;
      if (oTop > 100) {
        // 当滚动条滑动距离大于100，则显示
        this.show_gotop = true;
      } else {
        //否则不显示
        this.show_gotop = false;
      }
    },
    get_app_search_goods() {
      var totalgoods = new Array();
      axiosgetappsearchgoods(
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
          totalgoods.push(goodsdata);
          this.$store.commit("SEARCHGOODS", totalgoods[0]);
        }
      );
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
.card_form {
  height: 100%;
  overflow: hidden;
}
.card_form:hover {
  box-shadow: 2px 2px 40px 5px gray;
}
.img {
  height: 150px;
}
.img:hover {
  transition: 0.6s;
  transform: scale(1.2);
}
.price {
  color: orangered;
}
.float_btn {
  bottom: 100px;
}
.scroller {
  height: 800px;
}
</style>