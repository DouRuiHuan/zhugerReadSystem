<template>
  <div>
    <myNav :bread="routerData"/>
    <div class="search_box">
      <div class="part1">
        <h2>基本信息</h2>
        <p><span>用户名：</span>111</p>
        <p><span>手机号：</span>111</p>
        <p><span>性别：</span>111</p>
        <p><span>生日：</span>111</p>
        <p><span>注册：</span>111</p>
        <p><span>等级：</span>111</p>
      </div>
      <div class="part2">
        <h2>行为数据</h2>
        <div class="up">
          <el-row>
            <label for="read">阅读力：</label>
            <input type="text" placeholder="111" style="width:150px" readonly="true">
          </el-row>
          <table class="table">
            <tr>
              <th>认读</th>
              <th>理解</th>
              <th>鉴赏</th>
              <th>评价</th>
              <th>技巧</th>
            </tr>
            <tr>
              <td>111</td>
              <td>111</td>
              <td>111</td>
              <td>111</td>
              <td>111</td>
            </tr>
          </table>
          <el-row>
            <label for="read">素质力：</label>
            <input type="text" placeholder="111" style="width:150px" readonly="true">
          </el-row>
          <table class="table">
            <tr>
              <th>善良</th>
              <th>自信</th>
              <th>勤奋</th>
              <th>诚信</th>
              <th>勇敢</th>
              <th>乐观</th>
              <th>责任心</th>
              <th>尊重敢</th>
            </tr>
            <tr>
              <td>111</td>
              <td>111</td>
              <td>111</td>
              <td>111</td>
              <td>111</td>
              <td>111</td>
              <td>111</td>
              <td>111</td>
            </tr>
          </table>
          <el-row>
            <el-col :span="4">
              <label for="read">在线时长：</label>
              <input type="text" placeholder="111" style="width:150px" readonly="true">
            </el-col>
            <el-col :span="4">
              <label for="read">闯关次数：</label>
              <input type="text" placeholder="111" style="width:150px" readonly="true">
            </el-col>
            <el-col :span="4">
              <label for="read">拥有同伴：</label>
              <input type="text" placeholder="111" style="width:150px" readonly="true">
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="part3">
        <h2>登陆信息</h2>
        <login-info/>
      </div>
    </div>
  </div>

</template>
<script>
import loginInfo from './loginInfo'
export default {
  components: { loginInfo },
  data() {
    return {
      routerData: {
        content: [
          {
            url: '/userManagement/detail/freeBooks',
            name: '免费书单'
          },
          {
            url: '',
            name: '禁用'
          }
        ]
      }
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
    width:100px;
    text-align: right;
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
  .table{
    text-align:center;
    border-spacing:0;
    border-collapse:0;
    border-left:1px solid #999;
    margin:8px 0;
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
  /* .justify{
    width: 120px;
    text-align: justify;
  }
  .justify:after{
    content: "";
    padding-left: 100%;
    display: inline-block;
  } */
</style>

