<template>
  <v-app id="inspire">
    <v-app-bar app :height="app_bar_height" color="#ffffff" hide-on-scroll>
      <v-row align="center" class="mid_form d-none d-md-flex">
        <v-col cols="1">
          <v-img src="../../../public/images/zhuzilogo.png" contain></v-img>
        </v-col>
        <v-col cols="1">
          <v-btn color="#b88b8b" text class="btn" @click="gotohome">首页</v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn color="#b88b8b" text class="btn" @click="gotodiscovery"
            >发现</v-btn
          >
        </v-col>
        <v-col cols="7">
          <v-text-field
            label="Solo"
            placeholder="搜索您想要的课程"
            prepend-inner-icon="mdi-magnify"
            hide-details
            solo
            @keyup.enter="search"
            v-model="searchText"
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
          ><v-btn class="btn" @click="gotocenter">{{ username }}</v-btn>
        </v-col>
        <v-col cols="1" @click="outoflogin" v-if="isShowusername">
          <v-btn text class="btn">退出登录</v-btn></v-col
        >

        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col>
          <v-btn class="btn" color="#ffffff" @click="selectAll">全选</v-btn>
        </v-col>
        <v-col v-for="(name, index) in website" :key="index">
          <v-checkbox
            :label="name"
            hide-details
            v-model="checked[index]"
            @change="changevalue"
            color="#b88b8b"
            :value="name"
            name="website"
          ></v-checkbox>
        </v-col>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="1">
          <v-menu offset-y prepend-inner-icon="mdi-magnify">
            <template v-slot:activator="{ attrs, on }">
              <v-btn v-bind="attrs" v-on="on" outlined class="btn" @click="free"
                >免费课程</v-btn
              >
            </template>
            <v-list>
              <v-list-item link>
                <v-list-item-title @click="sortselect(0)"
                  >综合</v-list-item-title
                >
              </v-list-item>
              <v-list-item link>
                <v-list-item-title @click="sortselect(3)"
                  >销量从高到低</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>

        <v-col>
          <v-menu offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                outlined
                class="btn"
                @click="nofree"
                >付费课程</v-btn
              >
            </template>
            <v-list>
              <v-list-item
                v-for="(title, index) in unfree_choice"
                :key="index"
                link
              >
                <v-list-item-title
                  style="color: #b88b8b"
                  @click="sortselect(index)"
                  >{{ title }}</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>

        <span class="text">价格区间</span>
        <v-col cols="1">
          <v-text-field
            dense
            label="最低价"
            hide-details
            outlined
            color="#b88b8b"
            v-model="minprice"
          >
          </v-text-field>
        </v-col>
        <span class="text"> ————</span>
        <v-col cols="1">
          <v-text-field
            dense
            label="最高价"
            hide-details
            outlined
            color="#b88b8b"
            v-model="maxprice"
          >
          </v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn color="#ffffff" class="btn" @click="segmentcofirm">确定</v-btn>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" class="mid_form d-flex d-md-none">
        <v-col cols="11">
          <v-text-field
            label="Solo"
            placeholder="搜索您想要的课程"
            prepend-inner-icon="mdi-magnify"
            hide-details
            solo-inverted
            v-model="searchText"
            background-color="transparent"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-app-bar>

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
    <v-main class="ma-15">
      <Goods></Goods>
      <v-row justify="center" align="center">
        <!--下面的length原本应该是length = pagers的，但是因为js没有强制类型转换
        length要求类型是number，而pagers是String，为了防止报错，就用了个数学函数 -->
        <v-pagination
          v-model="page"
          :length="Math.min(pagers, pagers)"
          :total-visible="Math.min(7, pagers)"
          color="#b88b8b"
          @next="next"
          @previous="prev"
          @input="go(page)"
        ></v-pagination
      ></v-row>
    </v-main>
  </v-app>
</template>


<script>
import axiospostsearch from "@/axios/axiosgetcourse.js"; //引入axios获得的课程
import axiosgetcount from "@/axios/axiosgetcount.js"; //引入axios获得的课程总数
import register from "@/components/register.vue";
import login from "@/components/login.vue";
import Goods from "@/components/Goods.vue";

export default {
  data() {
    return {
      show_gotop: false,
      website: [
        "中国大学MOOC",
        "网易云课堂",
        "CSDN",
        "计算机慕课网",
        "学而思网校",
        "沪江网校",
      ],
      searchText: "", //搜索框的内容
      checked: [
        "中国大学MOOC",
        "网易云课堂",
        "CSDN",
        "计算机慕课网",
        "学而思网校",
        "沪江网校",
      ],
      unfree_choice: ["综合", "价格从低到高", "价格从高到低", "销量从高到低"],
      free_choice: ["综合", "销量从高到低"],
      page: 1,
      minprice: "", //最低价
      maxprice: "", //最高价
      cur: 0,
      username: "",
      isShowusername: false,
     
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
  computed: {
    isShowpager() {
      return this.$store.state.isShowpager;
    },
    curpage() {
      //当前的页码
      return this.$store.state.curpage;
    },
    pagesize() {
      //一页的数量
      return this.$store.state.pagesize;
    },
    pagestotal() {
      //总共的数量
      return this.$store.state.pagestotal;
    },
    pagers() {
      //总共的页数
      return this.$store.state.pagers + 0;
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


  },
  components: {
    register,
    login,
    Goods

  },
  mounted() {
    window.addEventListener("scroll", this.handle);
    /*获取到首页搜索框的值 */
    this.searchText = sessionStorage.getItem("text", "");
    this.search();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handle);
  },
  methods: {
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
    gotohome() {
      this.$router.push("/home");
    },
    gotodiscovery() {
      this.$router.push("/discovery");
    },
    selectAll() {
      let flag = 0;
      for (let i = 0; i < this.checked.length; i++) {
        if (this.checked[i] == null) {
          flag = 1;
        }
      }
      if (flag) {
        this.checked = [
          "中国大学MOOC",
          "网易云课堂",
          "CSDN",
          "计算机慕课网",
          "学而思网校",
          "沪江网校",
        ];
      } else {
        this.checked = [null, null, null, null, null, null];
      }

      this.changevalue();
    },
    search() {
      this.$store.commit("ISFREE", -1);
      this.$store.commit("SEARCHTEXT", this.searchText);
      if (this.searchText !== "") {
        sessionStorage.setItem("text", this.searchText);
        //搜索的时候，页面变成第一页

        this.$store.commit("CURPAGE", 1);
        this.gopage(1);
      }
    },
    prev() {
      if (this.$store.state.curpage > 1) {
        this.go(this.$store.state.curpage - 1);
      }
    },
    next() {
      if (this.$store.state.curpage < this.$store.state.pagers) {
        this.go(this.$store.state.curpage + 1);
      }
    },
    go(page) {
      if (this.$store.state.curpage !== this.$store.state.pagers + 1) {
        this.$store.commit("CURPAGE", page);
        this.gopage(this.$store.state.curpage);
      }
    },
    gopage(tcurpage) {
      axiosgetcount(
        {
          searchtext: this.$store.state.searchText,
          curpage: tcurpage,
          pagesize: this.$store.state.pagesize,
          searchwebsite: this.$store.state.searchwebsite,
          isFree: this.$store.state.isFree,
          isSort: this.$store.state.isSort,
          minprice: this.$store.state.minprice,
          maxprice: this.$store.state.maxprice,
        },
        (goodscount) => {
          this.$store.state.goodscount = goodscount["COUNT(*)"];
          //获取课程总数
          var tmppagerstotal = goodscount["COUNT(*)"];
          var tmppagersize = this.$store.state.pagesize;
          //获取页数
          var tmppagers = Math.ceil(tmppagerstotal / tmppagersize);

          this.$store.commit("PAGERSTOTAL", tmppagerstotal);
          this.$store.commit("PAGERS", tmppagers);
          // console.log(this.$store.state.pagerstotal);

          //分页
          var li = [];
          var tmpcurpage = this.$store.state.curpage;
          for (
            var i = Math.min(Math.max(1, tmpcurpage - 2), tmppagers);
            i <=
            Math.min(
              tmpcurpage + (tmpcurpage < 3 ? 5 - tmpcurpage : 2),
              tmppagers
            );
            i++
          ) {
            li.push(i);
          }
          if (li.length == 0) li.push(1);

          this.$store.commit("SHOWPAGERS", li);
        }
      );
      axiospostsearch(
        {
          searchtext: this.$store.state.searchText,
          curpage: tcurpage,
          pagesize: this.$store.state.pagesize,
          searchwebsite: this.$store.state.searchwebsite,
          isFree: this.$store.state.isFree,
          isSort: this.$store.state.isSort,
          minprice: this.$store.state.minprice,
          maxprice: this.$store.state.maxprice,
        },
        (goodsdata) => {
          //将字符串转为JSON对象
          this.$store.state.goodsdata = JSON.parse(goodsdata);
          this.$store.commit("ISSHOWPAGER", true);
        }
      );
      this.gotop();
    },

    changevalue() {
      this.checkname = [];
      for (let i = 0; i < this.checked.length; i++) {
        if (this.checked[i] != null) {
          this.checkname.push(this.checked[i]);
        }
      }
      // console.log(this.checkname)
      this.$store.commit("SEARCHWEBSITE", this.checkname);
      this.axiosgetpage1();
    },
    free() {
      this.$store.commit("ISFREE", 0);
      this.axiosgetpage1(); //将分页置于第一页，并且获取分页第一页的课程和课程总的数量
    },
    nofree() {
      this.$store.commit("ISFREE", 1);
      this.axiosgetpage1(); //将分页置于第一页，并且获取分页第一页的课程和课程总的数量
    },
    sortselect(index) {
      this.cur = index;
      //0表示综合，1表示价格从di到高，2表示价格从高到低，3表示销量从高到底
      this.$store.commit("ISSORT", index);
      this.axiosgetpage1(); //将分页置于第一页，并且获取分页第一页的课程和课程总的数量
    },
    segmentcofirm() {
      this.$store.commit("MINPRICE", this.minprice);
      this.$store.commit("MAXPRICE", this.maxprice);
      this.axiosgetpage1(); //将分页置于第一页，并且获取分页第一页的课程和课程总的数量
    },
    ifvalue() {
      this.$store.commit("MINPRICE", this.minprice); //把最小值传给vuex的mutations进一步修改state
      this.$store.commit("MAXPRICE", this.maxprice); //把最大值传给vuex的mutations进一步修改state
    },
    axiosgetpage1() {
      this.$store.commit("CURPAGE", 1);

      //获取选中商品的参数
      axiospostsearch(
        {
          searchtext: this.$store.state.searchText,
          curpage: 1,
          pagesize: this.$store.state.pagesize,
          searchwebsite: this.$store.state.searchwebsite,
          isFree: this.$store.state.isFree,
          isSort: this.$store.state.isSort,
          minprice: this.$store.state.minprice,
          maxprice: this.$store.state.maxprice,
        },
        (goodsdata) => {
          //将字符串转为JSON对象
          this.$store.state.goodsdata = JSON.parse(goodsdata);
        }
      );
      axiosgetcount(
        {
          searchtext: this.$store.state.searchText,
          curpage: 1,
          pagesize: this.$store.state.pagesize,
          searchwebsite: this.$store.state.searchwebsite,
          isFree: this.$store.state.isFree,
          isSort: this.$store.state.isSort,
          minprice: this.$store.state.minprice,
          maxprice: this.$store.state.maxprice,
        },
        (goodscount) => {
          this.$store.state.goodscount = goodscount["COUNT(*)"];
          //获取课程总数
          var tmppagerstotal = goodscount["COUNT(*)"];
          var tmppagersize = this.$store.state.pagesize;
          //获取页数
          var tmppagers = Math.ceil(tmppagerstotal / tmppagersize);

          this.$store.commit("PAGERSTOTAL", tmppagerstotal);
          this.$store.commit("PAGERS", tmppagers);

          //分页
          var li = [];
          var tmpcurpage = this.$store.state.curpage;
          for (
            var i = Math.max(1, tmpcurpage - 2);
            i <=
            Math.min(
              tmpcurpage + (tmpcurpage < 3 ? 5 - tmpcurpage : 2),
              tmppagers
            );
            i++
          ) {
            li.push(i);
          }
          if (li.length === 0) {
            li.push(1);
          }
          this.$store.commit("SHOWPAGERS", li);
        }
      );
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
.active_btn {
  background-color: #b88b8b;
  color: #ffffff;
}


</style>