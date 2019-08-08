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
            <div class="schoolLeft">
                <img v-if="schoolLogo"  :src="schoolLogo" width='170'/>   
                <img v-else src="http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png" alt="" width="170">
            </div>
            <div class="schoolRight">
                <ul>
                    <li style="font-size: 25px;margin:60px 0 0 50px;">{{schoolDetail.schoolName | ellipsisName}}</li>
                    <li style="font-size: 20px;margin-top:60px;">认证：<span v-for="everyApprove of approveSplit" class="approve" :key="everyApprove">{{everyApprove | isZero}}</span></li>
                    <li style="font-size: 16px;margin:30px 0 0 50px;">{{schoolDetail.schoolEnglishName | isZero | ellipsisEname}}</li>
                    <li style="font-size: 20px;margin-top:25px;">运营状态：<span class="circle">{{schoolDetail.operationState}}</span></li>
                </ul>
            </div>
        </div>
        <div class="schoolTranslate">
          <div class="schoolTranslateBox">
            <h1 class="schoolTranslateH1" style="margin: 0 50px 20px;">基本信息</h1>
            <div class="basic">
                <el-row style="padding-top:15px;">
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <p>类型：<span>{{schoolDetail.schoolProperties}}</span></p>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <p>建校时间：<span>{{schoolDetail.foundingTime | isZero}}</span></p>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <p class="grade">学制：<span v-for="everyGrade of gradeSplit" :key="everyGrade">{{everyGrade}}</span></p>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:10px;">
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <p>学生数量：<span>{{schoolDetail.students | isZero}}</span></p>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <p>申请费用：<span>{{schoolDetail.filingFee | isZero}}</span></p>
                        </div>
                    </el-col>
                    <el-col :span="10">
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
                <el-row style="margin-top:10px;">
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
            <h1 class="schoolTranslateH1" v-if="Isintro">学校概述</h1>
            <h1 v-else></h1>
            <div class="intoduceJeshao"  ref="obj">
              <p :style="'height:'+activityBannerH+'px'" :class="shortContent?'show':'hide'" class="shortContent">{{schoolDetail.schoolDesc}}</p>
              <p :class="longContent?'show':'hide'" class="longContent">{{schoolDetail.schoolDesc}}</p>
              <span @click="lookMore" :class="more?'show':'hide'">【更多】</span>
            </div>
          </div>
          <div class="hardware" :class="Ishardware?'show':'hide'">
            <h1 class="schoolTranslateH1">硬件设施</h1>
            <el-row>
                <el-col :span="8">占地面积(亩)：{{schoolDetail.coveredArea | isZero}}</el-col>
                <el-col :span="8">建筑面积(㎡)：{{schoolDetail.builtArea | isZero}}</el-col>
                <el-col :span="8">总容量：{{schoolDetail.studentCapacity | isZero}}</el-col>
            </el-row>
            <div class="line"></div>
            <p>{{schoolDetail.hardware | isNull}}</p>
          </div>
          <div class="concept">
            <h1 class="schoolTranslateH1" v-if="Isconcept">办学理念</h1>
            <h1 v-else></h1>
            <p>{{schoolDetail.schoolManagement}}</p>
          </div>
          <div class="feature" :class="Isfeature?'show':'hide'">
              <h1 class="schoolTranslateH1">办学特色</h1>
              <div class="featureBox">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style="text-align:center;">
                            <img :src="featureList1.img" alt="" class="img-responsive">
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
            <h1 class="schoolTranslateH1" v-if="Issystem">课程体系</h1>
            <h1 v-else></h1>
            <p>{{schoolDetail.courseSystem}}</p>
          </div>
          <div class="teachers" :class="teacher?'show':'hide'">
            <h1 class="schoolTranslateH1">师资队伍</h1>
            <div class="teacherBox">
                <div class="student" v-if="students">
                    <p><i class="iconfont icon-jixinrenshu"></i></p>
                    <p class="number">{{schoolDetail.students}}</p>
                    <p class="title">学生数量</p>
                </div>
                <div class="student" v-else></div>
                <div class="student" v-if="teacherNum">
                    <p><i class="iconfont icon-renshutongji"></i></p>
                    <p class="number">{{schoolDetail.teacherNum}}</p>
                    <p class="title">教师数量</p>
                </div>
                <div class="student" v-if="foreignTeacherNum">
                    <p><i class="iconfont icon-renshutongji"></i></p>
                    <p class="number">{{schoolDetail.foreignTeacherNum}}</p>
                    <p class="title">外籍教师数量</p>
                </div>
                <div class="student" v-if="teacherStuRatio">
                    <p><i class="iconfont icon-fenchengbili"></i></p>
                    <p class="number">{{schoolDetail.teacherStuRatio}}</p>
                    <p class="title">师生比</p>
                </div>
                <div class="student" v-if="nationalityOfStudents">
                    <p><i class="iconfont icon-guojia"></i></p>
                    <p class="number">{{schoolDetail.nationalityOfStudents}}个国家</p>
                    <p class="title">学生国籍</p>
                </div>
            </div>
          </div>
          <div class="admission"  :class="Isadmission?'show':'hide'">
              <h1 class="schoolTranslateH1">招生信息</h1>
              <div class="admissionBox">
                <img src="../assets/message.png" alt="" class="img-responsive">
                <div class="admissionContent">
                    <p v-if="admissionList1">国际高中</p>
                    <p v-else></p>
                    <el-row width="200%">
                        <el-col :span="12">招生对象：{{admissionList1.target}}</el-col>
                        <el-col :span="12">授课形式：{{admissionList1.from}}</el-col>
                         <el-col :span="12">入学要求：{{admissionList1.require}}</el-col>
                        <el-col :span="12">班级规模：{{admissionList1.scale}}</el-col>
                         <el-col :span="12">入学考试：{{admissionList1.exam}}</el-col>
                        <el-col :span="12">是否住宿：{{admissionList1.stay}}</el-col>
                    </el-row>
                    <p v-if="admissionList3">国际初中</p>
                    <el-row width="200%">
                        <el-col :span="12">招生对象：{{admissionList3.target}}</el-col>
                        <el-col :span="12">授课形式：{{admissionList3.from}}</el-col>
                         <el-col :span="12">入学要求：{{admissionList3.require}}</el-col>
                        <el-col :span="12">班级规模：{{admissionList3.scale}}</el-col>
                         <el-col :span="12">入学考试：{{admissionList3.exam}}</el-col>
                        <el-col :span="12">是否住宿：{{admissionList3.stay}}</el-col>
                    </el-row>
                    <p v-if="admissionList2">国际小学</p>
                    <el-row width="200%">
                        <el-col :span="12">招生对象：{{admissionList2.target}}</el-col>
                        <el-col :span="12">授课形式：{{admissionList2.from}}</el-col>
                         <el-col :span="12">入学要求：{{admissionList2.require}}</el-col>
                        <el-col :span="12">班级规模：{{admissionList2.scale}}</el-col>
                         <el-col :span="12">入学考试：{{admissionList2.exam}}</el-col>
                        <el-col :span="12">是否住宿：{{admissionList2.stay}}</el-col>
                    </el-row>
                    <!-- <p v-if="admissionList4">国际幼儿园</p>
                    <el-row width="200%">
                        <el-col :span="12">招生对象：{{admissionList4.target}}</el-col>
                        <el-col :span="12">授课形式：{{admissionList4.from}}</el-col>
                         <el-col :span="12">入学要求：{{admissionList4.require}}</el-col>
                        <el-col :span="12">班级规模：{{admissionList4.scale}}</el-col>
                         <el-col :span="12">入学考试：{{admissionList4.exam}}</el-col>
                        <el-col :span="12">是否住宿：{{admissionList4.stay}}</el-col>
                    </el-row> -->
                </div>
              </div>
          </div>
          <div class="process">
              <h1 class="schoolTranslateH1">申请访校</h1>
              <div class="processBox">
                <el-form :inline="true" :model="formInline"  :rules="rules" class="demo-form-inline" ref="formInline">
                    <el-form-item prop="inputName">
                        <el-input v-model="formInline.inputName" placeholder="学生姓名"></el-input>
                    </el-form-item>
                    <el-form-item prop="inputNumber">
                        <el-input placeholder="手机号码"  v-model="formInline.inputNumber"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="在读年级" v-model="formInline.inputGrade">
                            <el-option label="幼儿园" value='幼儿园'></el-option>
                            <el-option label="一年级" value='一年级'></el-option>
                            <el-option label="二年级" value='二年级'></el-option>
                            <el-option label="三年级" value='三年级'></el-option>
                            <el-option label="四年级" value='四年级'></el-option>
                            <el-option label="五年级" value='五年级'></el-option>
                            <el-option label="六年级" value='六年级'></el-option>
                            <el-option label="七年级" value='七年级'></el-option>
                            <el-option label="八年级" value='八年级'></el-option>
                            <el-option label="九年级" value='九年级'></el-option>
                            <el-option label="十年级" value='十年级'></el-option>
                            <el-option label="十一年级" value='十一年级'></el-option>
                            <el-option label="十二年级" value='十二年级'></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :model="formInline">
                    <el-form-item  class="remark">
                         <el-input type="textarea" v-model="formInline.inputRemark" placeholder="备注"></el-input>
                    </el-form-item>
                </el-form> 
                <div class="order">
                    <el-button size="medium" type="primary" @click="sumbit('formInline')">立即提交</el-button>
                    <p>请留下您的"联系方式+姓名"，预约实地体验学校！</p>
                </div>
              </div>
          </div>
          <div class="cityschool">
              <h1 class="schoolTranslateH1">同城学校</h1>
              <el-row :gutter="20" style="width: 90%;margin: 0 auto;">
                <el-col :span="8"  class="imgbox" v-for="(item, index) in schoolList" v-if='index<3' :key="index">
                    <div class="grid-content bg-purple" style="text-align:center;">
                        <img :src="item.schoolLogo?item.schoolLogo:'http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png'" alt="" width="150">
                        <p class="chineseName">{{item.schoolName | ellipsisName}}</p>
                        <p class="englishName">{{item.schoolEnglishName | isZero | ellipsisEname}}</p>
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
          <div class="analyze">
            <h1 class="schoolTranslateH1">相关机构</h1>
                <ul class="schoolTranslateH1_ul" >
                       <el-popover v-for="(item,i) in relation_list" :key="i" 
                            placement="top-start"
                            :title="popover_title"
                            width="400"
                            trigger="hover">
                            <div class="popover_box">
                               <img class="popover_img" :src="popover_logo" alt="">
                               <div>
                                <p class="popover_p">{{popover_service}}</p>
                                <a class="popover_a"  :href="xinxueshuoSite+'companyDetail?id='+item.c02" target="_blank">查看更多</a>
                               </div>
                            </div>
                            <a class="schoolTranslateH1_ula" @mouseover="companyDetail_val(item.c02)" :href="xinxueshuoSite+'companyDetail?id='+item.c02" target="_blank" slot="reference">{{item.c02}}</a>
                        </el-popover>
                </ul>
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
    import {getSchoolDeatail,visitSchool,relation,companyDetail,citySchool} from "@/api/api";
    export default {
         components: {
            SchoolFooter,
            SchoolDetailM
        },
        data() {
            //校验手机号
            var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
            var validatePhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("手机号码不能为空"));
                } else if (!phoneReg.test(value)) {
                    callback(new Error("请输入正确的手机号码"));
                } else {
                    callback();
                }
            };
            return {
                visible: false,
                formInline: {
                    inputName: "",
                    inputGrade: "",
                    inputNumber: "",
                    inputRemark: "",
                },
                rules: {
                    inputName:[
                         {required: true, message: "名字不能为空" }
                    ],
                    inputNumber: [
                         {validator: validatePhone }
                    ],
                },
                asyncObject: '',
                flag: false,
                pcSee: false,
                mobSee: false,
                schoolDetail: {},
                more: false,// 概述点开更多
                longContent: false,
                shortContent: true,
                activityBannerH: "",
                approveSplit: [], // 分割
                gradeSplit: [],
                courseSplit: [],
                countrySplit:[],
                Isfeature:true,// 办学特色
                featureList1:{},
                featureList2:{},
                featureList3:{},
                Isadmission:true,// 招生信息
                admissionList1:{},
                admissionList2:{},
                admissionList3:{},
                admissionList4:{},
                schoolList:[],
                schoolLogo:'',// v-if判断
                Isintro:'',
                Isconcept:'',
                Issystem:'',
                Ishardware:true,
                teacher:true,// 师资队伍判断是否为空
                students:'',
                teacherNum:'',
                foreignTeacherNum:'',
                teacherStuRatio:'',
                nationalityOfStudents:'',
                xinxueshuoSite:"http://data.xinxueshuo.cn/vue-project/dist/index.html#/",
                relation_list:[],//相关机构
                popover_title:"",
                popover_logo:"",
                popover_service:""
            };
        },
        created(){
            this.relation_val()
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
                if(msg == "0" || msg == 0 || msg == null){
                    return '暂无'
                }else{
                   return msg
                }
            },
            // 学校名字长度限制
            ellipsisName(value) {
                if (!value) return "";
                if (value.length > 10) {
                    return value.slice(0, 10) + "...";
                }else{
                    return value;
                }
            },
            ellipsisEname(Evalue){
                if (!Evalue) return "";
                if (Evalue.length > 20) {
                    return Evalue.slice(0, 60) + "...";
                }else{
                    return Evalue;
                }
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            relation_val(){
                relation({
                     type:"学校-机构",
                     searchId:this.$route.query.id
                }).then(res => {
                    console.log(res)
                    this.relation_list = res.data
                })
            },
            companyDetail_val(el){
                companyDetail({
                     institutionId:el
                }).then(res => {
                   console.log(res.data)
                   this.popover_title = res.data.name //title
                   this.popover_logo = res.data.institutionLogo //logo
                   this.popover_service = res.data.service //介绍
                })
            },
            getDetail() {
                var that = this;
                var schoolId = that.$route.query.id
                getSchoolDeatail({
                    schoolId:schoolId 
                }).then(res => {
                    that.schoolDetail = res.data;
                    // 父传子
                    that.asyncObject = res
                    that.flag = true
                    // v-if判断
                    that.schoolLogo=that.schoolDetail.schoolLogo
                    that.Isintro=that.schoolDetail.schoolDesc
                    that.Issystem=that.schoolDetail.courseSystem
                    that.Isconcept=that.schoolDetail.schoolManagement
                    that.students=that.schoolDetail.students
                    that.teacherNum=that.schoolDetail.teacherNum
                    that.foreignTeacherNum=that.schoolDetail.foreignTeacherNum
                    that.nationalityOfStudents=that.schoolDetail.nationalityOfStudents
                    that.teacherStuRatio=parseInt(that.schoolDetail.teacherStuRatio)
                    // 师资力量
                    if(that.schoolDetail.students == 0 & that.schoolDetail.teacherNum == 0 & that.schoolDetail.foreignTeacherNum==0 & that.schoolDetail.nationalityOfStudents==null & that.schoolDetail.teacherStuRatio=="0"){
                        that.teacher=false
                    }else{
                        that.teacher=true
                    }
                    // 判断数据是否为空
                    if(that.schoolDetail.hardware=="0"){
                        this.Ishardware=false
                    }else{
                         this.Ishardware=true
                    }
                    // 办学特色
                    if(res.data.schoolCharacteristicsVo==null){
                        that.Isfeature=false
                    }else{
                        that.featureList1=that.schoolDetail.schoolCharacteristicsVo.one
                        that.featureList2=that.schoolDetail.schoolCharacteristicsVo.two
                        that.featureList3=that.schoolDetail.schoolCharacteristicsVo.three
                    }
                    // 招生信息
                    if(res.data.studentEnrollmentVo==null){
                        that.Isadmission=false
                    }else{
                        that.admissionList1=that.schoolDetail.studentEnrollmentVo.highSchool
                        that.admissionList2=that.schoolDetail.studentEnrollmentVo.primarySchool
                        that.admissionList3=that.schoolDetail.studentEnrollmentVo.university
                        // that.admissionList4=that.schoolDetail.studentEnrollmentVo.kindergarten
                    }
                    // 认证课程分割
                    var approve = res.data.authentication;
                    if (approve.search("；") != -1) { 
                        that.approveSplit = approve.split("；");
                    }else if(approve.search(";") != -1){
                        that.approveSplit = approve.split(";");
                    }else{
                        that.approveSplit=approve
                    }
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
                    
                });
            },
            getCitySchool(){
                let that=this
                var schoolId = that.$route.query.id
                 citySchool({
                     id:schoolId
                 }).then(res=>{
                     that.schoolList=res.data
                 })
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
            },
            // 提交申请访校
            sumbit(formName){
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    let that=this
                    let schoolId = that.$route.query.id
                    visitSchool({
                        name:that.formInline.inputName,
                        attend:that.formInline.inputGrade,
                        telphone:that.formInline.inputNumber,
                        remark:that.formInline.inputRemark,
                        schoolId:schoolId
                    }).then(res=>{
                        // 父传子
                        that.asyncObject = res
                        that.flag = true
                        if(res.code==0){
                            this.$message({
                                message: '恭喜你，提交申请成功',
                                type: 'success',
                            });
                        }else{
                            this.$message.error('提交申请失败,请重新填写');
                        } 
                    })
                } else {
                    return false;
                }
                });
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            
        },
        mounted() {
            // 判断pc/phone
            if (screen.width < 768) {
                this.mobSee = true
                this.pcSee = false
            } else {
                this.pcSee = true
                this.mobSee = false
                this.$nextTick(()=>{
                    if (this.$refs.obj.offsetHeight > 200) {
                        this.more = true;
                        this.activityBannerH=200
                    }else{
                        this.more = false;
                    }
                })
            } 
            this.getDetail();
            this.getCitySchool()
            this.swiperInit()
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
    
    /* 学校logo */
    
    .schoolLogo {
        margin: 20px 50px;
        width: 83%;
        height:200px;
    }
    .schoolLeft{
        float:left;
    }
    .schoolRight ul li{
        float:left;
        width:340px;
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
        margin-right: 7px;
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
        position: relative;
        top: -1px;
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
        color: #484e54;
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
        color: #484e54;
    }
    .hardware .el-row{
        text-align: center;
        width: 83%;
        margin: 40px auto 20px;
    }
    .hardware .line{ 
        border-bottom: 1px solid #dcdfe6;
        width: 83% !important;
        margin: 20px auto !important;
    }
    /* 办学理念 */
    .concept p {
        width: 83%;
        margin: 0 auto 20px;
        line-height: 32px;
        font-size: 16px;
        color: #484e54;
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
        color: #484e54;
    }
    /* 课程体系 */
    
    .system p {
        width: 83%;
        margin: 0 auto 20px;
        line-height: 32px;
        color: #484e54;
    }
    /* 师资力量 */
    
    .teachers p i {
        font-size: 55px;
    }
    .teacherBox{
        width:83%;
        margin:0 auto;
        text-align:center;
    }
    .student{
        display:inline-block;
        margin-right:90px;
    }
    .student:last-of-type{
        margin-right:0;
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
        left: 53%;
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
    .cityschool .imgbox img{
        width:150px;
        height:150px;
    }
    
    .cityschool p.chineseName {
        margin: 15px 0;
    }
    
    .cityschool p.englishName {
        line-height: 23px;
        font-size: 14px;
        height: 45px;
    }
    /* 入学流程 */
    
    .process .processBox {
        width: 83%;
        height: 200px;
        background: #f1f2f3;
        box-shadow: 0px 0px 5px #dadcdf;
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
    .processBox .remark{
        width:540px;
    }
    
    .processBox .order {
        width:180px;
        position: relative;
        top: -140px;
        left: 675px;
    }
    .processBox .order .el-button{
        background-color: #214f89;
        border: 2px solid #214f89;
        color: #fff;
        font-size: 18px;
        padding: 10px 45px;
    }
    .processBox .order p{
        font-size: 14px;
        margin-top: 20px;
        color: #888a8e;
        line-height: 25px;
    }
    .processBox .el-form:first-of-type{
        width:100%;
        margin-top:35px;
        margin-left:70px;
        display: inline-flex;
    }
    .processBox .el-form:last-of-type{
        width:100%;
        margin-left:70px;
        display: inline-flex;
    }
    .processBox .el-input{
        width:180px !important;
    }
    .processBox .el-select{
        width:160px !important;
    }
    /* 新学说分析 */
    
    .analyze .analyzeContent {
        height: 200px;
        width: 83%;
        border: 1px solid #ccc;
        margin: 0 auto;
        padding:20px;  
    }
    /* 相关机构 */
   .schoolTranslateH1_ul{
       width: 83%; 
       margin: 0 auto;
       padding: 20px;
    }
   .schoolTranslateH1_ul  .schoolTranslateH1_ula{
        background: #214f89;
        padding: 5px 8px;
        margin-right: 7px;
        color: #fff;
        border-radius: 10px;
        font-size: 14px;
    }
    .popover_box{
       padding:0 10px;
       display: flex
    }
    .popover_box .popover_img {
      width:100px;
      height:100px;
      margin-right:10px
    }
    .popover_box .popover_p{
        overflow:hidden;
        height:60px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .popover_box .popover_a{
        display: block;
        text-align: right;
        margin-top: 5px;
        text-decoration:underline 
    }
</style>
<style>
    .el-textarea__inner{
        resize:none !important;
    }
    .el-popover__title{
        text-align: center!important;
    }
</style>