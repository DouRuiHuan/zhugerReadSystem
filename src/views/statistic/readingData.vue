<template>
  <div>
    <myNav :bread="routerData"/>
    <div class="search_box" style="padding-left:30px;">
      <el-radio-group v-model="tabPosition" >
        <el-radio-button label="1">7天</el-radio-button>
        <el-radio-button label="2">14天</el-radio-button>
        <el-radio-button label="3">30天</el-radio-button>
      </el-radio-group>
      <date-picker/>
      <table class="table_box">
        <tr>
          <th>0</th>
          <th>0</th>
          <th>0</th>
          <th>0</th>
          <th>0</th>
          <th>0</th>
        </tr>
        <tr>
          <td>阅读数</td>
          <td>过关数</td>
          <td>向父母提问数</td>
          <td>父母答题数</td>
          <td>奖励碎片数</td>
          <td>付费阅读订单</td>
        </tr>
      </table>
      <p>
        <el-radio-group v-model="tabPosition2" style="margin-bottom: 15px;">
          <el-radio-button label="1">阅读数</el-radio-button>
          <el-radio-button label="2">过关数</el-radio-button>
          <el-radio-button label="3">奖励碎片数</el-radio-button>
          <el-radio-button label="4">付费阅读订单</el-radio-button>
        </el-radio-group>
      </p>
      <div class="echart_box">
        <span style="display:inline-block;padding:10px 0 0 10px;">趋势图</span>
        <div id="myEchart" style="width:100%; height:300px"/>
      </div>
      <p class="download">下载Excel表格</p>
      <!-- <div class="table-page"> -->
      <my-table
        :list="list"
        :options="options"
        :columns="columns"
        :operates="operates"
        :pagination="ruleForm"
        :show-operates="false"
        style="width:97%"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
      <!-- </div> -->
    </div>
  </div>

</template>
<script>
var echarts = require('echarts')
import datePicker from '@/components/datePicker'
import myTable from '@/components/myTable'
export default {
  components: { datePicker, myTable },
  data() {
    return {
      ruleForm: {},
      routerData: {
        content: []
      },
      tabPosition: 1,
      tabPosition1: 1,
      tabPosition2: 1,
      list: [], // table数据
      operates: {},
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      }, // table 的参数
      columns: [
        {
          prop: 'title',
          label: '时间',
          align: 'center'
        },
        {
          prop: 'title',
          label: '阅读数',
          align: 'center'
        },
        {
          prop: 'title',
          label: '过关数',
          align: 'center'
        },
        {
          prop: 'title',
          label: '付费阅读订单',
          align: 'center'
        },
        {
          prop: 'title',
          label: '奖励碎片数',
          align: 'center'
        },

        {
          prop: 'title',
          label: '向父母提问',
          align: 'center'
        },
        {
          prop: 'title',
          label: '父母答题数',
          align: 'center'
        }
      ]
    }
  },
  created() {

  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('myEchart'))
    // 绘制图表
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 3340, 1290, 3330, 1320],
        type: 'line',
        itemStyle: {
          normal: {
            color: '#61A665', // 折线点的颜色
            lineStyle: {
              color: '#61A665'// 折线的颜色
            }
          }
        }
      }]

    })
  },
  methods: {
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>
<style scoped>
  /deep/ .el-radio-button__inner{
    padding:8px 30px;
  }
  .table_box{
      text-align:center;
      border-spacing:0;
      border-collapse:0;
      margin:15px 0;
      background:#efefef;
      padding:13px 0;
    }
    .table_box th,.table_box td{
      border-right:1px solid #999;
      width:150px;
      line-height: 25px;
      font-size: 16px;
      color:#333;
      border-left:0;
    }
    .table_box th:last-child,.table_box td:last-child{
      border-right:none;
    }
    .echart_box{
      width:97%;
      border:1px solid #ccc;
    }
    .download{
      width: 97%;
      line-height:40px;
      text-align:right;
      padding-right:50px;
      color:#4e8afd;
      font-size:14px;
    }
</style>

