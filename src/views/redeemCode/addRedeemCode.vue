<template>

<!-- 创建兑换码 -->
  <div>
    <myNav :bread="routerData"/>
    <div class="search_box">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" :rules="rules" label-width="110px">
        <div class="part1">
          <tips title="1" content="兑换码基本信息"/>
          <el-form-item label="备注：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="兑换码基本信息" size="small"/>
          </el-form-item>
          <el-form-item label="生效起始：" prop="start_time">
            <el-date-picker
              v-model="ruleForm.start_time"
              type="date"
              size="small"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="开始日期"
              style="width:180px;"
              @change="changeTime"/>
          </el-form-item>
          <el-form-item label="生效结束：" prop="end_time">
            <el-date-picker
              :picker-options="pickerOptionsEnd"
              v-model="ruleForm.end_time"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="date"
              size="small"
              style="width:180px;"
              placeholder="结束日期"/>
          </el-form-item>
          <el-form-item label="数量：" prop="count">
            <el-row>
              <el-col :span="10">
                <el-input v-model="ruleForm.count" size="small"/>
              </el-col>
              <el-col :span="6" :offset="2">
                <span>1~500个</span>
              </el-col>
            </el-row>
          </el-form-item>
        </div>
        <div class="part2">
          <tips title="2" content="兑换码包含内容"/>
          <el-form-item label=" " prop="book_ids">
            <span>已添加 {{ associated }} 本书</span>
            <div class="part_content">
              <template v-for="(item,index) in redeemCodeContent">
                <div class="partner">
                  <el-autocomplete
                    v-model="redeemCodeContent[index].name"
                    :fetch-suggestions="querySearchAsync"
                    :trigger-on-focus="true"
                    style="width:130px;"
                    size="small"
                    multiple
                    placeholder="请输入内容"
                    @focus="currentInputBox(index)"
                    @select="handleSelect"
                  />
                  <i class="el-icon-delete" @click="delPartner(index)"/>
                </div>
              </template>
              <i class="iconfont icon-jiahao1 add_img" @click="add"/>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="btn">
        <el-button type="primary" size="small" @click="save('ruleForm')">生成</el-button>
        <el-button size="small" @click="$router.go(-1)">取消</el-button>
      </div>
    </div>
  </div>

</template>
<script>
import tips from '@/components/tips'
import addNewInput from '@/components/addNewInput'
import { addRedeemCode, getBookId } from '@/api/redeemCode'
export default{
  components: { tips, addNewInput },
  data() {
    const validatorCount = (rule, value, callback) => {
      if (value >= 1 && value <= 500) {
        callback()
      } else {
        callback(new Error('数量需在1~500之间'))
      }
    }
    const validateContent = (rule, value, callback) => {
      if (this.associated > 0) {
        callback()
      } else {
        callback(new Error('兑换码包含内容不能为空'))
      }
    }
    return {
      booksID:[],
      routerData: {
        content: []
      },
      pickerOptionsEnd: '',
      ruleForm: {
        name: '',
        start_time: '',
        end_time: '',
        count: '',
        book_ids: []
      },
      tabIndex: '',
      redeemCodeContent: [{ name: '' }],
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '备注不能为空' }
        ],
        start_time: [
          { required: true, trigger: 'blur', message: '生效起始时间为空' }
        ],
        end_time: [
          { required: true, trigger: 'blur', message: '生效结束时间不能为空' }
        ],
        count: [
          { required: true, trigger: 'blur', message: '数量不能为空' },
          { validator: validatorCount, trigger: 'blur' }
        ],
        book_ids: [
          { required: true, validator: validateContent, trigger: 'change', message: '兑换码包含内容不能为空' }
        ]
      }
    }
  },
  computed: {
    associated: function() {
      var associated_bak = []
      this.redeemCodeContent.forEach(function(item, index) {
        if (item.name) {
          associated_bak.push(item)
        }
      })
      return associated_bak.length
    }
  },
  methods: {
    changeTime(date) {
      this.ruleForm.end_time = ''
      this.pickerOptionsEnd = {
        disabledDate(time) { // 开始时间-结束时间
          return (time.getTime() < new Date(date).getTime())
        }
      }
    },
    querySearchAsync(val, callback) {
      getBookId({ book_name: val }).then(res => {
        res.data.forEach(function(item, index) {
          item.value = item.book_name
        })
        callback(res.data)
      })
    },
    isNullFn() {
      var flag = true
      this.redeemCodeContent.forEach((item, index) => {
        if (!item.name) {
          this.$message.error('书名不能为空')
          flag = false
        }
      })
      return flag
    },
    add() {
      if (!this.isNullFn()) return
      this.redeemCodeContent.push({ name: '' })
    },
    delPartner(index) {
      this.redeemCodeContent.splice(index, 1)
      this.ruleForm.book_ids.splice(index, 1)
    },
    handleSelect(val) {
      this.booksID.push(val);
      this.booksID.forEach(item=>{
        this.redeemCodeContent.forEach(item1=>{
          if(item.book_name===item1.name){
            this.ruleForm.book_ids.push(item.id)
          }else{
           delete this.ruleForm.book_ids[this.ruleForm.book_ids.indexOf(item.id)]
          }
        })
      })
    },
    currentInputBox(index) {
      this.tabIndex = index
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.book_ids = this.ruleForm.book_ids.toString()
          addRedeemCode(this.ruleForm).then(res => {
            this.$message.success('成功生成兑换码')
            this.$router.push('/redeemCode/index')
          })
        } else {
          this.$message.error('必填项不能为空')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
/deep/ .part2 .el-form-item__content{
  width:88%;
}
.part_content{
  display: flex;
  flex-wrap:wrap;
}
.partner{
    margin:0 20px 10px 0;
  }
</style>

