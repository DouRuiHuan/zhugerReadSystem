<template>
  <div>
    <myNav :bread="routerData" />
    <div class="search_box">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" :rules="rules">
        <el-row>
          <el-form-item label="章节名称：" prop="chapter_name">
            <el-input v-model="ruleForm.chapter_name" size="small" placeholder="输入章节名" />
          </el-form-item>
        </el-row>
        <el-row>
          <p style="margin:20px 0">选中并点击移动可新增或删除关卡，长按并拖动可以调整关卡顺序</p>
          <div class="drag-box">
            <div class="drag-box-item">
              <div class="item-title">本章关卡</div>
              <draggable v-model="doing" :options="dragOptions" @choose="handleLeft">
                <transition-group id="doing" tag="div" class="item-ul">
                  <div
                    v-for="(item,index) in doing"
                    :key="index"
                    class="drag-list"
                  >{{ item.checkpoint_number }} {{ item.checkpoint_title }}</div>
                </transition-group>
              </draggable>
            </div>
            <div class="section_btn">
              <el-button @click="move(1)" :disabled="right">移动到右边&gt;&gt;</el-button>
              <br />
              <el-button @click="move(0)" :disabled="left">&lt;&lt;移动到左边</el-button>
            </div>
            <div class="drag-box-item">
              <div class="item-title">未分类关卡</div>
              <draggable v-model="todo" :options="dragOptions2" @choose="handleRight">
                <transition-group id="todo" tag="div" class="item-ul">
                  <div
                    v-for="(item,index) in todo"
                    :key="index"
                    class="drag-list"
                  >{{ item.checkpoint_number }} {{ item.checkpoint_title }}</div>
                </transition-group>
              </draggable>
            </div>
          </div>
        </el-row>
      </el-form>
      <div class="btn">
        <el-button v-prevent-reclick type="primary" size="small" @click="save('ruleForm')">保存</el-button>
        <el-button size="small" @click="$router.go(-1)">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import {
  getUnclassifiedList,
  addNewChapter,
  editChapter,
  modifyChapter
} from "@/api/book";
export default {
  name: "Example",
  components: { draggable },
  data() {
    return {
      isDragging: false,
      right: true,
      left: true,
      eventLeft: "",
      eventRight: "",
      sectionId: "",
      bookId: "",
      routerData: {
        content: []
      },
      ruleForm: {
        book_id: "",
        chapter_name: "",
        checkpoint_ids: ""
      },
      dragOptions: {
        animation: 10,
        scroll: true,
        group: "sortlist",
        ghostClass: "ghost-style"
      },
      dragOptions2: {
        animation: 10,
        scroll: true,
        group: "sortlist2",
        ghostClass: "ghost-style"
      },
      doing: [], // 本章关卡
      todo: [], // 未分类关卡
      doing_bak: [],
      deletedArr: [],
      deleteRepeat: [],
      rules: {
        chapter_name: [
          { required: true, trigger: "blur", message: "章节名称不能为空" }
        ]
      }
    };
  },
  created() {
    this.bookId = this.$route.query.bookId;
    this.sectionId = this.$route.query.sectionId;
    this.ruleForm.book_id = this.bookId;
    this.getUnclassifiedListFn();
    if (this.$route.query.sectionId) {
      this.getEditChapter();
    }
  },
  methods: {
    getEditChapter() {
      editChapter({ chapter_id: this.sectionId, book_id: this.bookId }).then(
        res => {
          this.ruleForm = {
            chapter_name: res.data.chapter_name,
            delete_checkpoint_ids: "",
            id: res.data.id
          };
          this.doing = res.data.checkpoint_ids.concat();
          this.doing_bak = res.data.checkpoint_ids.concat();
        }
      );
    },
    handleLeft(event) {
      this.eventLeft = event;
      this.right = false;
      this.left = true;
    },
    handleRight(event) {
      this.eventRight = event;
      this.left = false;
      this.right = true;
    },
    move(type) {
      if (type) {
        this.chooseHandle(this.eventLeft);
      } else {
        this.chooseHandle(this.eventRight);
      }
    },
    chooseHandle(event) {
      var index = event.oldIndex;
      if (event.from.id === "doing") {
        if (this.doing.length <= index) {
          this.left = true;
          this.right = true;
          this.$message.error("请重新选择要删除的关卡");
          return;
        }
        this.deletedArr.push(this.doing[index].id);
        this.todo.push(this.doing[index]);
        this.doing.splice(index, 1);
      }
      if (event.from.id === "todo") {
        if (this.todo.length <= index) {
          this.left = true;
          this.right = true;
          this.$message.error("请重新选择要新增的关卡");
          return;
        }
        this.doing.push(this.todo[index]);
        var ele = this.todo[index].id;
        this.deletedArr = this.deletedArr.filter(item => item != ele);
        this.todo.splice(index, 1);
      }
      this.deleteRepeat = Array.from(new Set(this.deletedArr));
    },
    // removeHandle(event) {
    //   // this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
    //   var index;
    //   if (event.from.id === "doing") {
    //     index = event.newIndex;
    //     this.deletedArr.push(this.todo[index].id);
    //   }
    //   if (event.from.id === "todo") {
    //     index = event.newIndex;
    //     var ele = this.doing[index].id;
    //     this.deletedArr = this.deletedArr.filter(item => item != ele);
    //   }
    //   this.deleteRepeat = Array.from(new Set(this.deletedArr));
    // },

    beforeSubmit() {
      if (this.doing.length < 1) {
        this.$message.error("本章关卡不能为空");
        return false;
      } else {
        var checkpoint_ids_bak = [];
        this.doing.forEach(function(item, index) {
          checkpoint_ids_bak.push(item.id);
        });
        this.ruleForm.checkpoint_ids = checkpoint_ids_bak.toString();
        return true;
      }
    },
    save(formName) {
      if (!this.beforeSubmit()) return;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var shiftOut = []; // 移除数组
          this.deleteRepeat.forEach((item, index) => {
            this.doing_bak.forEach(function(ele, i) {
              if (item == ele.id) {
                shiftOut.push(item);
              }
            });
          });
          if (this.$route.query.sectionId) {
            this.ruleForm.delete_checkpoint_ids = shiftOut.toString();
            modifyChapter(this.ruleForm).then(res => {
              this.$message.success("保存成功");
              this.$router.push({
                path: "/books/stage/section/index",
                query: { bookId: this.bookId }
              });
            });
          } else {
            addNewChapter(this.ruleForm).then(res => {
              this.$message.success("保存成功");
              this.$router.push({
                path: "/books/stage/section/index",
                query: { bookId: this.bookId }
              });
            });
          }
        } else {
          this.$message.error("必填项不能为空");
          return false;
        }
      });
    },
    // 获取未分类关卡列表
    getUnclassifiedListFn() {
      getUnclassifiedList({ book_id: this.bookId }).then(res => {
        this.todo = res.data;
      });
    }
  }
};
</script>
<style type="text/scss" lang="scss" scoped>
.drag {
  display: flex;
}
.search_box {
  padding: 20px 0 0 30px;
}
.drag-box {
  display: flex;
  user-select: none;
}
.drag-box-item {
  flex: 1;
  max-width: 330px;
  min-width: 300px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
}
.item-title {
  padding: 8px 8px 8px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: #24292e;
  font-weight: 600;
}
.item-ul {
  padding: 0 8px 8px;
  height: 500px;
  overflow-y: scroll;
}
.item-ul::-webkit-scrollbar {
  width: 0;
}
.drag-list {
  border: 1px #e1e4e8 solid;
  padding: 10px;
  margin: 5px 0 10px;
  list-style: none;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  -webkit-transition: border 0.3s ease-in;
  transition: border 0.3s ease-in;
}
.drag-list:hover {
  border: 1px solid #20a0ff;
}
.drag-title {
  font-weight: 400;
  line-height: 25px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.ghost-style {
  display: block;
  color: transparent;
  border-style: dashed;
}
.section_btn button {
  margin-top: 50px;
}
</style>
