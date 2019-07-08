<template>
  <div class="schoolList">
      <div class="carousel">
        <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(v,i) in schoolSwiper" :key="i">
                <img :src="v.img">
              </div>
               <!-- <div class="swiper-slide">
                <img src="../assets/one.png">
              </div>
                 <div class="swiper-slide">
                <img src="../assets/school.png">
              </div>
                 <div class="swiper-slide">
                <img src="../assets/school.png">
              </div> -->
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <!-- 如果需要滚动条 -->
          <div class="swiper-scrollbar"></div>
      </div>
        <!-- <div class="swiper-container" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(v,i) in schoolSwiper" :key="i">
              <img :src="v">
            </div>
          </div>
        </div> -->
      </div>
      <div class="schoolSimple">
        <div class="schoolId clearfix"><p>NO.{{schoolId}}</p></div>
        <div class="schoolLogo clearfix">
          <p class="schoolLogoLeft"><img src="../assets/school.png" /></p>
          <ul>
            <li>{{schollDatil.schoolName}}</li>
            <li>{{schollDatil.schoolEnglishName}}</li>
            <li>类型：{{schollDatil.schoolProperties}}</li>
          </ul>
          <div class="schoolLogoRight">
            <h1>认证：<span>12345</span><span>12345</span><span>12345</span></h1>
            <p>运营状态：{{schollDatil.operationState}}</p>
            <P>地址：{{schollDatil.address}}</P>
          </div>
        </div>
        <div class="schoolTranslate">
          <h1 class="schoolTranslateH1">基本信息</h1>
          <div class="schoolTranslateBox">
            <ul class="schoolTranslateHeader clearfix">
              <li class="clearfix"><p><i class="iconfont icon-shijian"></i>建校时间：{{schollDatil.foundingTime}}年</p><p><i class="iconfont icon-guanwang"></i>{{schollDatil.website}}</p></li>
              <li class="clearfix"><p>学制：<span>小学</span><span>初中</span><span>高中</span></p><p>学费：<span>150000</span><span>150000</span><span>150000</span></p></li>
            </ul>
          </div>
          <h1 class="schoolTranslateH1">课程学生</h1>
          <div class="schoolTranslateCenter clearfix">
            <ul class="clearfix">
              <li class="clearfix"><p><i class="iconfont icon-shijian"></i>{{schollDatil.foundingTime}}年</p><p><i class="iconfont icon-dili"></i>{{schollDatil.coveredArea}}亩</p><p><i class="iconfont icon-jine"></i>{{schollDatil.schoolSystem}}</p></li>
              <li class="clearfix"><p><i class="iconfont  icon-dibudaohanglan-"></i>{{schollDatil.schoolProperties}}</p><p><i class="iconfont icon-dingwei"></i>{{schollDatil.address}}</p><p><i class="iconfont icon-xuexiao"></i>{{schollDatil.schoolSystem}}</p></li>
              <li class="clearfix"><p><i class="iconfont icon-text_icon"></i>11{{schollDatil.course | ellipsisCurriculum}}</p><p><i class="iconfont icon-laoshi1"></i>教师人数：{{schollDatil.teacherNum}}</p><p><i class="iconfont icon-wodexuesheng"></i>学生人数：{{schollDatil.students}}</p></li>
              <li class="clearfix"><p><i class="iconfont icon-fenchengbili"></i>中外教比例：{{schollDatil.teacherNum}}-{{schollDatil.foreignTeacherNum}}</p><p><i class="iconfont icon-jiaoshi"></i>师生比例：{{schollDatil.teacherStuRatio}}</p><p><i class="iconfont icon-dianhua"></i>{{schollDatil.telephone}}</p></li>
            </ul>
          </div>
          <h1 class="schoolTranslateH1">师资力量   </h1>
          <div class="schoolTranslateCenter clearfix">
            <ul class="clearfix">
              <li class="clearfix"><p><i class="iconfont icon-text_icon"></i>11{{schollDatil.course | ellipsisCurriculum}}</p><p><i class="iconfont icon-laoshi1"></i>教师人数：{{schollDatil.teacherNum}}</p><p><i class="iconfont icon-wodexuesheng"></i>学生人数：{{schollDatil.students}}</p></li>
              <li class="clearfix"><p><i class="iconfont icon-fenchengbili"></i>中外教比例：{{schollDatil.teacherNum}}-{{schollDatil.foreignTeacherNum}}</p><p><i class="iconfont icon-jiaoshi"></i>师生比例：{{schollDatil.teacherStuRatio}}</p></li>
            </ul>
          </div>
          <h1 class="schoolTranslateH1">建设投资</h1>
          <div class="schoolTranslateCenter clearfix">
            <ul class="clearfix">
              <li class="clearfix"><p><i class="iconfont icon-shijian"></i>{{schollDatil.foundingTime}}年</p><p><i class="iconfont icon-dili"></i>{{schollDatil.coveredArea}}亩</p><p><i class="iconfont icon-jine"></i>{{schollDatil.schoolSystem}}</p></li>
              <li class="clearfix"><p><i class="iconfont  icon-dibudaohanglan-"></i>{{schollDatil.schoolProperties}}</p><p><i class="iconfont icon-dingwei"></i>{{schollDatil.address}}</p><p><i class="iconfont icon-xuexiao"></i>{{schollDatil.schoolSystem}}</p></li>
              <li class="clearfix"><p><i class="iconfont icon-text_icon"></i>11{{schollDatil.course | ellipsisCurriculum}}</p><p><i class="iconfont icon-laoshi1"></i>教师人数：{{schollDatil.teacherNum}}</p><p><i class="iconfont icon-wodexuesheng"></i>学生人数：{{schollDatil.students}}</p></li>
              <li class="clearfix"><p><i class="iconfont icon-fenchengbili"></i>中外教比例：{{schollDatil.teacherNum}}-{{schollDatil.foreignTeacherNum}}</p><p><i class="iconfont icon-jiaoshi"></i>师生比例：{{schollDatil.teacherStuRatio}}</p><p><i class="iconfont icon-dianhua"></i>{{schollDatil.telephone}}</p></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="intoduce">
        <h1 class="schoolTranslateH1">学校详细介绍</h1>
        <div class="intoduceJeshao">
          <h1>硬件设施</h1>
          <p>{{schollDatil.hardware}}</p>
          <h1>学校详情介绍</h1>
          <p>{{schollDatil.remark}}</p>
        </div>
      </div>
      <div class="detailOrder clearfix">
        <div class="deailOrderLeft">
          <h1>预约开放时间</h1>
          <ul class="clearfix">
            <li class="clearfix">
              <p><el-input v-model="inputName" placeholder="学生中文姓名"></el-input></p>
              <p><el-input v-model="inputTelephone" placeholder="手机电话"></el-input></p>
              <!-- <p><input type="text" placeholder="手机电话" /></p>
              <p><input type="text" placeholder="学生中文姓名" /></p> -->
              <p>
                <!-- <select>
                  <option>在读年级</option>
                  <option>初中</option>
                  <option>高中</option>
                  <option>小学</option>
                </select> -->
                <el-select v-model="value" placeholder="在读年级">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <p><el-radio v-model="radio" label="1">男</el-radio><el-radio v-model="radio" label="2">女</el-radio></p>
            </li>
            <li><el-button type="info">提交</el-button></li>
          </ul>
        </div>
        <div class="deailOrderRight">
          <h1>访校批注</h1>
          <div class="deailAnnotation">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="textarea"
              maxlength="500"
              show-word-limit
              :rows="5"
            >
            </el-input>
          </div>
          <!-- <div class="deailAnnotation" contenteditable="true"></div> -->
          <p><el-button type="info">提交</el-button></p>
        </div>
      </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css';
// import '../../node_modules/swiper/dist/js/swiper.min.js'
// import '../../node_modules/swiper/dist/css/swiper.min.css'
import axios from "axios";
import {getSchoolDeatail} from '@/api/api'
// import mEcharts from '../components/Echarts'
export default {
  data() {
    return {
      banner:true,
      schollDatil:{},
      schoolSwiper:[],
      schoolAuthentication:[],
      schoolId:"",
      textarea:"",//批注
      radio: '1',
      inputTelephone:"",//手机
      inputName:"",   //姓名
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },
  methods: {
    getData(){
      getSchoolDeatail({
        schoolId:100053
      }).then((res)=>{
        this.schollDatil = res.data;
        var one = res.data.schoolShowOne;
        this.schoolSwiper = [{img:one},{img:res.data.schoolShowThird},{img:res.data.schoolShowTwo}];
        //swiper
        var mySwiper = new Swiper('.swiper-container',{
          pagination: {
            el: '.swiper-pagination',
          },
          observer:true,
          autoplay:true,
          loop:true,
        })
        var authentication = res.data.authentication;
        console.log(authentication)

      })
      .catch(function (error) {
        console.log(error);
      });
      // let url = "http://data.xinxueshuo.cn/nsi-1.0/new/school/detail.do"
    },
    btn:function(){

    },
    getid:function(){
      this.schoolId = this.$route.query && this.$route.query.id;
    },
  },
  created(){
    this.getid(),
    this.getData()
  },
  //学校过滤超出显示...
  filters: {
    ellipsisCurriculum (value) {
      if (!value) return ''
      if (value.length > 6) {
        return value.slice(0,9) + '...'
      }
      return value
    }
  }
};
</script>
<style scoped>
  .schoolList{
    width: 1110px;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding-bottom: 30px;
    margin-bottom: 100px;
    margin-top: 20px;
  }
/* bannner */
  .swiper-slide{
    height: 400px;
  }
  .carousel img{
    width: 100%;
    height: 100%;
  }
  .schoolId p{
    float: right;
    font-size: 18px;
    border: 2px solid #777;
    padding: 5px 10px;
    margin-top: 15px;
    margin-right: 15px;
    border-radius: 10px;
    color: #777;
  }
  .schoolLogo{
    margin-top: 30px;
    margin-left: 100px;
    margin-right: 100px;
  }
  .schoolLogo ul{
    float: left;
    margin-left: 20px;
    margin-top: 10px;
  }
   .schoolLogo ul li:first-of-type{
    font-size: 32px;
  }
  .schoolLogo ul li:nth-of-type(2){
    font-size: 20px;
    margin-top: 20px;
  }
  .schoolLogo ul li:last-of-type{
    font-size: 18px;
    margin-top: 20px;
  }
  .schoolLogoLeft{
    float: left;
    width: 150px;
    height: 150px;
    margin-left: 0px;
  }
  .schoolLogoLeft img{
    width: 100%;
    height: 100%;
  }
   .schoolLogo ul h1{
     float: left;
     margin-left: 30px;
     font-size: 20px;
   }
   .schoolLogoRight{
     float: left;
     margin-left: 80px;
     margin-top: 15px;
     font-size: 18px;
   }
   .schoolLogoRight span{
     display: inline-block;
     padding: 5px;
     border-radius: 5px;
     background: #777;
     color: #ffffff;
     margin-right: 5px;
   }
   .schoolLogoRight p{
     margin-top: 20px;

   }

  /* 学校信息 */
  .schoolTranslate{
    font-size: 18px;
    margin-left: 100px;
    margin-right: 100px;

  }
  .schoolTranslate ul{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .schoolTranslate li{
    line-height: 50px;
  }
  .schoolTranslate li p i{
    font-size: 20px;
    margin-right: 5px;
  }
  .schoolTranslateH1{
    margin-top: 20px;
    text-align: center;
    background: #214f89;
    color: #eee;
    padding: 10px;
    font-size: 24px;
  }
  .schoolTranslateBox{
    background: #f9f9f9;
  }
  .schoolTranslateHeader{
    width: 80%;
    margin: 0 auto;
    background: #f9f9f9;
  }
  .schoolTranslateHeader p{
    width: 360px;
  }
  .schoolTranslateHeader li{
    float: left;
  }
  .schoolTranslateHeader p span{
    display: inline-block;
    width: 80px;
    text-align: center;
  }
  .schoolTranslateCenter{
    background: #f9f9f9;
  }
  .schoolTranslateCenter ul{
    width: 90%;
    margin: 0 auto;
  }
  .schoolTranslateCenter p{
    float: left;
    width: 270px;
  }


  /* 详情介绍 */
  .intoduce{
    margin-left: 100px;
    margin-right: 100px;
    margin-top: 20px;
    background: #f9f9f9;
    padding-bottom: 20px;
  }
  .intoduceJeshao{
    width: 90%;
    margin: 0 auto;
    letter-spacing: 1px;
  }
  .intoduceJeshao h1{
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 20px;
    font-weight: 600;
  }
  .intoduceJeshao h2{
    font-size: 16px;
    margin-top: 30px;
  }
  .intoduceJeshao p{
    line-height: 25px;
    text-indent: 24px;
    letter-spacing:1.5px;
    font-size: 18px;
  }
  .detailOrder{
    border-top: 2px solid #cccccc;
    margin-top: 30px;
  }
      /* 预约 */
.deailOrderLeft{
  margin-top: 20px;
  margin-left: 100px;
  background: #f7f7f7;
  margin-right: 100px;
  padding-bottom: 30px;
}
.detailOrder h1{
  background: #214f89;
  color: #eee;
  padding: 10px;
  font-size: 18px;
  text-align: center;
}
.deailOrderLeft li{
  margin-top: 30px;
  line-height: 40px;

}
.deailOrderLeft p{
  float: left;
  font-size: 18px;
  margin-left: 40px;
}
.deailOrderLeft p input[type="text"]{
  height: 30px;
  padding-left: 10px;
}
.deailOrderLeft p select{
  height: 35px;
  width: 176px;
  padding-left: 10px;
}
.deailOrderLeft li:last-of-type{
  text-align: center;
}
.deailOrderLeft span{
  margin-right: 30px;
}
.deailOrderLeft button{
  font-size: 16px;
  padding: 10px 80px;
  margin: 0 auto;
}
.deailOrderRight{
  margin-top: 20px;
  margin-right: 100px;
  margin-left: 100px;
  background: #f7f7f7;
  padding-bottom: 30px;
}
.deailAnnotation{
  margin-top: 30px;
  margin-right: 30px;
  margin-left: 30px;
}
.deailAnnotation:focus{outline:none;}
.deailOrderRight p{
  text-align: center;
}
.deailOrderRight button{
  font-size: 16px;
  padding: 10px 80px;
  margin-top: 20px;
}
</style>
