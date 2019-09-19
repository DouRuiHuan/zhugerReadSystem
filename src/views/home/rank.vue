<template>
  <div class="rank">
    <h4>{{ title }}</h4>
    <ul class="rank_box" >
      <li>
        <span>用户名</span>
        <span>1992关</span>
      </li>
      <li>
        <span>用户名</span>
        <span>1992关</span>
      </li>
      <li>
        <span>用户名</span>
        <span>1992关</span>
      </li>
      <li>
        <span>用户名</span>
        <span>1992关</span>
      </li>
      <li>
        <span>用户名</span>
        <span>1992关</span>
      </li>
      <li>
        <span>用户名</span>
        <span>1992关</span>
      </li>
      <li>
        <span>用户名</span>
        <span>1992关</span>
      </li>
      <li>
        <span>用户名</span>
        <span>1992关</span>
      </li>
      <li>
        <span>用户名</span>
        <span>1992关</span>
      </li>
      <li>
        <span>用户名</span>
        <span>1992关</span>
      </li>
    </ul>

  </div>
</template>
<script>
export default {
  props: ['title']
}
</script>
<style scoped>
  .rank_box{
    width: 100%;
    overflow: hidden;
    box-shadow: 0 0 20px #ccc;
    padding:50px 20px;
    margin-bottom: 20px;
  }
  .rank_box li{
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
    font-size: 13px;
  }
  .rank_box li span:last-child{
    color: red;
  }
</style>

