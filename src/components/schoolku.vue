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
        <schoolFooter />
    </div>
</template>

<script>
import schoolFooter from './schoolFooter'
export default {
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
