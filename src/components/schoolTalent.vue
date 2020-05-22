<template>
    <div class="schoolTalent">
        <div class="a1">
          <div>正在改版 敬请期待....</div>
          <a>页面将在{{count}}秒内跳转到老版国际学校四库全书</a>
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
      timeout:  null,
      count:"",
    }
  },
  created() {
      
  },
  methods:{
    startDivi(){
        const TIME_COUNT = 3;
        if(!this.timer){
            this.count = TIME_COUNT;
            this.timer = setInterval(()=>{
                if(this.count > 0 && this.count <= TIME_COUNT){
                    this.count--;
                }else{
                    clearInterval(this.timer);
                    this.timer = null;
                    //跳转的页面写在此处
                    window.location = "https://data.xinxueshuo.cn/nsi/talent/talent.html"; 
                }
            },1000)
        }
    },
  },
  mounted(){
    this.startDivi()
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
