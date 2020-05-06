<template>
  <div class="divform">
    <!--添加商品-->
    <Goods></Goods>

   
    <!--添加返回顶部-->
    <gotop></gotop>
  </div>
</template>

<script>
import Goods from "@/components/Goods.vue";
import gotop from "@/components/gotop.vue";

import axiosselectuserstar from "@/axios/axiosselectuserstar.js";
export default {
  data() {
    return {
      username: ""
    };
  },
  components: {
    Goods, //商品列表
    gotop, //返回顶部

  },
  created() {
    var token = sessionStorage.getItem("token");
      var userstarinfo = {
        token: token
      };
    axiosselectuserstar(userstarinfo,result=>{
        this.$store.state.goodsdata = result
    })
  },

  mounted() {
    /*监听滑动块移动的距离，并判断是否固定顶部栏 */
    window.addEventListener("scroll", this.handleScroll);
  },
  /*移除监听滑动块 */
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      //scrollTop表示垂直滚动的距离
      let scrollTop =
        window.pageYOffset || //pageYOffset 设置或返回当前页面相对于窗口显示区左上角的 Y 位置
        document.documentElement.scrollTop || //要获取当前页面的滚动条纵坐标位置,documentElement 对应的是 html 标签
        document.body.scrollTop; //body 对应的是 body 标签。
      //所有主流浏览器都支持 pageXOffset 和 pageYOffset 属性。
      //IE 8 及 更早 IE 版本不支持该属性,但可以使用 document.documentElement.scrollLeft
      //和 document.documentElement.scrollTop 属性
      // const offsetTop = document.querySelector('#head').offsetTop
      // querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。

      if (scrollTop >= 100) {
        this.isFixed = true; //滑动超过100固定
      } else {
        this.isFixed = false; //滑动没超出100不固定
      }
    },

   
  }
};
</script>

<style scoped>



</style>