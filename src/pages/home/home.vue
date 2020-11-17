<template>
  <v-app id="app">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="2">
        <v-img src="../../../public/images/zhuzilogo.png"></v-img>
      </v-col>
      <v-col cols="1">
        <v-btn text color="#b88b8b" class="btnhome">首页</v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn text color="#b88b8b" class="btndiscovery" @click="gotodiscovery"
          >发现</v-btn
        >
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <h1 class="big_title_form">竹子课堂，陪你一起开拓学习视野</h1>
        <p class="text_form caption">
          竹子课堂有10W+的课程，涵盖了编程与开发、AI/数据科学、产品与运营、
        </p>
        <p class="text_form caption">
          设计创意、电商运营、语言学习、职业考试、生活兴趣、考研、初高中等各方面的课程，应有尽有。
        </p>
      </v-col>
      <v-col cols="8">
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
    </v-row>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      searchText: "",
      value: 0,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["竹子课堂", "竹子课堂", "竹子课堂", "竹子课堂", "竹子课堂"],
    };
  },
  beforeDestroy() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  computed: {},
  methods: {
    search() {
      if (this.searchText != "") {
        sessionStorage.setItem("text", this.searchText);
        this.$router.push("/searchResult");
      }
    },
    gotodiscovery() {
      this.$router.push("/discovery");
    },
    onResize() {
      if (
        this.$vuetify.breakpoint.name == "xs" ||
        this.$vuetify.breakpoint.name == "sm"
      ) {
        this.$router.push("/app_home");
      }
    
    },
  },
};
</script>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../../../public/images/bg2.jpg");
}
.text_form {
  color: #b88b8b;
  /* font-size: 1rem; */
}
.big_title_form {
  color: #b88b8b;
  /* font-size: 2em; */
}
.btnhome {
  border-bottom: 1px solid #b88b8b;
}
.btndiscovery:hover {
  cursor: pointer;
  border-bottom: 1px solid #b88b8b;
}
.top_bar {
  background-image: linear-gradient(#e66465, #9198e5);
  height: 100px;
}
</style>