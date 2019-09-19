<template>
  <div>
    <myNav :bread="routerData" />
    <div class="switch">
      <span>消息开关：</span>
      <el-switch
        v-model="action"
        active-color="#3399ff"
        inactive-color="#eee"
        @change="changeSwitch"
      ></el-switch>
    </div>
    <div class="table-page">
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="created_time" label="时间"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="内容">
          <template slot-scope="scope">
            <template v-if="scope.row.content.length>20">
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.content"
                placement="top-start"
              >
                <span>
                  {{scope.row.content_bak}}
                  <i class="full_text">全文</i>
                </span>
              </el-tooltip>
            </template>
            <template v-else>{{scope.row.content}}</template>
          </template>
        </el-table-column>
        <el-table-column prop="jump_type" label="跳转"></el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          size="small"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getMessageList, getSwitch, setSwitch } from "@/api/message";
export default {
  data() {
    return {
      routerData: {
        content: [
          {
            url: "/message/add",
            name: "新增消息"
          }
        ]
      },
      list: [],
      action: "",
      total: 0,
      ruleForm: {
        page: 1,
        pagesize: 10
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getMessageList(this.ruleForm).then(res => {
        res.data.data.forEach(item => {
          item.content_bak = item.content.substr(0, 20);
        });
        this.list = res.data.data;
        this.total = +res.data.count;
      });
      getSwitch().then(res => {
        this.action = +res.data ? true : false;
      });
    },
    handleSizeChange(val) {
      this.ruleForm.pagesize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.ruleForm.page = val;
      this.fetchData();
    },
    changeSwitch(value) {
      setSwitch({ action: value ? "on" : "off" }).then(() => {});
    }
  }
};
</script>
<style scoped>
.switch {
  font-size: 14px;
  margin: 0 0 20px 30px;
}
.full_text {
  color: #3399ff;
  font-style: normal;
}
/deep/ .el-table td,
/deep/ .el-table th {
  padding: 7px 0;
  font-size: 13px;
}
.page {
  text-align: center;
  padding: 10px 0;
}
/deep/ .el-pagination__editor.el-input .el-input__inner {
  height: 22px;
}
</style>
