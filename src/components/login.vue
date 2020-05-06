<template>
    <div>
        <div class= "loginpart">
            <div class="top">
                <div class="lefttop checked" >登录界面</div>
                <div class="lefttop" @click="gotoregister">注册界面</div>
                <i class="iconfont icon-RectangleCopy" @click="close"></i>
            </div>
            <div class="toastform" v-show="isShowLoginToast">  <!--用于提示用户是否登录成功-->      
                <div style="margin-top:25%">{{toastlogininfo}}</div>
            </div>
           <div class="content">
                <div class="totalitem">
                    <div class = "text" >用户名：</div>
                    <div class="item">
                         <i class="iconfont icon-RectangleCopy3"></i><input type="text" v-model="userinfo.username" placeholder="请输入用户名" class="none" > 
                    </div>
                </div>
                <div  class="totalitem" >
                     <div class = "text">密码：</div>
                     <div class="item">
                         <i class="iconfont icon-password"></i><input type="password" v-model="userinfo.password" placeholder="请输入密码" class="none">
                    </div> 
                 </div>
           </div>
           <div class="btn">
               <div class="btnlogin" @click="login"  @keyup.enter="login">登录</div>
               <div class="btnback" @click="close">返回</div>
           </div>
        </div>
    </div>
</template>

<script>
import axiosloginuserinfo from "@/axios/axiosloginuserinfo.js";
export default {
    data(){
        return{
             userinfo:{
                username:"",
                password:""
            }
        }
    },
     computed:{
        toastlogininfo(){
            return this.$store.state.toastlogininfo
        },
        isShowLoginToast(){
            return this.$store.state.isShowLoginToast
        }
    },
    methods:{
        close(){
             this.$store.commit("ISSHOWLOGIN",false)
        },
        gotoregister(){
            this.$store.commit("ISSHOWLOGIN",false)
            this.$store.commit("ISSHOWREGISTER",true)
        },
        login(){ //注册用户
            var tmpiflogin;
            axiosloginuserinfo(this.userinfo,Iflogin=>{ 
                if(Iflogin=='-1')
                {
                    this.$store.commit('TOASTLOGININFO','用户名或者密码错误！')    
                               
                }else{
                    this.$store.commit('TOASTLOGININFO','登录成功！')
                    sessionStorage.setItem("curusername", this.userinfo.username); 
                    sessionStorage.setItem("isShowusername",true);
                    sessionStorage.setItem("token",Iflogin);  
                    this.$router.go(0)
                }
                
                this.$store.commit('ISSHOWLOGINTOAST',true);   
                tmpiflogin = Iflogin;
  
            })
            var _this = this
            setTimeout(function(){   //显示1.5秒后消失
                 _this.$store.commit('ISSHOWLOGINTOAST',false);
                if(tmpiflogin!='-1')
                {
                    _this.$store.commit('ISSHOWLOGIN',false);
                }
            },1500)
        }
    }
}
</script>

<style scoped>
.loginpart{
    z-index: 100;
    position: fixed;
    width: 40%;
    height: 50%;
    margin-left: 28%;
    background-size: 100% 100%;
    background-color: #ffffff;
    box-shadow: 0px 10px 30px  gray;
    /* background-image: url("../../static/images/loginbg.png"); */
}
.top{
    height: 15%;
}
.lefttop{
    float: left;
    margin-left: 5%;
    margin-top: 5%;
    font-size: 18px;
    color: #b88b8b;
}
.lefttop:hover{
    cursor: pointer;
}
.checked{
    font-weight: bolder;
}
.toastform{
    position: absolute;
    background-color: #ffffff;
    text-align: center;
    top:30%;
    left:25%;
    font-size: 18px;
    color: #b88b8b;
    width: 50%;
    height: 50%;
    font-weight: bold;
    box-shadow: 0px 10px 30px  gray;
}
.icon-RectangleCopy{
    font-size: 30px;
    float: right;
    margin-right: 5%;
    margin-top: 4%;
}
.icon-RectangleCopy:hover{
    cursor: pointer;
}
.content{
    /* clear: both; */
    color: #b88b8b;
    margin-top: 8%;
    margin-left: 12%;
    width: 70%;
    height: 50%;
}
.totalitem{
    padding-top: 10%;
    font-size: 18px;
    width: 100%;
}
.text{
    float: left;
    width: 15%;
}
.item{
    float: left;
    border: 1px solid #b88b8b;
    width: 80%;
}
.none{
    border: 0;
    background-color: transparent;
    outline:none;
    width: 80%;
}
.icon-RectangleCopy3{
    float: left;
    font-size: 18px;
    margin: 1%;
}
.icon-password{
    float: left;
    font-size: 18px;
    margin: 1%;
}
.btn{
    text-align: center;
    color: #b88b8b;
    font-weight: bold;
    font-size: 25px;
}
.btnlogin,.btnback{
    float: left;
    border:1px solid #b88b8b;
    width: 20%;
    margin-left: 20%;
}
.btnlogin:hover,.btnback:hover{
    cursor: pointer;
    background-color: #ebafaf;
    color: white;
}
</style>