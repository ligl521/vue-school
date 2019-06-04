<template>
  <div class="schlloList">
      <div class="carousel" v-show="banner">
        <div class="swiper-container" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(v,i) in swiper" :key="i">
              <img :src="v">
            </div>
             <!-- <div class="swiper-slide">
              <img src="../assets/logo.png">
            </div>
            <div class="swiper-slide">
              <img src="../assets/logo.png">
            </div>
            <div class="swiper-slide">
              <img src="../assets/logo.png">
            </div> -->
          </div>
        </div>
      </div>
      <div class="schoolSimple">
          <div class="schoolLogo clearfix">
            <ul>
              <li>{{schollDatil.schoolName}}</li>
              <li>{{schollDatil.schoolEnglishName}}</li>
            </ul>
            <p><img src="../assets/school.png" /></p>
          </div>
          <div class="schoolXinxi">
            <ul>
              <li class="clearfix"><p><i class="iconfont  icon-dibudaohanglan-"></i>{{schollDatil.schoolProperties}}</p><p><i class="iconfont icon-dingwei"></i>{{schollDatil.address}}</p><p><i class="iconfont icon-xuexiao"></i>{{schollDatil.schoolSystem}}</p></li>
              <li class="clearfix"><p><i class="iconfont icon-shijian"></i>{{schollDatil.foundingTime}}年</p><p><i class="iconfont icon-text_icon"></i>{{schollDatil.course}}</p><p><i class="iconfont icon-qianmoney113"></i>{{schollDatil.schoolSystem}}</p></li>
              <li class="clearfix"><p><p><i class="iconfont icon-zhengzaidingwei"></i>{{schollDatil.coveredArea}}亩</p><p><i class="iconfont icon-laoshi1"></i>教师人数：{{schollDatil.teacherNum}}</p><p><i class="iconfont icon-wodexuesheng"></i>学生人数：{{schollDatil.students}}</p></li>
            </ul>
          </div>
      </div>
      <div class="schlloEchart clearfix">
        <div class="schlloEchartLeft"><i class="iconfont icon-laoshirenzheng1"></i></div>
        <div class="schlloChenter">
          <ul>
            <li>
                <div  id="myChart" style="width: 300px; height: 300px"></div>
            </li>
            <li>中外教比例</li>
          </ul>
        </div>
        <div class="schlloRight">
          <ul>
            <li>
              <p><i class="iconfont icon-laoshi1"></i></p><p><i class="iconfont icon-wodexuesheng"></i><i class="iconfont icon-wodexuesheng"></i><br/><i class="iconfont icon-wodexuesheng"></i><i class="iconfont icon-wodexuesheng"></i></p>
            </li>
            <li> {{schollDatil.teacherStuRatio}}</li>
            <li>师生比例</li>
          </ul>
        </div>
      </div>
      <div class="intoduce">
        <div class="intoduceJeshao">
          <h1>学习详情介绍</h1>
          <p>{{schollDatil.remark}}</p>
          <p>{{schollDatil.hardware}}</p>
        </div>
      </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import axios from "axios";
// import mEcharts from '../components/Echarts'
export default {
  data() {
    return {
      banner:true,
      schollDatil:{},
      swiper:[]
    }
  },
  methods: {
    getData(){
        // let url = "http://data.xinxueshuo.cn/nsi-1.0/new/school/detail.do"
        let url = "http://192.168.0.28:8080/nsi-1.0/new/school/detail.do"
        axios.get(url,{
          params:{
            schoolId:100053
          }
        }).then((res)=>{

          this.schollDatil = res.data.data;
          this.swiper.push(res.data.data.schoolShowOne);
          this.swiper.push(res.data.data.schoolShowThird);
          this.swiper.push(res.data.data.schoolShowTwo);
          console.log(this.swiper)
        })
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title : {
            // text: '某站点用户访问来源',
            // subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
            // orient: 'vertical',
            // left: 'left',
            // data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        // },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
          }
        ]
      });
    },
    btn:function(){

    },
    getid:function(){
      console.log(this.$route.query && this.$route.query.id)
    },

  },
  created(){
    this.getid(),
    this.getData()
  },
  mounted(){
    var mySwiper = new Swiper('.swiper-container', {
      autoplay:true,
      loop:true
    });
    this.drawLine()
  }
};
</script>
<style scoped>
  .schlloList{
    width: 1110px;
    margin: 0 auto;
    border: 1px solid #ccc;
  }
  .carousel{
    height: 300px;
  }
  .swiper-slide{
    height: 300px;
  }
  .carousel img{
    width: 100%;
    height: 100%;
  }
  .schoolLogo{
    margin-top: 75px
  }
  .schoolLogo ul{
    float: left;
    margin-left: 95px;
    margin-top: 30px;
  }
  .schlloEchart{
    margin-left: 95px;
    margin-right: 95px;
    height: 400px;
  }
  .schlloChenter{
    float: left;
    margin-top: 50px;
    margin-left: 40px;
  }
  .schlloChenter ul li:first-of-type{

  }
  .schlloEchartLeft{
    float: left;
  }
  .schlloEchartLeft i{
    font-size: 50px;

  }
  .schlloRight{
    float: left;
    width: 250px;
    margin-left: 20px;
    margin-top: 50px;
    margin-left: 260px;
  }
  .schlloRight p{
    display:inline-block;
    margin-right: 20px;
  }
  .schlloRight li:first-of-type p:first-of-type i{
    font-size: 54px;
  }
  .schlloRight li:first-of-type p:last-of-type i{
    font-size: 27px;
  }
  .schoolLogo ul li:first-of-type{
    font-size: 32px;
  }
  .schoolLogo ul li:last-of-type{
    font-size: 18px;
    margin-top: 20px;
  }
  .schoolLogo p{
    float: right;
    width: 150px;
    height: 150px;
    margin-right: 75px;
  }
  .schoolLogo p img{
    width: 100%;
    height: 100%;
  }
  .schoolXinxi{
    font-size: 16px;
    margin-left: 95px;
    margin-right: 95px;
  }
  .schoolXinxi li{
    border-bottom: 1px solid #ccc;
    line-height: 30px;
  }
  .schoolXinxi li p{
    float: left;
    width: 298px;
  }
  .schoolXinxi li p i{
    font-size: 20px;
    margin-right: 5px;
  }
  .intoduce{
    margin-left: 95px;
    margin-right: 95px;
  }
  .intoduceJeshao{
    letter-spacing: 1px;
  }
  .intoduceJeshao h1{
    font-size: 20px;
    margin-bottom: 10px;
  }
  .intoduceJeshao h2{
    font-size: 16px;
    margin-top: 26px;
  }
  .intoduceJeshao p{
    line-height: 25px;
    text-indent: 24px;
    width: 90%;
    margin: 0 auto;
  }
</style>
