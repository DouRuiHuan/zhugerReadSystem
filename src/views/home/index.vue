<template>
  <div class="box">
    <myNav :bread="routerData"/>
    <div class="part1">
      <h3>新增数据统计</h3>
      <div class="part1_wrap">
        <p>
          <img src="http://img.zhugexuetang.com/logo.png" alt="">
          <span style="color:yellow">356</span>
          <span>今日新增用户数</span>
        </p>
        <p>
          <img src="http://img.zhugexuetang.com/logo.png" alt="">
          <span style=" color:pink">5647</span>
          <span>今日活跃用户数</span>
        </p>
        <p>
          <img src="http://img.zhugexuetang.com/logo.png" alt="">
          <span style="color:skyblue">8899</span>
          <span>昨日收入</span>
        </p>
      </div>
    </div>
    <div class="part2">
      <h3>用户数据</h3>
      <chart chart-id="echartContainer1" />
    </div>
    <div class="part3">
      <h3>阅读数据</h3>
      <chart chart-id="echartContainer2" />
    </div>
    <div class="part4">
      <rank title="本周用户排名" />
      <rank title="本周书单排名" />
      <rank title="本周书籍排名" />
    </div>
  </div>
</template>
<script>
import rank from './rank'
import chart from './chart'
export default {
  components: { rank, chart },
  data() {
    return {
      routerData: {
        content: []
      }
    }
  }
}
</script>

<style scoped>
  .box{
    margin-left: 10px;
  }
  .part1,.part2,.part3,.part4{
    margin-left: 20px;
  }
  .part1_wrap{
    width: 98%;
    display: flex;
    justify-content: space-between;
  }
  .part1_wrap p{
    margin:0;
    padding:0 20px 0 20px;
    width: 290px;
    height: 90px;
    box-shadow: 0 0 20px #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .part1_wrap img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .part1_wrap p span:nth-child(2){
    font-weight: bold;
    font-size: 30px;
  }
  .part1_wrap p span:last-child{
    color:#ccc;
    font-size: 17px;
  }
  .part4{
    width: 96%;
    display: flex;
    justify-content: space-between;
  }
  .rank{
    width: 31%;
  }
</style>

