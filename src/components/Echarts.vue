<template>
  <div>
    <div id="echarts" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: "Echarts",
  computed: {
    x_data() {
      return this.$store.state.plandate;
    },
    y_data() {
      return this.$store.state.planscore;
    }
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("echarts"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          //标题组件
          text: "自评分数柱形图"
        },
        tooltip: {}, //提示框组件
        legend: {
          //图例组件，展现了不同系列的标记(symbol)，颜色和名字
          data: ["自评分数"]
        },
        xAxis: {
          data: this.x_data
        },
        yAxis: {},
        series: [
          {
            name: "自评分数",
            type: "bar", //.series:系列列表。每个系列通过 type 决定自己的图表类型。type=line ——-折线图 type=bar ——-柱状图 type=pie ——-饼图
            data: this.y_data,
            color: "pink"
          },
          {
            name: "自评分数",
            type: "line", //.series:系列列表。每个系列通过 type 决定自己的图表类型。type=line ——-折线图 type=bar ——-柱状图 type=pie ——-饼图
            data: this.y_data,
            color: "blue"
          }
        ]
      };

      // // 使用刚指定的配置项和数据显示图表。
      //   myChart.setOption(option,true);
          
      //   //清空画布，防止缓存
      //   myChart.clear();
       //使用刚指定的配置项和数据显示图表。
        myChart.setOption(option,true);
    }
  },
  mounted() {
    this.myEcharts();
  }
};
</script>

<style>
</style>
