<template>
  <div>
    <myNav :bread="routerData" />
    <div class="box">
      <el-form ref="pageData" :inline="true" :model="pageData" :rules="rules" label-width="120px">
        <div class="part1">
          <tips title="1" content="同伴基础信息" />
          <div class="part_content">
            <el-row>
              <el-form-item label="同伴名称:" prop="name">
                <el-col :span="15">
                  <el-input v-model="pageData.name" size="small" maxlength="24" />
                </el-col>
                <el-col :span="2">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>{{ bookName }}/24</span>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="同伴形象:" required>
                <span>图片尺寸：小头像：100*100px，形象：321*446px，主图大小不能超过8M。</span>
              </el-form-item>
            </el-row>
            <el-row>
              <ul class="appearance">
                <li style="margin:0 130px 0 120px;">
                  <span>小头像</span>
                  <el-form-item prop="small_head_url">
                    <upload
                      :image="pageData.small_head_url"
                      number="1"
                      @success="success"
                      @beforeAvatarUpload="beforeAvatarUpload"
                    />
                  </el-form-item>
                </li>
                <li style="margin-right:30px;">
                  <span>卡牌形象1</span>
                  <el-form-item prop="card_pic_url_one_level">
                    <upload
                      :image="pageData.card_pic_url_one_level"
                      number="2"
                      @success="success"
                      @beforeAvatarUpload="beforeAvatarUpload"
                    />
                  </el-form-item>
                </li>
                <li>
                  <span>卡牌形象2</span>
                  <el-form-item prop="card_pic_url_two_level">
                    <upload
                      :image="pageData.card_pic_url_two_level"
                      number="3"
                      @success="success"
                      @beforeAvatarUpload="beforeAvatarUpload"
                    />
                  </el-form-item>
                </li>
              </ul>
            </el-row>
            <el-row>
              <el-form-item label="同伴介绍:" prop="introduce">
                <el-col :span="10">
                  <el-input
                    v-model="pageData.introduce"
                    :autosize="{minRows:3,maxRows:8}"
                    class="textarea"
                    type="textarea"
                    placeholder="同伴介绍"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="同伴类型:" prop="type">
                <el-col :span="10">
                  <el-select v-model="pageData.type" placeholder="请选择" size="small">
                    <el-option label="书籍同伴" value="1" />
                    <el-option label="活动奖励" value="2" />
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="同伴性格特点:" prop="character" required>
                <addNewInput :character="pageData.character" />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="同伴语录:" prop="sayings">
                <el-input
                  v-model="pageData.sayings"
                  :autosize="{minRows:2,maxRows:5}"
                  class="textarea"
                  type="textarea"
                  placeholder="一行为一条语录"
                />
              </el-form-item>
            </el-row>
          </div>
        </div>
        <div class="part2">
          <tips title="2" content="同伴属性设置" />
          <div class="part_content">
            <el-form-item label="属性设置：" prop="companion_attributes" required>
              <el-row>
                <template v-for="(item,index) in pageData.companion_attributes">
                  <el-col :span="8" style="display:flex">
                    <el-select
                      v-model="item.name"
                      placeholder="选择同伴属性"
                      size="small"
                      style="width:130px;margin-right:10px;"
                    >
                      <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                    <el-input
                      v-enter-number
                      type="number"
                      v-model="pageData.companion_attributes[index].value"
                      size="small"
                      placeholder="值"
                      style="width:70px;margin-right:20px;"
                    />
                  </el-col>
                </template>
              </el-row>
            </el-form-item>
            <el-row class="story">
              <el-form-item label="事迹设置：" prop="story" required>
                <attribute ref="story" :story="pageData.story" :upload="true" :id="this.id" />
              </el-form-item>
            </el-row>
            <el-form-item label="稀有度：" prop="rarity">
              <el-select v-model="pageData.rarity" placeholder="选择稀有度" size="small">
                <el-option label="普通" value="1" />
                <el-option label="优秀" value="2" />
                <el-option label="精良" value="3" />
                <el-option label="史诗" value="4" />
                <el-option label="传说" value="5" />
              </el-select>
            </el-form-item>
            <el-row>
              <el-form-item label="碎片设置：" class="debris">
                <p>
                  <span class="parterSetting">合成碎片数量</span>
                  <input
                    v-enter-number
                    v-model="pageData.level_A_need_num"
                    type="number"
                    class="input"
                    @blur="changeLevel(0)"
                  />
                </p>
                <p>
                  <span class="parterSetting">升级碎片数量</span>
                  <input
                    v-enter-number
                    v-model="pageData.level_S_need_num"
                    type="number"
                    class="input"
                    @blur="changeLevel(1)"
                  />
                </p>
                <p>
                  <span style="color:red;font-size:12px;">*稀有度有通用碎片设置，如无需要，碎片设置请为空</span>
                </p>
              </el-form-item>
            </el-row>
          </div>
        </div>
      </el-form>
      <div class="btn">
        <el-button v-prevent-reclick type="primary" size="small" @click="save('pageData')">保存</el-button>
        <el-button size="small" @click="$router.go(-1)">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import tips from "@/components/tips";
import addNewInput from "@/components/addNewInput";
import upload from "@/components/upload";
import attribute from "./attribute";
import { addMap, editCompanion, modifyCompanion } from "@/api/companion";
import {
  isAddNewInput,
  isValidateStory,
  isValidateAttr
} from "@/utils/validate";
export default {
  components: { addNewInput, tips, attribute, upload },
  data() {
    const validateCharacter = (rule, value, callback) => {
      if (!isAddNewInput(value)) {
        callback(new Error("同伴性格特点不能为空"));
      } else {
        callback();
      }
    };
    const validateAttr = (rule, value, callback) => {
      if (!isValidateAttr(value)) {
        callback(new Error("属性值输入不正确"));
      } else {
        callback();
      }
    };
    const validateStory = (rule, value, callback) => {
      if (!isValidateStory(value)) {
        callback(new Error("事迹设置不能为空"));
      } else {
        callback();
      }
    };

    return {
      id: "",
      routerData: {
        content: []
      },
      options: [
        "善良",
        "勇敢",
        "自信",
        "乐观",
        "勤奋",
        "责任心",
        "诚信",
        "尊重他人"
      ],
      pageData: {
        name: "",
        type: "",
        small_head_url: "",
        card_pic_url_one_level: "",
        card_pic_url_two_level: "",
        sayings: "",
        introduce: "",
        character: [""],
        rarity: "",
        companion_attributes: [
          { name: "", value: "" },
          { name: "", value: "" },
          { name: "", value: "" }
        ],
        story: [
          {
            story_name: "",
            prop_name: "",
            prop_pic_url: ""
          }
        ]
      },
      rules: {
        name: [
          { required: true, trigger: "blur", message: "同伴名称不能为空" }
        ],
        small_head_url: [
          { required: true, trigger: "blur", message: "小头像不能为空" }
        ],
        card_pic_url_one_level: [
          { required: true, trigger: "blur", message: "卡牌形象1不能为空" }
        ],
        card_pic_url_two_level: [
          { required: true, trigger: "blur", message: "卡牌形象2不能为空" }
        ],
        introduce: [
          { required: true, trigger: "blur", message: "同伴介绍不能为空" }
        ],
        type: [
          { required: true, trigger: "blur", message: "同伴类型不能为空" }
        ],
        character: [{ trigger: "blur", validator: validateCharacter }],
        card_pic_url_two_level: [
          { required: true, trigger: "blur", message: "卡牌形象2不能为空" }
        ],
        introduce: [
          { required: true, trigger: "blur", message: "同伴介绍不能为空" }
        ],
        type: [
          { required: true, trigger: "blur", message: "同伴类型不能为空" }
        ],
        sayings: [
          { required: true, trigger: "blur", message: "同伴语录不能为空" }
        ],
        rarity: [
          { required: true, trigger: "blur", message: "稀有度不能为空" }
        ],
        companion_attributes: [{ trigger: "blur", validator: validateAttr }],
        story: [{ trigger: "blur", validator: validateStory }]
      }
    };
  },
  computed: {
    associated: function() {
      return this.partner.length;
    },
    bookName: function() {
      return this.pageData.name.length;
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
      editCompanion({ id: this.id }).then(res => {
        this.pageData = res.data;
      });
    },
    beforeAvatarUpload(file) {
      const isLimit = file.size / 1024 / 1028 < 8;
      if (!isLimit) {
        this.$message.error("主图大小不能超过8M");
      }
      return isLimit;
    },
    success(res) {
      switch (res[1]) {
        case "1":
          this.pageData.small_head_url = res[0];
          break;
        case "2":
          this.pageData.card_pic_url_one_level = res[0];
          break;
        case "3":
          this.pageData.card_pic_url_two_level = res[0];
      }
    },
    changeLevel(type) {
      // if (type) {
      //   if (this.pageData.level_S_need_num <= 0)
      //     this.pageData.level_S_need_num = 1;
      // } else {
      //   if (this.pageData.level_A_need_num <= 0)
      //     this.pageData.level_A_need_num = 1;
      // }
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.pageData.delete_story_ids = this.$refs.story.deletedArr.toString();
          if (this.id) {
            this.pageData.companion_id = this.id;
            modifyCompanion(this.pageData).then(res => {
              this.$message.success("保存成功");
              this.$router.push("/companion/map/index");
            });
          } else {
            addMap(this.pageData).then(res => {
              this.$message.success("保存成功");
              this.$router.push("/companion/map/index");
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
.box {
  width: 95%;
  margin: 0 0 30px 30px;
  padding: 10px 0 0 50px;
  box-shadow: 0 0 20px #ccc;
}
.part_content {
  overflow: hidden;
}

.input {
  width: 100px;
  border-color: #ccc;
}
.appearance {
  display: flex;
  font-size: 12px;
  align-items: center;
}

.upload {
  margin-top: 5px;
}
.add_img {
  width: 35px;
}
.debris input {
  text-align: center;
}
/deep/ .part2 .el-icon-plus:before {
  font-size: 18px;
}
/deep/ .el-form--inline .el-form-item__content {
  width: 80%;
}
/deep/ .part2 .avatar-uploader-icon {
  width: 30px;
  height: 30px;
  line-height: 23px;
  position: absolute;
  top: 0;
  left: 0;
}
/deep/ .part2 .avatar-uploader .el-upload {
  width: 30px;
  height: 30px;
  position: relative;
}
/deep/ .part1 .avatar {
  width: 70px;
  height: 70px;
}
/deep/ .story .avatar {
  width: 30px;
  height: 30px;
}
/deep/ .story .avatar-uploader {
  height: 30px;
}
</style>

