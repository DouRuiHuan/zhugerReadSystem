 <template>
  <div class="left_box">
    <div class="left_box_title">
    效果预览：
    </div>
    <div class="reading_box">
        <img src="@/assets/reading/laba.png" alt="" v-show="ruleForm.title||ruleForm.content">
        <h6>{{ruleForm.title}}</h6>
         <div class="reading_content" ref="content1" v-html="ruleFromcontent">
             <!-- {{ruleFromcontent}}  -->
            </div>
        <img v-show="ruleForm.jump_type" src="@/assets/reading/tuan.png" alt="">
        <ul>
            <li v-for="(item,index) in jumpTypeArr">
                <p calss="reading_item"
                    v-if="ruleForm.jump_type===index&&ruleForm.title">
                     去{{item}}页
                </p> 
            </li>
        </ul>
        <img src="@/assets/reading/yun.png" alt="" v-show="ruleForm.title || ruleForm.content">
    </div>
  </div>
</template>
<script>
export default {
    props:["jumpTypeArr","ruleForm"],
    data(){
            return {
                ruleFromcontent: ""
            }
        },
    watch: {
        ruleForm:{
            handler(newContent){
                var content = newContent.content.replace(/ /g,"&nbsp;");
                this.ruleFromcontent = content.replace(/\n/g,"<br/>");
            },
            deep:true
        }
  }
 




   
};
</script>
<style scoped>
.left_box {
  width: 700px;
}
.left_box_title{
    position: absolute;
    top: 112px;
    left: 814px;
    color: #999;
    font-size: 16px;
}

.reading_box{
  transform: scale(0.5);
    position: relative;
}
/* 标题 */
.reading_box>h6{
    width: 600px;
    height: 36px;
    margin: 0 auto;
    font-size: 36px;
    font-weight: normal;
    margin: 33px 24px 0 145px; 
    text-align: center;
}

.reading_box {
  width:770px;
  height: 1099px;
  border: 3px solid black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #999;
  position: absolute;
  top: -120px;
  left: 662px;
  border-radius: 16px;
}
.reading_box>img:nth-child(1){
    position: absolute;
    width: 145px;
    height: 119px;
    top:0;
    left:0;
}
.reading_box>img:nth-child(4){
    width: 365px;
    height: 95px;
    position: absolute;
    top: 887px;
    left: 203px;
}
.reading_box>img:last-child{
    position: absolute;
    width: 770px;
    height: 127px;
    bottom:0;
    left:0;
}
.reading_content{
    width:685px;
    margin: 0 auto;
    height: 100px;
    margin-top: 95px;
    font-size:36px;
    letter-spacing:3px;
    line-height: 72px;
    word-break: break-all;
}
.reading_box>ul{
    width: 210px;
    height: 40px;
    position: absolute;
    bottom:145px;
    left: 284px;
    font-size: 35px;
    color: #fff;
    text-align: center
}

</style>
