<template>
<div>
  <div class="schoolList" v-if="pcSee">
      <!-- //swiper -->
      <div class="carousel">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
               <img :src="schoolDetail.schoolShowOne">
            </div>
            <div class="swiper-slide">
                 <img :src="schoolDetail.schoolShowTwo">
            </div>
            <div class="swiper-slide">
               <img :src="schoolDetail.schoolShowThird">
            </div>
             <div class="swiper-slide">
                <img :src="schoolDetail.schoolShowFour">
            </div>
             <div class="swiper-slide">
                <img :src="schoolDetail.schoolShowFive">
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <!-- //logo以及学校说明 -->
      <div class="schoolSimple">
        <div class="schoolId clearfix"><p>NO.{{schoolDetail.id}}</p></div>
        <div class="schoolLogo">
            <el-row>
                <el-col :span="6" style="text-align:center;">
                    <img :src="schoolDetail.schoolLogo" width='170'/>
                </el-col>
                <el-col :span="8" style="font-size: 25px;margin-top:60px;">
                    {{schoolDetail.schoolName}}
                </el-col>
                <el-col :span="10"  style="font-size: 25px;margin-top:60px;">
                   认证：<span v-for="everyApprove of approveSplit" class="approve" :key="everyApprove">{{everyApprove}}</span>
                </el-col>
                 <el-col :span="8" style="margin-top:30px;font-size: 16px;">
                    {{schoolDetail.schoolEnglishName | isZero}}
                </el-col>
                <el-col :span="10"  style="font-size: 20px;margin-top:30px">
                      运营状态：<span class="circle">{{schoolDetail.operationState}}</span>
                </el-col>
            </el-row>
        </div>
        <div class="schoolTranslate">
          <div class="schoolTranslateBox">
             <h1 class="schoolTranslateH1" style="margin: 0 50px 20px;">基本信息</h1>
            <div class="basic">
                <el-row style="padding-top:15px;">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <p>类型：<span>{{schoolDetail.schoolProperties}}</span></p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <p>建校时间：<span>{{schoolDetail.foundingTime | isZero}}</span></p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <p class="grade">学制：<span v-for="everyGrade of gradeSplit" :key="everyGrade">{{everyGrade}}</span></p>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <p>面积（亩）：<span>{{schoolDetail.coveredArea | isZero}}</span></p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <p>申请费用：<span>2000</span></p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <p class="fee">学费：<span >{{schoolDetail.oneTuition  | isZero}}</span><span>{{schoolDetail.twoTuition  | isZero}}</span><span>{{schoolDetail.thirdTuition  | isZero}}</span><span>{{schoolDetail.fourTuition  | isZero}}</span></p>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 50px;">
                    <el-col :span="12">
                        <div class="grid-content bg-purple website">
                            <p>网址：<span @click="toWebsite(schoolDetail.website)">{{schoolDetail.website | isZero}}</span></p>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <p>课程：<span v-for="everyCourse of courseSplit" :key="everyCourse">{{everyCourse}}</span></p>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:18px;">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <p>电话：<span>{{schoolDetail.telephone | isZero}}</span></p>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <p>地址：<span>{{schoolDetail.province | isNull}}</span><span>{{schoolDetail.town | isNull}}</span><span>{{schoolDetail.address | isNull}}</span></p>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <h1 class="schoolTranslateH1">学校概述</h1>
            <div class="intoduceJeshao"  ref="obj">
              <p :style="'height:'+activityBannerH+'px'" :class="shortContent?'show':'hide'" class="shortContent">{{schoolDetail.schoolDesc}}</p>
              <p :class="longContent?'show':'hide'" class="longContent">{{schoolDetail.schoolDesc}}</p>
              <span @click="lookMore" :class="more?'show':'hide'">【更多】</span>
            </div>
          </div>
          <div class="hardware" :class="Ishardware?'show':'hide'">
            <h1 class="schoolTranslateH1">硬件设施</h1>
            <p>{{schoolDetail.hardware | isNull}}</p>
          </div>
          <div class="concept">
            <h1 class="schoolTranslateH1">办学理念</h1>
            <p>{{schoolDetail.schoolManagement}}</p>
          </div>
          <div class="feature" :class="Isfeature?'show':'hide'">
              <h1 class="schoolTranslateH1">办学特色</h1>
              <div class="featureBox">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style="text-align:center;">
                            <img :src="featureList1.cron1" alt="" class="img-responsive">
                            <p class="title">{{featureList1.title}}</p>
                            <p class="content">{{featureList1.desc}}</p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style="text-align:center;">
                            <img :src="featureList2.img" alt="" class="img-responsive">
                            <p class="title">{{featureList2.title}}</p>
                            <p class="content">{{featureList2.desc}}</p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style="text-align:center;">
                            <img :src="featureList3.img" alt="" class="img-responsive">
                            <p class="title">{{featureList3.title}}</p>
                            <p class="content">{{featureList3.desc}}</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
          </div>
          <div class="system">
            <h1 class="schoolTranslateH1">课程体系</h1>
            <p>{{schoolDetail.courseSystem}}</p>
          </div>
          <div class="teachers">
            <h1 class="schoolTranslateH1">师资队伍</h1>
            <el-row :gutter="0" style="width: 90%; margin: 0 auto;">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p><i class="iconfont icon-jixinrenshu"></i></p>
                        <p class="number">{{schoolDetail.students | isZero}}</p>
                        <p class="title">学生数量</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p><i class="iconfont icon-renshutongji"></i></p>
                        <p class="number">{{schoolDetail.teacherNum | isZero}}</p>
                        <p class="title">教师数量</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p><i class="iconfont icon-guojia"></i></p>
                        <p class="number">{{schoolDetail.nationalityOfStudents}}个国家</p>
                        <p class="title">学生国籍</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p><i class="iconfont icon-fenchengbili"></i></p>
                        <p class="number">{{schoolDetail.teacherStuRatio | isZero}}</p>
                        <p class="title">师生比</p>
                    </div>
                </el-col>
            </el-row>
          </div>
          <div class="admission"  :class="Isadmission?'show':'hide'">
              <h1 class="schoolTranslateH1">招生信息</h1>
              <div class="admissionBox">
                <img src="../assets/message.png" alt="" class="img-responsive">
                <div class="admissionContent">
                    <p>国际高中</p>
                    <el-row width="200%">
                        <el-col :span="12">招生对象：{{admissionList1.target}}</el-col>
                        <el-col :span="12">授课形式：{{admissionList1.from}}</el-col>
                         <el-col :span="12">入学要求：{{admissionList1.require}}</el-col>
                        <el-col :span="12">班级规模：{{admissionList1.scale}}</el-col>
                         <el-col :span="12">入学考试：{{admissionList1.exam}}</el-col>
                        <el-col :span="12">是否住宿：{{admissionList1.stay}}</el-col>
                    </el-row>
                    <p>国际初中</p>
                    <el-row width="200%">
                        <el-col :span="12">招生对象：{{admissionList3.target}}</el-col>
                        <el-col :span="12">授课形式：{{admissionList3.from}}</el-col>
                         <el-col :span="12">入学要求：{{admissionList3.require}}</el-col>
                        <el-col :span="12">班级规模：{{admissionList3.scale}}</el-col>
                         <el-col :span="12">入学考试：{{admissionList3.exam}}</el-col>
                        <el-col :span="12">是否住宿：{{admissionList3.stay}}</el-col>
                    </el-row>
                    <p>国际小学</p>
                    <el-row width="200%">
                        <el-col :span="12">招生对象：{{admissionList2.target}}</el-col>
                        <el-col :span="12">授课形式：{{admissionList2.from}}</el-col>
                         <el-col :span="12">入学要求：{{admissionList2.require}}</el-col>
                        <el-col :span="12">班级规模：{{admissionList2.scale}}</el-col>
                         <el-col :span="12">入学考试：{{admissionList2.exam}}</el-col>
                        <el-col :span="12">是否住宿：{{admissionList2.stay}}</el-col>
                    </el-row>
                </div>
              </div>

          </div>
          <div class="process">
              <h1 class="schoolTranslateH1">入学流程</h1>
              <div class="processBox">
                  <el-row>
                      <el-col :span="18">
                          <img src="../assets/process.png" alt="">
                      </el-col>
                      <el-col :span="6">
                        <el-row>
                            <el-button size="medium" class="order" style="margin: 55px auto 0;">预约访校</el-button>
                            <el-button size="medium" class="order" style="margin: 20px auto 0;">申请入学</el-button>
                        </el-row>
                      </el-col>
                  </el-row>
              </div>
          </div>
          <div class="cityschool" v-for="(item, index) in schoolList" v-if='index<3' :key="index">
              <h1 class="schoolTranslateH1">同城学校</h1>
              <el-row :gutter="20" style="width: 90%;margin: 0 auto;">
                <el-col :span="8"  class="imgbox">
                    <div class="grid-content bg-purple" style="text-align:center;">
                        <img src="../assets/school.png" alt="" width="150">
                        <p class="chineseName">北京世青国际学校</p>
                        <p class="englishName">Beijing World Youth Academy</p>
                    </div>
                </el-col>
                <el-col :span="8" class="imgbox">
                    <div class="grid-content bg-purple" style="text-align:center;">
                        <!-- <p class="imgbox"> -->
                            <img src="../assets/school.png" alt=""  width="150">
                        <!-- </p> -->
                        <p class="chineseName">北京世青国际学校</p>
                        <p class="englishName">Beijing World Youth Academy</p>
                    </div>
                </el-col>
                <el-col :span="8" class="imgbox">
                    <div class="grid-content bg-purple" style="text-align:center;">
                         <!-- <p class="imgbox"> -->
                             <img src="../assets/school.png" alt=""  width="150">
                         <!-- </p> -->
                       <p class="chineseName">北京世青国际学校</p>
                        <p class="englishName">Beijing World Youth Academy</p>
                    </div>
                </el-col>
            </el-row>
          </div>
          <div class="analyze">
              <h1 class="schoolTranslateH1">访校信息</h1>
              <div class="analyzeContent"></div>
          </div>
          <div class="analyze">
            <h1 class="schoolTranslateH1">更多信息</h1>
            <div class="analyzeContent"></div>
          </div>
          <div class="analyze">
            <h1 class="schoolTranslateH1">新学说分析</h1>
            <div class="analyzeContent">{{schoolDetail.companyAnalysis}}</div>
          </div>
        </div>
      </div>
    
  </div>
  <school-footer  v-if="pcSee"></school-footer>
  <div v-if="mobSee">
       <SchoolDetailM :child-object="asyncObject" v-if="flag"></SchoolDetailM>
  </div>
 
</div>
</template>

<script>
    import Swiper from "swiper";
    import "swiper/dist/css/swiper.min.css";
    import axios from "axios";
    import SchoolFooter from "./schoolFooter.vue";
    import SchoolDetailM from "./schoolDetailM.vue";
    import {
        getSchoolDeatail
    } from "@/api/api";
    export default {
         components: {
            SchoolFooter,
            SchoolDetailM
        },
        data() {
            return {
                asyncObject: '',
                flag: false,
                pcSee: false,
                mobSee: false,
                schoolDetail: {},
                more: false,
                longContent: false,
                shortContent: true,
                activityBannerH: "",
                approveSplit: [],
                gradeSplit: [],
                courseSplit: [],
                countrySplit:[],
                Ishardware:true,
                Isfeature:true,
                featureList1:{},
                featureList2:{},
                featureList3:{},
                Isadmission:true,
                admissionList1:{},
                admissionList2:{},
                admissionList3:{},
                schoolList:[],
            };
        },
        filters:{
            // 模块
            isNull(obj){
                if(obj == "0"){
                    return ''
                }else{
                   return obj
                }
            },
            // 基本内容
            isZero(msg){
                if(msg == "0" || msg == 0){
                    return '暂无'
                }else{
                   return msg
                }
            },
        },
        methods: {
            getDetail() {
                var that = this;
                //  var schoolId = that.$route.query.id
                getSchoolDeatail({
                    // schoolId: 100053
                    schoolId:101386
                }).then(res => {
                    that.schoolDetail = res.data;
                    that.asyncObject = res
                    that.flag = true
                    // 判断数据是否为空
                    if(that.schoolDetail.hardware=="0"){
                        this.Ishardware=false
                    }else{
                         this.Ishardware=true
                    }
                    // 办学特色
                    if(res.data.characteristicsVo==null){
                        that.Isfeature=false
                    }else{
                        that.featureList1=res.data.characteristicsVo.one
                        that.featureList2=res.data.characteristicsVo.two
                        that.featureList3=res.data.characteristicsVo.three
                    }
                    // 招生信息
                    if(res.data.enrollmentVo==null){
                        that.Isadmission=false
                    }else{
                        that.admissionList1=res.data.enrollmentVo.highSchool
                        that.admissionList2=res.data.enrollmentVo.primarySchool
                        that.admissionList3=res.data.enrollmentVo.university
                    }
                    // 学生国籍
                    //  var country=that.schoolDetail.studeAbroadCountries
                    //  that.countrySplit=country.split("、")
                    //  console.log(that.countrySplit.length)
                    // 认证课程分割
                    var approve = res.data.authentication;
                    if (approve.search("；") != -1) { 
                        that.approveSplit = approve.split("；");
                    }else if(approve.search(";") != -1){
                        that.approveSplit = approve.split(";");
                    }else{
                        that.approveSplit=approve
                    }
                    console.log(that.approveSplit)
                    // 去除最后空格
                    that.approveSplit = that.approveSplit.slice(0, that.approveSplit.length - 1)
                    // 年级分割
                    var grade = res.data.schoolSystem;
                    if (grade.indexOf("；") != -1) { 
                        that.gradeSplit = grade.split("；");
                    }else{
                        that.gradeSplit = grade.split(";");
                    }
                    // 课程分割
                    var course = res.data.course;
                    if (course.indexOf("；") != -1) { 
                        that.courseSplit = course.split("；");
                    }else{
                        that.courseSplit = course.split(";");
                    }
                    // 元素加载完毕之后再执行 banner轮播 展开更多
                    this.$nextTick(()=>{
                        this.swiperInit()
                        if (this.$refs.obj.offsetHeight > 200) {
                            this.more = true;
                            this.activityBannerH=200
                        }else{
                            this.more = false;
                        }
                    })
                });
            },
             // swiper banner轮播
            swiperInit(){
                var mySwiper = new Swiper('.swiper-container',{
                    autoplay: {
                        delay:3000,
                        disableOnInteraction: false,
                    },
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    observer:true,
                })
            },
            // 点击跳转到学校网站 判断是否带有http 
            toWebsite(web){
                if(web.substr(0, 7).toLowerCase() == "http://"){
                    window.open(web,"_blank")
                }else{
                    window.open("http://"+web,"_blank")
                }
            },
            // 点击展开更多
            lookMore() {
                this.more = false;
                this.longContent = true;
                this.shortContent = false;
            }
        },
        mounted() {
            if (screen.width < 768) {
                this.mobSee = true
                this.pcSee = false
            } else {
                this.pcSee = true
                this.mobSee = false
            } 
            this.getDetail();
        },
    };
</script>
<style scoped>
    .schoolList {
        width: 1110px;
        margin: 0 auto;
        border: 1px solid #ccc;
        padding-bottom: 30px;
        margin-bottom: 100px;
        margin-top: 20px;
        color: #26343f;
    }
    /* bannner */
    
    .swiper-slide {
        height: 400px;
    }
    
    .swiper-button-next {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L5%2C44l-4.2-4.2L18.6%2C22L0.8%2C4.2L5%2C0z'%20fill%3D'%235888c6'%2F%3E%3C%2Fsvg%3E");
    }
    
    .swiper-button-prev {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l4.2%2C4.2L8.4%2C22l17.8%2C17.8L22%2C44L0%2C22z'%20fill%3D'%235888c6'%2F%3E%3C%2Fsvg%3E");
    }
    
    .carousel img {
        width: 100%;
        height: 100%;
    }
    
    .schoolId p {
        float: right;
        font-size: 18px;
        border: 2px solid #777;
        padding: 5px 10px;
        margin-top: 15px;
        margin-right: 15px;
        border-radius: 10px;
        color: #777;
    }
    
    /* .show {
        display: inline-block !important;
    } */
    /* 学校logo */
    
    .schoolLogo {
        margin: 20px 50px;
        width: 83%;
    }
    
    .schoolLogo .schoolId {
        font-size: 18px;
        border: 2px solid #777;
        padding: 5px 10px;
        border-radius: 10px;
        color: #777;
    }
    
    .schoolLogo .approve {
        background: #214f89;
        padding: 5px 8px;
        margin: 0 5px;
        color: #fff;
        border-radius: 10px;
        font-size: 14px;
    }
    
    .schoolLogo span.circle {
        background: #67c23a;
        border-radius: 10px;
        padding: 5px 10px;
        font-size: 16px;
        color: #fff;
    }
    /* 学校信息 */
    
    .schoolTranslate {
        font-size: 16px;
    }
    
    .schoolTranslateH1 {
        margin: 50px 50px 20px;
        font-size: 20px;
        font-weight: bold;
        /* color: #c8a06a; */
        color: #fff;
        background: -webkit-linear-gradient(left, #6b83a2 40%, #214f89);
        width: 10%;
        padding: 8px 0px;
        border-radius: 5px;
        text-align: center;
    }
    
    .schoolTranslateBox {
        background: #f9f9f9;
        padding: 30px 0;
    }
    /* 基本信息 */
    
    .basic {
        width: 83%;
        margin-left: 100px;
    }
    
    .basic .el-row p span {
        font-weight: 600;
        margin-right: 10px;
    }
    
    .basic .grade span,
    .basic .fee span {
        width: 54px;
        text-align: center;
        display: inline-block
    }
    .basic .website{
        cursor: pointer;
    }
    .basic .website:hover{
        color:#214f89
    }
    /* 学校概述 */
    
    .intoduceJeshao {
        width: 83%;
        margin: 0 auto;
        letter-spacing: 1px;
    }
    
    .intoduceJeshao p {
        line-height: 32px;
        font-size: 16px;
    }
    
    .intoduceJeshao .shortContent {
        overflow: hidden;
    }
    
    .intoduceJeshao span {
        color: #214f89;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
    }
    /* 硬件设施 */
    
    .hardware p {
        width: 83%;
        margin: 0 auto 20px;
        line-height: 32px;
        font-size: 16px;
    }
    /* 办学理念 */
    
    .concept p {
        width: 83%;
        margin: 0 auto 20px;
        line-height: 32px;
        font-size: 16px;
    }
    /* 办学特色 */
    .feature{
        width:100%;
    }
    .featureBox{
        width:83%;
        margin:0 auto
    }
    .feature img {
        width: 260px;
        box-shadow: 5px 5px 0px #c9cabb;
    }
    
    .feature p.title {
        margin: 25px 0 10px;
        font-weight: bold;
    }
    
    .feature p.content {
        width: 70%;
        line-height: 28px;
        font-size: 14px;
        display: inline-block;
    }
    /* 课程体系 */
    
    .system p {
        width: 83%;
        margin: 0 auto 20px;
        line-height: 32px;
    }
    /* 师资力量 */
    
    .teachers p i {
        font-size: 55px;
    }
    
    .teachers p {
        text-align: center;
    }
    
    .teachers p.number {
        margin: 20px;
        font-weight: bold;
        color: #214f89;
        font-size: 22px;
    }
    /* 招生信息 */
    .admission{
        width:100%;
    }
    .admission .admissionBox {
        background: #eee;
        position: relative;
        width: 83%;
        margin: 0 auto;
    }
    
    .admissionContent p {
        margin: 40px 0 5px;
        font-weight: bold;
    }
    
    .admission .admissionContent {
        position: absolute;
        top: 47%;
        left: 62%;
        transform: translateY(-50%);
    }
    
    .admissionContent .el-col {
        margin: 10px 0;
    }
    /* 同城学校 */
    
    .cityschool .imgbox {
        border-top: 5px solid #214f89;
        box-shadow: 0px 0px 15px #ccc;
        width: 250px;
        height: 300px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0 41px;
        font-weight: bold;
        color: #214f89;
        font-size: 20px;
        border-radius: 5px;
    }
    
    .cityschool p.chineseName {
        margin: 15px 0;
    }
    
    .cityschool p.englishName {
        line-height: 23px;
        font-size: 14px;
    }
    /* 入学流程 */
    
    .process .processBox {
        width: 83%;
        height: 200px;
        box-shadow: 0px 0px 5px #ccc;
        margin: 0 auto 20px;
        text-align: center;
    }
    
    .processBox p.title {
        letter-spacing: 5px;
        font-size: 25px;
    }
    
    .processBox img {
        margin-top: 40px;
        width: 600px;
        height: 120px;
    }
    
    .processBox .order {
        border: 2px solid #214f89;
        color: #214f89;
        padding: 10px 30px;
        font-weight: bold;
        letter-spacing: 3px;
        font-size: 16px;
    }
    
    .el-button:hover {
        background-color: #214f89;
        border: 2px solid #214f89;
        color: #fff;
    }
    /* 新学说分析 */
    
    .analyze .analyzeContent {
        height: 200px;
        width: 83%;
        border: 1px solid #ccc;
        margin: 0 auto;
        padding:20px;  
    }
</style>