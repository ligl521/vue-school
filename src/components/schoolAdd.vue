<template>
  <div class="schoolAdd">
    <div class="schAd">
      <h1>新增学校库信息</h1>
      <router-link tag="span" to="/school"><i class="el-icon-close"></i></router-link>
    </div>
    <div class="addsteps">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="课程信息"></el-step>
        <el-step title="学生信息"></el-step>
        <el-step title="师资力量"></el-step>
        <el-step title="建设&投资"></el-step>
      </el-steps>
    </div>


    <!-- form表单 -->
    <div class="addform">
      <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学校名字" prop="schoolName" id="addFlex">
          <el-input v-model.trim="form.schoolName" ></el-input>
          <!-- @blur="CheckSchool" -->
          <i>学校名字不能为空</i>
        </el-form-item>
        <el-form-item label="学校英文名字" prop="schoolEnglishName">
          <el-input v-model.trim="form.schoolEnglishName" ></el-input>
        </el-form-item>
        <el-form-item label="学校性质" prop="schoolProperties">
          <el-select v-model="form.schoolProperties" placeholder="请选择学校属性" :value-key="form.schoolProperties">
            <el-option label="运营中" value="运营中"></el-option>
            <el-option label="停办" value="停办"></el-option>
            <el-option label="凑建" value="凑建"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="address" id="addFlex">
          <el-input v-model="form.address" ></el-input>
        </el-form-item>
        <el-form-item label="成立时间" prop="foundingTime" id="addFlex">
          <el-input v-model.number="form.foundingTime" ></el-input>
          <i>请输入四位数字</i>
        </el-form-item>
        <el-form-item label="学制" prop="schoolSystem" >
          <div id="addFlexTwo">
            <el-input v-model="form.schoolSystem" :disabled="true"></el-input>
            <i>请分号分割 例：幼儿园;小学;初中;</i>
          </div>
          <el-checkbox-group v-model="inputCheckbox">
            <el-checkbox label="幼儿园;" name="schoolSystem">幼儿园</el-checkbox>
            <el-checkbox label="小学;" name="schoolSystem">小学</el-checkbox>
            <el-checkbox label="初中;" name="schoolSystem">初中</el-checkbox>
            <el-checkbox label="高中;" name="schoolSystem">高中</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="官网" prop="website">
          <el-input v-model="form.website" ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="form.telephone" ></el-input>
        </el-form-item>


      </el-form>

    </div>


    <el-button style="margin-top: 12px;" @click="next">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
// import {provice} from '../../api/city.js'
export default {
  data() {
    return {
      active:0,
      form:{
        schoolName:"",  //学校名字
        schoolEnglishName:"", //学校英文名
        schoolProperties:"",  //学校性质
        province:"",//省
        town:"", //市
        address:"", //地址
        foundingTime:"",  //成立时间
        operationState:"", //运营状态
        schoolSystem:"", //学制
        oneTuition:"", //幼儿园学费
        twoTuition:"",  //小学学费
        thirdTuition:"",  //初中学费
        fourTuition:"", //高中学费
        website:"",  //官网
        telephone:"",  //电话
        interCourseFoundedTime:"", //国际学校成立时间
        course:"",  //课程
        authentication:"",  //认证
        students:"",  //学生总人数
        studentCapacity:"", //学生容量
        graduatedStuNum:"", //毕业班人数
        stuDominantNationality:"", //学生主要国籍
        staffNum:"", //员工数量
        teacherNum:"", //教师数量
        foreignTeacherNum:"", //外籍教师数量
        teacherStuRatio:"", //师生比
        coveredArea:"", //占地面积
        builtArea:"", //建筑面积
        hardware:"",  //硬件设施
        investment:"", //投资信息
        remark:"",  //备注
        submitter:localStorage["userName"], //提交人
        schoolLogo:"", //学校logo
        schoolShowOne:"",  //大图1
        schoolShowTwo:"",  //大图2
        schoolShowThird:"",  //大图3
        schoolShowFour:"",  //大图4
        schoolShowFive:"",  //大图5
        schoolDesc:"",  //学校剪辑
        accommodation:"",  //住宿情况
        studentEnrollment:"", //招生情况
        studeAbroadCountries:"",  //留学生留学国家
        prospects:"", //招生对象
        filingFee:"",  //申请费
        schoolManagement:"",  //办学理念
        schoolCharacteristics:"",  //办学特色
        courseSystem:"",  //课程体系
        nationalityOfStudents:"",  //学生国籍数
        classSize:"",  //班级规模
        teachingForm:"",  //授课形式
        companyAnalysis:"",  //新学说分析
        verifySign:"",  //0：审核中 1：审核通过
        yearOfData:2019, //数据年份
      }
    }
  },
  methods: {
    next() {

      if (this.active++ > 5) this.active = 0;
    }
  },
}
</script>

<style lang="less" scoped>
  .schoolAdd{
    width: 80%;
    // border: 1px solid #000;
    margin: 0 auto;
    .schAd{
      padding-top: 30px;
      h1{
        display: inline-block;
        margin-left: 50%;
        transform: translateX(-50%);
      }
      span{
        display: inline-block;
        float: right;
        width: 30px;
        height: 30px;
        margin-right: 30px;
        i{
          font-size: 30px;
        }
      }
      span:hover{
        background: red;
        color: #eee;
      }
    }
    .addsteps{
      width: 80%;
      margin: 30px auto 0;
    }
    .addform{
      // border: 2px solid #337ab7;
      padding-left: 10%;
      margin: 50px auto 0;
      .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 43%;
      }
    }


  }
  @media screen and(min-width: 1200px){
    .schoolAdd{
      width: 1200px;
      // background: red;
    }
  }
</style>
