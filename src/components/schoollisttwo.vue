<template>
  <div class="schlloList">
      <div class="picture">
        <img src="../assets/logo.png" />
      </div>
      <div class="schoolSimple">
          <div class="schoolLogo clearfix">
            <ul>
              <li>清华附中国际学校</li>
              <li>qinghuadaxingschoolkdfjs</li>
            </ul>
            <p><img src="../assets/school.png" /></p>
          </div>
          <div class="schoolXinxi">
            <ul>
              <li class="clearfix"><p><i class="iconfont  icon-dibudaohanglan-"></i>民办</p><p><i class="iconfont icon-dingwei"></i>北京上客户克里斯多夫接口</p><p><i class="iconfont icon-xuexiao"></i>小学 高中 初中</p></li>
              <li class="clearfix"><p><i class="iconfont icon-xuexiao"></i>2014年</p><p><i class="iconfont icon-text_icon"></i>北京上客户克里斯多</p><p><i class="iconfont icon-qianmoney113"></i>小学 高中 初中小学 高中 初中</p></li>
              <li class="clearfix"><p><p><i class="iconfont icon-zhengzaidingwei"></i>户克里</p><i class="iconfont icon-laoshi1"></i>教师人数：100</p><p><i class="iconfont icon-wodexuesheng"></i>学生人数：400</p></li>
            </ul>
          </div>
      </div>
      <div class="intoduce">
        <div class="intoduceJeshao">
          <h1>学习详情介绍</h1>
          <p>
            看很多风景开始发货快哦都是复活节克里斯朵夫活动时间疯狂的身份看大家是否会尽快送到附近可视电话佛山凤凰网开始发货可就是东方科技大厦附近都是咖啡跨境电商罚款决定是否看大家是否是分开会激发客户反馈就是东方好
          </p>
          <h1>学习哦啊意愿学校</h1>
          <p>就可视电话罚款决定是否健康的是否是对恢复健康后我无法好可混搭风好舒服未婚夫的设计开发那就肯定是分开就是分开就是看见是否会尽快是否会激发和今生今世看对方会尽快释放</p>
          <h1>学习哦啊意愿学校</h1>
          <p>就可视电话罚款决定是否健康的是否是对恢复健康后我无法好可混搭风好舒服未婚夫的设计开发那就肯定是分开就是分开就是看见是否会尽快是否会激发和今生今世看对方会尽快释放</p>
          <h1>学习哦啊意愿学校</h1>
          <p>就可视电话罚款决定是否健康的是否是对恢复健康后我无法好可混搭风好舒服未婚夫的设计开发那就肯定是分开就是分开就是看见是否会尽快是否会激发和今生今世看对方会尽快释放</p>
        </div>
      </div>
  </div>
</template>
<script>

export default {
  components: {},
  methods: {
    btn:function(){

    },
    getid:function(){
      console.log(this.$route.query && this.$route.query.id)
    }
  }, 
  created(){
    this.getid()
  }
};
</script>
<style scoped>
  .schlloList{
    width: 1110px;
    margin: 0 auto;
    border: 1px solid #ccc;
  }
  .picture{
    height: 200px;
    background: #999;
  }
  .schoolLogo{
    margin-top: 75px
  }
  .schoolLogo ul{
    float: left;
    margin-left: 95px;
    margin-top: 75px;
  }
  .schoolLogo ul li:first-of-type{
    font-size: 42px;
  }
  .schoolLogo ul li:last-of-type{
    font-size: 24px;
    margin-top: 20px;
  }
  .schoolLogo p{
    float: right;
    width: 190px;
    height: 190px;
    margin-right: 75px;
  }
  .schoolLogo p img{
    width: 100%;
    height: 100%;
  }
  .schoolXinxi{
    font-size: 12px;
    margin-left: 95px;
    margin-right: 95px;
  }
  .schoolXinxi li{
    border-bottom: 1px solid #ccc;
    line-height: 30px;
  }
  .schoolXinxi li p{
    float: left;
    width: 305px;
  }
  .intoduce{
    margin-left: 95px;
    margin-right: 95px;
  }
</style>
