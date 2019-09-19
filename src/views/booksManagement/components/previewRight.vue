 <template>
  <div class="left_box">
    <el-form style="width:320px;">
      <el-form-item label="预览缩放:">
        <el-select size="mini" v-model="zoom" @change="changeZoom">
          <el-option label="100%" value="1"/>
          <el-option label="75%" value="2"/>
          <el-option label="50%" value="3"/>
          <el-option label="30%" value="4"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="reading_box" :class="zoomStyle" @click="turnPageOption">
      <div class="reading" id="box" v-html="msg"></div>
    </div>
  </div>
</template>
<script>
import eventBus from "./eventBus";
export default {
  data() {
    return {
      zoom: "3",
      scrollLeft: 0,
      msg: "",
      zoomStyle: "zoom3",
      rate: 0.5
    };
  },
  mounted() {
    eventBus.$on("setContent", msg => {
      this.scrollLeft = 0;
      var box = document.getElementById("box");
      box.scrollLeft = 0;
      this.msg = msg;
    });
  },
  methods: {
    turnPageOption(e) {
      var box = document.getElementById("box");
      var distanceX = event.offsetX * this.rate;
      var screenWidth = (box.clientWidth * this.rate) / 2;
      console.log(event.offsetX * this.rate, screenWidth);
      if (distanceX > screenWidth) {
        // 点击右侧区域
        this.turnpage("next");
      } else {
        // // 点击左侧区域;
        this.turnpage("prev");
      }
    },
    turnpage(type) {
      var box = document.getElementById("box");
      var dw = box.offsetWidth;
      var maxScroll = box.scrollWidth - box.clientWidth;
      if (type == "prev" && this.scrollLeft <= 0) {
        // 上一个关卡
        eventBus.$emit("prevPoint");
      } else if (type == "next" && this.scrollLeft >= maxScroll) {
        //下一个关卡
        eventBus.$emit("nextPoint");
      } else if (type == "next" && this.scrollLeft < maxScroll) {
        this.scrollLeft = this.scrollLeft + dw;
      } else if (type == "prev" && this.scrollLeft > 0) {
        this.scrollLeft = this.scrollLeft - dw;
      }
      box.scrollLeft = this.scrollLeft;
    },
    changeZoom(value) {
      this.zoomStyle = `zoom${value}`;
      switch (+value) {
        case 1:
          this.rate = 1;
          break;
        case 2:
          this.rate = 0.75;
          break;
        case 3:
          this.rate = 0.5;
          break;
        case 4:
          this.rate = 0.3;
          break;
      }
    }
  }
};
</script>
<style scoped>
.left_box {
  width: 500px;
}
.zoom1 {
  transform: scale(1);
}
.zoom2 {
  transform: scale(0.75);
}
.zoom3 {
  transform: scale(0.5);
}
.zoom4 {
  transform: scale(0.3);
}
.reading_box {
  width: 1080px;
  height: 1260px;
  border: 1px solid black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform-origin: 0 0 0;
  position: fixed;
  top: 170px;
  left: 765px;
}

.reading {
  height: auto;
  -webkit-column-width: 1080px;
  column-width: 1080px;
  overflow-y: hidden;
  overflow-x: hidden;
  margin: 58px 0;
  -webkit-column-gap: 0;
  -webkit-user-select: none;
}
.left_box >>> .reading p {
  font-size: 48px;
  line-height: 84.22px;
  text-indent: 2em;
  padding: 0px 58px 42px 58px;
  letter-spacing: 2px;
  text-align: justify;
}

.left_box >>> .reading span[type="knowledge"],
.left_box >>> .reading span[type="story"] {
  display: inline-block;
  text-indent: 0;
}

.left_box >>> .reading span[type="story"] > img {
  padding-left: 0.3em;
  padding-right: 0.3em;
}

.left_box >>> .reading span[type="knowledge"] {
  padding-left: 0.3em;
  padding-right: 0.3em;
}

.left_box >>> .reading img {
  height: 52px;
  width: auto;
  vertical-align: middle;
  margin-top: -4px;
}
</style>
