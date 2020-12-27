<template>
  <v-dialog v-model="isShowRegister" width="700">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="#ffffff"
        v-bind="attrs"
        v-on="on"
        class="btn"
      >
        注册
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline brown lighten-3">
        <v-btn text color="#ffffff" class="ma-4">
          <h2>注册界面</h2>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field
          class="ma-4"
          v-model="userinfo.username"
          :counter="10"
          :rules="nameRules"
          color="#b88b8b"
          label="账号"
          prepend-icon="mdi-account"
          required
        ></v-text-field>

        <v-text-field
          class="ma-4"
          v-model="userinfo.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :error-messages="this.Match ? '' : rules.errorMsg"
          :type="show1 ? 'text' : 'password'"
          color="#b88b8b"
          prepend-icon="mdi-lock"
          label="密码"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        >
        </v-text-field>

        <v-text-field
          class="ma-4"
          v-model="userinfo.confirmpassword"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show2 ? 'text' : 'password'"
          :error-messages="this.Match ? '' : rules.errorMsg"
          color="#b88b8b"
          prepend-icon="mdi-lock"
          label="确认密码"
          hint="At least 8 characters"
          @blur="validpasswd"
          counter
          @click:append="show2 = !show2"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="register" outlined color="#b88b8b" large> 注册 </v-btn>
        <v-snackbar v-model="snackbar" :timeout="timeout" centered>
          {{ totasttext }}

          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axiosregisteruserinfo from "@/axios/axiosregisteruserinfo.js";
export default {
  data() {
    return {
      isShowRegister: false,
      valid: true,
      nameRules: [
        (v) => !!v || "username is required",
        (v) =>
          (v && v.length <= 10) || "usernam must be less than 10 characters",
      ],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        errorMsg: () => "两次密码不一致！！",
      },
      show1: false,
      show2: false,
      userinfo: {
        username: "",
        password: "",
        confirmpassword: "",
      },
      Match: true,
      totasttext: "",
      snackbar: false,
      timeout: 2000,
    };
  },
  methods: {
    validpasswd() {
      if (this.userinfo.confirmpassword == this.userinfo.password) {
        this.Match = true;
      }
    },
    register() {
      if (this.userinfo.confirmpassword != this.userinfo.password) {
        this.Match = false;
      } else {
        this.totasttext = "";
        axiosregisteruserinfo(this.userinfo, (IfInsert) => {
          if (IfInsert == "1") {
            this.totasttext = "注册成功！";
          } else if (IfInsert == "-1") {
            this.totasttext = "用户名已存在，请使用其他用户名！";
          }
          this.snackbar = true;
        });
        var _this = this;
        setTimeout(function () {
          //显示1.5秒后消失
          _this.totasttext = "";
          _this.snackbar = false;
          _this.isShowRegister = false;
        }, 1500);
      }
    },
  },
};
</script>

<style scoped>
.btn {
  color: #b88b8b;
  font-size: 1rem;
}
</style>