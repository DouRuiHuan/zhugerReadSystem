
<template>
  <!-- 窦瑞环 >> 离线打包页面 -->
  <div>
    <!-- 上面的头部 -->
    <myNav :bread="routerData" />
 

    <!-- table -->
    <div class="table-page">
      <div class="search_box_header">
        <span>学习行为</span>
        <span>
          <date-picker />
        </span>
      </div>
      <my-table
        v-loading="loading"
        :list="buildList"
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
import datePicker from "@/components/datePicker";
import { getBulidList, getBulid, closeDownLoad } from "@/api/dlinepack";
export default {
  components: { myTable,datePicker },
  data() {
    return {
      loading: false,
      ids: "",
      ruleForm: {
        page: 1,
        pagesize: 10,
        book_name: ""
      },
      routerData: {
        content: []
      },
      buildList: [], // table数据
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true // 是否支持当前行高亮显示
        // mutiSelect: true // 是否支持列表项选中功能
      }, // table 的参数
      columns: [
        {
          prop: "book_name",
          label: "书籍名称",
          align: "center"
        },
        {
          prop: "pack_time",
          label: "打包时间",
          align: "center"
        },
        {
          prop: "file_size",
          label: "文件大小(单位M)",
          align: "center"
        },
        {
          prop: "checkpoint_count",
          label: "关卡数量",
          align: "center"
        },
        {
          prop: "companion_count",
          label: "同伴数量",
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
            label: "打包",
            style: "color:#4e8afd;font-size:13px;",
            method: (index, row) => {
              this.open(index, row);
            }
          },
          {
            id: "2",
            style: "color:#fb9697;font-size:13px;",
            method: (index, row) => {
              this.open(index, row);
            },
            content(index, row) {
              return row.status;
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
      getBulidList(this.ruleForm).then(res => {
        this.buildList = res.data.data;
        this.buildList.forEach(item => {
          item.pack_time = item.pack_time ? item.pack_time : "暂无数据";
          item.file_size = item.file_size
            ? (item.file_size / 1048576).toFixed(2)
            : "暂无数据";
          item.status = item.status === "0" ? "关闭下载" : "打开下载";
        });
        this.ruleForm.total = +res.data.count;
      });
    },

    // 搜索
    search() {
      this.ruleForm.page = 1;
      this.fetchData();
    },

    //打开提示
    open(index, row) {
      var content = index === 0 ? "确定要打包吗" : "确定要关闭下载吗";
      this.$alert(content, "提示", {
        confirmButtonText: "确定",
        callback: action => {
          if (action === "confirm") {
            if (index === 0) {
              this.getBuildData(row);
              this.loading = true;
            } else {
              this.closePack(row);
            }
          }
        }
      });
    },

    // 打包提示
    getBuildData(row) {
      getBulid({ book_id: row.id }).then(res => {
        if (res.success) {
          this.loading = false;
          this.$message.success("打包成功");
          this.fetchData();
        }
      });
    },

    // 确定之后请求关闭下载的接口
    closePack(row) {
      closeDownLoad({ id: row.id }).then(res => {
        if (res.success) {
          this.$message.success("操作成功");
          this.fetchData();
        }
      });
    },

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
  overflow: hidden;
}
.search_box_header {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
}
.search_box_header span:first-child {
  float: left;
}

.search_box_header span:last-child {
  float: right;
}
</style>