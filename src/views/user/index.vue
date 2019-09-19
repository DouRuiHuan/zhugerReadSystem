<template>
  <div class="box">
    <myNav :bread="routerData"/>
    <el-form :inline="true" class="search_box" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户名：">
            <el-input placeholder="输入用户名" size="small" style="width:150px"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号：">
            <el-input placeholder="输入用户名" size="small" style="width:150px"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册时间：">
            <date-picker ref="datePicker" :start-time="ruleForm.strat" :end-time="ruleForm.end"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="年龄：">
            <el-select size="small" style="width:150px;">
              <el-option label="全部" value=""/>
              <el-option label="男" value="1"/>
              <el-option label="女" value="2"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年级：">
            <el-select size="small" style="width:150px;">
              <el-option label="全部" value=""/>
              <el-option label="男" value="1"/>
              <el-option label="女" value="2"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="性别：">
            <el-select size="small" style="width:150px;">
              <el-option label="全部" value=""/>
              <el-option label="男" value="1"/>
              <el-option label="女" value="2"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button size="small" type="primary" @click="search">搜索</el-button>
          <el-button size="small" type="success" @click="reset">重置</el-button>
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
import myTable from '@/components/myTable'
import datePicker from '@/components/datePicker'
import { getBookList, shelf } from '@/api/book'
export default {
  components: { myTable, datePicker },
  data() {
    return {
      ruleForm: {
        start: '',
        end: ''
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
          prop: 'book_name',
          label: '用户ID',
          align: 'center',
          formatter: (row, column, cellValue) => {
            return `<img style="width:20px;height:30px;" src="${row.book_pic_url}"></img>`
          }
        },
        {
          prop: 'book_name',
          label: '用户名',
          align: 'center'
        },
        {
          prop: 'book_name',
          label: '手机号',
          align: 'center'
        },
        {
          prop: 'book_name',
          label: '年龄',
          align: 'center'
        },
        {
          prop: 'book_name',
          label: '性别',
          align: 'center'
        },

        {
          prop: 'book_name',
          label: '注册时间',
          align: 'center'
        },
        {
          prop: 'book_name',
          label: '设备',
          align: 'center'
        }

      ],
      operates: {
        width: 250,
        fixed: 'right',
        list: [
          {
            id: '1',
            label: '查看详情',
            style: 'color:#4e8afd;font-size:13px;',
            method: (index, row) => {
              this.$router.push({ path: '/userManagement/detail/index', query: { }})
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
        // this.ruleForm.total = +res.data.count
      })
    },
    search() {
      this.ruleForm.start = this.$refs.datePicker.startTime
      this.ruleForm.end = this.$refs.datePicker.endTime
    },
    reset() {

    },
    handleCurrentChange() {

    },
    handleSizeChange() {

    }
  }
}
</script>
<style scoped>

</style>

