<template>
    <div class="schoolVisual">
        <div class="a1">
          <div>正在改版 敬请期待....</div>
          <a>页面将在{{time}}秒内跳转到老版国际学校四库全书</a>
        </div>

        <schoolFooter />
    </div>
</template>

<script>
import schoolFooter from './schoolFooter'
export default {
  data() {
    return {
      time:0,
    }
  },
methods:{
      countDown(){
        let that=this;
        that.time--;
      }
  },
  mounted(){
    let that=this; 
    that.time=5;
    setInterval(that.countDown,1000);
  },
   watch:{
    'time':function(newVal,oldVal){  
          if(newVal==0){
              window.location = "http://data.xinxueshuo.cn/nsi/project/project.html"; 
          }
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

