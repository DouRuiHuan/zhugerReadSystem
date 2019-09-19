<template>
  <div>
    <myNav :bread="routerData" />

    <el-form :inline="true" class="search_box">
      <el-row>

          <!-- <el-form-item label="手机号" prop="book_name">
            
          </el-form-item>-->
          <p class="search_box_body">
            <span>手机号：</span>
            <span>15175331451</span>
            <span>用户姓名：</span>
            <span>我爱大语文</span>
            <span>其它学员：</span>
            <span>学员1</span>
          </p>
      </el-row>
    </el-form>

    <!-- table -->
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
import { getBulidList } from "@/api/dlinepack";
export default {
  components: { myTable },
  data() {
    return {
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
        content: []
      },
      list: [], // table数据
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      }, // table 的参数
      columns: [
        {
          prop: "book_pic_url",
          label: "书籍",
          align: "center",
          formatter: (row, column, cellValue) => {
            return `<img style="width:20px;height:30px;" src="${row.book_pic_url}"></img>`;
          }
        },
        {
          prop: "book_name",
          label: "解锁进度",
          align: "center"
        },
        {
          prop: "book_attributereads",
          label: "星数",
          align: "center"
        },
        {
          prop: "recommendreads",
          label: "阅读时长(分)",
          align: "center"
        },
        {
          prop: "bookauthor",
          label: "阅读关数",
          align: "center"
        }
      ],
      // 需要展示的列
      operates: {
        width: 250,
        fixed: "right",
        list: [
          {
            id: "1",
            label: "详情",
            style: "color:#4e8afd;font-size:13px;",
            method: (index, row) => {
            //   this.$router.push({
            //     path: "/duserManagement/details"
            //     //    params:{row}
            //   });
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
.search_box_body {
  /* line-height: 32px; */
  padding: 20px 0;
  font-size: 16px;
  color: #909399;
}
 .search_box_body span {
  display: inline-block;
  padding-right: 20px;
  text-align: center;
  font-size: 13px;
}
</style>