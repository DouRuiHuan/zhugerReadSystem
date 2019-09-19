<template>
<!-- 内容页的小按钮 -->
  <div class="navBox">
    <navbar v-bind="$attrs"/>
    <div v-if="$attrs.bread.content.length>0">
      <template v-for="item in $attrs.bread.content">
        <router-link :to="item.url" class="route">
          <el-button size="small" style="background:#169bd5;border:none;color:#fff;">{{ item.name }}</el-button>
        </router-link>
      </template>
    </div>

  </div>
</template>
<script>
import { Navbar } from '@/views/layout/components'
export default {
  components: { Navbar },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
  .navBox{
    width:98%;
    height:45px;
    line-height: 45px;
    padding:0 20px;
    font-size: 15px;
    background: #f2f2f2;
    margin-bottom: 20px;
    /* position: fixed;
    top:66px;
    left:240px; */
  }
  .navBox{
    display: flex;
    justify-content: space-between;
  }
  .route{
    margin-left: 10px;
  }
  .dot{
    display: inline-block;
    width:12px;
    height: 12px;
    background:#199ed8;
    border-radius: 50%;
    vertical-align: middle;
    margin-right:5px;
  }
</style>

