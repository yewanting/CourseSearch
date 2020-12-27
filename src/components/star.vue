<template>
        <Goods></Goods>
</template>

<script>
import Goods from "@/components/Goods.vue";
import axiosselectuserstar from "@/axios/axiosselectuserstar.js";
export default {
    data() {
    return {
      username: ""
    };
  },
    components: {
    Goods, //商品列表
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
}
</script>


<style scoped>

</style>