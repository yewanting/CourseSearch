<template>
  <v-row>
    <v-col cols="12">
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">截止时间</th>
              <th class="text-left">计划内容</th>
              <th class="text-left">是否完成</th>
              <th class="text-left">自评分数</th>
              <th>
                <v-dialog width="700" v-model="isShowplanbianji">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ml-10"
                      v-bind="attrs"
                      v-on="on"
                      @click="bianjiitem(plan.length)"
                    >
                      添加
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline brown lighten-3">
                      <v-btn text color="#ffffff">
                        <h2>编辑计划内容</h2>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-row class="ml-4">
                        <v-col cols="3" class="text_form title">
                          截止时间：
                        </v-col>
                        <v-col>
                          <input type="date" v-model="curdate" />
                        </v-col>
                      </v-row>
                      <v-row class="ml-4">
                        <v-col cols="3" class="text_form title">
                          计划内容：
                        </v-col>
                        <v-col>
                          <v-textarea
                            v-model="curcontent"
                            placeholder="输入您的计划内容"
                            solo
                          ></v-textarea>
                        </v-col>
                      </v-row>
                      <v-row class="ml-4">
                        <v-col cols="3" class="text_form title">
                          是否完成：
                        </v-col>
                        <v-col>
                          <v-radio-group
                            v-model="curifSuccess"
                            hide-details
                            row
                          >
                            <v-radio
                              label="是"
                              value="是"
                              color="brown"
                            ></v-radio>
                            <v-radio
                              label="否"
                              value="否"
                              color="brown"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                      <v-row class="ml-4">
                        <v-col cols="3" class="text_form title">
                          自评分数：
                        </v-col>
                        <v-col>
                          <v-text-field
                            solo
                            v-model="curscore"
                            hide-details
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-spacer></v-spacer>
                        <v-btn color="#b88b8b" dark @click="bianjisuccess">
                          完成
                        </v-btn>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in plan" :key="index">
              <td>{{ item.date }}</td>
              <td>{{ item.content }}</td>
              <td>{{ item.ifSuccess }}</td>
              <td>{{ item.score }}</td>
              <td>
                <abbr title="编辑" style="text-decoration: none">
                  <i
                    class="iconfont icon-comment-single"
                    @click="bianjiitem(index)"
                  ></i>
                </abbr>
                <abbr title="删除" style="text-decoration: none">
                  <i
                    class="iconfont icon-RectangleCopy6"
                    @click="deleteitem(index)"
                  ></i>
                </abbr>
              </td>
            </tr>
          </tbody>
          <v-snackbar v-model="snackbar" :timeout="timeout" centered>
            {{ totasttext }}
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="confirmdelete">
                确定
              </v-btn>
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                取消
              </v-btn>
            </template>
          </v-snackbar>
        </template>
      </v-simple-table>
    </v-col>
    <Echarts class="charts" ref="mychild1"></Echarts>
    <Echartspie class="charts" ref="mychild2"></Echartspie>
  </v-row>
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
      curdate: "",
      curcontent: "",
      curifSuccess: "是",
      curscore: "",
      curindex: "",
      totasttext: "是否确定删除？",
      snackbar: false,
      timeout: -1,
    };
  },
  components: {
    Echarts,
    Echartspie,
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
        id: "",
      });
      var token = sessionStorage.getItem("token");
      var userinsertplaninfo = {
        token: token,
        date: iteminfo["date"],
        content: iteminfo["content"],
        ifSuccess: iteminfo["ifSuccess"],
        score: iteminfo["score"],
      };
      var _this = this;
      axiosinsertplan(userinsertplaninfo, (IfinsertSuccess) => {
        if (IfinsertSuccess == "1") console.log("插入一条计划成功！");
        else console.log("插入失败");
        _this.getplan();
      });
    },
    deleteitem(index) {
      this.snackbar = true;
      this.curindex = index;
    },
    confirmdelete() {
      this.snackbar = false;
      var token = sessionStorage.getItem("token");
      var deleteplaninfo = {
        token: token,
        id: this.plan[this.curindex]["id"],
      };
      axiosdeleteplan(deleteplaninfo, (IfDelete) => {
        if (IfDelete == 1) console.log("删除成功！");
        else console.log("删除失败");
        this.getplan();
      });
    },
    getplan() {
      var cmp = function (obj1, obj2) {
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
        token: token,
      };
      axiosgetplan(userplaninfo, (tmpplan) => {
        tmpplan = tmpplan.sort(cmp);
        this.plan = tmpplan;
        var scoregroup = [];
        var dategroup = [];
        var countyes = 0;
        var countno = 0;
        for (var i = 0; i < this.plan.length; i++) {
          if (this.plan[i]["date"] <= currentdate) {
            if (this.plan[i]["score"] == "") this.plan[i]["score"] = 0;

            scoregroup.push(this.plan[i]["score"]);
            dategroup.push({ date: this.plan[i]["date"], index: i });
            if (this.plan[i]["ifSuccess"] == "是") countyes++;
            else {
              this.plan[i]["ifSuccess"] = "否";
              countno++;
            }
          }
        }

        dategroup = dategroup.sort(cmp);
        var curscoregroup = [];
        var curdategroup = [];
        for (i = 0; i < dategroup.length; i++) {
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
    bianjiitem(index) {
      this.isShowplanbianji = true;
      this.curindex = index;
      if (this.curindex != this.plan.length) {
        this.curdate = this.plan[index]["date"];
        this.curcontent = this.plan[index]["content"];
        this.curifSuccess = this.plan[index]["ifSuccess"];
        this.curscore = this.plan[index]["score"];
      }
    },
    bianjisuccess() {
      if (this.curindex == this.plan.length) {
        var iteminfo = {
          date: this.curdate,
          content: this.curcontent,
          ifSuccess: this.curifSuccess,
          score: this.curscore,
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
          id: this.plan[this.curindex]["id"],
        };
        axiosupdateplan(userupdareplaninfo, (IfUpdate) => {
          if (IfUpdate == 1) console.log("编辑成功！");
          else console.log("编辑失败");
          this.getplan();
        });
      }
      this.clear();
    },
    clear() {
      this.curdate = "";
      this.curcontent = "";
      this.curifSuccess = "";
      this.curscore = 0;
    },
  },
};
</script>


<style scoped>
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
.text_form {
  color: #b88b8b;
  font-weight: bold;
}
</style>