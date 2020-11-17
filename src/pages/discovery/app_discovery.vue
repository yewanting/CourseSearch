<template>
  <v-app id="app">
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
    <v-navigation-drawer permanent app width="100px">
      <v-list>
        <h3>课程分类</h3>
        <v-list-item-group v-model="classify_selected" color="#9198e5">
          <v-list-item v-for="(item, i) in classify" :key="i">
            <v-list-item-content>
              <v-list-item-title
                v-text="item"
                @click="choose_coursetotal_label(item)"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12">
            <v-toolbar color="#9198e5" dark flat dense>
              <v-tabs centered grow>
                <v-tab>
                  <v-menu offset-y>
                    <template v-slot:activator="{ attrs, on }">
                      <span v-bind="attrs" v-on="on" @click="free">
                        免费课程</span
                      >
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
        <v-row v-show="list.length > 0">
          <v-col cols="12">
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
      <v-bottom-navigation app :value="value" color="#9198e5" grow>
        <v-btn @click="gotohome">
          <span>首页</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn>
          <span>分类</span>

          <v-icon>mdi-widgets</v-icon>
        </v-btn>

        <v-btn @click="gotocenter">
          <span>个人中心</span>

          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>
import axiosgetappdiscogoods from "@/axios/get_app_disc_goods.js";
import infiniteScroll from "vue-infinite-scroll";
export default {
  directives: { infiniteScroll },
  data() {
    return {
      value: 1,
      classify: [
        "编程开发",
        "产品运营",
        "设计创意",
        "电商运营",
        "职场提升",
        "人工智能",
        "语言学习",
        "职业考试",
        "生活兴趣",
        "考研",
      ],
      unfree_choice: ["综合", "价格从低到高", "价格从高到低", "销量从高到低"],
      free_choice: ["综合", "销量从高到低"],
      show_gotop: false,
      list_index: 4,
      classify_selected: this.$store.state.classify_selected,
      list: [],
      busy: false,
    };
  },
  beforeDestroy() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
  },
  watch: {
    app_disco_goods: "initValue",
  },
  mounted() {
    this.onResize();
    document.getElementById("content").addEventListener("scroll", this.handle,true);
    window.addEventListener("resize", this.onResize, { passive: true });
    this.get_app_disco_goods();
  },

  computed: {
    app_disco_goods() {
      return this.$store.state.app_disco_goods;
    },
    coursetotal_label() {
      return this.$store.state.coursetotal_label;
    },
  },
  methods: {
    gotohome() {
      this.$router.push("/app_home");
    },
    gotocenter() {
      this.$router.push("/app_center");
    },
    choose_coursetotal_label(item) {
      if (item == "编程开发") item = "编程与开发";
      if (item == "产品运营") item = "产品与运营";
      if (item == "人工智能") item = "AI/数据科学";
      this.gotop();
      this.$store.commit("COURSETOTALLABEL", item);
      this.$store.commit("ISFREE", 0);
      this.get_app_disco_goods();
    },
    free() {
      this.$store.commit("ISFREE", 0);
      this.get_app_disco_goods();
    },
    nofree() {
      this.$store.commit("ISFREE", 1);
      this.get_app_disco_goods();
    },

    get_app_disco_goods() {
      var totalgoods = new Array();
      axiosgetappdiscogoods(
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
          totalgoods.push(goodsdata);
          this.$store.commit("APPDISCOGOODS", totalgoods[0]);
          // console.log(totalgoods)
        }
      );
    },
    sortselect(index) {
      this.cur = index;
      //0表示综合，1表示价格从di到高，2表示价格从高到低，3表示销量从高到底
      this.$store.commit("ISSORT", index);
      this.get_app_disco_goods();
    },
    onResize() {
      if (
        this.$vuetify.breakpoint.name == "md" ||
        this.$vuetify.breakpoint.name == "lg" ||
        this.$vuetify.breakpoint.name == "xl"
      ) {
        this.$router.push("/discovery");
      }
    },
    initValue() {
      this.list = [];

      this.loadMore();
    },
    loadMore: function () {
      this.busy = true;
      const length = this.list.length;
      const maxlen = this.app_disco_goods.length;
      const valuelen = Math.min(length + 20, maxlen);
      for (var i = length; i < valuelen; i++) {
        this.list.push({
          id: i,
          coursevediohref: this.app_disco_goods[i]["coursevediohref"],
          courseimghref: this.app_disco_goods[i]["courseimghref"],
          coursetitle: this.app_disco_goods[i]["coursetitle"],
          coursenumber: this.app_disco_goods[i]["coursenumber"],
          courseprice: this.app_disco_goods[i]["courseprice"],
        });
      }
      this.busy = false;
    },
    gotop() {
      document.getElementById("content").scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    handle() {
      var oTop = document.getElementById("content").scrollTop;
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
#app {
  overflow: hidden;
}
.scroller {
  height: 800px;
}
</style>