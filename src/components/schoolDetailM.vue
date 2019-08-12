<template>
    <div class="schoolDetailM">
        <div class="bgImg">
            <img :src="schoolDetail.schoolShowOne" alt="" class="img-responsive">
            <div class="head">
                <el-row>
                    <el-col :span="8">
                        <img :src='schoolDetail.schoolLogo?schoolDetail.schoolLogo:"http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png"'>
                    </el-col>
                    <el-col :span="16">
                        <h3 style="margin-top:10px">{{schoolDetail.schoolName}}</h3>  
                    </el-col>
                    <el-col :span="16">
                        <h5>{{schoolDetail.schoolEnglishName|ellipsisEname}}</h5>  
                    </el-col>
                     <el-col :span="16">
                        地址：<span>{{schoolDetail.province | isNull}}</span><span>{{schoolDetail.town | isNull}}</span>
                     </el-col>
                </el-row>
                <div class="basicMessage">
                    <el-row>
                        <el-col :span="7">
                            类型：{{schoolDetail.schoolProperties}}
                        </el-col>
                        <el-col :span="7">
                            面积(亩)：{{schoolDetail.coveredArea}}
                        </el-col>
                        <el-col :span="10">
                            建校时间：{{schoolDetail.foundingTime | isZero}}
                        </el-col>
                        <el-col :span="24">
                            课程：<span v-for="everyCourse of courseSplit" style="margin-right:5px;" :key="everyCourse">{{everyCourse}}</span>
                        </el-col>
                        <el-col :span="24">
                            网址：<span @click="toWebsite(schoolDetail.website)">{{schoolDetail.website}}</span>
                        </el-col>
                        <el-col :span="24">
                            电话：{{schoolDetail.telephone}}
                        </el-col>
                    </el-row>
                    <div class="boxfee">
                        <p>学制：<span v-for="everyGrade of gradeSplit" class="grade" :key="everyGrade">{{everyGrade}}</span></p>
                        <p class="fee">学费：<span>{{schoolDetail.oneTuition | isZero}}</span><span>{{schoolDetail.twoTuition | isZero}}</span><span>{{schoolDetail.thirdTuition | isZero}}</span><span>{{schoolDetail.fourTuition | isZero}}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="tabbable" >
            <ul class="nav nav-tabs"  id="navfixed">
                <li class="active"><a href="#summary" data-toggle="tab">学校概述</a></li>
                <li class=""><a href="#system" data-toggle="tab">课程体系</a></li>
                <li class=""><a href="#admission" data-toggle="tab">招生信息</a></li>
                <li class=""><a href="#analyse" data-toggle="tab">更多分析</a></li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="summary">
                    <p class="titleM"  v-if="Isintro">学校简介</p>
                    <p v-else></p>
                    <div  ref="obj">
                        <p :style="'height:'+activityBannerH+'px'" :class="shortContent?'show':'hide'" class="shortContent contentM">{{schoolDetail.schoolDesc}}</p>
                        <p :class="longContent?'show':'hide'" class="longContent contentM">{{schoolDetail.schoolDesc}}</p>
                        <span @click="lookMore" :class="more?'show':'hide'" class="contentM more">【更多】</span>
                    </div>
                    <p class="titleM" v-if="schoolShowOne">学校图片</p>
                    <p v-else></p>
                    <p class="contentM">
                        <span>
                            <div class="swiper-container">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <img :src="schoolDetail.schoolShowOne" class="img-responsive">
                                    </div>
                                    <div class="swiper-slide">
                                        <img :src="schoolDetail.schoolShowTwo" class="img-responsive">
                                    </div>
                                    <div class="swiper-slide">
                                        <img :src="schoolDetail.schoolShowThird" class="img-responsive">
                                    </div>
                                    <div class="swiper-slide">
                                        <img :src="schoolDetail.schoolShowFour" class="img-responsive">
                                    </div>
                                    <div class="swiper-slide">
                                        <img :src="schoolDetail.schoolShowFive" class="img-responsive">
                                    </div>
                                </div>
                                <!-- 如果需要分页器 -->
                                <!-- <div class="swiper-pagination"></div> -->
                                <!-- 如果需要导航按钮 -->
                                <!-- <div class="swiper-button-prev"></div> -->
                                <!-- <div class="swiper-button-next"></div> -->
                            </div>
                        </span>
                    </p>
                    <p class="titleM"  :class="Ishardware?'show':'hide'">硬件设施</p>
                    <p class="contentM">{{schoolDetail.hardware | isNull}}<span>具体地址：<span>{{schoolDetail.province | isNull}}</span><span>{{schoolDetail.town | isNull}}</span><span>{{schoolDetail.address | isNull}}</span></span></p>
                    <p class="titleM"  v-if="Isconcept">办学理念</p>
                    <p v-else></p>
                    <p class="contentM">{{schoolDetail.schoolManagement}}</p>
                    <p class="titleM"  :class="Isfeature?'show':'hide'">办学特色</p>
                    <p class="contentM">
                        <el-row class="featureBox">
                            <el-col :span="12">
                                <img :src="featureList1.img" alt="" class="img-responsive">
                            </el-col>
                            <el-col :span="12">{{featureList1.title}}</el-col>
                            <el-col :span="12">{{featureList1.desc}}</el-col>
                        </el-row>
                        <el-row class="featureBox">
                            <el-col :span="12">
                               <img :src="featureList2.img" alt="" class="img-responsive">
                            </el-col>
                            <el-col :span="12">{{featureList2.title}}</el-col>
                            <el-col :span="12">{{featureList2.desc}}</el-col>
                        </el-row>
                        <el-row class="featureBox" style="margin-bottom:0">
                            <el-col :span="12">
                                <img :src="featureList3.img" alt="" class="img-responsive">
                            </el-col>
                            <el-col :span="12">{{featureList3.title}}</el-col>
                            <el-col :span="12">{{featureList3.desc}}</el-col>
                        </el-row>
                    </p>
                </div>
                <div class="tab-pane" id="system">
                    <p class="titleM"  v-if="Issystem">课程体系</p>
                    <p v-else></p>
                    <p class="contentM">{{schoolDetail.courseSystem}}</p>
                    <p class="titleM">师资队伍</p>
                    <el-row class="teachers">
                        <el-col :span="12">
                            <p><i class="iconfont icon-jixinrenshu"></i></p>
                            <p class="number">{{schoolDetail.students}}</p>
                            <p class="title">学生数量</p>
                        </el-col>
                        <el-col :span="12">
                            <p><i class="iconfont icon-renshutongji"></i></p>
                            <p class="number">{{schoolDetail.teacherNum}}</p>
                            <p class="title">教师数量</p></el-col>
                        <el-col :span="12" style="margin-top:60px;">
                            <p><i class="iconfont icon-guojia"></i></p>
                            <p class="number">{{schoolDetail.nationalityOfStudents}}个国家</p>
                            <p class="title">学生国籍</p>
                        </el-col>
                        <el-col :span="12" style="margin-top:60px; margin-bottom: 40px;">
                            <p><i class="iconfont icon-fenchengbili"></i></p>
                            <p class="number">{{schoolDetail.teacherStuRatio}}</p>
                            <p class="title">师生比</p>
                        </el-col>
                    </el-row>
                </div>
                <div class="tab-pane" id="admission">
                    <p class="titleM" :class="Isadmission?'show':'hide'">招生信息</p>
                    <p class="contentM">
                        <span class="gradeBox">
                            <p>国际高中</p>
                            <el-row>
                                <el-col :span="12">招生对象：{{admissionList1.target}}</el-col>
                                <el-col :span="12">授课形式：{{admissionList1.from}}</el-col>
                                <el-col :span="12">入学要求：{{admissionList1.require}}</el-col>
                                <el-col :span="12">班级规模：{{admissionList1.scale}}</el-col>
                                <el-col :span="12">入学考试：{{admissionList1.exam}}</el-col>
                                <el-col :span="12">是否住宿：{{admissionList1.stay}}</el-col>
                            </el-row>
                        </span>
                        <span class="gradeBox">
                            <p>国际初中</p>
                            <el-row>
                                <el-col :span="12">招生对象：{{admissionList3.target}}</el-col>
                                <el-col :span="12">授课形式：{{admissionList3.from}}</el-col>
                                <el-col :span="12">入学要求：{{admissionList3.require}}</el-col>
                                <el-col :span="12">班级规模：{{admissionList3.scale}}</el-col>
                                <el-col :span="12">入学考试：{{admissionList3.exam}}</el-col>
                                <el-col :span="12">是否住宿：{{admissionList3.stay}}</el-col>
                            </el-row>
                        </span>
                        <span class="gradeBox">
                            <p>国际小学</p>
                            <el-row>
                                <el-col :span="12">招生对象：{{admissionList2.target}}</el-col>
                                <el-col :span="12">授课形式：{{admissionList2.from}}</el-col>
                                <el-col :span="12">入学要求：{{admissionList2.require}}</el-col>
                                <el-col :span="12">班级规模：{{admissionList2.scale}}</el-col>
                                <el-col :span="12">入学考试：{{admissionList2.exam}}</el-col>
                                <el-col :span="12">是否住宿：{{admissionList2.stay}}</el-col>
                            </el-row>
                        </span>
                    </p>
                    <!-- <p class="titleM">申请访校</p> -->
                    <!-- <p class="contentM">
                        <span>
                            <div class="applyBox">
                                 <el-form :model="formInline"  :rules="rules" class="demo-form-inline" ref="formInline">
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
                                            <el-option label="在职人员" value='在职人员'></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                                 <el-form :model="formInline">
                                    <el-form-item  class="remark">
                                        <el-input type="textarea" v-model="formInline.inputRemark" placeholder="备注"></el-input>
                                    </el-form-item>
                                </el-form> 
                                <div class="order">
                                    <el-button size="medium" type="primary" @click="submit('formInline')">立即提交</el-button>
                                </div>
                            </div>
                        </span>
                    </p> -->
                    <p class="titleM">同城学校</p>
                    <p class="contentM">
                        <el-row style="text-align:center">
                            <el-col :span="10" class="citySchoolBox"  v-for="(item, index) in schoolList"  :key="index">
                                <img :src='item.schoolLogo?item.schoolLogo:"http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png"' alt="">
                                <p class="chineseName">{{item.schoolName | ellipsisName}}</p>
                                <p class="englishName">{{item.schoolEnglishName | ellipsisEname|isZero}}</p>
                            </el-col>
                        </el-row>
                    </p>
                </div>
                <div class="tab-pane" id="analyse">
                    <p class="titleM">访校信息</p>
                    <div class="analyseBox"></div>
                    <p class="titleM">更多信息</p>
                    <div class="analyseBox"></div>
                    <p class="titleM">新学说分析</p>
                    <div class="analyseBox">{{schoolDetail.companyAnalysis}}</div>
                </div>
            </div>
        </div>
        <div class="process">
            <span type="text" @click="dialogFormVisible = true">申请访校</span>
        </div>
        <el-dialog title="申请访校" :visible.sync="dialogFormVisible">
            <el-form :model="formInline"  :rules="rules" class="demo-form-inline" ref="formInline">
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
                <el-form-item  class="remark">
                    <el-input type="textarea" v-model="formInline.inputRemark" placeholder="备注"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit('formInline')">提 交</el-button>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import {visitSchool,citySchool} from "@/api/api"
export default {
    props: ['childObject'],
    data(){
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
     return{
         dialogFormVisible: false,
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
        schoolDetail: [],
        more: false,
        longContent: false,
        shortContent: true,
        activityBannerH: "",
        gradeSplit: [],
        courseSplit: [],
        Ishardware:true,
        Isfeature:true,
        featureList1:{},
        featureList2:{},
        featureList3:{},
        Isadmission:true,
        admissionList1:{},
        admissionList2:{},
        admissionList3:{},
        Isintro:'',
        Isconcept:'',
        Issystem:'',
        schoolShowOne:'',
        schoolList:[],
     }
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
            if(msg == "0"){
                return '暂无'
            }else{
                return msg
            }
        },
        // 学校名字长度限制
        ellipsisName(value) {
            if (!value) return "";
            if (value.length > 9) {
                return value.slice(0, 7) + "...";
            }else{
                return value;
            }
        },
        ellipsisEname(Evalue){
            if (!Evalue) return "";
            if (Evalue.length > 20) {
                return Evalue.slice(0, 30) + "...";
            }else{
                return Evalue;
            }
        }
    },
    methods:{
        // goBack(){
        //     window.history.go(-1);
        // },
        judgeIsNull(){
            // 判断数据是否为空
            if(this.schoolDetail.hardware=="0"){
                this.Ishardware=false
            }else{
                this.Ishardware=true
            }
        },
         // swiper banner轮播
        swiperInit(){
            var mySwiper = new Swiper('.swiper-container',{
                autoplay: {
                    delay:3000,
                    disableOnInteraction: false,
                },
                loop: true,
                observer:true,
            })
        },
         // 点击跳转到学校网站
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
        submit(formName){
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
                        this.dialogFormVisible=false
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
        getCitySchool(){
            let that=this
            var schoolId = that.$route.query.id
                citySchool({
                    id:schoolId
                }).then(res=>{
                    console.log(res.data)
                    that.schoolList=res.data
                })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        // 监听高度
        handleScroll () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var offsetTop = document.querySelector('#navfixed').offsetTop;
            // console.log(scrollTop)
            if(scrollTop>280 || scrollTop==265){
                document.querySelector('#navfixed').style.top = '0px';
            }else{
                offsetTop = 345 - Number(scrollTop);
                document.querySelector('#navfixed').style.top = offsetTop+'px';
            }
            
        }
    },
    created(){
        this.schoolDetail=this.childObject.data;
        this.Isintro=this.schoolDetail.schoolDesc
        this.Isconcept=this.schoolDetail.schoolManagement
        this.schoolShowOne=this.schoolDetail.schoolShowOne
        this.Issystem=this.schoolDetail.courseSystem   
        // 办学特色
        if(this.schoolDetail.schoolCharacteristicsVo==null){
            this.Isfeature=false
        }else{
            this.featureList1=this.schoolDetail.schoolCharacteristicsVo.one
            this.featureList2=this.schoolDetail.schoolCharacteristicsVo.two
            this.featureList3=this.schoolDetail.schoolCharacteristicsVo.three
        }
        // 招生信息
        if(this.schoolDetail.studentEnrollmentVo==null){
            this.Isadmission=false
        }else{
            this.admissionList1=this.schoolDetail.studentEnrollmentVo.highSchool
            this.admissionList2=this.schoolDetail.studentEnrollmentVo.primarySchool
            this.admissionList3=this.schoolDetail.studentEnrollmentVo.university
        }  
        // 年级分割     
        var grade = this.childObject.data.schoolSystem;
        if (grade.indexOf("；") != -1) { 
            this.gradeSplit = grade.split("；");
        }else{
            this.gradeSplit = grade.split(";");
        }
        // 课程分割
        var course =this.childObject.data.course;
        if (course.indexOf("；") != -1) { 
            this.courseSplit = course.split("；");
        }else{
            this.courseSplit = course.split(";");
        }
        this.$nextTick(()=>{
            if (this.$refs.obj.offsetHeight > 150) {
                this.more = true;
                this.activityBannerH=150
            }else{
                this.more = false;
            }
        })
    },
    mounted(){   
        this.swiperInit()
        this.judgeIsNull()
        this.getCitySchool()
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll) 
    },
}
</script>
<style scoped lang="less">
.schoolDetailM{
    width: 100%;
    .bgImg{
        img {
            height: 345px;
        }
        .head {
            background: rgba(0, 0, 0, 0.5);
            padding: 15px 20px 20px;
            color: #fff;
            position: absolute;
            top: 0;
            height:345px;
            .el-col{
                margin: 5px 0;
                img{
                    width: 100px;
                    height:100px;
                    border-radius: 50%;
                    margin-bottom: 10px;
                }
            }
            .basicMessage {
                background: rgba(0, 0, 0, 0.3);
                padding: 10px;
                .boxfee{
                    background: rgba(255, 255, 255, 0.3);
                    padding: 10px;
                    margin-top: 10px;
                    span.grade,.fee span{
                        width: 55px;
                        display: inline-block;
                        text-align: center;
                    }
                }

            }
        }
    }
    .tabbable{
        ul {
            &#navfixed{
                position: fixed;
                top:345px;
                width:100%;
                z-index: 999;
                border-bottom: none;
                background: #f7f9fa;
            }
            li{
                width:25%;
                &.active{
                    a,a:focus,a:hover{
                        color: #214f89;
                        font-weight: bold;
                        background-color: #fff;
                        border: none;
                        border-bottom-color: transparent;
                    }
                }
            }
        }
        .tab-content{
            height:auto;
            overflow: scroll;
            position: relative;
            top:20px;
            .tab-pane{
                p{
                    &.titleM{
                        padding: 5px 0;
                        font-weight: bold;
                        color: #fff;
                        background: -webkit-linear-gradient(left, #6b83a2 40%, #214f89);
                        width: 22%;
                        text-align: center;
                        margin: 30px 20px 15px;
                        letter-spacing: 1px;
                    }
                    &.contentM {
                        line-height: 22px;
                        padding: 0 20px;
                    }
                }
                &#summary{
                    padding-bottom:80px;
                    .shortContent {
                        overflow: hidden;
                    }
                    .more{
                        color: #214f89;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        padding: 8px 13px;
                    }
                    .featureBox{
                        margin:20px 0;
                        img{
                            height: 105px;
                        }
                        .el-col{
                            &:nth-of-type(2){
                                font-weight:bold;
                                text-align:center
                            }
                        }
                    }
                }
                &#system{
                    .teachers{
                        text-align:center;
                        margin:40px 0;
                        p{
                            i{
                                font-size: 50px;
                            }
                            &.number{
                                font-weight: bold;
                                margin: 15px 0;
                            }
                        }
                    }
                }
                &#admission{
                    padding-bottom:80px;
                    .gradeBox{
                        margin: 10px 0;
                        display: inline-block;
                        box-shadow: 0px 0px 15px #ccc;
                        padding: 10px 20px;
                        line-height: 24px;
                        p{
                            font-size: 16px;
                            font-weight: bold;
                            margin-bottom: 5px;
                            letter-spacing: 2px;
                        }
                    }
                    .citySchoolBox{
                        border-top: 5px solid #214f89;
                        box-shadow: 0px 0px 15px #ccc;
                        border-radius: 5px;
                        margin: 20px 13px 0;
                        padding: 15px 5px;
                        img{
                             width:80px;
                            height:80px;
                        }
                        .englishName{
                            height:45px;
                        }
                        .chineseName{
                            margin: 5px 0;
                            font-weight: bold;
                        }
                    }
                }
                &#analyse{
                    padding-bottom:80px;
                    .analyseBox{
                        height: 150px;
                        width: 90%;
                        border: 1px solid #ccc;
                        margin: 0 auto;
                    }
                }
            }
        }
    }
    .process{
        border-radius: 50px 0 0 50px;
        padding: 5px 15px;
        background: #2364a6;
        color: #fff !important;
        position: fixed;
        bottom: 20px;
        right: -12px;
        letter-spacing: 1px;
        line-height: 15px;
        font-size: 14px;
        box-shadow: 0 0 5px #2364a6;
        z-index: 9;
        span{
            display: inline-block;
            width: 35px;
        }
    }
    
}  
    // #admission .applyBox{
    //     box-shadow: 0px 0px 5px #ddd;
    //     text-align: center;
    //     padding: 20px 0;
    // }
    // #admission .applyBox .el-form,#admission .applyBox .el-select,#admission .applyBox .el-textarea{
    //     width:270px;
    //     margin: 0 auto;
    // }
    //  #admission .applyBox .el-button{
    //     width:200px;
    // }
</style>
<style>
.el-dialog{
    width:80% !important;
}
.el-select{
    width:100%;
}
</style>
