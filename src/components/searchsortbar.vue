<template>
  <div class="divform">
    <!--商品排序选项按钮栏-->
    <div class="isFree">
      <!--单选按钮，免费课程和付费课程选一个，位于头部左侧-->
      <ul>
        <li @click="free" id = "free">
          <div>免费课程</div>
        </li>
        <li @click="nofree" id="unfree">
          <div>付费课程</div>
        </li>
      </ul>
    </div>
    <div
      class="selsortbtn" :class="cur===index?'selected':''"
      v-for="(selsortitems,index) in selsort"
      :key="index"
      @click="sortselect(index)"
    >
      <!--一系列按钮：综合、价格从低到高、价格从高到底，销量从高到低-->
      {{selsortitems}}
    </div>
    <div class="selsegmen">
      <!--价格区间选项，最低价到最高价，以及一个确定按钮，填完区间后按确定按钮-->
      <div class="segment">
        价格
        <!-- 最低价 -->
        <input type="text" v-model="minprice" id="minval" placeholder="￥" class="price" @change="ifvalue"/>
        -
        <!-- 最高价 -->
        <input type="text" v-model="maxprice" id="maxval" placeholder="￥" class="price" @change="ifvalue" />
      </div>
      <div id = "confirmbtn" @click="segmentcofirm">
        <!--确定按钮-->
        确定
      </div>
    </div>
  </div>
</template>

<script>
import axiospostsearch from "@/axios/axiosgetcourse.js"; //引入axios获得的课程
import axiosgetcount from "@/axios/axiosgetcount.js"; //引入axios获得的课程总数
export default {
  data() {
    return {
      selsort: [
        //商品排序选项按钮栏的按钮名字
        "综合",
        "价格从低到高",
        "价格从高到低",
        "销量从高到低"
      ],
      minprice: "", //最低价
      maxprice: "" ,//最高价
      cur:0,

     
    };
  },
  computed:{
    searchText(){
      return this.$store.state.searchText
    }
  },
  watch:{
    searchText:function(){
     
       document.getElementById("free").setAttribute("class","unchecked");
       document.getElementById("unfree").setAttribute("class","unchecked");
       document.getElementById("confirmbtn").setAttribute("class","unchecked");
    }
  },
  methods: {
    free() {
      if(!(this.minprice!==""&&this.maxprice!==""))
      {
        document.getElementById("free").setAttribute("class","checked");
        document.getElementById("unfree").setAttribute("class","unchecked");
        document.getElementById("confirmbtn").setAttribute("class","unchecked");
      }
      this.$store.commit("ISFREE", 0); //0表示免费课程
      this.axiosgetpage1();//将分页置于第一页，并且获取分页第一页的课程和课程总的数量
    },
    nofree() {
      if(!(this.minprice!==""&&this.maxprice!==""))
      {
        document.getElementById("free").setAttribute("class","unchecked");
        document.getElementById("unfree").setAttribute("class","checked");
        document.getElementById("confirmbtn").setAttribute("class","unchecked");
      }

      this.$store.commit("ISFREE", 1); //1表示付费课程
      this.axiosgetpage1();//将分页置于第一页，并且获取分页第一页的课程和课程总的数量
    },
    sortselect(index) {
      this.cur = index;
      this.$store.commit("ISSORT", index); //0表示综合，1表示价格从di到高，2表示价格从高到低，3表示销量从高到底
      this.axiosgetpage1();//将分页置于第一页，并且获取分页第一页的课程和课程总的数量
    },
    segmentcofirm() {
      if(this.minprice!==""&&this.maxprice!=="")
      {
      document.getElementById("free").setAttribute("class","unchecked");
      document.getElementById("unfree").setAttribute("class","unchecked");
      document.getElementById("confirmbtn").setAttribute("class","checked");
      }
      this.$store.commit("MINPRICE", this.minprice); //把最小值传给vuex的mutations进一步修改state
      this.$store.commit("MAXPRICE", this.maxprice); //把最大值传给vuex的mutations进一步修改state
      this.axiosgetpage1();//将分页置于第一页，并且获取分页第一页的课程和课程总的数量
    },
    ifvalue(){
      if(this.minprice!==""&&this.maxprice!=="")
      {
         document.getElementById("confirmbtn").setAttribute("style","cursor:pointer")
      }else
      {
         document.getElementById("confirmbtn").setAttribute("class","unchecked")
         document.getElementById("confirmbtn").setAttribute("style","cursor:no-drop")
      }
        this.$store.commit("MINPRICE", this.minprice); //把最小值传给vuex的mutations进一步修改state
      this.$store.commit("MAXPRICE", this.maxprice); //把最大值传给vuex的mutations进一步修改state
    },
    axiosgetpage1(){
      
       this.$store.commit('CURPAGE',1);

      //获取选中商品的参数
      axiospostsearch(
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
.divform {
  /*商品排序选项按钮栏的样式 */
  width: 100%;
  height: 80px;
  clear: both;
  margin: 0;
  padding: 0;
}
.divform .isFree {
  /*商品排序选项按钮栏左侧-单选按钮(免费和付费课程选项)的样式*/
  margin: 0;
  padding: 0;
  float: left;
}
.divform ul {
  /*商品排序选项按钮栏左侧-单选按钮(免费和付费课程选项)外部ul的样式*/
  margin-right: 40px;
  list-style: none;
}
.divform ul li {
  /*商品排序选项按钮栏左侧，单个按钮外部li的样式*/
  text-align: center;
  margin-top: 4px;
  font-size: 12px;
  border: 1px solid rgb(206, 200, 200);
  width: 90px;
  height: 25px;
  border-radius: 20px;
  color: #b88b8b;

}
.divform ul li:hover {
  font-weight: bold;
  cursor: pointer;
}
.divform ul li div{
  margin-top: 4px;
}
.checked{
  background-color:#f8fdf1 ;
  font-weight: bold;
}
.unchecked{
  background-color: white;
  color: #b88b8b ;
}
.divform .selsortbtn {
  /* 商品排序选项按钮中间 一系列按钮（综合，价格，销量）的样式*/
  margin-top: 30px;
  margin-right: 20px;
  float: left;
  height: 15px;
  padding-top: 4px;
  text-align: center;
  color: rgb(155, 145, 145);
  font-size: 13px;
  width: auto;
  margin-right: 30px;
}
.divform .selsortbtn:hover {
  cursor: pointer;
  border: 1px solid white;
  color: #b88b8b;
  font-weight: bolder;
}
.divform .selected{
  color: #b88b8b;
  font-weight: bolder;
}
.divform .selsegmen {
  /* 价格区间外部的样式包括确认按钮 */
  margin-top: 20px;
  float: right;
  margin-right: 20px;
}
.divform .segment {
  /* 价格区间外部的样式不包括确认按钮*/
  float: left;
  padding-top: 12px;
  font-size: 13px;
  width: auto;
  color: #b88b8b;
}
.divform .segment .price {
  /*价格区间“价格”二字的样式 */

  width: 60px;
  height: 12px;
}
.divform #confirmbtn {
  /* 价格区间的确认按钮样式*/
  margin-top: 9px;
  margin-left: 20px;
  float: left;
  width: 80px;
  height: 20px;
  padding-top: 4px;
  text-align: center;
  color: #b88b8b;
  font-size: 12px;
  border: 1px solid rgb(206, 200, 200);
  border-radius: 20px;
}
.divform #confirmbtn:hover {
  font-weight: bold;
  /* cursor: pointer; */
  cursor: no-drop;
}
</style>