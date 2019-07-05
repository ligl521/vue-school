<template>
<div>
  <div class="schoolList" v-if="pcSee">
      <!-- //swiper -->
      <div class="carousel">
        <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img src="../assets/one.png">
              </div>
              <div class="swiper-slide">
                <img src="../assets/two.png">
              </div>
              <div class="swiper-slide">
                <img src="../assets/san.png">
              </div>
          </div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <!-- //logo以及学校说明 -->
      <div class="schoolSimple">
        <div class="schoolId clearfix"><p>NO.{{schoolDatil.id}}</p></div>
        <div class="schoolLogo">
            <el-row>
                <el-col :span="6" style="text-align:center;">
                    <img :src="schoolDatil.schoolLogo" width='170'/>
                </el-col>
                <el-col :span="8" style="font-size: 25px;margin-top:60px;">
                    {{schoolDatil.schoolName}}
                </el-col>
                <el-col :span="10"  style="font-size: 25px;margin-top:60px;">
                   认证：<span v-for="everyApprove of approveSplit" class="approve" :key="everyApprove">{{everyApprove}}</span>
                </el-col>
                 <el-col :span="8" style="margin-top:30px;font-size: 16px;">
                    {{schoolDatil.schoolEnglishName }}
                </el-col>
                <el-col :span="10"  style="font-size: 20px;margin-top:30px">
                      运营状态：<span class="circle">{{schoolDatil.operationState}}</span>
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
                            <p>类型：<span>{{schoolDatil.schoolProperties}}</span></p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <p>建校时间：<span>{{schoolDatil.foundingTime}}</span></p>
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
                            <p>面积（亩）：<span>{{schoolDatil.coveredArea}}</span></p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <p>申请费用：<span>2000</span></p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <p class="fee">学费：<span >{{schoolDatil.oneTuition}}</span><span>{{schoolDatil.twoTuition}}</span><span>{{schoolDatil.thirdTuition}}</span><span>{{schoolDatil.fourTuition}}</span></p>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 50px;">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <p>网址：<span>{{schoolDatil.website}}</span></p>
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
                            <p>电话：<span>{{schoolDatil.telephone}}</span></p>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <p>地址：<span>{{schoolDatil.province}}</span><span>{{schoolDatil.town}}</span><span>{{schoolDatil.address}}</span></p>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <h1 class="schoolTranslateH1">学校概述</h1>
            <div class="intoduceJeshao">
              <p :style="'height:'+activityBannerH+'px'" :class="shortContent?'show':'hide'" class="shortContent">{{schoolDatil.remark}}{{schoolDatil.remark}}{{schoolDatil.remark}}</p>
              <p :class="longContent?'show':'hide'" class="longContent">{{schoolDatil.remark}}{{schoolDatil.remark}}{{schoolDatil.remark}}</p>
              <span @click="lookMore" :class="more?'show':'hide'">【更多】</span>
            </div>
          </div>
          <div class="hardware">
            <h1 class="schoolTranslateH1">硬件设施</h1>
            <p>{{schoolDatil.hardware}}</p>
          </div>
          <div class="concept">
            <h1 class="schoolTranslateH1">办学理念</h1>
            <p>北京世青国际学校致力于将批判性研究、多远文化视角及客观评价标准紧密结合，努力为我校的每一个学生提供良好的学习机会。</p>
            <p>我们的使命在于培养原则性强，胸襟开阔的思考者，使他们能够适应多元化的国际社会，有能力改善自己的生活环境，提高自己和他人的生活质量。</p>
          </div>
          <div class="feature">
              <h1 class="schoolTranslateH1">办学特色</h1>
              <el-row :gutter="0" style="width:90%;margin:0 auto">
                <el-col :span="8">
                    <div class="grid-content bg-purple" style="text-align:center;">
                        <img src="../assets/one.png" alt="">
                        <p class="title">多元文化的融合</p>
                        <p class="content">配合北京市继续开展优质高中部分招生计划分配到初中校工作，为此清华附中新建将台路校区和奥森校区</p>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple" style="text-align:center;">
                        <img src="../assets/one.png" alt="">
                        <p class="title">教育设施完善</p>
                        <p class="content">配合北京市继续开展优质高中部分招生计划分配到初中校工作，为此清华附中新建将台路校区和奥森校区</p>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple" style="text-align:center;">
                        <img src="../assets/one.png" alt="">
                        <p class="title">注重能力培养</p>
                        <p class="content">配合北京市继续开展优质高中部分招生计划分配到初中校工作，为此清华附中新建将台路校区和奥森校区</p>
                    </div>
                </el-col>
            </el-row>
          </div>
          <div class="system">
            <h1 class="schoolTranslateH1">课程体系</h1>
            <p>IB 课程分为标准难度课程 （SL/ Standard Level） 和更具挑战性的高难度课程 （HL/HigherLevel）。IB 要求学生至少选六门课 ＋ Theory of Knowledge， 这六门课中至少有三门是 HL除了对学生的课业要求外 ， 选择 IB Diploma 的学生还要在两年内完成 150 个小时的社会实践活动 （ AS Hours）。</p>
            <p>A-Level课程证书被几乎所有英语授课的大学作为招收新生的入学标准。 在中国开设A-Level课程旨在为中国学生提供进入国外大学的有效途径，具体目标为：培养在国内初高中成绩优秀的学生进入世界顶尖大学；培养在国内初高中成绩中等的学生进入世界一流大学；培养在国内初高中成绩一般的学生考取适合自己的大学。</p>
            <p>IBDP课程是国际文凭组织（IBO）在综合各国课程优势的基础上，为具有较强学习动机的16~19岁学生设计的。它致力于培养具有终生学习能力的国际公民，具有和谐均衡的课程体系、严格的评估，是目前影响最大的国际化课程。IB课程是由两年时间来完成的。</p>
          </div>
          <div class="teachers">
            <h1 class="schoolTranslateH1">师资队伍</h1>
            <el-row :gutter="0" style="width: 90%; margin: 0 auto;">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p><i class="iconfont icon-jixinrenshu"></i></p>
                        <p class="number">{{schoolDatil.students}}</p>
                        <p class="title">学生数量</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p><i class="iconfont icon-renshutongji"></i></p>
                        <p class="number">{{schoolDatil.teacherNum}}</p>
                        <p class="title">教师数量</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p><i class="iconfont icon-guojia"></i></p>
                        <p class="number">25个国家</p>
                        <p class="title">学生国籍</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <p><i class="iconfont icon-fenchengbili"></i></p>
                        <p class="number">{{schoolDatil.teacherStuRatio}}</p>
                        <p class="title">师生比</p>
                    </div>
                </el-col>
            </el-row>
          </div>
          <div class="admission">
              <h1 class="schoolTranslateH1">招生信息</h1>
              <div class="admissionBox">
                <img src="../assets/message.png" alt="" class="img-responsive">
                <div class="admissionContent">
                    <p>国际高中</p>
                    <el-row width="200%">
                        <el-col :span="12">招生对象：同步过来</el-col>
                        <el-col :span="12">授课形式：面授</el-col>
                         <el-col :span="12">入学要求：测试+面试</el-col>
                        <el-col :span="12">班级规模：20-30人</el-col>
                         <el-col :span="12">入学考试：数学 英语</el-col>
                        <el-col :span="12">是否住宿：是</el-col>
                    </el-row>
                    <p>国际初中</p>
                    <el-row width="200%">
                        <el-col :span="12">招生对象：同步过来</el-col>
                        <el-col :span="12">授课形式：面授</el-col>
                         <el-col :span="12">入学要求：测试+面试</el-col>
                        <el-col :span="12">班级规模：20-30人</el-col>
                         <el-col :span="12">入学考试：数学 英语</el-col>
                        <el-col :span="12">是否住宿：是</el-col>
                    </el-row>
                    <p>国际小学</p>
                    <el-row width="200%">
                        <el-col :span="12">招生对象：同步过来</el-col>
                        <el-col :span="12">授课形式：面授</el-col>
                         <el-col :span="12">入学要求：测试+面试</el-col>
                        <el-col :span="12">班级规模：20-30人</el-col>
                         <el-col :span="12">入学考试：数学 英语</el-col>
                        <el-col :span="12">是否住宿：是</el-col>
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
          <div class="cityschool">
              <h1 class="schoolTranslateH1">同城学校</h1>
              <el-row :gutter="20" style="width: 90%;margin: 0 auto;">
                <el-col :span="8"  class="imgbox">
                    <div class="grid-content bg-purple" style="text-align:center;">
                        <!-- <p class="imgbox"> -->
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
            <div class="analyzeContent"></div>
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
                value: "",
                banner: true,
                schoolDatil: {},
                schoolSwiper: [],
                schoolAuthentication: [],
                schoolId: "",
                textarea: "", //批注
                radio: "1",
                inputTelephone: "", //手机
                inputName: "", //姓名
                options: [{
                    value: "选项0",
                    label: "幼儿园"
                }, {
                    value: "选项1",
                    label: "小学"
                }, {
                    value: "选项2",
                    label: "初中"
                }, {
                    value: "选项3",
                    label: "高中"
                }],
                isMore: false,
                more: false,
                longContent: false,
                shortContent: true,
                activityBannerH: "200",
                approveSplit: [],
                gradeSplit: [],
                courseSplit: [],
            };
        },
        
        methods: {
            getDetail() {
                var that = this;
                getSchoolDeatail({
                    schoolId: 100053
                }).then(res => {
                    that.asyncObject = res
                    that.flag = true
                    that.schoolDatil = res.data;
                    // 认证课程分割
                    var approve = res.data.authentication;
                    that.approveSplit = approve.split(";");
                    that.approveSplit = that.approveSplit.slice(0, that.approveSplit.length - 1)
                    // 年级分割
                    var grade = res.data.schoolSystem;
                    that.gradeSplit = grade.split(";");
                    // 课程分割
                    var course = res.data.course;
                    that.courseSplit = course.split(";");
                    // 展开更多
                    if (that.activityBannerH < 210) {
                        this.more = true;
                    }else{
                        this.more = false;
                        this.shortContent = false;
                        this.longContent = true;
                    }
                });
            },
            lookMore() {
                this.longContent = true;
                this.shortContent = false;
                this.more = false;
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
            this.test="666";   
            this.getDetail();
            var mySwiper = new Swiper(".swiper-container", {
                autoplay: {
                    disableOnInteraction: false, //用户操作后是否禁止自动循环
                    delay: 4000 //自自动循环时间
                },
                loop: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            });
        },
        created() {}
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
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L5%2C44l-4.2-4.2L18.6%2C22L0.8%2C4.2L5%2C0z'%20fill%3D'%23214f89'%2F%3E%3C%2Fsvg%3E");
    }
    
    .swiper-button-prev {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l4.2%2C4.2L8.4%2C22l17.8%2C17.8L22%2C44L0%2C22z'%20fill%3D'%23214f89'%2F%3E%3C%2Fsvg%3E");
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
    
    .show {
        display: inline-block !important;
    }
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
        /* background: #eee; */
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
    }
    /* 办学理念 */
    
    .concept p {
        width: 83%;
        margin: 0 auto 20px;
        line-height: 32px;
    }
    /* 办学特色 */
    
    .feature img {
        width: 260px;
        box-shadow: 5px 5px 0px #c9cabb;
    }
    
    .feature p.title {
        margin: 15px 0;
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
    
    .admission .admissionBox {
        background: #eee;
        position: relative;
        width: 83%;
        margin: 0 auto;
    }
    
    .admissionBox img {
        height: 600px;
    }
    
    .admissionContent p {
        margin: 50px 0 10px;
        font-weight: bold;
    }
    
    .admission .admissionContent {
        position: absolute;
        top: 0;
        left: 55%;
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
    }
</style>