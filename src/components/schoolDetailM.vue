<template>
    <div class="schoolDetailM">
        <div class="bgImg">
            <img :src="schoolDatil.schoolShowOne" alt="" class="img-responsive">
            <!-- <div class="back"  @click="goBack">  
                <a><i class="iconfont icon-arrow-left"></i></a>
            </div> -->  
            <div class="head">
                <el-row>
                    <el-col :span="8">
                            <img src="../assets/school.png">
                    </el-col>
                    <el-col :span="16">
                            <h3 style="margin-top:20px">{{schoolDatil.schoolName}}</h3>  
                    </el-col>
                    <el-col :span="16">
                            <h5>{{schoolDatil.schoolEnglishName}}</h5>  
                    </el-col>
                </el-row>
                <div class="basicMessage">
                    <el-row>
                        <el-col :span="7">
                            类型：{{schoolDatil.schoolProperties}}
                        </el-col>
                        <el-col :span="7">
                            面积(亩)：{{schoolDatil.coveredArea}}
                        </el-col>
                        <el-col :span="10">
                            建校时间：{{schoolDatil.foundingTime}}
                        </el-col>
                        <el-col :span="24">
                            课程：<span v-for="everyCourse of courseSplit" style="margin-right:5px;" :key="everyCourse">{{everyCourse}}</span>
                        </el-col>
                        <el-col :span="24">
                            学制：<span v-for="everyGrade of gradeSplit" class="grade" :key="everyGrade">{{everyGrade}}</span>
                        </el-col>
                        <el-col :span="24" class="fee">
                            学费：<span>{{schoolDatil.oneTuition}}</span><span>{{schoolDatil.twoTuition}}</span><span>{{schoolDatil.thirdTuition}}</span><span>{{schoolDatil.fourTuition}}</span>
                        </el-col>
                        <el-col :span="24">
                            地址：<span>{{schoolDatil.province}}</span><span>{{schoolDatil.town}}</span><span>{{schoolDatil.address}}</span>
                        </el-col>
                        <el-col :span="24">
                            网址：{{schoolDatil.website}}
                        </el-col>
                        <el-col :span="24">
                            电话：{{schoolDatil.telephone}}
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="tabbable" style="margin-top:-50px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#summary" data-toggle="tab">学校概述</a></li>
                <li class=""><a href="#concept" data-toggle="tab">办学理念</a></li>
                <li class=""><a href="#system" data-toggle="tab">课程体系</a></li>
                <li class=""><a href="#admission" data-toggle="tab">招生信息</a></li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="summary">
                    <p class="titleM">学校简介</p>
                    <p class="contentM">{{schoolDatil.remark}}</p>
                    <p class="titleM">学校图片</p>
                    <p class="contentM"><img :src="schoolDatil.schoolShowOne" alt="" class="img-responsive"></p>
                    <p class="titleM">硬件设施</p>
                    <p class="contentM">{{schoolDatil.hardware}}</p>
                </div>
                <div class="tab-pane" id="concept">
                    <p class="titleM">办学理念</p>
                    <p class="contentM">北京世青国际学校致力于将批判性研究、多远文化视角及客观评价标准紧密结合，努力为我校的每一个学生提供良好的学习机会。我们的使命在于培养原则性强，胸襟开阔的思考者，使他们能够适应多元化的国际社会，有能力改善自己的生活环境，提高自己和他人的生活质量。</p>
                    <p class="titleM">办学特色</p>
                    <p class="contentM">
                        <el-row style="text-align:center;margin:20px 0">
                            <el-col :span="12">
                                <img src="../assets/one.png" alt="" class="img-responsive" style="height:110px">
                            </el-col>
                            <el-col :span="12" style="font-weight:bold;">多元文化的融合</el-col>
                            <el-col :span="12">配合北京市继续开展优质高中部分招生计划分配到初中校工作</el-col>
                        </el-row>
                        <el-row style="text-align:center;margin:20px 0">
                            <el-col :span="12">
                                <img src="../assets/one.png" alt="" class="img-responsive" style="height:110px">
                            </el-col>
                            <el-col :span="12" style="font-weight:bold;">多元文化的融合</el-col>
                            <el-col :span="12">配合北京市继续开展优质高中部分招生计划分配到初中校工作</el-col>
                        </el-row>
                        <el-row style="text-align:center;margin:20px 0">
                            <el-col :span="12">
                                <img src="../assets/one.png" alt="" class="img-responsive" style="height:110px">
                            </el-col>
                            <el-col :span="12" style="font-weight:bold;">多元文化的融合</el-col>
                            <el-col :span="12">配合北京市继续开展优质高中部分招生计划分配到初中校工作</el-col>
                        </el-row>
                    </p>
                </div>
                <div class="tab-pane" id="system">
                    <p class="titleM">课程体系</p>
                    <p class="contentM">IB 课程分为标准难度课程 （SL/ Standard Level） 和更具挑战性的高难度课程 （HL/HigherLevel）。IB 要求学生至少选六门课 ＋ Theory of Knowledge。</p>
                    <p class="contentM">A-Level课程证书被几乎所有英语授课的大学作为招收新生的入学标准。 在中国开设A-Level课程旨在为中国学生提供进入国外大学的有效途径，具体目标为：培养在国内初高中成绩优秀的学生进入世界顶尖大学；。</p>
                    <p class="contentM">IBDP课程是国际文凭组织（IBO）在综合各国课程优势的基础上，为具有较强学习动机的16~19岁学生设计的。</p>
                    <p class="titleM">师资队伍</p>
                    <el-row style="text-align:center;margin:20px 0">
                        <el-col :span="12">
                            <p><i class="iconfont icon-jixinrenshu"></i></p>
                            <p class="number">{{schoolDatil.students}}</p>
                            <p class="title">学生数量</p>
                        </el-col>
                        <el-col :span="12">
                            <p><i class="iconfont icon-renshutongji"></i></p>
                            <p class="number">{{schoolDatil.teacherNum}}</p>
                            <p class="title">教师数量</p></el-col>
                        <el-col :span="12" style="margin-top:30px;">
                            <p><i class="iconfont icon-guojia"></i></p>
                            <p class="number">25个国家</p>
                            <p class="title">学生国籍</p>
                        </el-col>
                        <el-col :span="12" style="margin-top:30px;">
                            <p><i class="iconfont icon-fenchengbili"></i></p>
                            <p class="number">{{schoolDatil.teacherStuRatio}}</p>
                            <p class="title">师生比</p>
                        </el-col>
                    </el-row>
                </div>
                <div class="tab-pane" id="admission">
                    <p class="titleM">招生信息</p>
                    <p class="contentM">
                        <span class="gradeBox">
                            国际高中
                            <el-row>
                                <el-col :span="12">招生对象：同步过来</el-col>
                                <el-col :span="12">授课形式：面授</el-col>
                                <el-col :span="12">入学要求：测试+面试</el-col>
                                <el-col :span="12">班级规模：20-30人</el-col>
                                <el-col :span="12">入学考试：数学 英语</el-col>
                                <el-col :span="12">是否住宿：是</el-col>
                            </el-row>
                        </span>
                        <span class="gradeBox">
                            国际初中
                            <el-row>
                                <el-col :span="12">招生对象：同步过来</el-col>
                                <el-col :span="12">授课形式：面授</el-col>
                                <el-col :span="12">入学要求：测试+面试</el-col>
                                <el-col :span="12">班级规模：20-30人</el-col>
                                <el-col :span="12">入学考试：数学 英语</el-col>
                                <el-col :span="12">是否住宿：是</el-col>
                            </el-row>
                        </span>
                        <span class="gradeBox">
                            国际小学
                            <el-row>
                                <el-col :span="12">招生对象：同步过来</el-col>
                                <el-col :span="12">授课形式：面授</el-col>
                                <el-col :span="12">入学要求：测试+面试</el-col>
                                <el-col :span="12">班级规模：20-30人</el-col>
                                <el-col :span="12">入学考试：数学 英语</el-col>
                                <el-col :span="12">是否住宿：是</el-col>
                            </el-row>
                        </span>
                        <span class="gradeBox">
                            国际幼儿园
                            <el-row>
                                <el-col :span="12">招生对象：同步过来</el-col>
                                <el-col :span="12">授课形式：面授</el-col>
                                <el-col :span="12">入学要求：测试+面试</el-col>
                                <el-col :span="12">班级规模：20-30人</el-col>
                                <el-col :span="12">入学考试：数学 英语</el-col>
                                <el-col :span="12">是否住宿：是</el-col>
                            </el-row>
                        </span>
                    </p>
                    <p class="titleM">同城学校</p>
                    <p class="contentM">
                        <el-row style="text-align:center">
                            <el-col :span="10" class="citySchoolBox">
                                <img src="../assets/school.png" alt="">
                                <p class="chineseName">北京世青国际学校</p>
                                <p class="englishName">Beijing World Youth Academy</p>
                            </el-col>
                            <el-col :span="10" class="citySchoolBox">
                                <img src="../assets/school.png" alt="">
                                <p class="chineseName">北京世青国际学校</p>
                                <p class="englishName">Beijing World Youth Academy</p>
                            </el-col>
                            <el-col :span="10" style="margin-top:20px;" class="citySchoolBox">
                                <img src="../assets/school.png" alt="" width="100">
                                <p class="chineseName">北京世青国际学校</p>
                                <p class="englishName">Beijing World Youth Academy</p>
                            </el-col>
                            <el-col :span="10"  style="margin-top:20px;" class="citySchoolBox">
                                <img src="../assets/school.png" alt="" width="100">
                                <p class="chineseName">北京世青国际学校</p>
                                <p class="englishName">Beijing World Youth Academy</p>
                            </el-col>
                        </el-row>
                    </p>
                    <p class="titleM">新学说分析</p>
                    <p class="contentM">北京世青国际学校致力于将批判性研究、多远文化视角及客观评价标准紧密结合，努力为我校的每一个学生提供良好的学习机会。</p>
                </div>
            </div>
        </div>
        <div class="footer">
            <el-row  style="text-align:center">
                <el-col :span="12" class="order">预约访校</el-col>
                <el-col :span="12" class="enter">申请入学</el-col>
            </el-row>
        </div>
  </div>
</template>

<script>
export default {
    props: ['childObject'],
    data(){
     return{
        schoolDatil: [],
        gradeSplit: [],
        courseSplit: [],
     }
    },
    methods:{
        goBack(){
            window.history.go(-1);
		},
    },
    created(){
        this.schoolDatil=this.childObject.data;
         // 年级分割
        var grade = this.childObject.data.schoolSystem;
        this.gradeSplit = grade.split(";");
        // 课程分割
        var course =this.childObject.data.course;
        this.courseSplit = course.split(";");
    },
}
</script>

<style scoped>
    .back i{
        color: #fff;
        position: absolute;
        top: 10px;
        left: 3px;
        z-index: 999;
        font-size: 25px;
    }
    .schoolDetailM {
        width: 100%;
    }
    
    .bgImg>img {
        position: relative;
        height: 343px;
        top: -50px;
    }
    
    .head {
        background: rgba(0, 0, 0, 0.5);
        padding: 15px 20px 20px;
        color: #fff;
        position: absolute;
        top: 0;
    }
    
    .head img {
        width: 100px;
        border-radius: 50%;
        margin-bottom: 10px;
    }
    
    .head h2,
    .head h4 {
        margin: 10px 0;
    }
    
    .head .basicMessage {
        background: rgba(0, 0, 0, 0.3);
        padding: 10px;
    }
    
    .basicMessage .el-col span.grade,
    .basicMessage .fee span {
        width: 53px;
        display: inline-block;
        text-align: center;
    }
    
    .head .el-col {
        margin: 5px 0
    }
    
    .nav-tabs {
        border-bottom: none;
        background: #f7f9fa;
    }
    
    .nav-tabs>li.active>a,
    .nav-tabs>li.active>a:focus,
    .nav-tabs>li.active>a:hover {
        color: #214f89;
        font-weight: bold;
        background-color: #fff;
        border: none;
        border-bottom-color: transparent;
    }
    
    .tabbable p.titleM {
        padding: 5px 0;
        font-weight: bold;
        color: #fff;
        background: -webkit-linear-gradient(left, #6b83a2 40%, #214f89);
        width: 22%;
        text-align: center;
        margin: 15px 20px;
        letter-spacing: 1px;
    }
    
    .tabbable p.contentM {
        line-height: 22px;
        padding: 0 20px;
    }
    
    #system p i {
        font-size: 50px;
    }
    
    #system p.number {
        font-weight: bold;
        margin: 15px 0;
    }
    .gradeBox{
        margin: 10px 0;
        display: inline-block;
    }

    .citySchoolBox{
        border-top: 5px solid #214f89;
        box-shadow: 0px 0px 15px #ccc;
        border-radius: 5px;
        margin: 0 13px;
        padding: 15px 0;
    }
    .citySchoolBox img{
        width:80px;
    }
    #admission .chineseName {
        margin: 5px 0;
        font-weight: bold
    }
    
    .footer .order {
        color: #fff;
        background: #214f89;
        font-size: 18px;
        padding: 10px 0;
        margin-top: 20px;
        font-weight: bold;
    }
    
    .footer .enter {
        color: #fff;
        background: #e65858;
        font-size: 18px;
        padding: 10px 0;
        margin-top: 20px;
        font-weight: bold;
    }
</style>
