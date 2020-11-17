<template>
  <v-app id="app">
    <v-app-bar app height="120" flat color="#9198e5">
     <v-row dense>
      <v-col cols="2">
          <v-avatar>
             <v-img src="../../../public/images/logo.jpg" contain></v-img>
          </v-avatar>
      </v-col>
      <v-col>
          <v-row dense>
            <v-col cols="12" class="white--text"><h3>竹子姐姐</h3></v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" class="white--text">竹子课堂，陪你一起开拓学习视野！</v-col>
          </v-row>
      </v-col>
     </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-list>
          <v-list-item link>
            <v-icon color="#9198e5" size="25">mdi-star</v-icon>
            我的收藏   
            <v-spacer></v-spacer>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item link>
            <v-icon color="#9198e5" size="25">mdi-calendar</v-icon>
            我的计划
            <v-spacer></v-spacer>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item link>
             <v-icon color="#9198e5" size="25">mdi-comment</v-icon>
             我的讨论
            <v-spacer></v-spacer>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-container>
    </v-main>
    <v-bottom-navigation app :value="value" color="#9198e5" grow>
      <v-btn @click="gotohome">
        <span>首页</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn @click="gotodiscovery">
        <span>分类</span>

        <v-icon>mdi-widgets</v-icon>
      </v-btn>

      <v-btn>
        <span>个人中心</span>

        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      value: 2,
    };
  },
  methods: {
    gotohome() {
      this.$router.push("/app_home");
    },
    gotodiscovery() {
      this.$router.push("/app_discovery");
    },
  },
};
</script>