<template>
<div>
<v-row v-show="list.length>0">
  <v-col cols="12">
    <RecycleScroller
    class="scroller"
    :items="list"
    :item-size="300"
    key-field="id"
    v-slot="{ item }"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <v-card class="card_form">
        <a :href="item.coursevediohref" target="_blank">
          <v-img
            class="img align-end"
            :src="item.courseimghref"
            height="120"
            lazy-src="../../public/images/zanwutupian.png"
          >
          
          </v-img>
          <v-card-title
            class="text--primary"
            dense
          >
            {{item.coursetitle}}</v-card-title
          >

        </a>
        <v-card-actions>
          <v-row justify="start" dense>
            <v-col>
              <i class="iconfont icon-RectangleCopy3"></i>
 
              <span>{{item.coursenumber}}</span>

            </v-col>
            <v-col cols="12" class="price" 
              >￥{{item.courseprice}}</v-col
            >

          </v-row>
        </v-card-actions>
      </v-card>
     </RecycleScroller>

  </v-col>
</v-row>

</div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'

export default {
  directives: { infiniteScroll },
  data () {
    return {
      list: [],
      busy: false
    }
  },
   props:["app_disco_goods"],
   watch:{
     app_disco_goods:"initValue"
   },
  methods: {
    initValue(){
      this.list = [];
      
      this.loadMore();

    },
    loadMore: function () {
      this.busy = true
      const length = this.list.length
      const maxlen = this.app_disco_goods.length
      const valuelen = Math.min(length+20,maxlen);
      for (var i = length; i < valuelen; i++) {
        this.list.push({
          id:i,
          coursevediohref:this.app_disco_goods[i]["coursevediohref"],
          courseimghref:this.app_disco_goods[i]["courseimghref"],
          coursetitle:this.app_disco_goods[i]["coursetitle"],
          coursenumber:this.app_disco_goods[i]["coursenumber"],
          courseprice:this.app_disco_goods[i]["courseprice"],
        })
      }
      this.busy = false
    },
    
  }
}
</script>

<style scoped>
.price{
   color: orangered;
}
a {
  text-decoration: none;
}
.text {
  color: #b88b8b;
}
.card_form {
  height: 100%;
  overflow: hidden;
}
.card_form:hover {
  box-shadow: 2px 2px 40px 5px gray;
}
.img:hover {
  transition: 0.6s;
  transform: scale(1.2);
}
.scroller {
  height: 800px;
}
</style>
