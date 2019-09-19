<template>
  <div>
    <myNav :bread="routerData"/>
    <div class="search_box">
      <div class="up">
        <h5>免费书32本</h5>
        <p class="line">
          <el-input placeholder="111" readonly="true" style="width:150px;margin-right:8px;" size="small"/>
          <date-picker :readonly="true" start-time="2019-12-31" end-time="2019-12-31"/>
          <el-button type="primary" size="small" style="margin-left:8px">删除</el-button>
        </p>
        <p class="line">
          <el-input placeholder="111" readonly="true" style="width:150px;margin-right:8px;" size="small"/>
          <date-picker :readonly="true" start-time="2019-12-31" end-time="2019-12-31"/>
          <el-button type="primary" size="small" style="margin-left:8px">删除</el-button>
        </p>
      </div>
      <el-row class="down">
        <el-col :span="14">
          <el-input
            :autosize="{ minRows: 5, maxRows: 8}"
            type="textarea"
            placeholder="填写书籍ID，以;隔开。"
            style="width:95%"/>
        </el-col>
        <el-col :span="10">
          <date-picker/>
        </el-col>
      </el-row>
      <div class="btn">
        <el-button size="small" type="primary">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import datePicker from '@/components/datePicker'
export default {
  components: { datePicker },
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
  .search_box{
    padding:12px 10px 0px 15px;
  }
  .line{
    margin:20px 0;
  }
  .up{
    padding-bottom: 20px;
    border-bottom:2px dashed #efefef;
  }
  .down{
    /* border-bottom:2px dashed #efefef; */
    padding-top:20px;
  }
</style>

