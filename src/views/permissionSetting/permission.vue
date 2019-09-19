<template>
  <div>
    <myNav :bread="routerData"/>
    <div class="search_box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="分组权限" name="first" style="padding:0 50px;">
          <el-form>
            <el-form-item label="管理员组">
              <el-select size="small">
                <el-option label="超级管理员" value="1"/>
                <el-option label="编辑组" value="2"/>
              </el-select>
            </el-form-item>
          </el-form>
          <el-row>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          </el-row>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <p>
              <el-checkbox key="1" label="首页">首页</el-checkbox>
            </p>
            <p>
              <el-checkbox key="2" label="书籍管理">书籍管理</el-checkbox>
              <el-checkbox key="3" label="关卡列表">关卡列表</el-checkbox>
              <el-checkbox key="4" label="添加/编辑关卡内容">添加/编辑关卡内容</el-checkbox>
            </p>
            <p>
              <el-checkbox>书单管理</el-checkbox>
              <el-checkbox>添加/管理书单</el-checkbox>
            </p>
            <p>
              <el-checkbox>同伴管理</el-checkbox>
              <el-checkbox>添加/编辑同伴</el-checkbox>
            </p>
            <p>
              <el-checkbox>同伴管理</el-checkbox>
              <el-checkbox>添加/编辑同伴</el-checkbox>
            </p>
            <p>
              <el-checkbox>参数设置</el-checkbox>
            </p>
          </el-checkbox-group>

          <div class="btn">
            <el-button type="primary" size="small" @click="save(0)">保存</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="操作日志" name="second" class="second" style="padding:0 50px;">
          <el-form>
            <el-row>
              <el-col :span="4">
                <el-form-item label="操作人：">
                  <el-select size="small" style="width:150px;">
                    <el-option label="超级管理员" value="1"/>
                    <el-option label="编辑组" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="操作时间：">
                  <date-picker ref="datePicker" :start-time="ruleForm.strat" :end-time="ruleForm.end"/>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-button size="small" type="primary" @click="search">搜索</el-button>
                <el-button size="small" type="success" @click="reset">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
          <operation-log from="true"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>
<script>
import operationLog from '../user/loginInfo'
import datePicker from '@/components/datePicker'
export default {
  components: { operationLog, datePicker },
  data() {
    return {
      ruleForm: {
        start: '',
        end: ''
      },
      routerData: {
        content: []
      },
      activeName: 'first',
      checkedCities: ['1', '2'],
      isIndeterminate: true
      // cityOptions: []
    }
  },
  methods: {
    handleCheckAllChange(val) {
      // this.checkedCities = val ? cityOptions : []
      // this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    search() {
      this.ruleForm.start = this.$refs.datePicker.startTime
      this.ruleForm.end = this.$refs.datePicker.endTime
    }
  }
}
</script>
<style scoped>
  p{
    padding:13px 0;
  }
</style>

