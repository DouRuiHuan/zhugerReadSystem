<template>
  <div>
    <myNav :bread="routerData"/>
    <el-form class="search_box up" label-width="80px" >
      <el-row> 
        <el-col :span="6">
          <el-form-item label="备注：">
            <span>{{ pageData.activity.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="数量：">
            <span>{{ pageData.activity.count }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="有效期：">
            <span>{{ pageData.activity.start_time }}~{{ pageData.activity.end_time }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="兑换内容：">
          <span>{{ pageData.activity.books }}</span>
        </el-form-item>
      </el-row>
    </el-form>
    <div class="search_box" style="padding-bottom:30px;">
      <p class="title">兑换码未使用：</p>
      <div class="code">
        <p v-for="item in pageData.no_used">{{ item }}</p>
      </div>
      <p class="title">兑换码已使用：</p>
      <div class="code" style="color:rgb(22, 155, 213);">
        <p v-for="item in pageData.used">{{ item }}</p>
      </div>
    </div>
  </div>

</template>
<script>
import { checkRedeemCode } from '@/api/redeemCode'
export default{
  data() {
    return {
      routerData: {
        content: []
      },
      pageData: {}
    }
  },
  created() {
    checkRedeemCode({ id: this.$route.query.id }).then(res => {
      res.data.activity.books = res.data.activity.books.toString()
      this.pageData = res.data
    })
  }
}
</script>
<style scoped>
  .title{
    line-height: 40px;
  }
  .code{
    display: flex;
    justify-content: flex-start;
    flex-wrap:wrap;
  }
  .code p{
    margin-right:50px;
    line-height: 30px;
  }
  /deep/ .up .el-form-item{
    margin-bottom:0;
  }
  .search_box{
    padding-left:20px;
    font-size: 14px;
  }
</style>

