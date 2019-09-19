<template>
<!-- 所有的表格 -->
  <div class="table">
    <el-table
      v-loading.iTable="options.loading"
      id="iTable"
      ref="mutipleTable"
      :data="list"
      stripe
      @selection-change=" "
    >
      <el-table-column
        v-if="options.mutiSelect"
        type="selection"
        style="width: 55px;"
        align="center"
      />
      <!-- 表格的列 -->
      <template v-for="(column, index) in columns">
        <el-table-column
          :prop="column.prop"
          :key="column.label"
          :label="column.label"
          :align="column.align"
          :width="column.width"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)"/>
              </template>
              <template v-else>
                <span>{{ scope.row[column.prop] }}</span>
              </template>
            </template>
            <template v-else>
              <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index"/>
            </template>
          </template>
        </el-table-column>
      </template>

      <el-table-column
        v-show="operates"
        v-if="showOperates"
        ref="fixedColumn"
        :width="operates.width"
        :fixed="operates.fixed"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <div class="operate-group">
            <template v-for="(btn, index) in operates.list">
              <span :key="index" class="item">
                <el-button
                  :style="btn.style"
                  class="table_button"
                  @click.native.prevent="btn.method(index,scope.row)"
                  v-html="btn.label?btn.label:btn.content(index,scope.row)"
                />
              </span>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="page" class="block">
      <el-pagination
        :current-page="pagination.page"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        :small="true"
        :background="true"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      }
    }
  },
  props: {
    showOperates: {
      type: Boolean,
      default: true
    },
    page: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: []
    },
    columns: {
      type: Array,
      default: []
    },
    operates: {},
    options: {
      type: Object,
      default: {
        stripe: true,
        highlightCurrentRow: false
      }
    },
    pagination: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("handleSelectionChange", val);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    }
  }
};
</script>
<style scoped >
.table_button {
  background: transparent;
  font-weight: bold;
  border: 0;
}
#iTable {
  border-radius: 5px;
}
/* /deep/ .el-table__body .el-table__row:nth-child(odd){
    background: #F3F5FA;
  } */
/deep/ .el-table--enable-row-transition .el-table__body td {
  padding: 3px;
}
.el-tag {
  background-color: transparent;
  color: #606266;
  border: 0;
  font-size: 13px;
}
/deep/ .cell {
  font-size: 13px;
}
</style>
