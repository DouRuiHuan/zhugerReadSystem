<template>
  <div>
    <myNav :bread="routerData" />
    <div class="search_box" style="padding-left:30px;">
      <div class="search_box_header">
        <span>闯关数据</span>
        <span>
          <date-picker />
        </span>
      </div>

      <p>
        <el-radio-group v-model="tabPosition2" style="margin-bottom: 15px;">
          <el-radio-button label="1">阅读关数</el-radio-button>
          <el-radio-button label="2">阅读时长</el-radio-button>
        </el-radio-group>
      </p>
      <div class="echart_box">
        <span style="display:inline-block;padding:10px 0 0 10px;">趋势图</span>
        <div id="myEchart" style="width:100%; height:300px" />
      </div>

      <el-row class="search_box_bottom">
        <el-card class="box-card">
          <span>人均关卡</span>
        </el-card>
        <el-card class="box-card">
          <span>人均闯关用时（秒）</span>
        </el-card>
        <el-card class="box-card">
          <span>人均闯关星数</span>
        </el-card>
      </el-row>

      <div class="search_box_footer">
          <el-button type="primary" @click="goLearningDetail">学习明细</el-button>
          <el-button type="primary"@click="goUserDetail">用户明细</el-button>
      </div>
    </div>
  </div>
</template>
<script>
var echarts = require("echarts");
import datePicker from "@/components/datePicker";
export default {
  components: { datePicker },
  data() {
    return {
      routerData: {
        content: []
      },
      columns: [
        {
          prop: "title",
          label: "时间",
          align: "center"
        },
        {
          prop: "title",
          label: "新增用户量",
          align: "center"
        },
        {
          prop: "title",
          label: "活跃用户量",
          align: "center"
        },
        {
          prop: "title",
          label: "日均在线时长",
          align: "center"
        },
        {
          prop: "title",
          label: "日启动次数",
          align: "center"
        },

        {
          prop: "title",
          label: "累计用户量",
          align: "center"
        },
        {
          prop: "title",
          label: "付费用户量",
          align: "center"
        },
        {
          prop: "title",
          label: "收入",
          align: "center"
        },
        {
          prop: "title",
          label: "累计收入",
          align: "center"
        }
      ]
    };
  },
  created() {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("myEchart"));
    // 绘制图表
    myChart.setOption({
      color: ["#999"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line"
        }
      },

      xAxis: [
        {
          type: "category",
          data: ["7.1", "7.1", "7.1", "7.1", "7.1", "7.1", "7.1","7.1", "7.1", "7.1", "7.1", "7.1", "7.1", "7.1"],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: "{value}k"
          }
        }
      ],
      series: [
        {
          type: "bar",
          barWidth: "60%",
          data: [10, 20, 30, 10, 40, 20, 20,10, 20, 30, 10, 40, 20, 20]
        }
      ]
    });
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    goLearningDetail(){
      this.$router.push({
        path:"/learning/learningDetail"
      })
    },
    goUserDetail(){
       this.$router.push({
        path:"/learning/userDetail"
      })
    }
  }
};
</script>
<style scoped>
/deep/ .el-radio-button__inner {
  padding: 8px 30px;
}

.search_box_header {
  height: 40px;
  margin: 0 40px 10px 0;
  border-bottom: 1px solid #ddd;
}
.search_box_header span:first-child {
  float: left;
}

.search_box_header span:last-child {
  float: right;
}

.echart_box {
  width: 97%;
  border: 1px solid #ccc;
}

/* 卡片的样式 */
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 250px;
  height: 100px;
}
.search_box_bottom{
  display: flex;
  margin: 40px 0;
}
.search_box_bottom>.box-card:first-child{
  margin-left: 100px;
}
.search_box_bottom>.box-card{
  margin-right: 200px;
}
.search_box_bottom>.box-card:last-child{
  margin-right:0;
}

.search_box_footer{
    padding: 20px 0 20px 150px;
    margin-top: 20px;
    /* border-top: 2px dashed #efefef; */
}
.search_box_footer .el-button{
  margin-left: 250px;
}
</style>

