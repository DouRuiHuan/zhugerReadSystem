<template>
  <div>
    <my-nav :bread="routerData"></my-nav>
    <el-form :inline="true" class="search_box">
      <el-row>
        <el-col :span="8">
          <el-form-item label="同伴名称：" prop="companion_name">
            <el-input v-model="ruleForm.companion_name" size="small" @change="fetchData"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属书籍：" prop="book_name">
            <el-input v-model="ruleForm.book_name" size="small" @change="fetchData"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="" prop="name">
            <el-button icon="el-icon-search" type="primary" size="small" @click="search">搜索</el-button>
            <el-button icon="el-icon-refresh" size="small" type="success" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="table-page">
      <div class="box-wrap">
          <div class="box" v-for="(item,index) in pageData" :key="index">
            <img :src="item.small_head_url" alt="" >
            <p>
              <span style="width:60%">{{ item.name }}</span>
              <span>
                <router-link :to="{path: '/companion/map/addMap', query: {id:item.id}}" style="color:#4e8afd;">操作</router-link>
              </span>
              <span style="color：#fb9697;" @click="open(item.id)">删除</span>
            </p>
          </div>
      </div>
      <div class="block">
        <el-pagination
          :current-page="ruleForm.page"
          :page-sizes="[10, 20, 50]"
          :page-size="ruleForm.pageSize"
          :total="total"
          :background="true"
          :small="true"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </div>
    </div>
  </div>
</template>
<script>
import { getCompanion, delCompanion } from '@/api/companion'
export default {
  data() {
    return {
      ruleForm: {
        companion_name: '',
        book_name:'',
        page: 1,
        pageSize: 10
      },
      total: 0,
      pageData: [],
      routerData: {
        content: [{
          url: '/companion/map/addMap',
          name: '添加同伴'
        }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getCompanion(this.ruleForm).then(res => {
        this.pageData = res.data.data
        this.total = +res.data.count
      })
    },
    open(id) {
      this.$alert('确认删除当前图鉴？', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            this.del(id)
          }
        }
      })
    },
    del(id) {
      delCompanion({ id: id }).then(res => {
        this.$message.success('删除成功')
        this.fetchData()
      })
    },
    handleSizeChange(val) {
      this.ruleForm.pagesize = val
      this.ruleForm.page = 1
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.ruleForm.page = val
      this.fetchData()
    },
    search() {
      this.ruleForm.pageSize = 1
      this.fetchData()
    },
    reset() {
      this.ruleForm = {
        companion_name: '',
        book_name:'',
        page: 1,
        pageSize: 10
      }
    }
  }
}
</script>
<style scoped>
  .box{
    width: 180px;
    height: 240px;
    margin:20px 0px 0 20px;
    border:1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
  }
  .box img{
    width:100%;
    height:200px;
    border-bottom: 1px solid #ccc;
    display: block;

  }
  .box-wrap{
    display: flex;
    justify-content:flex-start;
    flex-wrap:wrap;
    padding:0 10px;

  }
   .box-wrap p{
     line-height: 40px;
     display: flex;
   }
  .box-wrap span{
    display: block;
    font-size: 13px;
    text-align: center;
  }
  .box-wrap span:first-child{
    text-align: left;
    padding-left:3px;
  }
  .box-wrap span:nth-child(2){
    width:20%;
    color:blue;
    cursor:pointer;
  }
  .box-wrap span:last-child{
    width:20%;
    color:pink;
    cursor: pointer;
  }
  /deep/ .el-form--inline .el-form-item__content{
    width: 60%
  }
</style>

