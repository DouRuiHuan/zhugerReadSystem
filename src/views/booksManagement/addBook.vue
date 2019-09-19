<template>
  <div>
    <myNav :bread="routerData" />
    <div class="box">
      <el-form ref="pageData" :inline="true" :model="pageData" :rules="rules" label-width="100px">
        <div class="part1">
          <tips title="1" content="书籍基本信息" />
          <div class="part_content">
            <el-row>
              <el-form-item label="书名:" prop="book_name">
                <el-input
                  v-model="pageData.book_name"
                  size="small"
                  placeholder="书籍名称"
                  maxlength="24"
                  style="width:50%"
                />
                <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ bookName }}/24</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="作者:" prop="book_author">
                <el-col :span="10">
                  <el-input v-model="pageData.book_author" size="small" placeholder="作者名字" />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="译者:" prop="book_translatorame">
                <addNewInput :character="pageData.book_translator" hint="译者名" />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="制作人:" prop="book_producer">
                <el-col :span="10">
                  <el-input v-model="pageData.book_producer" size="small" placeholder="制作人名字" />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="制作人介绍:" prop="book_producer_introduce">
                <el-input
                  v-model="pageData.book_producer_introduce"
                  :autosize="{minRows:3,maxRows:10}"
                  class="textarea"
                  type="textarea"
                  placeholder="制作人介绍"
                />
              </el-form-item>
            </el-row>
            <!-- <el-row>
              <el-form-item label="类型:" prop="name">
                <el-col :span="7">
                  <el-select v-model="value" placeholder="选择书籍类型" size="small">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="value" placeholder="选择书籍类型" size="small">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>-->
            <el-row>
              <el-form-item label="题材:" prop="book_theme">
                <el-col :span="7">
                  <el-input v-model="pageData.book_theme" size="small" placeholder="题材" />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="体裁:" prop="book_genre">
                <el-col :span="7">
                  <el-input v-model="pageData.book_genre" size="small" placeholder="体裁" />
                </el-col>
              </el-form-item>
            </el-row>
            <!-- <el-row>
              <el-form-item label="时代:" prop="name">
                <el-col :span="7">
                  <el-input v-model="pageData.name" size="small" placeholder="时代"/>
                </el-col>
              </el-form-item>
            </el-row>
             <el-row>
              <el-form-item label="特点:" prop="name">
                <addNewInput hint="特点"/>
              </el-form-item>
            </el-row>-->
            <el-row>
              <el-form-item label="推荐阅读力:" prop="recommend_reads">
                <el-col :span="7">
                  <el-input
                    v-enter-number
                    type="number"
                    v-model="pageData.recommend_reads"
                    size="small"
                    placeholder="推荐阅读力"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="书籍封面:" prop="book_pic_url">
                <span>图片尺寸：800*800px，主图大小不能超过800k</span>
                <upload :image="pageData.book_pic_url" number="0" @success="success" />
              </el-form-item>
            </el-row>
          </div>
        </div>
        <div class="part2">
          <tips title="2" content="书籍内容预习" />
          <div class="part_content">
            <el-row>
              <el-form-item label="作者故事：" prop="author_story">
                <el-input
                  v-model="pageData.author_story"
                  :autosize="{minRows:3,maxRows:10}"
                  class="textarea"
                  type="textarea"
                  placeholder="作者故事"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="创作背景：" prop="background">
                <el-input
                  v-model="pageData.background"
                  :autosize="{minRows:3,maxRows:10}"
                  class="textarea"
                  type="textarea"
                  placeholder="创作背景"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="内容特色：" prop="content_character">
                <el-input
                  v-model="pageData.content_character"
                  :autosize="{minRows:3,maxRows:10}"
                  class="textarea"
                  type="textarea"
                  placeholder="内容特色"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="内容简介：" prop="content_brief">
                <el-input
                  v-model="pageData.content_brief"
                  :autosize="{minRows:3,maxRows:10}"
                  class="textarea"
                  type="textarea"
                  placeholder="内容简介"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="兴趣关联：" prop="interest_ids">
                <el-select
                  v-model="interest_ids"
                  :loading="loading"
                  style="width:86%;"
                  multiple
                  filterable
                  remote
                  size="small"
                  reserve-keyword
                  placeholder="请输入关键词"
                >
                  <el-option
                    v-for="item in interestOption"
                    :key="item.id"
                    :label="item.interest_name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-row>
          </div>
        </div>
        <div class="part3">
          <tips title="3" content="书籍提升属性设置" />
          <el-form-item label=" " prop="book_attribute_reads" style="margin-left:-40px">
            <h1>阅读力：{{ book_attribute_reads }}</h1>
            <div class="reading_values">
              <p>
                <span>认读值</span>
                <el-input
                  v-enter-number
                  v-model="pageData.book_attribute_cognition"
                  type="number"
                  size="small"
                />
              </p>
              <p>
                <span>理解值</span>
                <el-input
                  v-enter-number
                  v-model="pageData.book_attribute_understanding"
                  type="number"
                  size="small"
                />
              </p>
              <p>
                <span>鉴赏值</span>
                <el-input
                  v-enter-number
                  v-model="pageData.book_attribute_skill"
                  type="number"
                  size="small"
                />
              </p>
              <p>
                <span>技巧值</span>
                <el-input
                  v-enter-number
                  v-model="pageData.book_attribute_appreciate"
                  type="number"
                  size="small"
                />
              </p>
              <p>
                <span>评价值</span>
                <el-input
                  v-enter-number
                  v-model="pageData.book_attribute_estimate"
                  type="number"
                  size="small"
                />
              </p>
            </div>
          </el-form-item>
        </div>
        <div class="part4">
          <tips title="4" content="关联同伴" />
          <el-form-item label=" " prop="discount_start_date" style="margin-left:-40px">
            <span>已关联{{ associated }}/10个同伴</span>
            <div class="part_content part_content2">
              <!-- <p><span class="red">*</span>已关联{{ associated}}/10个同伴</p> -->
              <div class="partner" v-for="(item,index) in relationship">
                <el-autocomplete
                  v-model="relationship[index].name"
                  :fetch-suggestions="querySearchAsync"
                  :trigger-on-focus="true"
                  style="width:160px;"
                  size="small"
                  multiple
                  placeholder="请输入内容搜索同伴"
                  @focus="currentInputBox(index)"
                  @select="handleSelect"
                />
                <i class="el-icon-delete" @click="delPartner(index)" />
              </div>
              <i v-if="addParterBtn" class="iconfont icon-jiahao1 add_img" @click="addPartner" />
            </div>
          </el-form-item>
          <!-- <div class="part_content" style="margin-left:40px;">
            <p><span class="red">*</span>已关联{{ associated }}/5个同伴</p>
            <template v-for="(item,index) in relationship">
              <div class="partner">
                <el-autocomplete
                  v-model="relationship[index].name"
                  :fetch-suggestions="querySearchAsync"
                  :trigger-on-focus="false"
                  style="width:130px;"
                  size="small"
                  multiple
                  placeholder="请输入内容"
                  @focus="currentInputBox(index)"
                  @select="handleSelect"
                />
                <i class="el-icon-delete" @click="delPartner(index)"/>
              </div>
            </template>
            <i v-if="addParterBtn" class="iconfont icon-jiahao1 add_img" @click="addPartner"/>
          </div>-->
        </div>
        <div class="part5">
          <tips title="5" content="价格" />
          <div class="part_content">
            <el-row>
              <el-form-item label="原价：" prop="original_price">
                <el-col :span="10">
                  <el-input v-model="pageData.original_price" size="small" />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row class="discount">
              <el-form-item label="折扣：" prop="discount">
                <el-input v-model="pageData.discount" size="small" style="width:150px;" />
                <date-picker
                  ref="datePicker"
                  :start-time.sync="pageData.discount_start_date"
                  :end-time.sync="pageData.discount_end_date"
                />
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
import datePicker from "@/components/datePicker/index";
import { checkMoney } from "@/utils/validate";
import {
  addBook,
  getInterestList,
  handleCompanion,
  getBookDetail,
  modifyBookDetail
} from "@/api/book";
export default {
  components: { addNewInput, tips, upload, datePicker },
  data() {
    const validateReading = (rule, value, callback) => {
      var num1 =
        this.pageData.book_attribute_cognition > 0 &&
        this.pageData.book_attribute_cognition <= 255;
      var num2 =
        this.pageData.book_attribute_understanding > 0 &&
        this.pageData.book_attribute_understanding <= 255;
      var num3 =
        this.pageData.book_attribute_skill > 0 &&
        this.pageData.book_attribute_skill <= 255;
      var num4 =
        this.pageData.book_attribute_appreciate > 0 &&
        this.pageData.book_attribute_appreciate <= 255;
      var num5 =
        this.pageData.book_attribute_estimate > 0 &&
        this.pageData.book_attribute_estimate <= 255;

      if (num1 && num2 && num3 && num4 && num5) {
        callback();
      } else {
        callback(new Error("书籍提升属性需全部填写，并且值在0~255之间!"));
      }
    };
    const relation = (rule, value, callback) => {
      if (this.associated > 0) {
        callback();
      } else {
        callback(new Error("关联同伴不能为空"));
      }
    };
    const validateMoney = (rule, value, callback) => {
      if (checkMoney(value)) {
        callback();
      } else {
        callback(new Error("原价输入格式不正确"));
      }
    };
    const validateDiscount = (rule, value, callback) => {
      if (value) {
        if (!checkMoney(this.pageData.discount)) {
          callback(new Error("折扣输入格式不正确"));
        } else {
          if (
            this.pageData.discount > 0 &&
            (!this.pageData.discount_start_date ||
              !this.pageData.discount_end_date)
          ) {
            callback(new Error("请选择开始和结束日期"));
          } else {
            callback();
          }
        }
      } else {
        callback();
      }
    };
    return {
      bookId: "",
      interest_ids: "",
      pageData: {
        book_name: "",
        book_author: "",
        book_translator: [""],
        book_producer: "",
        book_producer_introduce: "",
        recommend_reads: "",
        book_pic_url: "",
        author_story: "",
        background: "",
        content_character: "",
        content_brief: "",
        book_attribute_cognition: "",
        book_attribute_understanding: "",
        book_attribute_skill: "",
        book_attribute_appreciate: "",
        book_attribute_estimate: "",
        original_price: "",
        discount: "",
        discount_start_date: "",
        discount_end_date: "",
        interest_ids: "",
        companion_ids: "",
        book_theme: "",
        book_genre: ""
      },
      relationship: [{ name: "" }],
      tabIndex: "",
      pickerOptionsEnd: "",
      interestOption: [],
      routerData: {
        content: []
      },
      rules: {
        book_name: [
          { required: true, trigger: "blur", message: "书名不能为空" }
        ],
        book_author: [
          { required: true, trigger: "blur", message: "作者不能为空" }
        ],
        book_producer: [
          { required: true, trigger: "blur", message: "制作人不能为空" }
        ],
        book_producer_introduce: [
          { required: true, trigger: "blur", message: "制作人介绍不能为空" }
        ],
        recommend_reads: [
          { required: true, trigger: "blur", message: "推荐阅读力不能为空" }
        ],
        book_pic_url: [
          { required: true, trigger: "blur", message: "书籍封面不能为空" }
        ],
        author_story: [
          { required: true, trigger: "blur", message: "作者故事不能为空" }
        ],
        background: [
          { required: true, trigger: "blur", message: "创作背景不能为空" }
        ],
        content_character: [
          { required: true, trigger: "blur", message: "内容特色不能为空" }
        ],
        content_brief: [
          { required: true, trigger: "blur", message: "内容简介不能为空" }
        ],
        book_theme: [
          { required: true, trigger: "blur", message: "题材不能为空" }
        ],
        book_genre: [
          { required: true, trigger: "blur", message: "体裁不能为空" }
        ],
        // book_attribute_cognition: [
        //   { validator: validateReading, trigger: 'blur' }
        // ],
        // book_attribute_understanding: [
        //   { validator: validateReading, trigger: 'blur' }
        // ],
        // book_attribute_skill: [
        //   { validator: validateReading, trigger: 'blur' }
        // ],
        // book_attribute_appreciate: [
        //   { validator: validateReading, trigger: 'blur' }
        // ],
        // book_attribute_estimate: [
        //   { validator: validateReading, trigger: 'blur' }
        // ],
        original_price: [
          { required: true, message: "原价不能为空" },
          { validator: validateMoney, message: "原价格式不正确" }
        ],
        discount_start_date: [{ required: true, validator: relation }],
        book_attribute_reads: [{ required: true, validator: validateReading }],
        discount: [{ validator: validateDiscount, trigger: "blur" }],
        interest_ids: [
          { required: true, trigger: "blur", message: "兴趣关联不能为空" }
        ]
      },
      addParterBtn: true,
      loading: false,
      imageUrl: ""
    };
  },
  computed: {
    associated: function() {
      var associated_bak = [];
      this.relationship.forEach(function(item, index) {
        if (item.name) {
          associated_bak.push(item);
        }
      });
      return associated_bak.length;
    },
    bookName: function() {
      return this.pageData.book_name.length;
    },
    book_attribute_reads: function() {
      const attr1 = +this.pageData.book_attribute_cognition;
      const attr2 = +this.pageData.book_attribute_understanding;
      const attr3 = +this.pageData.book_attribute_skill;
      const attr4 = +this.pageData.book_attribute_appreciate;
      const attr5 = +this.pageData.book_attribute_estimate;
      return attr1 + attr2 + attr3 + attr4 + attr5;
    }
  },
  created() {
    this.bookId = this.$route.query.bookId;
    this.isShowBtn();
    getInterestList().then(res => {
      if (res.data.length > 0) {
        this.interestOption = res.data;
      } else {
        // this.interestOption = ['暂无数据']
      }
    });
    if (this.bookId) {
      getBookDetail({ id: this.bookId }).then(res => {
        var interest_ids_bak = [];
        res.data.interest_ids.forEach(function(item, index) {
          interest_ids_bak.push(item.id);
        });
        this.interest_ids = interest_ids_bak;
        this.pageData = res.data;
        this.relationship = res.data.companion_ids;
      });
    }
  },
  methods: {
    querySearchAsync(val, callback) {
      handleCompanion({ companion_name: val }).then(res => {
        res.data.forEach(function(item, index) {
          item.value = item.name;
        });
        callback(res.data);
      });
    },
    currentInputBox(index) {
      this.tabIndex = index;
    },
    handleSelect(val) {
      this.relationship[this.tabIndex].id = val.id;
    },
    isNullFn() {
      var flag = true;
      this.relationship.forEach((item, index) => {
        if (!item.name) {
          this.$message.error("关联同伴输入框不能为空");
          flag = false;
        }
      });
      return flag;
    },
    addPartner() {
      if (!this.isNullFn()) return;
      this.relationship.push({
        name: ""
      });
      this.isShowBtn();
    },
    isShowBtn() {
      if (this.relationship.length < 10) return;
      this.addParterBtn = false;
    },
    delPartner(index) {
      this.relationship.splice(index, 1);
      if (this.relationship.length < 10) {
        this.addParterBtn = true;
      }
    },
    beforeSubmit() {
      var companion_id_bak = [];
      this.relationship.forEach(function(item, index, arr) {
        companion_id_bak.push(item.id);
      });
      this.pageData.companion_ids = companion_id_bak.toString();
      this.pageData.interest_ids = this.interest_ids.toString();
      this.pageData.book_attribute_reads = this.book_attribute_reads;
      // this.pageData.discount_start_date = this.$refs.datePicker.startTime
      // this.pageData.discount_end_date = this.$refs.datePicker.endTime
    },
    save(formName) {
      this.beforeSubmit();
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.bookId) {
            this.pageData.book_id = this.bookId;
            modifyBookDetail(this.pageData).then(res => {
              this.$message.success("保存成功");
              this.$router.push("/books/index");
            });
          } else {
            addBook(this.pageData).then(res => {
              this.$message.success("保存成功");
              this.$router.push("/books/index");
            });
          }
        } else {
          this.$message.error("必填项不能为空");
          return false;
        }
      });
    },
    success(res) {
      this.pageData.book_pic_url = res[0];
    }
  }
};
</script>
<style scoped>
/deep/ .el-form--inline .el-form-item__content {
  width: 85%;
}
/deep/ .reading_values .el-input__inner {
  width: 50px;
  height: 25px;
  line-height: 15px;
  padding: 0 5px;
}
.box {
  width: 95%;
  margin: 0 0 30px 30px;
  padding: 10px 0 0 50px;
  box-shadow: 0 0 20px #ccc;
}
.part_content {
  overflow: hidden;
}
.part2 .el-form-item {
  margin-top: 5px;
}
.part_content2 {
  display: flex;
  flex-wrap: wrap;
}
.partner {
  margin: 0 20px 10px 0;
}
.part3 h1 {
  width: 150px;
  line-height: 25px;
  background: #ccc;
  font-weight: normal;
  font-size: 13px;
  text-align: center;
}
.reading_values {
  width: 100%;
  display: flex;
}
.reading_values p {
  font-size: 12px;
  width: 20%;
  display: flex;
  align-items: center;
}
.reading_values span {
  display: inline-block;
  width: 90px;
  line-height: 25px;
  background: #ccc;
  text-align: center;
  margin-right: 10px;
}
input {
  -moz-appearance: textfield;
}
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
input::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
}
.reading_values input {
  outline: none;
  border: 1px solid #ccc;
  text-align: center;
  width: 40px;
  line-height: 20px;
  vertical-align: middle;
  margin-left: 10px;
}
/deep/ .avatar {
  width: 70px;
  height: 70px;
}
.part4 p {
  margin: 20px 0;
  font-size: 13px;
}
</style>

