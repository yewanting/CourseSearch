<template>
  <div>
    <div>
      <!--表格部分-->
      <div class="textform-1">计划表格:</div>
      <table border="1" class="totaltable">
        <div v-show="isShowplanbianji" class="bianjiform">
          <div>
            <div class="textform">编辑计划内容</div>
            <i class="iconfont icon-RectangleCopy" @click="close"></i>
          </div>
          <div class="bianjicontent">
            <div class="form">
              <div class="textform2">截止时间：</div>
              <input type="date" v-model="curdate" />
            </div>
            <div class="form">
              <div class="textform2">计划内容：</div>
              <textarea v-model="curcontent"></textarea>
            </div>
            <div class="form">
              <div class="textform2">是否完成：</div>是
              <input type="radio" name="if" value="是" @click="radiovalue('是')" />
              否
              <input type="radio" name="if" value="否" @click="radiovalue('否')" />
            </div>
            <div class="form">
              <div class="textform2">自评分数：</div>
              <input type="text" v-model="curscore" @change="limitscore(curscore)" />
              {{scoreinfo}}
            </div>
            <div class="btn">
              <div class="btntext" @click="bianjisuccess">完成</div>
            </div>
          </div>
        </div>
        <div v-show="isShowtoast" class="toastform">
          <div>
            <i class="iconfont icon-RectangleCopy" @click="close"></i>
            <div class="textform-3">确定删除吗？</div>
            <div class="btn2 " @click="confirmdelete">确定</div>
            <div class="btn2" @click="close">取消</div>
          </div>
        </div>
        <tr>
          <th class="title">
            <div class="titletext">截止时间</div>
          </th>
          <th class="title">
            <div class="titletext">计划内容</div>
          </th>
          <th class="title">
            <div class="titletext">是否完成</div>
          </th>
          <th class="title">
            <div class="titletext">自评分数</div>
          </th>
          <td class="title">
            <div class="addbtn" @click="bianjiitem(plan.length)">添加</div>
          </td>
        </tr>
        <tr v-for="(item,index) in plan" :key="index">
          <td class="content">
            <div>{{item["date"]}}</div>
          </td>
          <td class="content">
            <div>{{item["content"]}}</div>
          </td>
          <td class="content">
            <div>{{item["ifSuccess"]}}</div>
          </td>
          <td class="content">
            <div>{{item["score"]}}</div>
          </td>
          <td class="content">
            <abbr title="编辑" style="text-decoration:none">
              <i class="iconfont icon-comment-single" @click="bianjiitem(index)"></i>
            </abbr>
            <abbr title="删除" style="text-decoration:none">
              <i class="iconfont icon-RectangleCopy6" @click="deleteitem(index)"></i>
            </abbr>
          </td>
        </tr>
      </table>
    </div>

    <div>
      <!--完成情况-->
      <div class="textform-1">完成情况统计:</div>
      <div>
        <Echarts class="charts" ref="mychild1"></Echarts>
        <Echartspie class="charts" ref="mychild2"></Echartspie>
      </div>
    </div>
  </div>
</template>

<script>
import axiosgetplan from "@/axios/axiosgetplan.js";
import axiosinsertplan from "@/axios/axiosinsertplan.js";
import axiosupdateplan from "@/axios/axiosupdateplan.js";
import axiosdeleteplan from "@/axios/axiosdeleteplan.js";
import Echarts from "@/components/Echarts.vue";
import Echartspie from "@/components/Echartspie.vue";
export default {
  data() {
    return {
      plan: [],
      isShowplanbianji: false,
      isShowtoast:false,
      curdate: "",
      curcontent: "",
      curifSuccess: "",
      curscore: "",
      curindex: "",
      scoreinfo: ""
    };
  },
  components: {
    Echarts,
    Echartspie
  },
  created() {
    this.getplan();
  },
  methods: {
    additem(iteminfo) {
      this.plan.push({
        date: iteminfo["date"],
        content: iteminfo["content"],
        ifSuccess: iteminfo["ifSuccess"],
        score: iteminfo["score"],
        id: ""
      });
      var token = sessionStorage.getItem("token");
      var userinsertplaninfo = {
        token: token,
        date: iteminfo["date"],
        content: iteminfo["content"],
        ifSuccess: iteminfo["ifSuccess"],
        score: iteminfo["score"]
      };
      var _this = this;
      axiosinsertplan(userinsertplaninfo, IfinsertSuccess => {
        if (IfinsertSuccess == "1") console.log("插入一条计划成功！");
        else console.log("插入失败");
        _this.getplan();
      });
    },
    deleteitem(index) {
      this.isShowtoast = true;
      this.curindex = index;  
    },
    confirmdelete(){
      this.isShowtoast = false;
      var token = sessionStorage.getItem("token");
      var deleteplaninfo = {
        token: token,
        id: this.plan[this.curindex]["id"]
      };
      axiosdeleteplan(deleteplaninfo, IfDelete => {
        if (IfDelete == 1) console.log("删除成功！");
        else console.log("删除失败");
        this.getplan()
      });
    },
    bianjiitem(index) {
      this.isShowplanbianji = true;
      this.$store.commit("ISSHOWPLANBIANJI", true);
      this.curindex = index;
      if (this.curindex != this.plan.length) {
        this.curdate = this.plan[index]["date"];
        this.curcontent = this.plan[index]["content"];
        this.curifSuccess = this.plan[index]["ifSuccess"];
        this.curscore = this.plan[index]["score"];
      }
    },
    close() {
      this.isShowplanbianji = false;
      this.isShowtoast = false;
      this.$store.commit("ISSHOWPLANBIANJI", false);
    },
    clear() {
      this.curdate = "";
      this.curcontent = "";
      this.curifSuccess = "";
      this.curscore = 0;
    },
    bianjisuccess() {
      if (this.curindex == this.plan.length) {
        var iteminfo = {
          date: this.curdate,
          content: this.curcontent,
          ifSuccess: this.curifSuccess,
          score: this.curscore
        };
        this.additem(iteminfo);
        this.isShowplanbianji = false;
        this.$store.commit("ISSHOWPLANBIANJI", false);
      } else {
        var token = sessionStorage.getItem("token");
        this.plan[this.curindex]["date"] = this.curdate;
        this.plan[this.curindex]["content"] = this.curcontent;
        this.plan[this.curindex]["ifSuccess"] = this.curifSuccess;
        this.plan[this.curindex]["score"] = this.curscore;
        this.isShowplanbianji = false;
        this.$store.commit("ISSHOWPLANBIANJI", false);
        var userupdareplaninfo = {
          token: token,
          date: this.curdate,
          content: this.curcontent,
          ifSuccess: this.curifSuccess,
          score: this.curscore,
          id: this.plan[this.curindex]["id"]
        };
        axiosupdateplan(userupdareplaninfo, IfUpdate => {
          if (IfUpdate == 1) console.log("编辑成功！");
          else console.log("编辑失败");
          this.getplan()
        });
      }
      this.clear();
    },

    radiovalue(value) {
      this.curifSuccess = value;
    },
    getplan() {
      var cmp = function(obj1, obj2) {
        var va1 = obj1.date;
        var va2 = obj2.date;
        if (va1 > va2) return 1;
        else return -1;
      };
      var date = new Date(); //获取当前时间
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      var token = sessionStorage.getItem("token");
      var userplaninfo = {
        token: token
      };
      axiosgetplan(userplaninfo, tmpplan => {
        tmpplan = tmpplan.sort(cmp);
        this.plan = tmpplan;
        var scoregroup = [];
        var dategroup = [];
        var countyes = 0;
        var countno = 0;
        for (var i = 0; i < this.plan.length; i++) {
          if (this.plan[i]["date"] <= currentdate) {
            scoregroup.push(this.plan[i]["score"]);
            dategroup.push({ date: this.plan[i]["date"], index: i });
            if (this.plan[i]["ifSuccess"] == "是") countyes++;
            else if (this.plan[i]["ifSuccess"] == "否") countno++;
          }
        }

        dategroup = dategroup.sort(cmp);
        var curscoregroup = [];
        var curdategroup = [];
        for (var i = 0; i < dategroup.length; i++) {
          curdategroup.push(dategroup[i]["date"]);
          curscoregroup.push(scoregroup[dategroup[i]["index"]]);
        }
        this.$store.commit("PLANSCORE", curscoregroup);
        this.$store.commit("PLANDATE", curdategroup);
        this.$store.commit("COUNTYES", countyes);
        this.$store.commit("COUNTNO", countno);

        this.$refs.mychild1.myEcharts();
        this.$refs.mychild2.myEcharts();
      });
    },
    limitscore(value) {
      if (value < 0 || value > 100) {
        this.scoreinfo = "请输入0~100的评分！";
      } else {
        this.scoreinfo = "";
      }
    }
  }
};
</script>


<style scoped>
.textform-1 {
  color: #b88b8b;
  margin: 20px;
  font-size: 22px;
  font-weight: bold;
}
.totaltable {
  margin-left: 23%;
}
.title {
  background-image: url("../../static/images/navbarbg.jpg");
  background-size: 100% 100%;
  /* background-color: rgb(238, 238, 238); */
  height: 40px;
  box-sizing: border-box;
  width: 155px;
}
.addbtn {
  width: 50%;
  height: 70%;
  background-color: rgb(200, 127, 241);
  margin-left: 25%;
  color: #ffffff;
  border-radius: 3px;
  text-align: center;
  padding-top: 2px;
}
.addbtn，.titletext {
  padding-top: 8px;
}
.addbtn:hover {
  cursor: pointer;
}
.content {
  width: 150px;
  height: 70px;
}
.icon-comment-single {
  font-size: 18px;
  margin-left: 30px;
}
.icon-comment-single:hover,
.icon-RectangleCopy6:hover {
  cursor: pointer;
}
.icon-RectangleCopy6 {
  font-size: 25px;
  margin-left: 40px;
  color: red;
}
.bianjiform {
  z-index: 100;
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0px 10px 30px gray;
  width: 42vw;
  height: 40vh;
}
.toastform{
  left: 35%;
  z-index: 100;
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0px 10px 30px gray;
  width: 20vw;
  height: 30vh;
}
.bianjiform .textform {
  margin: 20px;
  float: left;
  color: #b88b8b;
  font-weight: bold;
  font-size: 20px;
}
.icon-RectangleCopy {
  margin: 20px;
  font-size: 30px;
  float: right;
}
.icon-RectangleCopy:hover {
  cursor: pointer;
}
.bianjicontent {
  clear: both;
}
.form {
  margin-left: 40px;
  margin-bottom: 30px;
  color: #b88b8b;
}

.textform2 {
  float: left;
  color: #b88b8b;
  font-size: 18px;
  font-weight: bold;
}
.textform-3{
  clear: both;
  margin-left: 34%;
  color: #b88b8b;
  font-weight: bold;
  font-size: 20px;
}

textarea {
  width: 80%;
}
.btn {
  margin-left: 45%;
  color: #b88b8b;
  text-align: center;
  width: 80px;
  height: 30px;
  border: 1px solid #b88b8b;
}
.btn:hover,.btn2:hover {
  cursor: pointer;
  background-color: #b88b8b;
  color: #ffffff;
}
.btntext {
  font-size: 18px;
  font-weight: bold;
  margin-top: 4px;
}
.charts {
  margin-left: 13%;
  float: left;
}
.btn2{
  float: left;
  margin-left: 20%;
  color: #b88b8b;
  text-align: center;
  width: 80px;
  height: 25px;
  border: 1px solid #b88b8b;
  margin-top:20%;
}

</style>