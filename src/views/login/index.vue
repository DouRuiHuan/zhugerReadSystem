<template>
  <div class="login_box">
    <div class="mark"/>
    <div class="login_wrap">
      <h3>
        <img class="logo" src="http://img.zhugexuetang.com/logo.png" alt>
        <p class="title">大语文阅读后台</p>
      </h3>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
      >
        <el-form-item prop="username">
          <i class="iconfont icon-shenfenzheng"/>
          <el-input
            v-model="loginForm.username"
            type="text"
            placeholder="手机号码"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item prop="password" style="margin-top:20px;">
          <i class="iconfont icon-icon2"/>
          <el-input
            v-model="loginForm.password"
            :type="pwdType"
            placeholder="登陆密码"
            style="width:230px;"
          />
          <el-switch
            v-model="value2"
            active-color="#ccc"
            inactive-color="#3399ff"
            @change="changeState"
          />
        </el-form-item>
        <!-- <p class="forgetPwd">忘记密码</p> -->
      </el-form>
      <h6>
        <el-button round style="color:#fff" @click="handleLogin('loginForm')">登陆</el-button>
      </h6>
    </div>
  </div>
</template>
<script>
import { isValidateTel } from "@/utils/validate";
export default {
  name: "Login",
  data() {
    const validateTel = (rule, value, callback) => {
      console.log(isValidateTel(value));
      if (!isValidateTel(value)) {
        callback(new Error("error"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      value1: true,
      value2: true,
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空！" },
          {
            trigger: "blur",
            validator: validateTel,
            message: "请输入正确的用户名"
          }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空！" },
          {
            trigger: "blur",
            validator: validatePass,
            message: "请输入正确的密码"
          }
        ]
      },
      loading: false,
      pwdType: "password"
      // redirect: undefined
    };
  },
  // watch: {
  //   $route: {
  //     handler: function(route) {
  //       this.redirect = route.query && route.query.redirect
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    changeState(state) {
      if (state) {
        this.pwdType = "password";
      } else {
        this.pwdType = "";
      }
    },
    handleLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(response => {
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("登陆失败!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.mark {
  width: 100%;
  height: 280px;
  background: #3399ff;
  position: fixed;
  top: 50%;
  margin-top: -140px;
}
.login_wrap {
  width: 450px;
  height: 400px;
  background: #f2f2f2;
  position: fixed;
  top: 50%;
  margin-top: -200px;
  right: 20%;
  border: 1px solid #ccc;
  border-top: 10px solid #3399ff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.login_wrap h3 {
  text-align: center;
}
.logo {
  width: 190px;
  margin: 20px 0;
}
/deep/ .el-input__inner {
  border: none;
  background: transparent;
}
/deep/ .el-button {
  width: 300px;
  background: #00ccff;
  border: none;
  line-height: 20px;
}
/deep/ form {
  width: 70%;
  margin: 0 auto;
}
/deep/ .el-form-item {
  border-bottom: 1px solid #e4e4e4;
}
/deep/ .el-form-item__error {
  margin-top: 5px;
}
h6 {
  text-align: center;
  margin: 40px 0 0 0;
}
 /deep/ .el-input__inner:-webkit-autofill{
   -webkit-box-shadow: 0 0 0px 1000px #f2f2f2 inset;
}
</style>

