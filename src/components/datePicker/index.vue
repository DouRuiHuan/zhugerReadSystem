<template>
<!-- 开始时间至结束时间的组件 -->
  <div class="date_picker">
    <el-date-picker
      v-model="startTime"
      :readonly="$attrs.readonly"
      type="date"
      size="small"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
      placeholder="开始日期"
      style="width:180px;"
      @change="changeTime"/>
    <span>至</span>
    <el-date-picker
      :picker-options="pickerOptionsEnd"
      v-model="endTime"
      :readonly="$attrs.readonly"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
      type="date"
      size="small"
      style="width:180px;"
      placeholder="结束日期"/>
  </div>
</template>
<script>
export default {
  props: ['startTime', 'endTime'],
  data() {
    return {
      pickerOptionsEnd: ''
    }
  },
  methods: {
    changeTime(date) {
      this.endTime = ''
      this.pickerOptionsEnd = {
        disabledDate(time) { // 开始时间-结束时间
          return (time.getTime() < new Date(date).getTime())
        }
      }
    }
  }
}
</script>
<style scoped>
  .date_picker{
    display:inline-block;
  }
</style>

