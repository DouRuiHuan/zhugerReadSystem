<template>
  <div class="right_box">
    <el-row>
      <el-autocomplete
        v-model="bookName"
        :fetch-suggestions="getBooksFn"
        placeholder="选择书籍"
        size="small"
        style="width:150px"
        class="marginR"
        @select="handleBooksSelect"
      ></el-autocomplete>
      <el-select v-model="pointIndex" placeholder="请选择" size="small" @change="handlePointSelect">
        <el-option
          v-for="(item,index) in pointArr"
          :key="index"
          :label="item.checkpoint_title"
          :value="index"
          size="small"
        ></el-option>
      </el-select>
      <!-- <el-autocomplete
        v-model="pointName"
        :fetch-suggestions="getPointFn"
        placeholder="选择关卡"
        class="marginR"
        size="small"
        style="width:200px"
        @select="handlePointSelect"
      ></el-autocomplete>-->
      <span @click="editPoint" class="edit">编辑关卡</span>
      <span @click="editBook" class="edit">编辑书籍</span>
    </el-row>
    <div class="statistics">
      <span>总字数：{{content.count?content.count.content:'无'}}</span>
      <span>知识点：{{content.count?content.count.checkpoint_konwledge:'无'}}</span>
      <span>词汇：{{content.count?content.count.dict:'无'}}</span>
      <span>宝箱：{{content.count?content.count.story_info:'无'}}</span>
    </div>
    <div class="vocabulary" v-if="content.dict">
      <span v-for="(item,index) in content.dict" :key="index">{{item.word}}</span>
      <span class="not_found" v-for="(item,index) in content.dict_not_found" :key="index">{{item}}</span>
    </div>
    <p v-if="content.dict" class="note">红色即代表无第三方解释，前端无词汇显示</p>
    <el-row>
      <p class="title">掉落{{number}}</p>
      <p>
        <el-button
          size="small"
          v-for="(item,index) in content.drop_detail"
          :key="index"
        >{{item.name}}*{{item.chip_num}}</el-button>
      </p>
    </el-row>
    <el-row>
      <p class="title">闯关答题</p>
      <div class="question" v-for="(item,index) in content.questions" :key="index">
        <p>{{item.question_title}}</p>
        <p v-for="(item2,index2) in item.option" :key="index2">
          <span v-if="+item2.is_right">【正确】</span>
          <span>{{item2.option_title}}</span>
        </p>
      </div>
    </el-row>
    <el-row>
      <p class="title">知识点:</p>
      <div class="knowledge" v-for="(item,index) in content.checkpoint_konwledge" :key="index">
        <span class="knowledge_title">{{item.knowledge_title}}:</span>
        <span>{{item.knowledge_content}}</span>
      </div>
    </el-row>
  </div>
</template>
<script>
import eventBus from "./eventBus";
import { getBooks, getpoints, getPointContent } from "@/api/book";
export default {
  data() {
    return {
      bookName: "",
      bookId: "",
      pointId: "",
      pointArr: [],
      pointIndex: "",
      content: {}
    };
  },
  computed: {
    number() {
      if (this.content.drop_detail) {
        return `(${this.content.drop_detail.length})`;
      }
    }
  },
  mounted() {
    eventBus.$on("prevPoint", () => {
      if (this.pointIndex > 0) {
        this.pointIndex--;
        this.pointId = this.pointArr[this.pointIndex].id;
        this.$message.success("切换到上一关");
        this.getContent();
      }
    });
    eventBus.$on("nextPoint", () => {
      if (this.pointIndex < this.pointArr.length) {
        this.pointIndex++;
        this.pointId = this.pointArr[this.pointIndex].id;
        this.$message.success("切换到下一关");
        this.getContent();
      }
    });
  },
  watch: {
    bookId(val) {
      this.pointId = "";
      this.pointIndex = "";
      this.content = {};
      eventBus.$emit("setContent", "");
    }
  },
  methods: {
    getBooksFn(val, callback) {
      getBooks({ book_name: this.bookName }).then(res => {
        res.data.forEach(function(item, index) {
          item.value = item.book_name;
        });
        callback(res.data);
      });
    },
    handleBooksSelect(e) {
      this.bookId = e.id;
      this.getPointFn();
    },
    getPointFn(val, callback) {
      getpoints({
        book_id: this.bookId
      }).then(res => {
        this.pointArr = res.data;
      });
    },
    handlePointSelect(index) {
      this.pointId = this.pointArr[index].id;
      this.getContent();
    },
    getContent() {
      getPointContent({ checkpoint_id: this.pointId }).then(res => {
        this.content = res.data;
        eventBus.$emit("setContent", res.data.htmlContent);
      });
    },
    editBook() {
      if (!this.bookId) {
        this.$message.error("请先选择书籍");
        return false;
      }
      let routeData = this.$router.resolve({
        path: "/books/addBook",
        query: { bookId: this.bookId }
      });
      window.open(routeData.href, "_blank");
    },
    editPoint() {
      if (!this.pointId) {
        this.$message.error("请先选择关卡");
        return false;
      }
      let routeData = this.$router.resolve({
        path: "/books/stage/addStage",
        query: {
          bookId: this.bookId,
          bookName: this.bookName,
          pointId: this.pointId
        }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>
<style scoped>
.title {
  font-size: 14px;
  line-height: 40px;
}
.right_box {
  margin: 5px 0 0 30px;
  width: 550px;
}
.question {
  width: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 2px 10px;
  margin-bottom: 10px;
}
.question p {
  line-height: 25px;
  font-size: 14px;
}
.statistics {
  margin: 10px 0;
  width: 90%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  font-size: 14px;
  padding-left: 10px;
}
.statistics span {
  margin-right: 20px;
}
.knowledge {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 500px;
  line-height: 20px;
  font-size: 14px;
  margin-bottom: 10px;
}
.knowledge_title {
  font-weight: bold;
}
.edit {
  font-size: 14px;
  cursor: pointer;
  color: #3399ff;
  line-height: 30px;
}
.marginR {
  margin-right: 10px;
}
.vocabulary {
  font-size: 14px;
  width: 90%;
  min-height: 30px;
  line-height: 30px;
  margin: 10px 0;
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
}
.vocabulary span {
  margin-right: 10px;
}
.note {
  font-size: 14px;
  /* margin-bottom: 20px; */
}
.not_found {
  color: red;
}
</style>
