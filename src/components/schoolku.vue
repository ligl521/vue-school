<template>
    <div class="schoolku">
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal"
        background-color="#777" text-color="#fff" active-text-color="red">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-menu-item index="4">11111</el-menu-item>
        </el-menu>
        <div class="ches">
          <p>12233</p>
          <h1>111111</h1>
        </div>
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
        <schoolFooter />
    </div>
</template>

<script>
import schoolFooter from './schoolFooter'
export default {
  data() {
    return {
      restaurants: [],
      state: '',
      timeout:  null
    }
  },
  methods: {
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      cb(restaurants);
    },
    createStateFilter(queryString) {
      return (state) => {

      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  created() {

  },
  components:{
    schoolFooter
  }
}
</script>

<style lang="less" scoped>
  .ches{
    margin-top: 1rem;
    width: 10rem;
    height: 5rem;
    font-size: 0.3rem;
    display: flex;
    background: yellow;
    p{
      flex: 2;
      background: skyblue;
    }
    h1{
      flex: 4;
      background: seagreen;
    }
  }
</style>
