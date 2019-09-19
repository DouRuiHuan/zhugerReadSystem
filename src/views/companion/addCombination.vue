<template>
  <div>
    <myNav :bread="routerData" />
    <div class="search_box">
      <el-form ref="pageData" :inline="true" :model="pageData" :rules="rules">
        <el-row>
          <el-form-item label="组合名称：" prop="combine_name">
            <el-input
              v-model="pageData.combine_name"
              placeholder="组合名称"
              size="small"
              style="width:200px"
            />
          </el-form-item>
        </el-row>
        <el-row class="include">
          <span class="associated">{{ associated }}/5</span>
          <el-form-item label="包含同伴：" prop="companion_id" required>
            <div class="part_content">
              <template v-for="(item,index) in pageData.companion_id">
                <div class="partner">
                  <el-autocomplete
                    v-model="item.name"
                    :fetch-suggestions="querySearchAsync"
                    style="width:130px;"
                    size="small"
                    multiple
                    placeholder="请输入内容"
                    @focus="currentInputBox(index)"
                    @select="handleSelect"
                    @blur="companionBlur(item,index)"
                  />
                  <i class="el-icon-delete" @click="delPartner(index)" />
                </div>
              </template>
              <i v-if="addParterBtn" class="iconfont icon-jiahao1 add_img" @click="add" />
            </div>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btn">
        <el-button v-prevent-reclick type="primary" size="small" @click="save('pageData')">保存</el-button>
        <el-button size="small" @click="$router.go(-1)">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  addCombine,
  modifyCombine,
  getCompanion,
  checkCombine
} from "@/api/companion";
export default {
  data() {
    const validateCompanion = (rule, value, callback) => {
      let flag = true;
      value.forEach(function(item, index) {
        if (!item.id) {
          flag = false;
        }
      });
      if (!flag) {
        callback(new Error("请检查包含同伴中是否有空值"));
      } else {
        callback();
      }
    };
    return {
      id: "",
      pageData: {
        companion_id: [{ name: "" }],
        combine_name: ""
      },
      tabIndex: "",
      partnerOptions: [],
      addParterBtn: true,
      routerData: {
        content: []
      },
      rules: {
        combine_name: [
          { required: true, trigger: "blur", message: "组合名称不能为空" }
        ],
        companion_id: [
          {
            trigger: "blur",
            validator: validateCompanion,
            message: "请检查包含同伴中是否有空值"
          }
        ]
      }
    };
  },
  computed: {
    associated: function() {
      var associated_bak = [];
      this.pageData.companion_id.forEach(function(item, index) {
        if (item.name) {
          associated_bak.push(item);
        }
      });
      return associated_bak.length;
    }
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      checkCombine({ id: this.id }).then(res => {
        res.data.companion_id.forEach(function(item, index, arr) {
          item.value = item.name;
        });
        this.pageData.companion_id = res.data.companion_id;
        this.pageData.combine_name = res.data.combine_name;
      });
    },
    currentInputBox(index) {
      this.tabIndex = index;
    },
    isNullFn() {
      var flag = true;
      this.pageData.companion_id.forEach((item, index) => {
        if (!item.id) {
          item.name = "";
          this.$message.error("包含同伴不能为空");
          flag = false;
        }
      });
      return flag;
    },
    add() {
      if (!this.isNullFn()) return;
      this.pageData.companion_id.push({ name: "" });
      this.isShowBtn();
    },
    isShowBtn() {
      if (this.pageData.companion_id.length < 5) return;
      this.addParterBtn = false;
    },
    delPartner(index) {
      this.pageData.companion_id.splice(index, 1);
      if (this.pageData.companion_id.length < 5) {
        this.addParterBtn = true;
      }
    },
    querySearchAsync(val, callback) {
      getCompanion({ companion_name: val }).then(res => {
        res.data.data.forEach(function(item, index) {
          item.value = item.name;
        });
        callback(res.data.data);
      });
    },
    handleSelect(val) {
      this.pageData.companion_id[this.tabIndex].id = val.id;
    },
    companionBlur(item, index) {
      if (!item.id) {
        item.name = "";
      }
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var companion_id_bak = [];
          this.pageData.companion_id.forEach(function(item, index, arr) {
            companion_id_bak.push(item.id);
          });
          if (this.id) {
            modifyCombine({
              combine_id: this.id,
              combine_name: this.pageData.combine_name,
              companion_id: companion_id_bak
            }).then(res => {
              this.$message.success("保存成功");
              this.$router.push("/companion/combination/index");
            });
          } else {
            addCombine({
              combine_name: this.pageData.combine_name,
              companion_id: companion_id_bak
            }).then(res => {
              this.$message.success("保存成功");
              this.$router.push("/companion/combination/index");
            });
          }
        } else {
          this.$message.error("必填项不能为空");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.search_box {
  padding: 30px 50px;
}
.include {
  position: relative;
}
.include span {
  position: absolute;
  top: 30px;
  left: 15px;
  color: #ccc;
  font-size: 13px;
}
.child {
  margin-right: 20px;
  float: left;
}
.partner {
  float: left;
  margin: 0 20px 10px 0;
}
.associated {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 13px;
}
</style>

