<template>
  <div>
    <!-- 上面的文字 -->
    <!-- <div class="top">
      <p>筛选商城：</p>
    </div> -->
    <!-- 下面的选项， 可多选 -->
    <div class="bottom">
      <div @click="selectAll">
        全选
      </div>
      <ul>

        <li>
          <div class="text">中国大学MOOC</div>
          <!-- <img :src="websitelogo[0].logo"> -->
          <div id="love0" > 
          <input  @click="num0"
            type="checkbox"
            class="checkform"
            :value="websitelogo[0].value"
            v-model="checkname"
            @change="changvalue"
          />
          </div>
        </li>
        <li>
          <div class="text">网易云课堂</div>
          <!-- <img :src="websitelogo[1].logo"> -->
          <div id="love1"> 
          <input @click="num1"
            type="checkbox"
            class="checkform"
            :value="websitelogo[1].value"
            v-model="checkname"
            @change="changvalue"
          />
          </div>
        </li>
        <li>
          <div class="text">CSDN</div>
          <!-- <img :src="websitelogo[2].logo"> -->
          <div id="love2"> 
          <input @click="num2"
            type="checkbox"
            class="checkform"
            :value="websitelogo[2].value"
            v-model="checkname"
            @change="changvalue"
          />
          </div>
        </li>
        <li>
          <div class="text">慕课网</div>
          <!-- <img :src="websitelogo[3].logo"> -->
          <div id="love3"> 
          <input @click="num3"
            type="checkbox"
            class="checkform"
            :value="websitelogo[3].value"
            v-model="checkname"
            @change="changvalue"
          />
          </div>
        </li>
        <li>
          <div class="text">学而思网校</div>
          <div id="love4"> 
          <input @click="num4"
            type="checkbox"
            class="checkform"
            :value="websitelogo[4].value"
            v-model="checkname"
            @change="changvalue"
          />
          </div>
        </li>
        <li>
          <div class="text">沪江网校</div>
          <!-- <img :src="websitelogo[5].logo"> -->
          <div id="love5"> 
          <input @click="num5"
            type="checkbox"
            class="checkform"
            :value="websitelogo[5].value"
            v-model="checkname"
            @change="changvalue"
          />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axiospostsearch from "@/axios/axiosgetcourse.js"; //引入axios获得的课程
import axiosgetcount from "@/axios/axiosgetcount.js"; //引入axios获得的课程总数
export default {
  data() {
    return {
      websitelogo: [
        { logo: "../../static/images/MOOC.png", value: "中国大学MOOC" },
        { logo: "../../static/images/wangyiyunketang.png",value: "网易云课堂"},
        { logo: "../../static/images/csdn.png", value: "CSDN" },
        { logo: "../../static/images/computermooc.png", value: "计算机慕课网" },
        { logo: "../../static/images/xueersi.png", value: "学而思网校" },
        { logo: "../../static/images/lujiangwangxiao.png", value: "沪江网校" }
      ],
      checkname: [], //获得选择哪些网站
      count0:0,
      count1:0,
      count2:0,
      count3:0,
      count4:0,
      count5:0,
    };
  },


  methods: {
    changvalue() {
      //监听多选框的值是否改变，改变了则传给state

      this.$store.commit("SEARCHWEBSITE", this.checkname);
      this.axiosgetpage1();//将分页置于第一页，并且获取分页第一页的课程和课程总的数量
    },
    num0(){
      if(this.count0===0)
      {
        document.getElementById("love0").setAttribute("style","background-image:url('../../static/images/gou.png')")
        this.count0++;
      }else{
        document.getElementById("love0").setAttribute("style","background-image:url('../../static/images/kuang.png')")
        this.count0--;
      }
      
    },
    num1(){
      if(this.count1===0)
      {
        document.getElementById("love1").setAttribute("style","background-image:url('../../static/images/gou.png')")
        this.count1++;
      }else{
        document.getElementById("love1").setAttribute("style","background-image:url('../../static/images/kuang.png')")
        this.count1--;
      }
      
    },
    num2(){
      if(this.count2===0)
      {
        document.getElementById("love2").setAttribute("style","background-image:url('../../static/images/gou.png')")
        this.count2++;
      }else{
        document.getElementById("love2").setAttribute("style","background-image:url('../../static/images/kuang.png')")
        this.count2--;
      }
      
    },
    num3(){
      if(this.count3===0)
      {
        document.getElementById("love3").setAttribute("style","background-image:url('../../static/images/gou.png')")
        this.count3++;
      }else{
        document.getElementById("love3").setAttribute("style","background-image:url('../../static/images/kuang.png')")
        this.count3--;
      }
      
    },
      num4(){
      if(this.count4===0)
      {
        document.getElementById("love4").setAttribute("style","background-image:url('../../static/images/gou.png')")
        this.count4++;
      }else{
        document.getElementById("love4").setAttribute("style","background-image:url('../../static/images/kuang.png')")
        this.count4--;
      }
      
    },
    num5(){
      if(this.count5===0)
      {
        document.getElementById("love5").setAttribute("style","background-image:url('../../static/images/gou.png')")
        this.count5++;
      }else{
        document.getElementById("love5").setAttribute("style","background-image:url('../../static/images/kuang.png')")
        this.count5--;
      }
      
    },
    selectAll() {
      document.getElementById("love0").setAttribute("style","background-image:url('../../static/images/gou.png')")
      document.getElementById("love1").setAttribute("style","background-image:url('../../static/images/gou.png')")
      document.getElementById("love2").setAttribute("style","background-image:url('../../static/images/gou.png')")
      document.getElementById("love3").setAttribute("style","background-image:url('../../static/images/gou.png')")
      document.getElementById("love4").setAttribute("style","background-image:url('../../static/images/gou.png')")
      document.getElementById("love5").setAttribute("style","background-image:url('../../static/images/gou.png')")
      this.count0=1;
      this.count1=1;
      this.count2=1; 
      this.count3=1;
      this.count4=1;
      this.count5=1;
      //全选按钮
      var flag = 0;
      if (this.checkname.length !== 6) {
        for (var i = 0; i < this.websitelogo.length; i++) {
          flag = 0;
          for (var j = 0; j < this.checkname.length; j++) {
            if (this.websitelogo[i]["value"] == this.checkname[j])
              //如果已经选了
              flag = 1; //标记选了
          }
          if (flag == 0)
            //如果还没选，就选入
            this.checkname.push(this.websitelogo[i]["value"]);
        }
        this.$store.commit("SEARCHWEBSITE", this.checkname);
      }

      this.axiosgetpage1();//将分页置于第一页，并且获取分页第一页的课程和课程总的数量
    },
    axiosgetpage1(){//将分页置于第一页，并且获取分页第一页的课程和课程总的数量

      //将分页置于第一页
      this.$store.commit('CURPAGE',1);

      //获取选中商品的参数
      axiospostsearch(
        {
          searchtext: this.$store.state.searchText,
          curpage: 1,   //获取第一页商品的数据
          pagesize: this.$store.state.pagesize,
          searchwebsite: this.$store.state.searchwebsite,
          isFree: this.$store.state.isFree,
          isSort: this.$store.state.isSort,
          minprice: this.$store.state.minprice,
          maxprice: this.$store.state.maxprice
        },
        goodsdata => {
          //将字符串转为JSON对象
          this.$store.state.goodsdata = JSON.parse(goodsdata);
        }
      );
      axiosgetcount(
        {
          searchtext: this.$store.state.searchText,
          curpage: 1,
          pagesize: this.$store.state.pagesize,
          searchwebsite: this.$store.state.searchwebsite,
          isFree: this.$store.state.isFree,
          isSort: this.$store.state.isSort,
          minprice: this.$store.state.minprice,
          maxprice: this.$store.state.maxprice
        },
        goodscount => {
          this.$store.state.goodscount = goodscount["COUNT(*)"];
          //获取课程总数
          var tmppagerstotal = goodscount["COUNT(*)"];
          var tmppagersize = this.$store.state.pagesize;
          //获取页数
          var tmppagers = Math.ceil(tmppagerstotal / tmppagersize);

          this.$store.commit("PAGERSTOTAL", tmppagerstotal);
          this.$store.commit("PAGERS", tmppagers);

          //分页
          var li = [];
          var tmpcurpage = this.$store.state.curpage;
          for (
            var i = Math.max(1, tmpcurpage - 2);
            i <=
            Math.min(
              tmpcurpage + (tmpcurpage < 3 ? 5 - tmpcurpage : 2),
              tmppagers
            );
            i++
          ) {
            li.push(i);
          }
          if (li.length === 0) {
            li.push(1);
          }
          this.$store.commit("SHOWPAGERS", li);
        }
      );
    }
  }
};
</script>

<style scoped>
.top {
  /*搜索页面上面网站选择那里的上面：“筛选商城”的样式*/
  clear: both;
  font-size: 15px;
  border: 1px solid white;
  border-top-color: rgb(199, 198, 198);
  box-sizing: border-box;
  font-weight: bolder;
}

.bottom {
  /*搜索页面上面网站选择那里的下面，全选按钮与logo和checkbox的最外部样式*/
  margin-top: 20px;
  padding-top: 20px;
  clear: both;
  border: 1px solid white;
  border-top-color: rgb(199, 198, 198);
  font-size: 15px;
  border-bottom-color: rgb(199, 198, 198);
  /* margin-bottom: 20px; 全选按钮与logo和checkbox距离下面的边框的距离 */
  padding-bottom: 10px; /*下面边框距离选择按钮部分的距离 */
}

.bottom div {
  margin-right: 50px;
  padding: 0;
  text-align: center;
  padding-top: 5px;
  float: left;
  width: 60px;
  height: 30px;
  border-radius: 50px;
  background-color: rgb(253, 235, 235);
  color: red;
  font-weight: bolder;
  font-size: 18px;
}
.bottom div:hover {
  cursor: pointer;
  opacity: 0.8;
}
.bottom ul {
  /*logo和checkbox的外部ul的样式*/
  margin: 0;
  padding: 0;
  list-style: none;
  display: table;
}
.bottom li {
  /*单个logo和checkbox外部li的样式 */
  display: table-cell;
  /* width: 20%; */
}


.bottom ul .text{
  text-align: right;
  width: 120px;
  float: left;
  margin-top: 4px;
  font-size: 15px;
  color: #b88b8b;
  background-color: #ffffff;
  margin-right: 0;
}
li #love0{
  margin-top:5px;
  float: left;
  width: 25px;
  height: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("../../static/images/kuang.png");
}
li #love0:hover{
  margin-top:5px;
  width: 25px;
  height: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("../../static/images/gou.png");
}
li #love1{
  margin-top:5px;
  float: left;
  width: 25px;
  height: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("../../static/images/kuang.png");
}
li #love1:hover{
  margin-top:5px;
  width: 25px;
  height: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("../../static/images/gou.png");
}
li #love2{
  margin-top:5px;
  float: left;
  width: 25px;
  height: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("../../static/images/kuang.png");
}
li #love2:hover{
  margin-top:5px;
  width: 25px;
  height: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("../../static/images/gou.png");
}
li #love3{
  margin-top:5px;
  float: left;
  width: 25px;
  height: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("../../static/images/kuang.png");
}
li #love3:hover{
  margin-top:5px;
  width: 25px;
  height: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("../../static/images/gou.png");
}
li #love4{
  margin-top:5px;
  float: left;
  width: 25px;
  height: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("../../static/images/kuang.png");
}
li #love4:hover{
   margin-top:5px; 
  width: 25px;
  height: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("../../static/images/gou.png");
}
li #love5{
  margin-top:5px;
  float: left;
  width: 25px;
  height: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("../../static/images/kuang.png");
}
li #love5:hover{
  margin-top:5px;
  width: 25px;
  height: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  background-image: url("../../static/images/gou.png");
}
/* .cform{
   background-image: url("../../static/images/checked.png");
} */
li .checkform {
  /*logo旁边单个checkbox的样式 */
  width: 20px;
  height: 20px;
  margin-right: 30px;
  opacity: 0;
}
li .checkform:hover {
  opacity: 0;
  cursor: pointer;
}
</style>