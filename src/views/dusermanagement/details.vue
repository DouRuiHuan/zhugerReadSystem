<template>
  <div>
    <myNav :bread="routerData"/>
    <div class="search_box">
      <div class="part1">
        <h2>基本信息:</h2> 
        <el-row>
          <p>
            <span>手机号：</span><span>15175331451</span>
            <span>其它学员：</span><span v-color>学员1</span><span v-color>学员2</span>
          </p>
        </el-row>
        <el-row>
          <p><span>用户姓名：</span><span>我爱大语文</span></p>
        </el-row>
        <el-row>
          <p>
            <span>性别：</span><span>女</span>
            <span>年级：</span><span>小学三年级</span>
            <span>生日：</span><span>2000-6-20</span>
          </p> 
        </el-row>
        <el-row>
          <p><span>头像：</span><div></div></p>
        </el-row>
        <el-row>
          <p><span>上次登录时间：</span><span>2019-7-22 12:23:15</span></p>
        </el-row>
        <el-row>
          <p>
            <span>设备SN：</span><span>IEJG3035UD</span>
            <span>版本: </span><span>1.1.1</span>
          </p>
        </el-row>
        <el-row>
          <p>
            <span>最后阅读: </span><span>小王子\19关\60%</span>
            <span>读完的书: </span><span v-color>9本</span>
            <span>购买的书: </span><span v-color>9本</span>
          </p>
        </el-row>
      </div>
      <div class="part2">
        <h2>角色:</h2>
        <div class="up">
          <table class="table">
            <tr>
              <th>等级</th>
              <th>阅读时长(分)</th>
              <th>阅读力</th>
              <th>同伴素质力</th>
              <th>同伴数量</th>
            </tr>
            <tr>
              <td>1</td>
              <td>342</td>
              <td>12</td>
              <td>4</td>
              <td>6</td>
            </tr>
          </table>

          <div class="part3">
              <el-button type="primary" @click="goReadingProgress">查看读书进度</el-button>
              <el-button type="primary" @click="goCompanionProgress">查看同伴收集进度</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      routerData: {
        content: []
      }
    }
  },
  directives:{
    "color"(el,binding){
      el.style.color = '#169bd5'
    }
  },
  methods:{
    goReadingProgress(){
      this.$router.push({
        path:"/dusermanagement/details/progress",
        query:{}
      })
    },
    goCompanionProgress(){
      this.$router.push({
        path:"/dusermanagement/details/dcompanion",
        query:{}
      })
    }
  }
}
</script>
<style scoped>
/deep/ .el-row{
  padding:10px 0;
}
  .search_box{
    padding-left:80px;
  }
  h2{
    font-size: 14px;
  }
  .part1,.part2{
    padding-bottom: 30px;
    border-bottom:2px dashed #efefef;
  }
  .part1 p{
    line-height:32px;
  }
  .part1 p span{
    display: inline-block;
    padding-right: 20px;
    text-align: center;
    font-size: 13px;
  }
  .part2 label{
    font-size:13px;
    color:#999
  }
  .part2 input{
    border:1px solid #ccc;
    border-radius: 3px;
    outline:none;
    padding:4px 2px;
  }
  .part3{
    width: 400px;
    margin: 40px 100px;
    overflow: hidden;
  }
  .part3 :first-child{
    float: left;
  }
  .part3 :last-child{
    float: right;
  }
  .table{
    text-align:center;
    border-spacing:0;
    border-collapse:0;
    border-left:1px solid #999;
    /* margin:8px 10px; */
    margin-left: 35px;
  }
  .table th,.table td{
    border:1px solid #999;
    width:100px;
    line-height: 25px;
    font-size: 14px;
    color:#333;
    border-left:0;
  }
  .table th{
    border-bottom:0;
  }

</style>

