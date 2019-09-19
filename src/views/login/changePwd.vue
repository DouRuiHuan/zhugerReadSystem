<template>
  <div>
    <myNav :bread="routerData" />
    <div class="search_box">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
        <el-row>
          <el-form-item label="原密码：" prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="输入原密码"
              size="small"
              auto-complete="new-password"
            />
          </el-form-item>
        </el-row>
        <el-row class="flex">
          <el-form-item label="新密码：" prop="new_password">
            <el-input
              :type="pwdType"
              v-model="ruleForm.new_password"
              placeholder="输入新密码"
              size="small"
              auto-complete="new-password"
            />
          </el-form-item>
          <el-switch
            v-model="value"
            active-color="#ccc"
            inactive-color="#3399ff"
            @change="changeState(0)"
          />
        </el-row>
        <el-row class="flex">
          <el-form-item label="重复新密码：" prop="new_password_s">
            <el-input
              :type="pwdType_s"
              v-model="ruleForm.new_password_s"
              placeholder="重复输入新密码"
              size="small"
              auto-complete="new-password"
            />
          </el-form-item>
          <el-switch
            v-model="value_s"
            active-color="#ccc"
            inactive-color="#3399ff"
            @change="changeState(1)"
          />
        </el-row>
      </el-form>
      <div class="btn">
        <el-button type="primary" size="small" @click="save('ruleForm')">保存</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { removeToken } from "@/utils/auth";
import { changePassword } from "@/api/login";
export default {
  data() {
    const validatePwd = (rule, value, callback) => {
      if (value != this.ruleForm.new_password) {
        callback(new Error("两次输入的新密码不一致"));
      } else {
        callback();
      }
    };
    return {
      routerData: {
        content: [],
        isShow: false
      },
      value: "",
      value_s: true,
      pwdType: "password",
      pwdType_s: "password",
      ruleForm: {
        password: "",
        new_password: "",
        new_password_s: ""
      },
      rules: {
        password: [
          { required: true, trigger: "blur", message: "原密码不能为空" }
        ],
        new_password: [
          { required: true, trigger: "blur", message: "新密码不能为空" }
        ],
        new_password_s: [
          { required: true, trigger: "blur", message: "请重复输入新密码" },
          {
            trigger: "blur",
            validator: validatePwd,
            message: "两次输入的新密码不一致"
          }
        ]
      }
    };
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          changePassword({
            password: this.ruleForm.password,
            new_password: this.ruleForm.new_password
          }).then(res => {
            this.$message({
              message: "保存成功,请重新登陆",
              type: "success",
              duration: 1000,
              onClose: () => {
                removeToken();
                this.$router.go(-1);
              }
            });
          });
        } else {
          return false;
        }
      });
    },
    changeState(id) {
      if (id) {
        if (this.value_s) {
          this.pwdType_s = "password";
        } else {
          this.pwdType_s = "";
        }
      } else {
        if (this.value) {
          this.pwdType = "password";
        } else {
          this.pwdType = "";
        }
      }
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
/deep/ .el-input--small .el-input__inner {
  width: 200px;
}
.flex {
  display: flex;
}
.el-switch {
  margin-top: 10px;
}
/deep/ .el-input__inner:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #fff inset;
}
/deep/ .el-form-item {
  width: 360px;
}
</style>

