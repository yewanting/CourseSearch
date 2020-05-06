<template>
    <div>
        <div class= "registerpart">
            <div class="top">
                <div class="lefttop" @click="gotologin">登录界面</div>
                <div class="lefttop checked">注册界面</div>
                <i class="iconfont icon-RectangleCopy" @click="close"></i>
            </div>
            <div class="toastform" v-show="isShowRegisterToast">  <!--用于提示用户是否注册成功-->      
                <div style="margin-top:25%">{{toastregisterinfo}}</div>
            </div>
           <div class="content">
                <div class="totalitem">
                    <div class = "text" >用户名：</div>
                    <div class="item">
                         <i class="iconfont icon-RectangleCopy3"></i><input type="text" v-model="userinfo.username" placeholder="请输入用户名" class="none"> 
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
               <div class="btnregister" @click="register"  @keyup.enter="register">注册</div>
               <div class="btnback" @click="close">返回</div>
           </div>
        </div>
    </div>
</template>

<script>
import axiosregisteruserinfo from "@/axios/axiosregisteruserinfo.js";
export default {
    data(){
        return{
            userinfo:{
                username:"",
                password:""
            },
        }
    },
    computed:{
        toastregisterinfo(){
            return this.$store.state.toastregisterinfo
        },
        isShowRegisterToast(){
            return this.$store.state.isShowRegisterToast
        }
    },
    methods:{
        close(){  //关闭注册页面
             this.$store.commit("ISSHOWREGISTER",false)
        },
        gotologin(){  //回到登录页面，关闭注册页面
            this.$store.commit("ISSHOWLOGIN",true)
            this.$store.commit("ISSHOWREGISTER",false)
        },
        register(){ //注册用户
            axiosregisteruserinfo(this.userinfo,IfInsert=>{ 
                if(IfInsert=='1')
                {
                    this.$store.commit('TOASTREGISTERINFO','注册成功！')
                }else
                if(IfInsert=='-1')
                {
                    this.$store.commit('TOASTREGISTERINFO','用户名已存在，请使用其他用户名！')                   
                }
                
                this.$store.commit('ISSHOWREGISTERTOAST',true);           
            })
            var _this = this
            setTimeout(function(){   //显示1.5秒后消失
            _this.$store.commit('ISSHOWREGISTERTOAST',false);
            },1500)

        }
    }
}
</script>

<style scoped>
.registerpart{
    z-index: 100;
    position: fixed;
    width: 40%;
    height: 50%;
    margin-left: 28%;
    background-size: 100% 100%;
    background-color: #ffffff;
    box-shadow: 0px 10px 30px  gray;
    /* background-image: url("../../static/images/registerbg.png"); */
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
.checked{
  font-weight: bold;
}
.lefttop:hover{
    cursor: pointer;
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
.btnregister,.btnback{
    float: left;
    border:1px solid #b88b8b;
    width: 20%;
    margin-left: 20%;
}
.btnregister:hover,.btnback:hover{
    cursor: pointer;
    background-color: #ebafaf;
    color: white;
}
</style>