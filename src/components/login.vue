<template>
  <v-dialog  width="700" v-model="isShowlogin">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="#ffffff"
        v-bind="attrs"
        v-on="on"
        class="btn"
      >
        登录
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline brown lighten-3">
        <v-btn text color="#ffffff" class="ma-4">
          <h2>登录界面</h2>
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
          :type="show1 ? 'text' : 'password'"
          color="#b88b8b"
          prepend-icon="mdi-lock"
          label="密码"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        >
        </v-text-field>


      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="login" outlined color="#b88b8b" large> 登录 </v-btn>
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
import axiosloginuserinfo from "@/axios/axiosloginuserinfo.js";
export default {
  data() {
    return {
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
      userinfo: {
        username: "",
        password: "",
      },
      totasttext: "",
      snackbar: false,
      timeout: 2000,
      isShowlogin:false,
    };
  },
  methods: {
        login(){ //注册用户
            var tmpiflogin;
            this.totasttext=""
            axiosloginuserinfo(this.userinfo,Iflogin=>{ 
                if(Iflogin=='-1')
                {
                    this.totasttext="用户名或者密码错误！"          
                }else{
                    this.totasttext="登录成功！"
                    sessionStorage.setItem("curusername", this.userinfo.username); 
                    sessionStorage.setItem("isShowusername",true);
                    sessionStorage.setItem("token",Iflogin);  
                    this.$router.go(0)
                }
                
                this.snackbar=true;
                tmpiflogin = Iflogin;
            })
            var _this = this
            setTimeout(function(){   //显示1.5秒后消失
                _this.snackbar=false;
                if(tmpiflogin!='-1')
                {
                     _this.isShowlogin = false;
                }
            },1500)
        }
  },
};
</script>

<style scoped>
.btn {
  color: #b88b8b;
  font-size: 1rem;
}
</style>