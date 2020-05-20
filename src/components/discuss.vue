<template>
    <div>
        <div class="empty" v-show="(isShowEmpty)==true" >  <!--空页面-->
            <div><img src="../../static/images/kongkong.png" style="border-radius:50%" alt = "empty"></div>
            <div class="textform1">空空如也~</div>
            <div class="textform2">赶紧加入论坛，或许可以找到志同道合的小伙伴一起讨论问题呢！</div>
            <div class="xuankubtn" @click="showchoice">点我添加</div>
        </div>
        <div v-show="(isShowdiscusschoice==true)" class="choicetotalform">  <!--选择论坛页面-->
            <div>
                <div class="textform">
                论坛选择
                </div>
                <div class="ps">
                选择您想要加入的论坛，或许可以找到志同道合的小伙伴讨论呢~(*╹▽╹*)
                </div>
                <i class="iconfont icon-RectangleCopy" @click="close"></i>
            </div>
            <div class="middle">
                <div v-for="(item,index) in choiceitem" :key="index" class="totalitemform">
                    <span>{{item}}</span>
                    <input type="checkbox" name = "choice" :value="item" class="checkboxform" v-model="choicevalue">           
               </div>
            </div>

            <div class="bottom">
                <div class="btn" @click="confirm">确定</div>
                <div class="btn" @click="close">取消</div>
            </div>
        </div>

        <div class="totalluntan" v-show="!isShowEmpty">
           <div class="left">
               <!-- <img src = "../../static/images/navbarhover3.jpg" alt = "花"> -->
               <div class="textform" style="padding:10px">我加入的论坛:</div>
               <div v-for="(name,index) in luntan_name" :key="index" class="luntannameform">
                   <span :class="(curindex==index)?'line':''" @click="changeindex(index)">{{name["luntanname"]}}</span>
               </div>
           </div>
           <div class="right">
               <div>
                   <div>
                       <textarea class="textareaform" placeholder="说点什么吧...（限500字）" v-model="text"></textarea>
                   </div>
                   <div class="submit" @click="confirmtext">发表</div>
                </div>
                <div v-for="(item,index) in totalcontent" :key="index" class="textcontent">
                    <div class="who_add">{{item["who_add"]}}</div>
                    <div class="add_time">{{item["add_time"]}}</div>
                    <div class="content">{{item["content"]}}</div>
                </div>  
           </div>
        </div>
        
    </div>
</template>

<script>
import axisopostuserluntanname from "@/axios/axiospostuserluntanname.js"
import axiosgetuserluntanname from "@/axios/axiosgetuserluntanname.js"
import axiospostluntancontent from "@/axios/axiospostluntancontent.js"
import axiosgetluntancontent from "@/axios/axiosgetluntancontent.js"

export default {
    data(){
        return{
            choiceitem:[
                '编程与开发','产品与运营','考研','设计创意','电商运营','职场提升','AI/数据科学','语言学习','职业考试','生活兴趣'
            ],
            choicevalue:[],
            curindex:0,
            text:"",
           
        }
    },
    computed:{
        isShowdiscusschoice(){
         return this.$store.state.isShowdiscusschoice;
      },
      isShowEmpty(){
          return this.$store.state.isShowEmpty
      },
      luntan_name(){
          return this.$store.state.luntan_name
      },
      totalcontent(){
          return this.$store.state.totalcontent
      }
    },
    methods:{
        close(){
            this.$store.commit("ISSHOWDISCUSSCHOICE",false)

        },
        confirm(){
                var token = sessionStorage.getItem("token")
                
               var curtime = this.gettime();
                var info = {
                    "token":token,
                    "luntanname":this.choicevalue,
                    "entertime":curtime
                }
                axisopostuserluntanname(info,IfpostName=>{
                })
                

                
                var info2 = {
                    "token":token
                }
                
            axiosgetuserluntanname(info2,IfGetName=>{
                if(IfGetName.length==0){
                    this.$store.commit("ISSHOWEMPTY",true)
                }else{
                    this.$store.commit("LUNTANNAME",IfGetName)
                    this.$store.commit("ISSHOWEMPTY",false)
                    this.$store.commit("ISSHOWDISCUSSCHOICE",false)
                    this.$forceUpdate();
                }
            })
            
        },
        confirmtext(){
            var token = sessionStorage.getItem("token")
            var curtime = this.gettime()
            var luntanname =  this.luntan_name[this.curindex]["luntanname"]
            var content = this.text;
            var info = {
                "token":token,
                "curtime":curtime,
                "luntanname":luntanname,
                "content":content
            }
            axiospostluntancontent(info,IfpostLuntanContent=>{
                    var info2 = {
                    "token":token,
                    "curtime":curtime,
                    "luntanname":luntanname
                    }
                    axiosgetluntancontent(info2,IfGetContent=>{
                        this.$store.commit("TOTALCONTENT",IfGetContent)
                    })
            })
     
          
        },
        showchoice(){
             this.$store.commit("ISSHOWDISCUSSCHOICE",true)
        },
        changeindex(index){
            this.curindex = index;
            var token = sessionStorage.getItem("token")
            var curtime = this.gettime()
            var luntanname =  this.luntan_name[this.curindex]["luntanname"]
            var info = {
                    "token":token,
                    "curtime":curtime,
                    "luntanname":luntanname
            }
            axiosgetluntancontent(info,IfGetContent=>{
                this.$store.commit("TOTALCONTENT",IfGetContent)
                // console.log(IfGetContent)
            })
        },
        gettime(){
                var date = new Date(); //获取当前时间
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 1 && strDate <= 9) {
                    strDate = "0" + strDate;
                }

                var hour = date.getHours();//获取系统时间
                var minute = date.getMinutes(); //分
                var second = date.getSeconds();//秒
                 if (hour >= 1 && hour <= 9) {
                    hour = "0" + hour;
                }
                 if ( minute >= 1 &&  minute <= 9) {
                     minute = "0" +  minute;
                }
                 if ( second >= 1 &&  second <= 9) {
                    second = "0" + second;
                }
                var curtime = year + seperator1 + month + seperator1 + strDate+" "+hour+":"+minute+":"+second;
                return curtime;
        }

    }
}
</script>


<style scoped>
.empty{
    position: absolute;
    top:20%;
    left: 35%;
}
.textform1{
    margin: 20px;
    color: #b88b8b;
    font-weight: bold;
    font-size: 22px;
    text-align: center;
}
.textform2{
    clear: both;
    margin: 20px;
    color: #b88b8b;
    font-size: 22px;
}

.xuankubtn {
    font-size: 20px;
    padding: 20px 40px;
    color: #b88b8b;
    text-align: center;
    border: 1px solid #b88b8b;
    position: relative;
    overflow: hidden;
  }
  
.xuankubtn:hover {
    cursor: pointer;
    box-shadow: 1px 1px 25px 10px rgba(230, 46, 230, 0.4);
    color: #241414;
    font-weight: bold;
  }
  
.xuankubtn:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      rgba(36, 177, 24, 0.4),
      rgba(230, 46, 230, 0.4),
      rgba(219, 96, 25, 0.4)
    );
    transition: all 650ms;
  }
  
.xuankubtn:hover:before {
    left: 0;

  }
.choicetotalform{
    top: 20%;
    left: 25%;
    z-index: 100;
    position: absolute;
    background-color: #ffffff;
    box-shadow: 0px 10px 30px gray;
    right: 25%;
}
.textform{
    margin: 20px;
    float: left;
    color: #b88b8b;
    font-weight: bold;
    font-size: 22px;
}
.icon-RectangleCopy {
  margin: 20px;
  font-size: 30px;
  float: right;
}
.icon-RectangleCopy:hover {
  cursor: pointer;
}
.middle{
    margin-top: 10%;
    clear: both;
    color: #b88b8b;
}
.totalitemform{
   float: left;
   margin: 25px;
   font-size: 18px;
   font-weight: bold;
   margin-bottom: 8%;
}
.checkboxform{
    width: 20px;
    height: 20px;
}

.bottom{
    clear: both;
}
.btn{
    float: left;
    width: 100px;
    height: 30px;
    border: 1px solid #b88b8b;
    color: #b88b8b;
    font-size: 20px;
    position: flex;
    text-align: center;
    margin-left: 25%;
    margin-top: 4%;
    font-weight: bold;
    margin-bottom: 5%;
}
.btn:hover{
    cursor: pointer;
    background-color: rgb(255, 191, 210);
    color: #ffffff;
}
.ps{
    float: left;
    color: #b88b8b;
    margin: 2%;
}
.totalluntan{
    position: absolute;
    width: 95%;
}
.left{
    float: left;
    box-shadow: 1px 1px 10px 10px rgba(218, 216, 212, 0.4);
    background-image: url("../../static/images/huakuang7.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 10px;
}
.luntannameform{
    margin: 25px;
    color: #b88b8b;
    font-size: 22px;
    padding-bottom: 20px;
    padding-left: 20px;
}
.luntannameform:hover{
    cursor: pointer;
    font-weight: bold;
}
span:hover{
     border-bottom: 4px solid #b88b8b;
}
.line{
     font-weight: bold;
     border-bottom: 4px solid #b88b8b;
}
.right{
    float: left;
    width: 87%;
    margin-top: 1%;
    margin-left: 2%;
    border:1px solid rgb(214, 211, 211);
    /* box-shadow: 1px 1px 10px 10px rgba(218, 216, 212, 0.4); */
    /* background-image: url("../../static/images/huakuang5.png"); */
    /* background-size: 100% 100%;
    background-repeat: no-repeat; */
}
.textareaform{
    width: 74%;
    height: 150px;
    font-size: 15px;
    outline: none;
    margin-top: 1%;
    margin-left: 12%;
}
.submit{
    width: 100px;
    height: 30px;
    float:right;
    margin-right: 15%;
    border: 1px solid #b88b8b;
    background-color:#b88b8b ;
    font-weight: bold;
    font-size: 18px;
    color: #ffffff;
    text-align: center;
}
.submit:hover{
    cursor: pointer;
}
.who_add{
    float: left;
    margin-right:20px;
    color: #b88b8b;
    font-weight: bold;
}
.textcontent{
    margin-left: 11%;
    margin-top: 2%;
    padding-top: 1%;
    margin-bottom: 1%;
    border-top: 1px solid rgb(243, 221, 221);
    width: 80%;
}
.content{
    margin-top: 2%;
    border: 1px solid #b88b8b;
    width: 90%;
    background-color: #f6f6f6;
    font-size: 18px;
}
</style>