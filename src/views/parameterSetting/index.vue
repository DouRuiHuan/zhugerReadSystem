<template>
  <div>
    <myNav :bread="routerData"/>
    <div class="search_box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础设置" name="first">
          <el-form :inline="true" label-width="150px">
            <div class="largeBox">
              <el-form-item label="每日任务时间:">
                <el-input v-model="ruleForm.daily_task_time" size="small" />
              </el-form-item>

              <el-form-item label="关卡最低时间:">
                <el-input v-model="ruleForm.checkpoint_minimum_time" size="small"/>
              </el-form-item>
              <el-form-item label="关卡最大时间:">
                <el-input v-model="ruleForm.checkpoint_maximum__time" size="small"/>
              </el-form-item>
              <el-form-item label="书籍免费关卡数:">
                <el-input v-model="ruleForm.free_checkpoint_num" size="small"/>
              </el-form-item>
              <el-form-item label="过关碎片最大数:">
                <el-input v-model="ruleForm.daily_task_time" size="small"/>
              </el-form-item>
            </div>
            <div class="smallBox">
              <template v-for="(item,index) in ruleForm.hecheng">
                <el-row>
                  <el-col :span="10">
                    <el-form-item :label="index | filterLabel">
                      <el-input v-model="item.level_a" size="small" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="S升级:">
                      <el-input v-model="item.level_s" size="small"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </div>
          </el-form>
          <div class="btn">
            <el-button v-prevent-reclick type="primary" size="small" @click="save(0)">保存</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="内容设置" name="second" class="second">
          <el-form label-width="80px">
            <div class="part1">
              <p class="title">同伴参数</p>
              <el-row>
                <el-form-item label="同伴类型:">
                  <div class="box_wrap">
                    <!-- <addNewInput/> -->
                  </div>
                </el-form-item>
              </el-row>
            </div>
            <div class="part2">
              <p class="title">书单参数</p>
              <el-row>
                <el-form-item label="书单类型:">
                  <div class="box_wrap">
                    <addNewInput :character="pageData.boolist_type" setting="true"/>
                  </div>
                </el-form-item>
              </el-row>
            </div>
            <div class="part3">
              <p class="title">书籍参数</p>
              <el-row>
                <el-form-item label="阅读力:">
                  <div class="box_wrap">
                    <!-- <addNewInput/> -->
                  </div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="素质力:">
                  <div class="box_wrap">
                    <!-- <addNewInput/> -->
                  </div>
                </el-form-item>
              </el-row>
              <div class="btn">
                <el-button v-prevent-reclick type="primary" size="small" @click="save(1)">保存</el-button>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="通关设置" name="third" class="third">
          <el-form label-width="80px">
            <el-form-item label="认读值：">
              <el-input v-model="stageData.cognition" size="medium" style="width:300px"/>
            </el-form-item>
            <el-form-item label="理解值：">
              <el-input v-model="stageData.understanding" size="medium" style="width:300px"/>
            </el-form-item>
            <el-form-item label="技巧值：">
              <el-input v-model="stageData.skill" size="medium" style="width:300px"/>
            </el-form-item>
            <el-form-item label="鉴赏值：">
              <el-input v-model="stageData.appreciate" size="medium" style="width:300px"/>
            </el-form-item>
            <el-form-item label="评价值：">
              <el-input v-model="stageData.estimate" size="medium" style="width:300px"/>
            </el-form-item>
            <div class="btn">
              <el-button v-prevent-reclick type="primary" size="small" @click="save(2)">保存</el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>
<script>
import addNewInput from '@/components/addNewInput'
import { contentSetting, getContentSetting, getBasicSetting, basicSetting, getPassSetting, passSetting } from '@/api/parameterSetting'
export default {
  components: { addNewInput },
  filters: {
    filterLabel(index) {
      switch (index) {
        case 0:
          return '普通合成：'
          break
        case 1:
          return '优秀合成：'
          break
        case 2:
          return '精良合成：'
          break
        case 3:
          return '史诗合成：'
          break
        case 4:
          return '传说合成：'
          break
      }
    }
  },
  data() {
    return {
      activeName: 'first',
      routerData: {
        content: []
      },
      ruleForm: {
        daily_task_time: '',
        heckpoint_minimum_time: '',
        checkpoint_maximum__time: '',
        free_checkpoint_num: '',
        hecheng: [{
          level_a: '',
          level_s: ''
        }, {
          level_a: '',
          level_s: ''
        }, {
          level_a: '',
          level_s: ''
        }, {
          level_a: '',
          level_s: ''
        }, {
          level_a: '',
          level_s: ''
        }]
      },
      pageData: {
        boolist_type: [{ id: 1, name: '' }]
      },
      stageData: {
        cognition: '',
        understanding: '',
        skill: '',
        appreciate: '',
        estimate: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getContentSetting().then(res => {
        if (res.data instanceof Array) return
        this.pageData = res.data
      })
      getBasicSetting().then(res => {
        if (res.data instanceof Array) return
        this.ruleForm = res.data
      })
      getPassSetting().then(res => {
        this.stageData = res.data
      })
    },
    save(id) {
      console.log(id)
      switch (id) {
        case 0:
          basicSetting(this.ruleForm).then(res => {
            this.$message.success('保存成功')
          })
          break
        case 1:
          contentSetting(this.pageData).then(res => {
            this.$message.success('保存成功')
          })
          break
        case 2:
          passSetting(this.stageData).then(res => {
            this.$message.success('保存成功')
          })
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style scoped>
  .title{
    line-height: 30px;
  }
  .part1,.part2,.part3{
    padding:10px 0 10px 20px;
    border-bottom: 2px dashed #efefef;
  }
  .part3{
    border-bottom: 0;
  }
  /deep/ button{
    width: 100px;
  }
  /deep/ .el-button{
    margin:0 10px 0 0;
  }
  .box_wrap{
    width: 90%;
  }
  .basic_wrap{
    width:10%;
  }
  /deep/ .largeBox .el-form-item__content{
    width:70%;
  }
  /deep/ .smallBox .el-form-item__content{
    width:55%;
  }
</style>

