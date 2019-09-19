
<template>
<!-- 窦瑞环 >> 离线打包页面 -->
  <div>
      <!-- 上面的头部 -->
    <myNav :bread="routerData" />

  <!-- 中间的样式 -->
    <el-form :inline="true" class="search_box">
      <el-row>
        <el-col :span="6">
          <el-form-item label="搜素书籍:" prop="book_name">
            <el-input
              v-model="ruleForm.book_name"
              size="small"
              style="width:260px;"
              @change="fetchData"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label prop="name">
            <el-button icon="el-icon-search" type="primary" size="small" @click="search">搜索</el-button>
          </el-form-item>
        </el-col>
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
import {getBulidList} from "@/api/dlinepack"
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
        //   不需要内容
        content: [
          //   {
          //     url: "/books/addBook",
          //     name: "添加新书"
          //   }
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
          prop: "book_attributereads",
          label: "价格",
          align: "center"
        },
        {
          prop: "recommendreads",
          label: "级别",
          align: "center"
        },
        {
          prop: "bookauthor",
          label: "掉落详情",
          align: "center"
        },
        {
           prop: "bookauthor1",
          label: "知识点/宝箱/重点词汇",
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
               this.open(index,row)
            }
          },
          {
            id: "2",
            label: "关闭下载",
            style: "color:#fb9697;font-size:13px;",
            method: (index, row) => {
               this.open(index,row)
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

        //打开提示
    open(index,row) {
      console.log(index,row)
      var content = index===0?"确定要打包吗":"确定要关闭下载吗"
      this.$alert( content,'提示', {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            if(index===0){
              console.log(index);
              this.getBuildData(row);
            }else{
              this.closePack(row)
            }
            
          }
        }
      })
    },

    // 打包提示
    getBuildData(row){
      console.log(row)
      getBulid({book_id:row.id}).then(res=>{
        console.log(res);
      })
    },


  // 确定之后请求关闭下载的接口
    closePack(row){
      closeDownLoad({id:row.id}).then(res=>{
        if(res.success){
          this.$message.success('操作成功');
          this.fetchData();
        }
      })
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