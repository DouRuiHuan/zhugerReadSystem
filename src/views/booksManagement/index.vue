<template>
  <div>
    <myNav :bread="routerData" />
    <el-form :inline="true" class="search_box">
      <el-row>
        <el-col :span="6">
          <!-- <el-form-item label="书籍类型：" prop="name">
            <el-select v-model="value" placeholder="选择书籍类型" size="small" style="width:130px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>-->
        </el-col>
        <el-col :span="6">
          <el-form-item label="书籍难度：" prop="recommend_reads">
            <el-select
              v-model="ruleForm.recommend_reads"
              placeholder="选择书籍难度"
              size="small"
              style="width:130px;"
              @change="fetchData"
            >
              <el-option label="全部" value />
              <el-option label="0~59" value="0" />
              <el-option label="50~99" value="1" />
              <el-option label="100~149" value="2" />
              <el-option label="150+" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="书籍状态：" prop="state">
            <el-radio v-model="ruleForm.state" label="0" size="small" @change="search">下架</el-radio>
            <el-radio v-model="ruleForm.state" label="1" size="small" @change="search">上架</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="书籍名称：" prop="book_name">
            <el-input
              v-model="ruleForm.book_name"
              size="small"
              style="width:130px;"
              @change="fetchData"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="书籍作者：" prop="book_author">
            <el-input
              v-model="ruleForm.book_author"
              size="small"
              style="width:130px;"
              @change="fetchData"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label prop="name">
            <el-button icon="el-icon-search" type="primary" size="small" @click="search">搜索</el-button>
            <el-button icon="el-icon-refresh" size="small" type="success" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="batch">
      <el-button
        size="small"
        type="primary"
        @click="optionFn"
      >{{ ruleForm.state === '1'?'全部下架':'全部上架' }}</el-button>
    </el-row>
    <div class="table-page">
      <my-table
        :list="list"
        :options="options"
        :columns="columns"
        :operates="operates"
        :pagination="ruleForm"
        @handleSelectionChange="handleSelectionChange"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import myTable from "@/components/myTable";
import { getBookList, shelf } from "@/api/book";
export default {
  components: { myTable },
  data() {
    return {
      optionContent: "全部下架",
      ids: "",
      ruleForm: {
        recommend_reads: "",
        state: "1",
        book_name: "",
        book_author: "",
        page: 1,
        pagesize: 10,
        total: 0
      },
      routerData: {
        content: [
          {
            url: "/books/addBook",
            name: "添加新书"
          }
        ]
      },
      list: [], // table数据
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true // 是否支持列表项选中功能
      }, // table 的参数
      columns: [
        {
          prop: "book_pic_url",
          label: "书籍封面",
          align: "center",
          formatter: (row, column, cellValue) => {
            return `<img style="width:20px;height:30px;" src="${row.book_pic_url}"></img>`;
          }
        },
        {
          prop: "book_name",
          label: "书籍名称",
          align: "center"
        },
        {
          prop: "original_price",
          label: "价格",
          align: "center"
        },
        {
          prop: "discount",
          label: "折扣",
          align: "center",
          render: (h, params) => {
            return h(
              "el-tag",
              {
                // props: {
                //   type: params.row.state === 0 ? 'success' : params.row.state === 1 ? 'info' : 'danger'
                // } // 组件的props
              },
              +params.row.discount === 0 ? "免费" : params.row.discount
            );
          }
        },
        {
          prop: "book_attribute_reads",
          label: "提升阅读力",
          align: "center"
        },
        {
          prop: "recommend_reads",
          label: "阅读力限制",
          align: "center"
        },
        {
          prop: "book_author",
          label: "作者",
          align: "center"
        }
      ], // 需要展示的列
      operates: {
        width: 250,
        fixed: "right",
        list: [
          {
            id: "1",
            label: "详情",
            style: "color:#4e8afd;font-size:13px;",
            method: (index, row) => {
              this.$router.push({
                path: "/books/addBook",
                query: { bookId: row.id }
              });
            }
          },
          {
            id: "2",
            style: "color:#fb9697;font-size:13px;",
            method: (index, row) => {
              this.open(row);
            },
            content: (index, row) => {
              return row.state == 1 ? "下架" : "上架";
            }
          },
          {
            id: "3",
            label: "关卡",
            style: "color:#3dc5c6;font-size:13px;",
            method: (index, row) => {
              this.$router.push({
                path: "/books/stage/index",
                query: { bookId: row.id }
              });
            }
          }
        ]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBookList(this.ruleForm).then(res => {
        this.list = res.data.data;
        this.ruleForm.total = +res.data.count;
      });
    },
    search() {
      this.ruleForm.page = 1;
      this.fetchData();
      this.optionContent = this.ruleForm.state == 1 ? "全部下架" : "全部上架";
    },
    // 重置
    reset() {
      this.ruleForm = {
        recommend_reads: "",
        state: "1",
        book_name: "",
        book_author: ""
      };
      this.ruleForm.page = 1;
      this.fetchData();
      this.optionContent = "全部下架";
    },
    // 上下架操作
    shelfFn(id, action) {
      shelf({ ids: id, action: action }).then(res => {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.fetchData();
      });
    },
    open(row) {
      var content =
        this.ruleForm.state == 0 ? "确认上架当前书籍？" : "确认下架当前书籍？";
      this.$alert(content, "提示", {
        confirmButtonText: "确定",
        callback: action => {
          if (action === "confirm") {
            var bookAction = row.state == 1 ? "downshelf" : "upshelf";
            this.shelfFn(row.id, bookAction);
          }
        }
      });
    },
    optionFn() {
      const option =
        this.optionContent === "全部下架" ? "downshelf" : "upshelf";
      this.shelfFn(this.ids, option);
    },
    // 选中行
    handleSelectionChange(val) {
      var ids_bak = [];
      val.forEach(function(item, index, arr) {
        ids_bak.push(item.id);
      });
      this.ids = ids_bak.toString();
    },
    handleSizeChange(val) {
      this.ruleForm.pagesize = val;
      this.ruleForm.page = 1;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.ruleForm.page = val;
      this.fetchData();
    }
  }
};
</script>
<style scoped>
/deep/ .el-form--inline .el-form-item__content {
  width: 50%;
}
</style>

