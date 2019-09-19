<template>
  <div class="table-page">
    <my-table
      :list="list"
      :options="options"
      :columns="$attrs.from?columns2:columns"
      :operates="operates"
      :pagination="ruleForm"
      :show-operates="false"
      @handleSelectionChange="handleSelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>
<script>
import myTable from '@/components/myTable'
import { getBookList, shelf } from '@/api/book'
export default {
  components: { myTable },

  data() {
    return {
      routerData: {
        content: [],
        isShow: true
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
          prop: 'book_name7',
          label: '用户名',
          align: 'center',
          formatter: (row, column, cellValue) => {
            // return `<img style="width:20px;height:30px;" src="${row.book_pic_url}"></img>`
          }
        },
        {
          prop: 'book_name8',
          label: '在线时长',
          align: 'center'
        },
        {
          prop: 'book_name9',
          label: '闯关次数',
          align: 'center'
        },
        {
          prop: 'book_name11',
          label: '登陆位置',
          align: 'center'
        },
        {
          prop: 'book_name22',
          label: '登录时间',
          align: 'center'
        },

        {
          prop: 'book_name33',
          label: '设备',
          align: 'center',
          render: (h, params) => {
            // return h('el-tag',
            //   {
            //     // props: {
            //     //   type: params.row.state === 0 ? 'success' : params.row.state === 1 ? 'info' : 'danger'
            //     // } // 组件的props
            //   },
            //   params.row.discount == 0 ? '免费' : params.row.discount)
          }
        },

        {
          prop: 'book_name44',
          label: '登陆IP',
          align: 'center'
        }

      ], // 需要展示的列
      columns2: [
        {
          prop: 'book_name55',
          label: '编号',
          align: 'center',
          formatter: (row, column, cellValue) => {
            // return `<img style="width:20px;height:30px;" src="${row.book_pic_url}"></img>`
          }
        },
        {
          prop: 'book_namer4q',
          label: '操作者',
          align: 'center'
        },
        {
          prop: 'book_nameqrq',
          label: '操作日期',
          align: 'center'
        },
        {
          prop: 'book_name43',
          label: 'IP地址',
          align: 'center'
        },
        {
          prop: 'book_nam43e',
          label: '操作记录',
          align: 'center'
        }
      ],
      operates: {}
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
    }
  }
}
</script>
<style scoped>
  .table-page{
    margin-left:0;
    box-shadow: none;
  }
  /deep/ .el-table__row{
    height: 40px;
  }
</style>

