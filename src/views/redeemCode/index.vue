<template>
  <div>
    <myNav :bread="routerData" />
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
import { getList, deleteRedeemCode } from "@/api/redeemCode";
export default {
  components: { myTable },
  data() {
    return {
      routerData: {
        content: [
          {
            url: "/redeemCode/addRedeemCode",
            name: "创建兑换码"
          }
        ]
      },
      ruleForm: {
        page: 1,
        pagesize: 10,
        total: 0
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
          prop: "name",
          label: "兑换码备注",
          align: "center"
        },
        {
          prop: "",
          label: "已使用/总数",
          align: "center",
          formatter: (row, column, cellValue) => {
            return `${row.used_count}/${row.count}`;
          }
        },
        {
          prop: "",
          label: "有效期",
          align: "center",
          formatter: (row, column, cellValue) => {
            return `${row.start_time}~${row.end_time}`;
          }
        }
      ],
      operates: {
        width: 300,
        fixed: "right",
        list: [
          {
            id: "1",
            label: "详情",
            style: "color:#4e8afd;font-size:13px;",
            method: (index, row) => {
              this.$router.push({
                path: "/redeemCode/checkRedeemCode",
                query: { id: row.id }
              });
            }
          },
          {
            id: "2",
            style: "color:#fb9697;font-size:13px;",
            method: (index, row) => {
              this.open(row.id);
            },
            content: (index, row) => {
              return row.status == 1 ? "失效" : "";
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
      getList(this.ruleForm).then(res => {
        // console.log(res)
        this.list = res.data.data;
        this.ruleForm.total = +res.data.count;
      });
    },
    handleSelectionChange(val){
      console.log(val)
    },
    handleSizeChange(val) {
      this.ruleForm.pagesize = val;
      this.ruleForm.page = 1;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.ruleForm.page = val;
      this.fetchData();
    },
    open(id) {
      this.$alert("确认修改当前兑换码为失效状态？", "提示", {
        confirmButtonText: "确定",
        callback: action => {
          if (action === "confirm") {
            this.lose(id);
          }
        }
      });
    },
    lose(id) {
      deleteRedeemCode({ id: id }).then(res => {
        this.$message.success("操作成功");
        this.fetchData();
      });
    }
  }
};
</script>
<style  scoped>
/deep/ .el-table td.is-center .operate-group {
  text-align: left;
  margin-left: 70px;
}
</style>


