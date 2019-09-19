<template>
  <div>
    <myNav :bread="routerData" />
    <div class="box">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" :rules="rules" label-width="110px">
        <div class="part1">
          <tips title="1" content="基本信息" />
          <div class="part_content">
            <el-row>
              <el-form-item label="关卡序号:" prop="checkpoint_number">
                <el-input
                  v-model="ruleForm.checkpoint_number"
                  size="small"
                  placeholder
                  :disabled="$route.query.pointId?true:false"
                  style="width:200px"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="关卡标题:" prop="checkpoint_title">
                <el-input v-model="ruleForm.checkpoint_title" size="small" placeholder />
              </el-form-item>
            </el-row>
            <upload id="uniqueId" @success="success"></upload>
            <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :before-upload='newEditorbeforeupload'  :on-success='newEditorSuccess'
                  ref="uniqueId" id="uniqueId">
            </el-upload >-->
            <el-row>
              <el-form-item label="关卡内容:" prop="checkpoint_content" style="margin-bottom:20px;">
                <quill-editor
                  ref="myTextEditor"
                  v-model="ruleForm.checkpoint_content"
                  :options="editorOption"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="关卡掉落:" prop="drop_detail" required>
                <template v-for="(item,sub) in ruleForm.drop_detail">
                  <el-select
                    v-model="item.companion_id"
                    placeholder="请选择掉落碎片"
                    size="small"
                    style="width:150px;"
                  >
                    <el-option
                      v-for="item2 in chipsArr"
                      :key="item2.id"
                      :label="item2.name"
                      :value="item2.id"
                    />
                  </el-select>
                  <el-select
                    v-model="item.chip_num"
                    placeholder="掉落个数"
                    size="small"
                    style="width:150px;margin-right:30px;"
                    @change="val=>changeDrop(val,sub)"
                  >
                    <el-option label="1个" value="1" />
                    <el-option label="2个" value="2" />
                  </el-select>
                </template>
                <el-button size="mini" @click="reset">重置</el-button>
              </el-form-item>
            </el-row>
          </div>
        </div>
        <div class="part2">
          <tips title="2" content="过关问题设置" />
          <div class="part_content">
            <template v-for="(item,index) in ruleForm.question">
              <el-form-item :label="`问题${index+1}:`" required>
                <el-input
                  v-model="item.question_title"
                  size="small"
                  placeholder
                  style="width:80%;"
                />
              </el-form-item>
              <template v-for="(item2,i) in item.option">
                <el-form-item :label="i | filterAnswer" required>
                  <el-col :span="10" style="margin-right:15px">
                    <el-input v-model="item2.option_title" size="small" placeholder />
                  </el-col>
                  <el-col :span="10">
                    <el-checkbox
                      v-model="item2.is_right"
                      @change="checked=>answerRadio(checked, index,i)"
                    >正确</el-checkbox>
                  </el-col>
                </el-form-item>
              </template>
            </template>
          </div>
        </div>
        <div class="part3">
          <tips title="3" content="知识点&重点讲解" />
          <el-row>
            <!-- <el-form-item label="词汇：">
              <add-new-input/>
            </el-form-item>-->
            <el-form-item label="知识点:" prop="knowledge_point">
              <point ref="point" :points="ruleForm.knowledge_point" />
            </el-form-item>
            <!-- <el-form-item label="写作技巧:">
              <point/>
            </el-form-item>
            <el-form-item label="考点:">
              <point/>
            </el-form-item>-->
          </el-row>
        </div>
        <!-- <div class="part4">
          <tips title="4" content="标签设置："/>
          <el-row>
            <el-form-item label="地点标签：">
              <add-new-input/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="任务标签：">
              <add-new-input/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="时间标签：">
              <add-new-input/>
            </el-form-item>
          </el-row>
        </div>-->
      </el-form>
      <div class="btn">
        <el-button v-prevent-reclick type="primary" size="small" @click="save('ruleForm')">保存</el-button>
        <el-button size="small" @click="$router.go(-1)">取消</el-button>
      </div>
    </div>
    <dialog-box
      :is-show-dialog="isShowDialog"
      :list="dialogList"
      :page="false"
      :operate="false"
      @handleClose="isShowDialog = false"
    />
  </div>
</template>
<script>
import upload from "@/components/upload";
import {
  getChips,
  addCheckpoint,
  editCheckpoint,
  modifyCheckpoint,
  getStoryidList
} from "@/api/book";
import tips from "@/components/tips";
import addNewInput from "@/components/addNewInput";
import point from "./components/point";
import dialogBox from "./components/dialog";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import Quill from "quill";
import quillConfig from "@/utils/quill-config.js";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);
// import { ImageDrop } from 'quill-image-drop-module'
// Quill.register('modules/imageDrop', ImageDrop)
import { isValidateDrop, isValidateKnowledge } from "./validate";
export default {
  components: { addNewInput, tips, point, quillEditor, dialogBox, upload },
  filters: {
    filterAnswer(i) {
      switch (i) {
        case 0:
          return "答案A:";
          break;
        case 1:
          return "答案B:";
          break;
        case 2:
          return "答案C:";
          break;
        case 3:
          return "答案D:";
          break;
      }
    }
  },
  data() {
    const validateDrop = (rule, value, callback) => {
      if (isValidateDrop(value)) {
        callback();
      } else {
        callback(new Error("掉落碎片和掉落个数不能为空"));
      }
    };
    const validateKnowledge = (rule, value, callback) => {
      if (isValidateKnowledge(value)) {
        callback();
      } else {
        callback(new Error("知识点不能为空"));
      }
    };
    return {
      editorOption: quillConfig,
      isShowDialog: false,
      dialogList: [],
      ruleForm: {
        bookId: "",
        pointId: "",
        checkpoint_number: "",
        checkpoint_title: "",
        checkpoint_content: "",
        drop_detail: [],
        knowledge_point: [{ knowledge_title: "", knowledge_content: "" }],
        question: [
          {
            question_title: "",
            option: [
              { option_title: "", is_right: false },
              { option_title: "", is_right: false },
              { option_title: "", is_right: false },
              { option_title: "", is_right: false }
            ]
          },
          {
            question_title: "",
            option: [
              { option_title: "", is_right: false },
              { option_title: "", is_right: false },
              { option_title: "", is_right: false },
              { option_title: "", is_right: false }
            ]
          }
        ]
      },
      chipsArr: [],
      routerData: {
        content: []
      },
      checked: true,
      stages: [1, 2, 3],
      content: "",
      rules: {
        checkpoint_number: [
          { required: true, trigger: "blur", message: "关卡序号不能为空" }
        ],
        checkpoint_title: [
          { required: true, trigger: "blur", message: "关卡标题不能为空" }
        ],
        checkpoint_content: [
          { required: true, trigger: "change", message: "关卡内容不能为空" }
        ],
        drop_detail: [{ trigger: "blur", validator: validateDrop }]
        // knowledge_point: [
        //   { trigger: 'change', validator: validateKnowledge }
        // ]
      }
    };
  },
  mounted() {
    quillConfig.initButton();
    var imgHandler = async function(state) {
      if (state) {
        var fileInput = document.querySelector("#uniqueId input"); //隐藏的file元素
        fileInput.click(); //触发事件
      }
    };
    var that = this;
    var dialogHandler = function() {
      that.dialogFn();
    };
    this.$refs.myTextEditor.quill
      .getModule("toolbar")
      .addHandler("sourceEditor", dialogHandler);
    this.$refs.myTextEditor.quill
      .getModule("toolbar")
      .addHandler("image", imgHandler);
  },
  created() {
    this.bookId = this.$route.query.bookId;
    this.pointId = this.$route.query.pointId;
    this.ruleForm.book_id = this.bookId;
    this.getChipsFn();
    if (this.pointId) {
      this.editCheckpointFn();
    }
  },
  methods: {
    success(url) {
      let quill = this.$refs.myTextEditor.quill;
      // 获取光标所在位置
      var length = quill.getSelection().index;
      // 插入图片，res为服务器返回的图片链接地址
      quill.insertEmbed(length, "image", url[0]);
      // 调整光标到最后
      quill.setSelection(length + 1);
    },
    // 编辑查看
    editCheckpointFn() {
      editCheckpoint({ checkpoint_id: this.pointId }).then(res => {
        this.changeChekboxStatus(res.data);
        if (res.data.drop_detail.length < 2) {
          res.data.drop_detail.push({ companion_id: "", chip_num: "" });
        }
        // res.data.question.forEach((item, index) => {
        //   if (item.option.length < 4) {
        //     for (var i = 0; i < 4 - item.option.length; i++) {
        //       item.option.push({ id: "", option_title: "", is_right: "" });
        //     }
        //   }
        // });
        this.ruleForm = res.data;
      });
    },
    changeChekboxStatus(newData) {
      newData.question.forEach(function(ele, i) {
        ele.option.forEach(function(item, index) {
          item.is_right === "1"
            ? (item.is_right = true)
            : (item.is_right = false);
        });
      });
    },
    // 获取关卡掉落下拉框数据
    getChipsFn() {
      getChips({ book_id: this.bookId }).then(res => {
        if (res.data.length > 1) {
          res.data.unshift({ id: "0", name: "随机" });
        }
        this.chipsArr = res.data;
        if (this.$route.query.pointId) return;
        if (res.data.length > 1) {
          this.ruleForm.drop_detail = [
            { companion_id: "", chip_num: "" },
            { companion_id: "", chip_num: "" }
          ];
        } else {
          this.ruleForm.drop_detail = [{ companion_id: "", chip_num: "" }];
        }
      });
    },
    // 判断过关问题设置必填项
    checkProblem() {
      var questionTitle = true,
        optionTitle = true,
        checkbox1 = false,
        checkbox2 = false;
      this.ruleForm.question.forEach((item, index) => {
        if (!item.question_title) {
          questionTitle = false;
          return;
        }
        item.option.forEach((ele, i) => {
          if (!ele.option_title) {
            optionTitle = false;
            return;
          }
          if (ele.is_right) {
            index === 0 ? (checkbox1 = true) : (checkbox2 = true);
          }
        });
      });
      return questionTitle && optionTitle && checkbox1 && checkbox2;
    },
    beforSubmit() {
      if (!this.checkProblem()) {
        this.$message.error("请检查过关问题设置");
        return false;
      }
      var save_drop_detail = this.ruleForm.drop_detail;
      if (save_drop_detail.length >= 2) {
        if (
          save_drop_detail[0].companion_id === save_drop_detail[1].companion_id
        ) {
          this.$message.error("关卡内容不能相同");
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.beforSubmit()) return;
          this.ruleForm.question.forEach(function(ele, i) {
            ele.option.forEach(function(item, index) {
              item.is_right = item.is_right ? "1" : "0";
            });
          });
          if (this.pointId) {
            // 修改的时候删掉的知识点id字符串
            if (this.$refs.point.piontDeleted.length > 0) {
              this.ruleForm.delete_konwledgepoint_ids = this.$refs.point.piontDeleted.toString();
            }
            this.ruleForm.checkpoint_id = this.pointId;
            modifyCheckpoint(this.ruleForm)
              .then(res => {
                this.$message.success("保存成功");
                this.$router.push({
                  path: "/books/stage/index",
                  query: { bookId: this.bookId }
                });
              })
              .catch(err => {
                this.changeChekboxStatus(this.ruleForm);
              });
          } else {
            addCheckpoint(this.ruleForm)
              .then(res => {
                this.$message.success("保存成功");
                this.$router.push({
                  path: "/books/stage/index",
                  query: { bookId: this.bookId }
                });
              })
              .catch(err => {
                this.changeChekboxStatus(this.ruleForm);
              });
          }
        } else {
          this.$message.error("必填项不能为空");
          // this.changeChekboxStatus(this.ruleForm);
          return false;
        }
      });
    },
    answerRadio(val, index, i) {
      if (val) {
        this.ruleForm.question[index].option.forEach((item, currentIndex) => {
          if (currentIndex !== i) {
            item.is_right = false;
          }
        });
      }
    },
    // 查看道具Id弹窗
    dialogFn() {
      this.isShowDialog = true;
      var patt = /\{\{\#\((.*?)\)\#\}\}/g;
      var checkpointContent = this.ruleForm.checkpoint_content.match(patt);
      var storyNames = [];
      if (checkpointContent) {
        checkpointContent.forEach((item, index) => {
          item = item.replace(/\{\{\#\(/g, "").replace(/\)\#\}\}/g, "");
          storyNames.push(item);
        });
        getStoryidList({ prop_names: storyNames.toString() }).then(res => {
          this.dialogList = res.data;
        });
      }
    },
    reset() {
      this.ruleForm.drop_detail = [
        { companion_id: "", chip_num: "" },
        { companion_id: "", chip_num: "" }
      ];
    },
    changeDrop(val, index) {
      console.log(111);
      if (val == 2) {
        index
          ? (this.ruleForm.drop_detail[0] = { companion_id: "", chip_num: "" })
          : (this.ruleForm.drop_detail[1] = { companion_id: "", chip_num: "" });
      }
    }
  }
};
</script>
<style scoped>
.box {
  width: 96%;
  margin: 0 0 30px 30px;
  padding: 10px 0 0 50px;
  box-shadow: 0 0 20px #ccc;
}
#uniqueId {
  display: none;
}
/deep/ .el-form--inline .el-form-item__content {
  width: 80%;
}
/deep/ .part2 .el-form-item {
  margin-bottom: 2px;
}
.quill-editor {
  margin-bottom: 3px;
}
/deep/ .ql-toolbar.ql-snow + .ql-container.ql-snow {
  height: 450px;
  overflow-y: scroll;
}
/deep/ .ql-toolbar.ql-snow {
  padding: 0 8px;
}
/deep/ .ql-sourceEditor {
  width: fit-content !important;
}
</style>

