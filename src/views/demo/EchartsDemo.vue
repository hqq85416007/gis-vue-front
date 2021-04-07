<template>
  <div class="echarts-demo">
      <h1>框架中使用echarts表格参考src/views/demo/EchartsDemo.vue文件</h1>
    <div id="demo" style="width:600px;height:400px"></div>
  </div>
</template>
<script>
import { getEcharsData } from "@/api/demo/demo.js";
export default {
  name: "EchartsDemo",
  data() {
    return {
      data: null
    };
  },
  methods: {
    drawChart() {
      getEcharsData().then(res => {
        this.data = res.data;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("demo"));
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          legend: {
            data: ["销量"]
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: this.data
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      });
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>
<style scoped>
</style>