<template>
    <div class="schoolVisual">
        <div class="a1">
          <div>正在改版 敬请期待....</div>
          <div><a href="http://data.xinxueshuo.cn/nsi/visible/visible.html" target="_blank">请访问老版网站</a></div>
        </div>

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

  created() {

  },
  components:{
    schoolFooter
  }
}
</script>

<style lang="less" scoped>
  .a1{
    display: table;
    margin:200px auto;
    font-size: 40px;
    line-height: 100px;
    color: #666;
    div:last-of-type{
      font-size: 30px;
    }
    a{
      color: #214f89;
    }
  }
</style>

