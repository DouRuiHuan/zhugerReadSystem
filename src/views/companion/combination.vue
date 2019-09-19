<template>
  <div class="box">
    <myNav :bread="routerData"/>
    <el-form :inline="true" class="search_box">
      <el-row>
        <el-col :span="5">
          <el-form-item label="组合名称：">
            <el-input v-model="ruleForm.combine_name" size="small" @change="fetchData"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="同伴名：">
            <el-input v-model="ruleForm.companion_name" size="small" @change="fetchData"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="书籍名：" prop="name">
            <el-input v-model="ruleForm.book_name" size="small" @change="fetchData"/>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label prop="name">
            <el-button icon="el-icon-search" type="primary" size="small" @click="search">搜索</el-button>
            <el-button icon="el-icon-refresh" size="small" type="success" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="table-page">
      <my-table
        :list="list"
        :options="options"
        :columns="columns"
        :operates="operates"
        :pagination="ruleForm"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import myTable from "@/components/myTable";
import { getCombineList, delCombine } from "@/api/companion";
export default {
  components: { myTable },
  data() {
    return {
      ruleForm: {
        combine_name: "",
        companion_name: "",
        book_name: "",
        page: 1,
        pagesize: 10,
        total: 0
      },
      routerData: {
        content: [
          {
            url: "/companion/combination/addCombination",
            name: "添加新组合"
          }
        ]
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
          prop: "combine_name",
          label: "组合名称",
          align: "center"
        },
        {
          prop: "companion_count",
          label: "同伴数量",
          align: "center"
        },
        {
          prop: "companion_name",
          label: "包含同伴",
          align: "center"
        }
      ], // 需要展示的列
      operates: {
        width: 300,
        fixed: "right",
        list: [
          {
            id: "1",
            label: "编辑",
            style: "color:#4e8afd;font-size:13px;",
            method: (index, row) => {
              this.$router.push({
                path: "/companion/combination/addCombination",
                query: { id: row.id }
              });
            }
          },
          {
            id: "2",
            label: "删除",
            style: "color:#fb9697;font-size:13px;",
            method: (index, row) => {
              this.open(row);
            }
          }
        ]
      } // 列操作按钮
      // pagination: {
      //   currentPage: 1,
      //   pageSizes: [10, 20, 50],
      //   pageSize: 10,
      //   total: 0,
      //   isShow: true
      // }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getCombineList(this.ruleForm).then(res => {
        this.list = res.data.data;
        this.ruleForm.total = +res.data.count;
      });
    },
    open(row) {
      this.$alert("确认删除当前组合？", "提示", {
        confirmButtonText: "确定",
        callback: action => {
          if (action === "confirm") {
            this.handleDel(row);
          }
        }
      });
    },
    // 删除
    handleDel(row) {
      delCombine({ id: row.id }).then(res => {
        this.$message.success("删除成功");
        this.fetchData();
      });
    },
    search() {
      this.ruleForm.page = 1;
      this.fetchData();
    },
    reset() {
      this.ruleForm = {
        combine_name: "",
        companion_name: "",
        page: 1,
        pagesize: 10,
        total: 0
      };
      this.fetchData();
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

