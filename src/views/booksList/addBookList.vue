<template>
  <div>
    <myNav :bread="routerData" />
    <div class="pageWrap">
      <el-form ref="pageData" :inline="true" :model="pageData" :rules="rules" label-width="80px">
        <div class="part1">
          <tips title="1" content="书单基本信息" />
          <div class="part_content">
            <el-row>
              <el-form-item label="名称:" prop="name" required>
                <el-input v-model="pageData.name" size="small" />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="分类:" prop="type" required>
                <el-col :span="10">
                  <el-select v-model="pageData.type" placeholder="选择书单类型" size="small">
                    <el-option
                      v-for="(item,index) in bookListType"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="介绍:" prop="introduce" required>
                <el-col :span="10">
                  <el-input
                    v-model="pageData.introduce"
                    :autosize="{minRows:3,maxRows:10}"
                    class="textarea"
                    type="textarea"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="封面:" prop="pic_url" required>
                <span>宝贝图片尺寸： 4096*2880x，主图大小不能超过8M.</span>
                <upload
                  :image="pageData.pic_url"
                  @beforeAvatarUpload="beforeAvatarUpload"
                  @success="success"
                />
                <!-- <upload :image="item.prop_pic_url" :number="index" @success="success" @beforeAvatarUpload="beforeAvatarUpload"/> -->
              </el-form-item>
            </el-row>
          </div>
        </div>
        <div class="part2">
          <tips title="2" content="书单奖励设置" />
          <el-form-item label="奖励设置" class="part_content">
            <reward-set :story="pageData.reward" :reward-set-arr="rewardSetArr" />
          </el-form-item>
        </div>
        <div class="part3">
          <tips title="3" content="选择书单书目" />
          <div class="part_content list">
            <draggable v-model="bookIdsArr" :options="{animation:500}" class="right">
              <transition-group>
                <div v-for="(element,index) in bookIdsArr" :key="index" class="tableList">
                  <span>{{ index+1 }}</span>
                  <span>
                    <img :src="element.book_pic_url" alt />
                  </span>
                  <span>{{ element.book_name }}</span>
                  <!-- <span>{{ element.id }}</span> -->
                  <span @click="deleteBook(index)">删除</span>
                </div>
              </transition-group>
            </draggable>
          </div>
          <div class="searchBox">
            <el-autocomplete
              v-model="bookIds"
              :fetch-suggestions="querySearchAsync"
              style="width:200px;margin:20px 0 0 50px"
              size="small"
              multiple
              placeholder="请输入内容搜索书单"
              @select="handleSelect"
            />
            <i class="iconfont icon-jiahao1 add_img" @click="add" />
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
import rewardSet from "./rewardSet";
import upload from "@/components/upload";
import draggable from "vuedraggable";
import {
  addBookList,
  editBookList,
  modifyBookList,
  booklistType
} from "@/api/bookList";
import { getBookList, getBookDetail } from "@/api/book";
export default {
  components: { tips, rewardSet, upload, draggable },
  data() {
    return {
      id: "",
      bookIds: "",
      bookIdsArr: [],
      rewardSetArr: [],
      booksItem: {},
      bookListType: {},
      pageData: {
        name: "",
        type: "",
        introduce: "",
        pic_url: "",
        book_ids: "",
        reward: [
          {
            node: "",
            companion_id: "",
            companion_num: "",
            small_head_url: ""
          }
        ]
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "名称不能为空" }],
        type: [{ required: true, trigger: "blur", message: "分类不能为空" }],
        introduce: [
          { required: true, trigger: "blur", message: "介绍不能为空" }
        ],
        pic_url: [{ required: true, trigger: "blur", message: "封面不能为空" }]
      },
      right: [],
      routerData: {
        content: []
      }
    };
  },
  created() {
    this.id = this.$route.query.id;
    booklistType().then(res => {
      this.bookListType = res.data;
    });
    if (this.id) {
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      editBookList({ id: this.id }).then(res => {
        res.data.type = res.data.type + "";
        res.data.reward.forEach((item, index) => {
          this.rewardSetArr.push(item.companion_name);
          delete item.companion_name;
        });
        this.pageData = res.data;
        var arr_bak = res.data.book_ids.split(",");
        arr_bak.forEach((item, index) => {
          getBookDetail({ id: item }).then(res => {
            this.bookIdsArr.push(res.data);
          });
        });
      });
    },
    querySearchAsync(val, callback) {
      getBookList({ book_name: val }).then(res => {
        res.data.data.forEach(function(item, index) {
          item.value = item.book_name;
        });
        callback(res.data.data);
      });
    },
    handleSelect(item) {
      this.booksItem = item;
    },
    breforeAdd() {
      var flag = true;
      this.bookIdsArr.forEach((item, index) => {
        if (item.id === this.booksItem.id) {
          flag = false;
        }
      });
      return flag;
    },
    add() {
      if (!this.breforeAdd()) {
        this.$message.error("该书单已填加");
        return;
      }
      if (!this.bookIds) return;
      this.bookIdsArr.push(this.booksItem);
      this.bookIds = "";
      this.booksItem = "";
    },
    deleteBook(index) {
      this.bookIdsArr.splice(index, 1);
    },
    beforeAvatarUpload(file) {
      const isLimit = file.size / 1024 / 1028 < 8;
      if (!isLimit) {
        this.$message.error("主图大小不能超过8M");
      }
      return isLimit;
    },
    success(res) {
      this.pageData.pic_url = res[0];
    },
    beaforeSubmit() {
      // 选择书单数目参数处理
      var bookIdsArr_bak = [];
      this.bookIdsArr.forEach(function(item, index) {
        bookIdsArr_bak.push(item.id);
      });
      this.pageData.book_ids = bookIdsArr_bak.toString();
      // this.pageData.reward.forEach((item, index) => {
      //   delete item.id
      // })
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.beaforeSubmit();
          if (this.id) {
            modifyBookList(this.pageData).then(res => {
              this.$message.success("保存成功");
              this.$router.push("/bookList/index");
            });
          } else {
            addBookList(this.pageData).then(res => {
              this.$message.success("保存成功");
              this.$router.push("/bookList/index");
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
/deep/ .el-form-item__content {
  width: 80%;
}
/deep/ .avatar {
  width: 70px;
  height: 70px;
}
.pageWrap {
  width: 90%;
  margin: 0 0 30px 30px;
  padding: 10px 0 0 50px;
  box-shadow: 0 0 20px #ccc;
}
.part_content {
  overflow: hidden;
}
.tableList {
  margin-left: 40px;
  width: 93%;
  line-height: 35px;
  border-bottom: 1px dashed #ccc;
  display: flex;
  margin-top: 10px;
}
.tableList img {
  height: 40px;
  vertical-align: bottom;
}
.tableList {
  display: flex;
  align-items: flex-end;
  position: relative;
}
.tableList span {
  display: block;
  width: 150px;
  text-align: center;
}
.tableList span:first-child {
  width: 50px !important;
}
.tableList span:nth-child(2) {
  line-height: 40px;
}
.tableList span:last-child {
  width: 100px;
  position: absolute;
  right: 50px;
}
.add_img {
  font-size: 32px;
  color: #ccc;
  padding: 0;
  margin: 0;
}
.searchBox {
  display: flex;
  align-items: flex-end;
}
</style>

