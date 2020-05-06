<template>
  <div>
    <div id="echarts2" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'Echartspie',
  computed:{
      countyes(){
          return this.$store.state.countyes
      },
      countno(){
          return this.$store.state.countno
      }
  },
  methods:{
	  myEcharts(){
		  // 基于准备好的dom，初始化echarts实例
		  var myChart = this.$echarts.init(document.getElementById('echarts2'));
		  // 指定图表的配置项和数据
		  var option = {
			  title: {   //标题组件
                  text: '完成情况的比例图',
                  
			  },
			  tooltip: {}, //提示框组件
			  legend: { //图例组件，展现了不同系列的标记(symbol)，颜色和名字 
                  data:['完成情况'],
              },
			  series: [{
				  name: '完成情况',
				  type: 'pie', //.series:系列列表。每个系列通过 type 决定自己的图表类型。type=line ——-折线图 type=bar ——-柱状图 type=pie ——-饼图 
                  data: [
                      {value:this.countyes,name:'是'},
                      {value:this.countno,name:'否'},
                  ]
                //   color:'pink'
              }
              ]
		  };

		//   // 使用刚指定的配置项和数据显示图表。
        //   myChart.setOption(option,true);
          
        //     //清空画布，防止缓存
        //     myChart.clear();
            //使用刚指定的配置项和数据显示图表。
            myChart.setOption(option,true);
		  }
  },
  mounted() {
  	this.myEcharts();
  }
}
</script>

<style>

</style>
