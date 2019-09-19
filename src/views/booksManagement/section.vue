<template>
  <div>
    <myNav :bread="routerData"/>
    <div class="table-page">
      <myTable
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
import { deleteChapter, getChapterList } from "@/api/book";
export default {
  components: { myTable },
  data() {
    return {
      ruleForm: {
        book_id: this.$route.query.bookId,
        page: 1,
        pagesize: 10,
        total: 0
      },
      routerData: {
        content: [
          {
            url: { path: "/books/stage/section/addSection", query: {} },
            name: "添加新章"
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
          prop: "chapter_name",
          label: "章节标题",
          align: "center"
        },
        {
          prop: "checkpoints_num",
          label: "关卡数量",
          align: "center"
        },
        {
          prop: "checkpoints",
          label: "包含关卡",
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
                path: "/books/stage/section/addSection",
                query: { sectionId: row.id, bookId: this.$route.query.bookId }
              });
            }
          }
          // {
          //   id: '2',
          //   label: '删除',
          //   style: 'color:#fb9697;font-size:13px;',
          //   method: (index, row) => {
          //     this.handleDel(index, row)
          //   }
          // }
        ]
      }
    };
  },
  created() {
    this.routerData.content[0].url.query.bookId = this.$route.query.bookId;
    this.fetchData();
  },
  methods: {
    fetchData() {
      getChapterList(this.ruleForm).then(res => {
        this.list = res.data.data;
        this.ruleForm.total = +res.data.count;
      });
    },
    // 删除
    handleDel(index, row) {
      deleteChapter({ id: row.id }).then(res => {
        this.$message.success("删除成功");
        this.fetchData();
      });
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
</style>

