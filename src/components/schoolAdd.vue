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
          <el-select v-model="form.schoolProperties" placeholder="请选择学校属性">
            <el-option label="运营中" value="运营中"></el-option>
            <el-option label="停办" value="停办"></el-option>
            <el-option label="筹建" value="筹建"></el-option>
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
      <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" :rules="rules">
        <!-- 基本信息 -->
        <div v-if="active == 0">
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
              <el-option label="筹建" value="筹建"></el-option>
            </el-select>
          </el-form-item>
          <div id="seleOp">
            <p>
              <span>省</span>
              <select @change="CityProvice" id="cityProvice">
                <option v-if="citySelect">{{form.province}}</option>
                <option v-for="(v,i) in provice" :key="i" value="v.name">{{v.name}}</option>
              </select>
              <i></i>
            </p>
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
>>>>>>> 243256f065a090e03238b4a5f8b3fba9df904a42
          </div>
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
            <i>需要为整数</i>
          </el-form-item>
          <el-form-item label="学生容量" prop="studentCapacity" class="addFlex">
            <el-input v-model.number="form.studentCapacity" ></el-input>
            <i>需要为整数</i>
          </el-form-item>
          <el-form-item label="毕业班人数" prop="graduatedStuNum" class="addFlex">
            <el-input v-model.number="form.graduatedStuNum" ></el-input>
            <i>需要为整数</i>
          </el-form-item>
          <el-form-item label="学生主要国籍" prop="stuDominantNationality" class="addFlex">
            <el-input v-model="form.stuDominantNationality" ></el-input>
            <i>请分号分割 例：中国;美国;英国</i>
          </el-form-item>
          <el-form-item label="员工数量" prop="staffNum" class="addFlex">
            <el-input v-model.number="form.staffNum" ></el-input>
            <i>需要为整数</i>
          </el-form-item>
          <el-form-item label="教师数量" prop="teacherNum" class="addFlex">
            <el-input v-model.number="form.teacherNum" ></el-input>
            <i>需要为整数</i>
          </el-form-item>
          <el-form-item label="外籍教师数量" prop="foreignTeacherNum" class="addFlex">
            <el-input v-model.number="form.foreignTeacherNum" ></el-input>
            <i>需要为整数</i>
          </el-form-item>
          <el-form-item label="师生比" prop="teacherStuRatio">
            <el-input v-model="form.teacherStuRatio" ></el-input>
          </el-form-item>
          <el-form-item label="占地面积(亩)" prop="coveredArea" class="addFlex">
            <el-input v-model.number="form.coveredArea" ></el-input>
            <i>需要为整数</i>
          </el-form-item>
        </div>
        <!-- 建设 -->
        <div v-else-if="active == 3">
          <el-form-item label="占地面积(亩)" prop="coveredArea" class="addFlex">
            <el-input v-model.number="form.coveredArea" ></el-input>
            <i>需要为整数</i>
          </el-form-item>
          <el-form-item label="建筑面积(平方米)" prop="builtArea" class="addFlex">
            <el-input v-model.number="form.builtArea" ></el-input>
            <i>需要为整数</i>
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
        <el-button style="margin-top: 12px;" @click="next('form')">下一步</el-button>
    </div>
  </div>
</template>

<script>
import {getSchoolAdd} from '@/api/api';
import {provice} from '@/assets/Share/city.js'
import store from '@/store/store.js'
export default {
  data() {
    return {
      active:0,
      inputCheckbox:[], //学制
      inputCheckboxCourse:[], //课程
      inputCheckboxauthentication:[], //认证组织
      provice:provice, //城市
      citySelect:false,
      curshe:0,
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
      rules:{
        schoolName:[ //学校名字
          {required:true,message:"学校名字不能为空",trigger:'blur'},
        ],
      },
    }
  },
  methods: {
    next(form) {
      console.log(this.active)
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.active =  this.active + 1;
          if(this.active > 4  ) this.active = 4;
          alert('submit!');
        } else {
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
    //下拉框
    CityProvice:function(){
      if(this.isEdit == store.state.isEd){
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
          this.form.town = this.provice[indexOne].city[0].name;
        }
        store.commit("changeis",0)
      }else{
        let myCityProvice = document.getElementById("cityProvice");
        let indexOne = myCityProvice.selectedIndex ;
        this.curshe = indexOne;
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
}
</script>

<style lang="less" scoped>
  .schoolAdd{
    width: 80%;
    border: 1px solid #ccc;
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

    /deep/.el-form-item__label{
      width: 200px !important;
    }

  }
  @media screen and(min-width: 1200px){
    .schoolAdd{
      width: 1200px;
      // background: red;
    }
  }
</style>
