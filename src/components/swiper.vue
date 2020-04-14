<template>
    <div class="swiper-container" id = "swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(slide,index) in slides" :key="index">
                <img :src= slide>
            </div>
            <!-- <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div> -->
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <!-- <div class="swiper-button-prev"></div> -->
        <!-- <div class="swiper-button-next"></div> -->
        <!-- 如果需要滚动条 -->
        <!-- <div class="swiper-scrollbar"></div> -->
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
    props:{
        slides:{}
    },
    data(){
        return {
            mySwiper:null
        }
    },
    mounted(){  //要在mouted时候引入
        this.initData();
    },
    methods:{
        initData(){
            this.mySwiper = new Swiper('#swiper',{
                loop:true,
                pagination:'.swiper-pagination',
                autoplay:3000,
                paginationClickable:true
            })
        }
    }

}
</script>


<style scoped>
.swiper-container{      /*轮播图最外部的样式 */
    width:100%;
    height:300px;
    background-color:#ffffff;
    border-radius: 10px;
    margin-top: 10px;

}
.swiper-slide img{      /*轮播图照片的样式 */
    width: 100%;
    height: 300px;
}
</style>