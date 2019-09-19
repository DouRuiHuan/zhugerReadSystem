<template>
  <div v-if="setting" class="boxAddInput">
    <div class="child" v-for="(item,index) in character" :key="index">
      <el-input
        v-model="character[index].name"
        :placeholder="hint"
        size="medium"
        style="width:100px;display:inline-block"
      />
      <i class="el-icon-delete" @click="del(index)"/>
    </div>
    <div>
      <i class="iconfont icon-jiahao1 add_img" @click="add"/>
    </div>
  </div>
  <div v-else class="boxAddInput">
    <div class="child" v-for="(item,index) in character" :key="index">
      <el-input
        v-model="character[index]"
        :placeholder="hint"
        size="medium"
        style="width:100px;display:inline-block"
      />
      <i class="el-icon-delete" @click="del(index)"/>
    </div>
    <div>
      <i class="iconfont icon-jiahao1 add_img" @click="add"/>
    </div>
  </div>
</template>
<script>
export default {
  props: ["hint", "character", "setting"],
  data() {
    return {};
  },
  methods: {
    isNullFn() {
      var flag = true;
      this.character.forEach((item, index) => {
        var content = this.setting ? item.name : item;
        if (!content) {
          this.$message.error("输入框不能为空");
          flag = false;
        }
      });
      return flag;
    },
    add() {
      if (!this.isNullFn()) return;
      if (this.setting) {
        this.character.push({
          id: this.character.length + 1,
          name: ""
        });
      } else {
        this.character.push("");
      }
    },
    del(index) {
      this.character.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.boxAddInput {
  height: auto;
}
.boxAddInput div {
  display: inline-block;
  margin-right: 20px;
  font-size: 13px;
  float: left;
}
/deep/ .el-form-item__content {
  line-height: 0px !important;
}
</style>

