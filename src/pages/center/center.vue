<template>
  <v-app id="inspire">
    <v-card flat>
      <v-tabs background-color="#b88b8b" dark centered v-model="tab">
        <v-tabs-slider color="brown"></v-tabs-slider>
        <v-btn color="brown" @click="gotohome" class="ma-2">首页</v-btn>
        <v-btn color="brown" @click="gotodiscovery" class="ma-2">发现页</v-btn>
        <v-spacer></v-spacer>
        <v-tab class="title">我的收藏</v-tab>
        <v-tab class="title">我的计划</v-tab>
        <v-tab class="title">我的讨论</v-tab>
        <v-spacer></v-spacer>
        <v-btn color="brown" class="ma-2">{{ username }}</v-btn>
        <v-btn text @click="outoflogin" class="ma-2">退出登录</v-btn>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item class="title">
          <v-card flat class="ma-10">
            <star></star>
          </v-card>
        </v-tab-item>
        <v-tab-item class="title">
             <v-card flat class="ma-10">
            <plan></plan>
          </v-card>
        </v-tab-item>
        <v-tab-item class="title"></v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
import star from "@/components/star.vue";
import plan from "@/components/plan.vue";
export default {
  data() {
    return {
      username: "",
      myStar: true,
      tab: null,
    };
  },
  components: {
    star,
    plan,
  },
  created() {
    this.username = sessionStorage.getItem("curusername");
  },
  methods: {
    gotohome() {
      this.$router.push("/home");
    },
    gotodiscovery() {
      this.$router.push("/discovery");
    },
    outoflogin() {
      sessionStorage.setItem("curusername", "");
      sessionStorage.setItem("isShowusername", false);
      sessionStorage.setItem("token", "");
      this.$router.push("/");
    },

  },
};
</script>

<style scoped>
</style>