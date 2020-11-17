<template>
    <v-row>
        <v-col cols="2" v-for="(name,index) in website" :key="index">
            <v-checkbox :label="name" color="#b88b8b" :value="name" ></v-checkbox>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data(){
        return{
        website:["中国大学MOOC","网易云课堂","CSDN","计算机慕课网","学而思网校","沪江网校"]
        }
    }
            
}
</script>

<style scoped>

</style>