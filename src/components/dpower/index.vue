<template>
  <div class="user_power">
        <p>
          <span>{{powertitle.title}}</span>
          <span>
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选权限</el-checkbox>
          </span>
        </p>
        <div style="margin: 30px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
</template>

<script>
export default {
    props:["powertitle"],
    data(){
        return {
            checkAll: false,
            checkedCities: [],
            cities: this.powertitle.cityOptions,
            isIndeterminate: true
        }
    },
    methods:{
        handleCheckAllChange(val) {
            this.checkedCities = val ? this.powertitle.cityOptions : [];
            this.isIndeterminate = false;
    },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
    }
}
</script>

<style>
.user_power {
  margin-top: 30px;
}
.user_power p>span:first-child{
  padding-right: 20px;
}
</style>