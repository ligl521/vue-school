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
              <li class="clearfix"><p>民办</p><p>北京上客户克里斯多夫接口</p></li>
              <li class="clearfix"><p>小学 高中 初中</p><p>2014年</p><p>北京上客户克里斯多</p></li>
              <li class="clearfix"><p>小学 高中 初中小学 高中 初中</p><p>户克里</p></li>
              <li class="clearfix"><p>教师人数：100</p><p>学生人数：400</p></li>
            </ul>
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
    width: 230px;
    height: 230px;
    margin-right: 75px;
  }
  .schoolLogo p img{
    width: 100%;
    height: 100%;
  }
  .schoolXinxi li p{
    float: left;
  }
</style>
