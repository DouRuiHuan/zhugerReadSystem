<template>
  <el-dialog :visible.sync="isShowDialog" :before-close="handleClose" width="50%" center>
    <my-table
      :list="$attrs.list"
      :options="options"
      :columns="columns"
      :operates="operates"
      :page="$attrs.page"
      :show-operates = "$attrs.operate"
      :pagination="ruleForm"
    />
    <span slot="footer" class="dialog-footer">
      <!-- <el-button type="info" @click="stage = false">屏 蔽</el-button>
      <el-button @click="flag = false">返 回</el-button> -->
    </span>
  </el-dialog>
</template>
<script>
import myTable from '@/components/myTable'
export default {
  components: { myTable },
  props: ['isShowDialog'],
  data() {
    return {
      ruleForm: {},
      operates: {},
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false // 是否支持列表项选中功能
      }, // table 的参数
      columns: [
        {
          prop: 'id',
          label: '道具id',
          align: 'center',
          formatter: (row, column, cellValue) => {
            return `<input class="dialogInput" value="${row.id}" readonly="true" style="text-align:center;width:100%;border:0;outline:none;background:transparent">`
          }
        },
        {
          prop: 'name',
          label: '同伴名称',
          align: 'center'
        },
        {
          prop: 'prop_name',
          label: '道具名称',
          align: 'center'
        }

      ]
    }
  },
  methods: {
    handleClose(val) {
      this.$emit('handleClose')
    }
  }
}
</script>

