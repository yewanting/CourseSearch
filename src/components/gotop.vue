<template>
    <!-- 返回顶部的组件 -->
     <div id="gotop" @click="gotopclick">
        <img src="../../static/images/gotop.png" alt="gotop">
    </div>
</template>

<script>
export default {

    mounted(){
    window.addEventListener("scroll",this.handle)
    },
     destroyed() {
    window.removeEventListener("scroll",this.handle)
     },
    // 向上gotop
    methods:{
        handle(){
        var oTop = document.body.scrollTop || document.documentElement.scrollTop
          if(oTop>100){
            // 当滚动条滑动距离大于100，则显示
              gotop.style.display = "block"
          }else
          { 
              //否则不显示
              gotop.style.display = "none"
          }
        },
        gotopclick(){        
            //点击平滑返回顶部 
            window.scrollTo({
            top:0,
            behavior:"smooth"
            })                 
        }
    }
    
}
</script>


<style scoped>
/* 返回顶部的右下角的样式 */
#gotop{
    position:fixed;  /*先固定在右下角且不让它显示出来 */
    display:none;
    right:0;
    bottom:0;
}
#gotop img{
    width: 70px;
    height: 150px;
}
#gotop img:hover{
    cursor: pointer;
}
</style>