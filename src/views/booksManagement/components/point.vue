<template>
  <div>
    <template v-for="(item,index) in points">
      <el-row class="title">
        <el-col :span="1">
          <span class="index">{{ index+1 }}</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="item.knowledge_title" size="mini"/>
        </el-col>
        <el-col :span="5">
          <i class="el-icon-delete" style="margin-left:10px;" @click="delPonit(index)"/>
        </el-col>
      </el-row>
      <el-row class="content">
        <el-input
          v-model="item.knowledge_content"
          :autosize="{minRows:3,maxRows:10}"
          class="textarea"
          type="textarea"
        />
      </el-row>
    </template>
    <i class="iconfont icon-jiahao1 add_img" @click="addPonit"/>
  </div>
</template>
<script>
export default {
  props: ["points"],
  data() {
    return {
      piontDeleted: []
    };
  },
  methods: {
    delPonit(index) {
      const currentId = this.points[index].id;
      if (currentId) {
        this.piontDeleted.push(currentId);
      }
      this.points.splice(index, 1);
    },
    isNullFn() {
      var flag = true;
      this.points.forEach((item, index) => {
        if (!item.knowledge_content || !item.knowledge_title) {
          this.$message.error("知识点不能为空");
          flag = false;
        }
      });
      return flag;
    },
    addPonit() {
      if (!this.isNullFn()) return;
      this.points.push({ knowledge_title: "", knowledge_content: "" });
    }
  }
};
</script>
<style scoped>
.index {
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border: 1px solid #ccc;
}
</style>

