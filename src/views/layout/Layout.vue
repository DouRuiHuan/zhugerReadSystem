<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <div class="title">
      <!-- logo图片 -->
      <img src="http://img.zhugexuetang.com/logo.png" alt class="logo">

      <!-- 时间 -->
      <h1 class="date">
        <p>{{ date }}</p>
        <p>{{ time }}</p>
      </h1>
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
          <img src="http://img.zhugexuetang.com/logo.png" alt>
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <!-- <i class="el-icon-caret-bottom"/> -->
        </div>
        <!-- 修改密码部分 -->
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/changePwd/index">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </router-link>
          <!-- 退出部分 -->
          <el-dropdown-item divided>
            <span style="display:block;text-align:center" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
    <!-- 导航部分 -->
      <Sidebar class="sidebar-container"/>
      <!-- 主要内容身体部分 -->
      <div class="main-container">
        <!-- <Navbar/> -->
        <keep-alive>
          <app-main/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      time: "",
      date: ""
    };
  },
  created() {
    this.getTime();
  },
  computed: {
    ...mapGetters(["avatar"]),
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    // 一个点击的方法
    handleClickOutside() {
      this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
    },
    // 退出的方法
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    // 获取时间的方法
    getTime() {
      var that = this;
      time();
      function time() {
        var date = new Date();
        var sign1 = "-";
        var sign2 = ":";
        var year = date.getFullYear(); // 年
        var month = date.getMonth() + 1; // 月
        var day = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds(); // 秒
        var weekArr = [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ];
        var week = weekArr[date.getDay()];
        // 给一位数数据前面加 “0”
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
          day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
          hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
          minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
          seconds = "0" + seconds;
        }
        that.date = hour + sign2 + minutes;
        that.time = month + sign1 + day + " " + week;
      }
      setInterval(time, 60000);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  padding-top: 66px;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.title {
  background: #3399ff;
  width: 100%;
  line-height: 66px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.logo {
  width: 190px;
  vertical-align: middle;
  margin-left: 20px;
}
.avatar-container {
  height: 50px;
  margin-top: 5px;
  display: inline-block;
  position: absolute;
  right: 35px;
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 2px;
    position: relative;
    line-height: initial;
    img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
.date {
  position: fixed;
  top: 0;
  right: 130px;
  line-height: 25px;
  font-size: 16px;
  text-align: center;
}
</style>
