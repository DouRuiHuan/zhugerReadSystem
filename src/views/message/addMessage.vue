<template>
  <div class="addmessage">
    <myNav :bread="routerData" />
    <div class="search_box">
      <div class="search_box_left">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" :rules="rules" label-width="110px">
        <el-form-item label="消息标题：" prop="title">
          <el-input v-model="ruleForm.title" placeholder="消息标题" size="small" />
        </el-form-item>
        <el-form-item label="页面跳转：" prop="jump_type">
          <el-select
            v-model="ruleForm.jump_type"
            placeholder="选择跳转页面"
            size="small"
            style="width:130px;"
          >
            <el-option
              v-for="(item,index) in jumpTypeArr"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息内容：" prop="content">
          <el-input
            v-model="ruleForm.content"
            :autosize="{minRows:3,maxRows:10}"
            maxlength="150"
            class="textarea"
            type="textarea"
            placeholder="请输入消息内容，最多不超过150个字符"
          />
        </el-form-item>
      </el-form>
      </div>
      <div class="search_box_left">

          <messageRight :ruleForm="ruleForm" :jumpTypeArr="jumpTypeArr"/>
      </div>
      <div class="btn">
        <el-button type="primary" size="small" @click="save('ruleForm')">提交</el-button>
        <el-button size="small" @click="$router.go(-1)">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getJumpType, addMessage } from "@/api/message";
import messageRight from "./messageRight.vue"
export default {
  components:{messageRight},
  data() {
    return {
      routerData: {
        content: []
      },
      ruleForm: {
        title: "",
        jump_type: 0,
        content: ""
      },
      jumpTypeArr: [],
      rules: {
        title: [
          { required: true, trigger: "blur", message: "消息标题不能为空" }
        ],
        jump_type: [
          { required: true, trigger: "blur", message: "页面跳转不能为空" }
        ],
        content: [
          { required: true, trigger: "blur", message: "消息内容不能为空" }
        ]
      }
    };
  },
  created() {
    getJumpType().then(res => {
      this.jumpTypeArr = res.data;
    });
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addMessage(this.ruleForm).then(res => {
            this.$message.success("保存成功");
            this.$router.push("/message/index");
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.search_box{
  height: 700px;
}
.btn{
  width: 710px;
}
</style>

