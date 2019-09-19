<template>
  <div>
    <template v-for="(item,index) in story">
      <div class="attribute">
        <span v-if="$attrs.id" class="span_border">{{item.id}}</span>
        <span class="span_border">{{ index+1 }}</span>
        <input v-model="item.story_name" type="text" placeholder="事迹名称">
        <input v-model="item.prop_name" type="text" placeholder="物品名称">
        <upload
          :image="item.prop_pic_url"
          :number="index"
          @success="success"
          @beforeAvatarUpload="beforeAvatarUpload"
        />
        <i
          style="font-size:20px;margin-left:20px;"
          class="el-icon-delete"
          @click="deleteAttr(item.id,index)"
        />
        <span
          v-if="index === 0"
          style="color:red;font-size:12px;margin-left:10px;"
        >*道具图片尺寸： 800*800px，主图大小不能超过800k.</span>
      </div>
    </template>
    <i class="iconfont icon-jiahao1 add_img" @click="add"/>
  </div>
</template>
<script>
import upload from "@/components/upload";
export default {
  components: { upload },
  props: ["upload", "story"],
  data() {
    return {
      deletedArr: []
    };
  },
  methods: {
    isNullFn() {
      var flag = true;
      this.story.forEach((item, index) => {
        if (!item.story_name || !item.prop_name || !item.prop_pic_url) {
          this.$message.error("事迹设置不能为空");
          flag = false;
        }
      });
      return flag;
    },
    add() {
      var isNull = this.isNullFn();
      if (isNull) {
        this.story.push({
          story_name: "",
          prop_name: "",
          prop_pic_url: ""
        });
      }
    },
    success(res) {
      this.story[res[1]].prop_pic_url = res[0];
    },
    beforeAvatarUpload(file) {
      const isLimit = file.size / 1024 < 800;
      if (!isLimit) {
        this.$message.error("主图大小不能超过800k");
      }
      return isLimit;
    },
    deleteAttr(id, index) {
      if (id) {
        this.deletedArr.push(id);
      }
      this.story.splice(index, 1);
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
.span_border {
  display: inline-block;
  min-width: 25px;
  padding: 0 5px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border: 1px solid #ccc;
  margin: 0px 10px 0 0;
}
</style>

