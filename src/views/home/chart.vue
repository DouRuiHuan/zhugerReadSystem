<template>
  <div class="chart">
    <div class="left">
      <p class="gray">{{ chartId === 'echartContainer1'?'本周新增用户总数':'本周阅读关卡总数' }}</p>
      <p class="black">10000</p>
      <p class="gray" style="margin-bottom:60px;"><i class="el-icon-caret-top"/>10% 上周同比</p>
      <p class="gray">{{ chartId === 'echartContainer2'?'本周活跃用户总数':'本周阅读时长总数' }}</p>
      <p class="black">10000</p>
      <p class="gray"><i class="el-icon-caret-top"/>10% 上周同比</p>
    </div>
    <div class="right">
      <div :id="chartId" style="width:100%; height:300px"/>
    </div>
  </div>
</template>
<script>
// var echarts = require('echarts/lib/chart/bar')
var echarts = require('echarts')
export default {
  props: ['chartId'],
  data() {
    return {

    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(this.chartId))
    // 绘制图表
    myChart.setOption({
      color: ['#5B9BD5', '#ED7D31'],
      tooltip: {
        // trigger: 'axis'
      },
      legend: {
        // data: ['蒸发量', '降水量']
      },
      // toolbox: {
      //   show: true,
      //   feature: {
      //     dataView: { show: true, readOnly: false },
      //     magicType: { show: true, type: ['line', 'bar'] },
      //     restore: { show: true },
      //     saveAsImage: { show: true }
      //   }
      // },
      // calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
      ],
      yAxis: [
        {
          // type: 'value'
        }
      ],
      series: [
        {
          // name: '蒸发量',
          type: 'bar',
          barWidth: 8,
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          // name: '降水量',
          type: 'bar',
          barWidth: 8,
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        }
      ]
    })
  }
}
</script>
<style scoped>
    .chart{
      width: 98%;
      box-shadow: 0 0 20px #ccc;
      display: flex;
    }
    .left{
      width: 16%;
      border-right: 1px solid #efefef;
      padding:20px 0px 20px 0px;
    }
    .right{
      width:84%;
    }
    p{
      height: 30px;
      font-size: 14px;
      text-align: center;
      margin:0 10px;
    }
    .gray{
      color:#999
    }

</style>

