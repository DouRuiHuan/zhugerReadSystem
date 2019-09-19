<template>
  <div>
    <my-nav :bread="routerData" />
    <el-form :inline="true" class="search_box">
      <el-row>
        <el-col :span="8">
          <el-form-item label="书单状态：" prop="state">
            <el-radio v-model="ruleForm.state" label="1" size="small" @change="search">上架</el-radio>
            <el-radio v-model="ruleForm.state" label="0" size="small" @change="search">下架</el-radio>
         </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="书单名称：" prop="name">
            <el-input v-model="ruleForm.name" size="small" style="width:150px;" @change="fetchData"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="书单类型：" prop="type">
            <el-select v-model="ruleForm.type" placeholder="选择书籍类型" size="small" style="width:150px;" @change="fetchData">
              <el-option label="全部" value=""/>
              <el-option
                v-for="(item,index) in bookListType"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
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
      <el-row class="batch">
        <el-button size="small" type="primary" @click="allShelf">
          {{ ruleForm.state == '1'?'全部下架':'全部上架' }}
        </el-button>
      </el-row>
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
      bookListType: [],
      ids: '',
      action: 'downshelf ',
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
          url: '/bookList/addBookList',
          name: '添加书单'
        }]
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
          prop: 'pic_url',
          label: '书籍封面',
          align: 'center',
          formatter: (row, column, cellValue) => {
            return `<img style="width:20px;height:30px;" src="${row.pic_url}"></img>`
          }
        },
        {
          prop: 'name',
          label: '书单名称',
          align: 'center'
        },
        {
          prop: 'type',
          label: '书单类型',
          align: 'center',
          formatter: (row, column, cellValue) => {
            return this.formatterType(row.type)
          }
        },
        {
          prop: 'book_num',
          label: '书籍数',
          align: 'center'
        },
        {
          prop: 'personal_reading_ability',
          label: '提升阅读力',
          align: 'center'
        },
        {
          prop: 'companion_quality',
          label: '提升素质力',
          align: 'center'
        }

      ], // 需要展示的列
      operates: {
        width: 300,
        fixed: 'right',
        list: [
          {
            id: '1',
            label: '详情',
            style: 'color:#72B9EA;font-size:13px;',
            method: (index, row) => {
              this.$router.push({ path: '/bookList/addBookList', query: { id: row.id }})
            }
          },
          {
            id: '2',
            style: 'color:#FAACAD;font-size:13px;',
            method: (index, row) => {
              console.log(index,row)
              this.open(row)
            },
            content: (index, row) => {
              return row.state == 1 ? '下架' : '上架'
            }
          },
          {
            id: '2',
            style: 'color:#72B9EA;font-size:13px;',
            method: (index, row) => {
              this.handStick(index, row)
            },
            content: (index, row) => {
              return row.is_top == 1 ? '取消置顶' : '置顶'
            }
          }
        ]
      }
    }
  },
  created() {
    booklistType().then(res => {
      this.bookListType = res.data
    })
    this.fetchData()
  },
  methods: {
    formatterType(type) {
      var typeContent = ''
      this.bookListType.forEach(item => {
        if (item.id == type) {
          typeContent = item.name
        }
      })
      return typeContent
    },
    fetchData() {
      getBookList(this.ruleForm).then(res => {
        this.list = res.data.data
        this.ruleForm.total = +res.data.count
      })
    },
    // 批量上下架
    handleSelectionChange(val) {
      var ids_bak = []
      val.forEach(function(item, index, arr) {
        ids_bak.push(item.id)
      })
      this.ids = ids_bak.toString()
    },
    open(row) {
      var content = this.ruleForm.state == 0 ? '确认上架当前书籍？' : '确认下架当前书籍？'
      this.$alert(content, '提示', {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            this.handShelf(row)
          }
        }
      })
    },
    // 上下架
    handShelf(row) {
      var action = row.state == 1 ? 'downshelf' : 'upshelf'
      this.shelf(row.id, action)
    },
    // 全部上下架
    allShelf() {
      if (!this.ids) return
      var action = this.state === '全部上架' ? 'upshelf' : 'downshelf'
      this.shelf(this.ids, action)
    },
    shelf(ids, action) {
      bookListShelf({ ids: ids, action: action }).then(res => {
        this.$message.success('操作成功')
        this.fetchData()
      })
    },
    // 置顶&取消置顶
    handStick(index, row) {
      var actionStick = row.is_top == 1 ? 'cancel_top' : 'top'
      var stickContent = row.is_top == 1 ? '确认将当前书籍取消置顶？' : '确认将当前书籍置顶？'
      this.$alert(stickContent, '提示', {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            top({ id: row.id, action: actionStick }).then(res => {
              this.$message.success('操作成功')
              this.fetchData()
            })
          }
        }
      })
    },
    search() {
      this.ruleForm.page = 1
      this.fetchData()
    },
    reset() {
      this.ruleForm = {
        state: '1',
        type: '',
        name: '',
        pagesize: 10,
        page: 1,
        total: 0
      }
      this.state = '全部下架'
      this.fetchData()
    },
    // 删除
    handleDel(index, row) {
      console.log(' index:', index)
      console.log(' row:', row)
    },
    handleSizeChange(val) {
      this.ruleForm.pagesize = val
      this.ruleForm.page = 1
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.ruleForm.page = val
      this.fetchData()
    }
  }
}
</script>
<style scoped>
</style>

