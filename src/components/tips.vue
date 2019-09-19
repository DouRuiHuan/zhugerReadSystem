<template>
  <div class="title">
    <span>{{ title }}</span>
    <span>&nbsp;&nbsp;&nbsp;{{ content }}</span>
  </div>
</template>
<script>
export default {
  props: ['title', 'content'],
  data() {
    return {

    }
  }
}
</script>
<style scoped>
 .title{
    width: 98%;
    background:#efefef;
    height: 40px;
    line-height: 40px;
    display: flex;
    margin:20px 0 10px 0;
  }
  .title span:first-child{
    width:40px;
    text-align: center;
    border-right: 1px solid #ccc;
  }
  .title span:last-child{
    font-size: 13px;
    font-weight: bold;
  }
</style>

