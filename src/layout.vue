<template>
  <div id="app">
    <heads />
    <router-view></router-view>
  </div>
</template>
<script>
import heads from "@/components/heads";
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  components: {
    heads
  }
};
</script>
<style lang="less">
#app {
  margin-top: 52px;
}
body {
  padding-right: 0 !important;
  overflow-y: scroll !important;
  font-family: Helvetica, Tahoma, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", STXihei, STHeiti, Heiti, SimSun, sans-serif;
}
#visit-dialog{
    width:80%;
    margin:0 auto;
    .el-dialog{
        width:100%;
    }
}
@media screen and (max-width: 768px) {
#app {
  margin-top: 0;
}
}
</style>