<template>
  <div>
    <template v-for="(item,index) in story">
      <div class="attribute">
        <span>{{ index+1 }}</span>
        <el-input
          v-model="item.node"
          placeholder="奖励节点"
          size="small"
          style="width:100px;margin-right:10px"
        />
        <el-autocomplete
          v-model="rewardSetArr[index]"
          :fetch-suggestions="querySearchAsync"
          :trigger-on-focus="true"
          style="width:130px;"
          size="small"
          multiple
          placeholder="同伴"
          @select="handleSelect"
          @focus="currentIndex(index)"
        />
        <el-input
          v-enter-number
          v-model="item.companion_num"
          type="number"
          placeholder="碎片数量"
          size="small"
          style="width:130px;margin:0 10px;"
        />
        <i class="el-icon-delete" @click="del(index)" />
      </div>
    </template>
    <i class="iconfont icon-jiahao1 add_img" @click="add" />
  </div>
</template>
<script>
import { booklistCompanion } from "@/api/bookList";
export default {
  props: ["story", "rewardSetArr"],
  data() {
    return {
      tabIndex: ""
    };
  },
  methods: {
    querySearchAsync(val, callback) {
      booklistCompanion({ companion_name: val }).then(res => {
        res.data.forEach(function(item, index) {
          item.value = item.name;
        });
        callback(res.data);
      });
    },
    handleSelect(item) {
      this.story[this.tabIndex].companion_id = item.id;
      this.story[this.tabIndex].small_head_url = item.small_head_url;
    },
    currentIndex(index) {
      this.tabIndex = index;
    },
    isNullFn() {
      var flag = true;
      this.story.forEach((item, index) => {
        if (!item.node || !item.node || !item.companion_num) {
          this.$message.error("奖励设置不能为空");
          flag = false;
        }
      });
      return flag;
    },
    add() {
      var isNull = this.isNullFn();
      if (isNull) {
        this.story.push({
          node: "",
          companion_id: "",
          companion_num: ""
        });
      }
    },
    del(index) {
      this.story.splice(index, 1);
      this.rewardSetArr.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.attribute {
  display: flex;
  height: 50px;
  line-height: 50px;
  align-items: center;
}
.attribute input {
  width: 120px;
  height: 30px;
  border: 1px solid #efefef;
  margin: 0px 10px 0 0;
  padding-left: 10px;
  vertical-align: middle;
}
.attribute span:first-child {
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border: 1px solid #ccc;
  margin: 0px 10px 0 0;
  border-radius: 5px;
}
.el-icon-delete {
  font-size: 20px;
}
</style>

