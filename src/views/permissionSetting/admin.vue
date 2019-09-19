<template>
  <div>
    <myNav :bread="routerData"/>
    <el-form :inline="true" class="search_box">
      <el-row>
        <el-col :span="7">
          <el-form-item label="输入搜索：">
            <el-input size="small" style="width:200px;" placeholder="用户名" @change="fetchData"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="" prop="name">
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
        @handleSelectionChange="handleSelectionChange"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { getBookList, bookListShelf, top, booklistType } from '@/api/bookList'
import myTable from '@/components/myTable'
export default {
  components: { myTable },
  data() {
    return {
      ruleForm: {
        state: '1',
        type: '',
        name: '',
        pagesize: 10,
        page: 1,
        total: 0
      },
      routerData: {
        content: [{
          url: '',
          name: '添加管理员'
        }]
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
          prop: 'name',
          label: '用户ID',
          align: 'center'
        },
        {
          prop: 'name',
          label: '账号',
          align: 'center'
        },
        {
          prop: 'book_num',
          label: '姓名',
          align: 'center'
        },
        {
          prop: 'personal_reading_ability',
          label: '电话',
          align: 'center'
        },
        {
          prop: 'companion_quality',
          label: '分组',
          align: 'center'
        },
        {
          prop: 'book_num',
          label: '添加时间',
          align: 'center'
        },
        {
          prop: 'personal_reading_ability',
          label: '最后登陆',
          align: 'center'
        },
        {
          prop: 'companion_quality',
          label: '是否启用',
          align: 'center'
        }

      ], // 需要展示的列
      operates: {
        width: 300,
        fixed: 'right',
        list: [
          {
            id: '1',
            label: '编辑',
            style: 'color:#72B9EA;font-size:13px;',
            method: (index, row) => {
              // this.$router.push({ path: '/bookList/addBookList', query: { id: row.id }})
            }
          },
          {
            id: '1',
            label: '删除',
            style: 'color:#FAACAD;font-size:13px;',
            method: (index, row) => {
              // this.$router.push({ path: '/bookList/addBookList', query: { id: row.id }})
            }
          }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getBookList(this.ruleForm).then(res => {
        this.list = res.data.data
        this.ruleForm.total = +res.data.count
      })
    },
    search() {

    },
    reset() {

    },
    // 删除
    handleDel(index, row) {

    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    },
    handleSelectionChange(){
      
    }
  }
}
</script>
<style scoped>
</style>

