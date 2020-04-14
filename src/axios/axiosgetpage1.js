var axiospostsearch = require('./axiosgetcourse')  //引入axios获得的课程
var axiosgetcount = require('./axiosgetcount'); //引入axios获得的课程总数


function axiosgetpage1(){
    this.$store.commit("CURPAGE", 1);
    //搜索进来是第一页，所以curpage是1
    axiospostsearch(
      {
        searchtext: this.$store.state.searchText,
        curpage: 1,
        pagesize: this.pagesize,
        searchwebsite: this.$store.state.searchwebsite,
        isFree: this.$store.state.isFree,
        isSort: this.$store.state.isSort,
        minprice: this.$store.state.minprice,
        maxprice: this.$store.state.maxprice
      },
      goodsdata => {
        //将字符串转为JSON对象
        this.$store.state.goodsdata = JSON.parse(goodsdata);
        this.$store.commit('ISSHOWPAGER',true);
        // this.$store.state.isShowpager = true;
      }
    );
    // this.$store.commit('CURPAGE',this.curpage);
    // this.$store.commit('PAGESIZE',this.pagesize);
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
        // console.log(this.$store.state.pagerstotal);
    
        //分页
        var li = [];
        var tmpcurpage = this.$store.state.curpage;
        for (
          var i = Math.min(Math.max(1, tmpcurpage - 2), tmppagers);
          i <=
          Math.min(
            tmpcurpage + (tmpcurpage < 3 ? 5 - tmpcurpage : 2),
            tmppagers
          );
          i++
        ) {
          li.push(i);
        }
        if (li.length == 0) li.push(1);
    
        this.$store.commit("SHOWPAGERS", li);
      }
    );
}

module.exports = axiosgetpage1
