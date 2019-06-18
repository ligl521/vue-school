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

        <schoolBottom />
    </div>
</template>

<script>
import schoolBottom from './schoolBottom'
export default {
  created() {

  },
  components:{
    schoolBottom
  }
}
</script>

<style>

</style>
