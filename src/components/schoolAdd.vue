<template>
  <div class="schoolAdd">
    <div v-if="formShow">
      <div class="schAd">
        <h1>新增学校库信息</h1>
        <router-link tag="span" to="/school"><i class="el-icon-close"></i></router-link>
      </div>
      <div class="addsteps">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="课程信息"></el-step>
          <el-step title="师资力量"></el-step>
          <el-step title="建设&投资"></el-step>
        </el-steps>
      </div>
      <!-- form表单 -->
      <div class="addform">
        <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" :rules="rules">
          <!-- 基本信息 -->
          <div v-if="active == 0">
            <el-form-item label="学校名字" prop="schoolName" id="addFlex" >
              <el-input v-model.trim="form.schoolName"></el-input>
              <!-- @blur="CheckSchool" -->
              <i>学校名字不能为空</i>
            </el-form-item>
            <el-form-item label="学校英文名字" prop="schoolEnglishName">
              <el-input v-model.trim="form.schoolEnglishName" ></el-input>
            </el-form-item>
            <el-form-item label="学校性质" prop="schoolProperties">
              <el-select v-model="form.schoolProperties" placeholder="请选择学校性质" :value-key="form.schoolProperties">
                <el-option label="公办" value="公办"></el-option>
                <el-option label="民办" value="民办"></el-option>
                <el-option label="外籍" value="外籍"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="运营状态" prop="operationState">
              <el-select v-model="form.operationState" placeholder="请选择运营状态" :value-key="form.operationState">
                <el-option label="运营中" value="运营中"></el-option>
                <el-option label="筹建" value="筹建"></el-option>
                <el-option label="停办" value="停办"></el-option>
              </el-select>
            </el-form-item>
            <div id="seleOp" class="City clearfix">

                <span>省</span>
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange"
                  ref="cascaderAddr">
                </el-cascader>
                <!-- <div class="el-input el-input--suffix" @change="cityProvice_change" id="cityProvice">
                  <select >
                    <option v-if="citySelect">{{form.province}}</option>
                    <option v-for="(v,i) in provice" :key="i" value="v.name">{{v.name}}</option>
                  </select>
                  <span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-up"></i></span></span>
                </div>
                <i></i> -->

              <p>
                <span>市</span>
                <select @change="cityTown" id="cityTown">
                  <option v-if="citySelect">{{form.town}}</option>
                  <option v-for="(v,i) in provice[curshe].city" :key="i" >{{v.name}}</option>
                </select>
                <i></i>
                <br/>
                <!-- <span v-if="citySpan == true" id="citySpan">地区不能为空</span> -->
              </p>
            </div>

            <el-form-item label="地址" prop="address" id="addFlex">
              <el-input v-model="form.address" ></el-input>
            </el-form-item>
            <el-form-item label="成立时间" prop="foundingTime" id="addFlex">
              <el-input v-model.number="form.foundingTime" ></el-input>
              <i>请输入四位数字 例：2019</i>
            </el-form-item>
            <el-form-item label="学制" prop="schoolSystem" >
              <!-- <div id="addFlexTwo">
                <el-input v-model="form.schoolSystem" :disabled="true"></el-input>
                <i>请分号分割 例：幼儿园;小学;初中;</i>
              </div> -->
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
            <el-form :inline="true" class="demo-form-inline TuitionBox">
              <el-form-item label="幼儿园-学费" prop="oneTuition" >
                <el-input v-model.number="form.oneTuition" class="TuitionBoxInput"></el-input>
                <!-- <i>格式为数字，整数</i> -->
              </el-form-item>
              <el-form-item label="小学-学费" prop="twoTuition" class="TuitionBoxLabel">
                <el-input v-model="form.twoTuition" class="TuitionBoxInput"></el-input>
                <!-- <i>格式为数字，整数</i> -->
              </el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline TuitionBox">
              <el-form-item label="初中-学费" prop="thirdTuition" >
                <el-input v-model.number="form.thirdTuition" class="TuitionBoxInput"></el-input>
                <!-- <i>格式为数字，整数</i> -->
              </el-form-item>
              <el-form-item label="高中-学费" prop="fourTuition" class="TuitionBoxLabel">
                <el-input v-model.number="form.fourTuition" class="TuitionBoxInput"></el-input>
                <!-- <i>格式为数字，整数</i> -->
              </el-form-item>
            </el-form>


          </div>
          <!-- 课程信息 -->
          <div v-else-if="active == 1">
            <el-form-item label="国际课程" prop="course">
            <div class="addFlexTwo">
              <el-input v-model="form.course"></el-input>
              <i>请分号分割 例:IPC;OMYC;PGA;</i>
            </div>
              <el-checkbox-group v-model="inputCheckboxCourse">
                <el-checkbox label="IPC;" name="course">IPC</el-checkbox>
                <el-checkbox label="OMYC;" name="course">OMYC</el-checkbox>
                <el-checkbox label="PGA;" name="course">PGA</el-checkbox>
                <el-checkbox label="AP;" name="course">AP</el-checkbox>
                <el-checkbox label="IBPYP;" name="course">IBPYP</el-checkbox>
                <br/>
                <el-checkbox label="IBMYP;" name="course">IBMYP</el-checkbox>
                <el-checkbox label="IBDP;" name="course">IBDP</el-checkbox>
                <el-checkbox label="A-LEVEL;" name="course">A-LEVEL</el-checkbox>
                <el-checkbox label="IFCSE;" name="course">IFCSE</el-checkbox>
                <br/>
                <el-checkbox label="蒙特梭利;" name="course">蒙特梭利</el-checkbox>
                <el-checkbox label="美国课程;" name="course">美国课程</el-checkbox>
                <el-checkbox label="澳大利亚课程;" name="course">澳大利亚课程</el-checkbox>
                <br/>
                <el-checkbox label="澳洲VCE;" name="course">澳洲VCE</el-checkbox>
                <el-checkbox label="澳洲WACE;" name="course">澳洲WACE</el-checkbox>
                <el-checkbox label="加拿大课程;" name="course">加拿大课程</el-checkbox>
                <br/>
                <el-checkbox label="双语课程;" name="course">双语课程</el-checkbox>
                <el-checkbox label="校本课程;" name="course">校本课程</el-checkbox>
                <el-checkbox label="ESL;" name="course">ESL</el-checkbox>
                <el-checkbox label="其他;" name="course">其他</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="认证&组织" prop="authentication">
              <div class="addFlexTwo">
                <el-input v-model="form.authentication"></el-input>
                <i>请分号分割 例:CIE;Edexcel;OxfordAQA;</i>
              </div>
              <el-checkbox-group v-model="inputCheckboxauthentication">
                <el-checkbox label="CIE;" name="authentication">CIE</el-checkbox>
                <el-checkbox label="Edexcel;" name="authentication">Edexcel</el-checkbox>
                <el-checkbox label="OxfordAQA;" name="authentication">OxfordAQA</el-checkbox>
                <el-checkbox label="IBO;" name="authentication">IBO</el-checkbox>
                <br/>
                <el-checkbox label="CollegeBoard;" name="authentication">CollegeBoard</el-checkbox>
                <el-checkbox label="CLS;" name="authentication">CLS</el-checkbox>
                <el-checkbox label="WASC;" name="authentication">WASC</el-checkbox>
                <el-checkbox label="NEASC;" name="authentication">NEASC</el-checkbox>
                <br/>
                <el-checkbox label="EARCOS;" name="authentication">EARCOS</el-checkbox>
                <el-checkbox label="AdvancED;" name="authentication">AdvancED</el-checkbox>
                <el-checkbox label="NCCT;" name="authentication">NCCT</el-checkbox>
                <el-checkbox label="ACAMIS;" name="authentication">ACAMIS</el-checkbox>
                <br/>
                <el-checkbox label="ROUND SQUARE;" name="authentication">ROUND SQUARE</el-checkbox>
                <el-checkbox label="FOBISIA;" name="authentication">FOBISIA</el-checkbox>
                <el-checkbox label="ISAC;" name="authentication">ISAC</el-checkbox>
                <br/>
                <el-checkbox label="THE DUKE OF EDINBURGH’S INTERNATIONAL AWARD;" name="authentication">THE DUKE OF EDINBURGH’S INTERNATIONAL AWARD</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <!-- 师资力量 -->
          <div v-else-if="active == 2">
            <el-form-item label="学生总人数" prop="students" class="addFlex">
              <el-input v-model.number="form.students" ></el-input>
              <i>格式为数字，整数</i>
            </el-form-item>
            <el-form-item label="学生容量" prop="studentCapacity" class="addFlex">
              <el-input v-model.number="form.studentCapacity" ></el-input>
              <i>格式为数字，整数</i>
            </el-form-item>
            <el-form-item label="毕业班人数" prop="graduatedStuNum" class="addFlex">
              <el-input v-model.number="form.graduatedStuNum" ></el-input>
              <i>格式为数字，整数</i>
            </el-form-item>
            <el-form-item label="学生主要国籍" prop="stuDominantNationality" class="addFlex">
              <el-input v-model="form.stuDominantNationality" ></el-input>
              <i>请分号分割 例：中国;美国;英国</i>
            </el-form-item>
            <el-form-item label="员工数量" prop="staffNum" class="addFlex">
              <el-input v-model.number="form.staffNum" ></el-input>
              <i>格式为数字，整数</i>
            </el-form-item>
            <el-form-item label="教师数量" prop="teacherNum" class="addFlex">
              <el-input v-model.number="form.teacherNum" ></el-input>
              <i>格式为数字，整数</i>
            </el-form-item>
            <el-form-item label="外籍教师数量" prop="foreignTeacherNum" class="addFlex">
              <el-input v-model.number="form.foreignTeacherNum" ></el-input>
              <i>格式为数字，整数</i>
            </el-form-item>
            <el-form-item label="师生比" prop="teacherStuRatio">
              <el-input v-model="form.teacherStuRatio" ></el-input>
            </el-form-item>
            <el-form-item label="占地面积(亩)" prop="coveredArea" class="addFlex">
              <el-input v-model.number="form.coveredArea" ></el-input>
              <i>格式为数字，整数</i>
            </el-form-item>
          </div>
          <!-- 建设 -->
          <div v-else-if="active == 3">
            <el-form-item label="占地面积(亩)" prop="coveredArea" class="addFlex">
              <el-input v-model.number="form.coveredArea" ></el-input>
              <i>格式为数字，整数</i>
            </el-form-item>
            <el-form-item label="建筑面积(平方米)" prop="builtArea" class="addFlex">
              <el-input v-model.number="form.builtArea" ></el-input>
              <i>格式为数字，整数</i>
            </el-form-item>
            <el-form-item label="硬件设施"  prop="hardware">
              <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.hardware"></el-input>
            </el-form-item>
            <el-form-item label="投资信息" prop="investment">
              <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.investment"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.remark"></el-input>
            </el-form-item>
          </div>
          <!-- 完成 -->
          <div v-else-if="active == 4">wancheng</div>
        </el-form>

      </div>
      <div class="nextButton">
          <el-button style="margin-top: 12px;" @click="Previous ">上一步</el-button>
          <el-button style="margin-top: 12px;" @click="next('form')">{{completeBtn}}</el-button>
      </div>
    </div>
    <div v-else-if="!formShow" class="Tips">
        <P>提交成功</P>
        <p>审核通过后将会插入数据库</p>
        <ul>
          <li><el-button type="info" round>返回学校库</el-button></li>
          <li><el-button type="info" round>继续提交</el-button></li>
        </ul>
    </div>
  </div>
</template>

<script>
import {getSchoolAdd,getSchoolCheck_valid} from '@/api/api';
import {provice} from '@/assets/Share/city.js'
import store from '@/store/store.js';
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
export default {
  data() {
    //验证成立时间
    var foundingTime = (rele,value,callback) =>{
      if(value == "" || value == null){
        callback()
      }else{
        if(!/^\d+$/.test(value)){
          callback(new Error("格式不正确,请输入四位数字  例：2019"));
        }else{
          let num = value;
          num = num.toString();
          if(num.length == "4"){
            callback()
          }else{
              callback(new Error("格式不正确,请输入四位数字  例：2019"));
          }

        }
      }
    };
    //验证网址头
    var website = (rele,value,callback) =>{
      if(value == "" || value == null){
        callback();
      }else{
        if(value.indexOf("http") == 0 || value.indexOf("https") == 0){
          callback(new Error("禁止出现 http://或https:// 开头 例:www.baidu.com"));
        }else{
          callback()
        }
      }
    };
    //学费  容量
    var twoTuition = (rele,value,callback) =>{
      if(value == "" || value == null){
          console.log("ronliang1111")
          callback()
      }else{
        // if(!/^\d+$/.test(value)){
        if(/^[0-9]*$/.test(value)){
            callback()
          }else{
            console.log("不是整数");
            callback(new Error("必须为数字值 例：25000"));
        }
      }
    };
    //学校名验证
    var schoolName = (rele,value,callback) =>{
      if(value == ""){
        callback(new Error("学校名不能为空"));
      }else{
        getSchoolCheck_valid({
          schoolName : value
        }).then(res => {
          if(res.code == 1){
            callback(new Error("该信息已存在"));
          }else{
            callback()
          }
        })
      }
    }
    return {
      active:0,
      isEdit:1,
      i:0,
      selectedOptions:"",
      inputCheckbox:[], //学制
      inputCheckboxCourse:[], //课程
      inputCheckboxauthentication:[], //认证组织
      thisAreaCode:"",
      provice:provice, //城市
      citySelect:false,
      curshe:0,
      options: provinceAndCityData,
      selectedOptions: [],
      completeBtn:"下一步",//完成 下一步按钮切换
      formShow:true,
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
      },
      //表单验证
      rules:{
        schoolName:[ //学校名字 schoolCheckValid
          {validator: schoolName,required:true,trigger:'blur'},
        ],
        schoolEnglishName:[ //学校英文名字

        ],
        schoolProperties:[ //学校性质
        ],
        address:[ //地址
          {required:true,message:"地址不能为空",trigger:'blur'}
        ],
        foundingTime:[ //成立时间
          {validator: foundingTime,trigger: 'blur' }
        ],
        operationState:[//运营状态
          // {required:true,message:"选项不能为空",trigger:'blur'}
        ],
        schoolSystem:[//学制
          {required:true,message:"选项不能为空",trigger:'blur'}
        ],
        oneTuition:[ //幼儿园学费
          {validator: twoTuition,trigger: 'blur' }
        ],
        twoTuition:[ //小学学费
          {validator: twoTuition,trigger: 'blur' }
        ],
        thirdTuition:[ //初中学费
          {validator: twoTuition,trigger: 'blur' }
        ],
        fourTuition:[ //高中学费
          {validator: twoTuition,trigger: 'blur' }
        ],
        website:[ //官网
          {validator: website,trigger: 'blur' }
        ],
        telephone:[ //电话
        ],
        interCourseFoundedTime:[ //国际学校成立时间
          {validator: foundingTime,trigger: 'blur' }
        ],
        course:[//国际课程
          // {required:true,message:"选项不能为空",trigger:'blur'}
        ],
         authentication:[ //认证组织
          // {required:true,message:"选项不能为空",trigger:'blur'}
        ],
        students:[ //学生总人数
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        studentCapacity:[//学生容量
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        graduatedStuNum:[//毕业班人数
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        stuDominantNationality:[//学生主要国籍
        ],
        staffNum:[//员工数量
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        teacherNum:[//教师数量
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        foreignTeacherNum:[//外籍教师数量
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        teacherStuRatio:[//师生比
        ],
        coveredArea:[//占地面积
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        builtArea:[//建筑面积
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        hardware:[ //硬件设施
          // {required:true,message:"硬件不能为空",trigger:'blur'},
        ],
        filingFee:[ //申请费
          {required:true,validator: twoTuition,trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    next(form) {
      this.$refs[form].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.active =  this.active + 1;
          console.log(this.active)
          if(this.active == 3 ) this.completeBtn = "提交";
          if(this.active == 4){
            getSchoolAdd(
              this.form
            ).then(res => {
              if(res.code == "0"){
                this.formShow = false;
              }else{
                this.active =  3;
                this.$message({
                  showClose: true,
                  message: '数据提交失败',
                  type: 'error'
                });
              }
              console.log(res)
            })
          }
          if(this.active > 4  ) this.active = 4;
        } else {
          console.log("cuow")
          this.active = this.active;
          console.log('error submit!!');
          return false;
        }
      });

    },
    Previous(){
      this.active =  this.active - 1;
      if(this.active < 0 ) this.active = 0;
    },
    //城市二级联动
    handleChange (e,form,thisAreaCode) {
      console.log(e)
      // console.log(this.$refs['cascaderAddr'])
      this.thisAreaCode = this.$refs['cascaderAddr'].currentLabels;
      // console.log(this.thisAreaCode)
    },
    //下拉框
    cityProvice_change:function(){
      console.log(this.isEdit,store.state.isEd)
      if(this.isEdit == store.state.isEd){
        console.log(this.i++)
        if(this.i++ == 0){
          let myCityProvice = document.getElementById("cityProvice");
          let indexOne = myCityProvice.selectedIndex;
          let indexOneCs = myCityProvice.selectedIndex-1;
          this.curshe = indexOne-1;
          this.form.province = myCityProvice[indexOne].text;
          this.form.town = this.provice[this.curshe].city[0].name;
        }else{
          let myCityProvice = document.getElementById("cityProvice");
          let indexOne = myCityProvice.selectedIndex ;
          this.curshe = indexOne;
          this.form.province = myCityProvice[indexOne].text;
          console.log(this.form.province)
          this.form.town = this.provice[indexOne].city[0].name;
        }
        store.commit("changeis",0)
      }else{
        let myCityProvice = document.getElementById("cityProvice");
        let indexOne = myCityProvice.selectedIndex ;
        this.curshe = indexOne;
        console.log("")
        this.form.province = myCityProvice[indexOne].text;
        this.form.town = this.provice[indexOne].city[0].name;
      }
      this.citySelect = false;
    },
    cityTown:function(){
      let mycityTown = document.getElementById("cityTown");
      let indexTwo = mycityTown.selectedIndex;
      this.form.town = mycityTown[indexTwo].text;
    },
  },
   watch: {
    //学制多选
    "inputCheckbox":function(val){
      let strInputCheckbox = "";
      for(let i=0;i<val.length;i++){
        strInputCheckbox += val[i]
      }
      this.form.schoolSystem = strInputCheckbox;

      let schoolSystem = this.form.schoolSystem;

    },
    //国际课程多选
    "inputCheckboxCourse":function(val){
      let strCourse = ""
      for(let i=0;i<val.length;i++){
        strCourse += val[i]
      }
      this.form.course = strCourse;
    },
    //认证组织
    "inputCheckboxauthentication":function(val){
      let strCation = ""
      for(let i=0;i<val.length;i++){
        strCation += val[i]
      }
      this.form.authentication = strCation;
    }
  },
}
</script>

<style lang="less" scoped>
  .schoolAdd{
    width: 80%;
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
    .Tips{
      // background: skyblue;
      text-align: center;
      height: 500px;
      p:nth-child(1){
        margin-top: 15%;
        font-size: 50px;
        color: #67c23a;
      }
      p:nth-child(2){
        margin-top: 5%;
        font-size: 20px;
        color: steelblue;
      }
      ul{
        margin-top: 20%;
        li{
          float: left;
        }
        li:first-child{
          margin-left: 50%;
          transform: translateX(-155%);
        }
      }
    }
    //表单样式
    form.el-form.demo-ruleForm{
      #seleOp p{
        text-align: left;
        position: relative;
      }
      #seleOp p:last-of-type{
        margin-top: 18px;
        margin-bottom: 18px;
      }
      #seleOp span{
        display: inline-block;
        width: 200px;
        text-align: right;
        font-size: 14px;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      #seleOp select{
        width: 399px;
        height: 40px;
        outline: 0;
        border: 1px solid #dcdfe6;
        appearance: none;
        display: inline-block;
        background: #fff;
        transition:border-color .2s cubic-bezier(.645,.045,.355,1);
        padding: 0 30px 0 10px;
        margin-left: -4px;
        color: #606266;
        border-radius: 3px;
      }
      #seleOp select:focus {
        border-color: #409EFF;
      }
      #seleOp p i{
        color: rgba(0, 0, 0, 0.0);
        font-size: 14px;
        -webkit-transition: -webkit-transform .3s;
        transition: -webkit-transform .3s;
        transition: transform .3s;
        transition: transform .3s, -webkit-transform .3s;
        transition: transform .3s,-webkit-transform .3s;
        -webkit-transform: rotateZ(180deg);
        transform: rotateZ(180deg);
        cursor: pointer;
        // font-family: element-icons!important;
        font-style: normal;
      }
      // #seleOp select:focus i{
      //   border-color: #409EFF;
      // }
      #seleOp p i:before{
        content: "\E605";
        display: inline-block;
        /* background: #000; */
        width: 0px;
        height: 0px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        /* border-bottom: 8px solid #000; */
        border-top: 9px solid#c0c4cc;
        position: relative;
        right: 32px;
        top: 10px;
      }
      #seleOp p i:after{
        content: '';
        display: inline-block;
        /* background: #000; */
        width: 0px;
        height: 0px;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        /* border-bottom: 8px solid #000; */
        border-top: 8px solid #fff;
        position: relative;
        right: 49px;
        top: -6px
      }
      .el-checkbox-group{
        margin-left: 100px;
      }
      /deep/.el-form-item__error{
        margin-left: 100px;
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
    .nextButton{
        text-align:center;
        .el-button{
            margin:20px 30px;
        }
    }
    .el-textarea {
      width: 59%;
    }
    /deep/.TuitionBox{
      .TuitionBoxInput{
        width: 100%;
      }
      .el-form-item__content{
        width: 153px !important;
      }
    }
    /deep/.el-form-item__label{
      width: 200px !important;
    }
    /deep/.TuitionBoxLabel{
      label{
        width: 100px !important;
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
