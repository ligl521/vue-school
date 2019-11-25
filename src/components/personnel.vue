<template>
  <div style="background: #f5f5f5;">
    <div class="personnel">
      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar"/>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过2M
        </div>
      </el-upload>
      <el-form :inline="true" status-icon :model="ruleForm" :rules="rules" label-position="right"  label-width="170px" ref="ruleForm" class="demo-ruleForm">
        <h4>个人信息</h4>
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" class="input_css" v-model="ruleForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="name">
          <el-radio-group class="input_css" v-model="ruleForm.radio1">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入手机号"  class="input_css"  v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" class="input_css" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" class="input_css" v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="最高学历" :required="true" prop="Education">
          <el-select class="input_css" v-model="ruleForm.Education">
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作年限" prop="Working">
          <el-input  placeholder="请输入工作年限"  class="input_css" v-model.number="ruleForm.Working"></el-input>
        </el-form-item>
        <!-- 
        <el-form-item label="专业" prop="major">
          <el-input placeholder="请输入年龄" class="input_css" v-model.number="ruleForm.major"></el-input>
        </el-form-item> -->
        <el-form-item label="是否公开简历">
          <el-switch v-model="ruleForm.delivery"></el-switch>
          <span>建议公开简历，获得更多展示机会</span>
        </el-form-item>
        <el-divider></el-divider>
        <h4>期望职位</h4>
        <el-form-item label="职位名称" prop="position">
          <el-input placeholder="请输入职位名称" class="input_css" v-model="ruleForm.position"></el-input>
        </el-form-item>
        <el-form-item label="薪资(年薪)" prop="salary">
          <el-input placeholder="请输入薪资(年薪)" class="input_css" v-model="ruleForm.salary"></el-input>
        </el-form-item>
        <el-form-item label="行业" prop="industry">
          <el-input placeholder="请输入行业要求" class="input_css" v-model="ruleForm.industry"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input  placeholder="请输入工作地点" class="input_css"  v-model="ruleForm.city"></el-input>
        </el-form-item>
       <el-divider></el-divider>
        <h4>工作经历</h4>
        <div  v-for="(domain, index) in ruleForm.domains" :key="domain.key">
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        <el-form-item label="公司名称" :prop="'domains.' + index + '.company'"  :rules="{required: true,message: '公司名称不能为空',trigger: 'blur'}">
          <el-input placeholder="请输入公司名称" class="input_css" v-model="domain.company" ></el-input>
        </el-form-item>
        <el-form-item label="职位名称"  :prop="'domains.' + index + '.jobType'" :rules="{required: true,message: '职位名称不能为空',trigger: 'blur'}">
          <el-input placeholder="请输入职位名称" class="input_css" v-model="domain.jobType"></el-input>
        </el-form-item>
        <el-form-item label="在职时间" :prop="'domains.' + index + '.date'" :rules="{required: true, message: '请输入日期', trigger: 'blur' }">
          <el-date-picker class="input_css" v-model="domain.date" type="monthrange" start-placeholder="开始月份" end-placeholder="结束月份" ></el-date-picker>
        </el-form-item>
        <br/>
        <el-form-item label="工作内容" :prop="'domains.' + index + '.textarea'":rules="{required: true, message: '请输入工作内容', trigger: 'blur' }">
          <el-input class="textarea_css" type="textarea" size="medium" placeholder="请输入工作内容" v-model="domain.textarea" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        </div>
        <p @click="addDomain">
          <i class="el-icon-circle-plus-outline"></i>添加工作经历
        </p>
        <el-divider></el-divider>
        <h4>教育背景</h4>
        <div v-for="(school, index) in ruleForm.educations" :key="school.key">
         <el-button @click.prevent="removeSchool(school)">删除</el-button>
        <el-form-item  label="学校名称" :prop="'educations.' + index + '.schoolName'"
         :rules="{ required: true, message: '学校名称不能为空', trigger: 'blur' }">
          <el-input placeholder="请输入学校名称"  class="input_css"  v-model="school.schoolName" ></el-input>
        </el-form-item>
        <el-form-item  label="专业" :prop="'educations.' + index + '.schoolMajor'"
          :rules="{  required: true, message: '专业名称不能为空', trigger: 'blur'}">
          <el-input placeholder="请输入专业名称" class="input_css" v-model="school.schoolMajor"></el-input>
        </el-form-item>
        <el-form-item label="在校时间" :prop="'educations.' + index + '.schoolDate'"
        :rules="{required: true, message: '在校时间不能为空', trigger: 'blur'}">
          <el-date-picker class="input_css" v-model="school.schoolDate" type="monthrange" start-placeholder="开始月份" end-placeholder="结束月份" ></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="在校经历" :prop="'educations.' + index + '.schoolTextarea'" :rules="{required: true, message: '请输入在校经历', trigger: 'blur' }" >
          <el-input class="textarea_css" type="textarea" size="medium" placeholder="请输入在校经历" v-model="school.schoolTextarea" maxlength="200"show-word-limit></el-input>
        </el-form-item>
        </div>
        <p @click="addSchool">
          <i class="el-icon-circle-plus-outline"></i>添加教育背景
        </p>
        <el-divider></el-divider>
        <h4>培训经历</h4>
        <div v-for="(train, index) in ruleForm.trains" :key="train.key">
        <el-button @click.prevent="removetrain(train)">删除</el-button>
        <el-form-item label="培训名称" :prop="'trains.' + index + '.trainName'" :rules="{ required: true, message: '培训名称不能为空', trigger: 'blur' }">
          <el-input placeholder="请输入培训名称"  class="input_css" v-model="train.trainName" ></el-input>
        </el-form-item>
        <el-form-item label="培训时间" :prop="'trains.' + index + '.trainDate'" :rules="{ required: true, message: '培训时间不能为空', trigger: 'blur' }">
          <el-date-picker  class="input_css" v-model="train.trainDate" type="monthrange" start-placeholder="开始月份"  end-placeholder="结束月份" ></el-date-picker>
        </el-form-item>
        <br/>
        <el-form-item label="培训经历" :prop="'trains.' + index + '.trainTextarea'" :rules="{ required: true, message: '培训经历不能为空', trigger: 'blur' }">
          <el-input class="textarea_css" type="textarea"  size="medium" placeholder="请输入培训内容" v-model="train.trainTextarea" maxlength="200" show-word-limit ></el-input>
        </el-form-item>
        </div>
        <p @click="addtrain">
          <i class="el-icon-circle-plus-outline"></i>添加培训经历
        </p>
        <el-divider></el-divider>
        <h4>其他要求</h4>
        <el-form-item label="内容" prop="other" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }">
          <el-input class="textarea_css" type="textarea" size="medium" placeholder="例：福利待遇、薪资要求等。" v-model="ruleForm.other"  maxlength="200" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </div>
    <schoolFooter />
  </div>
</template>

<script>
import schoolFooter from "./schoolFooter";
import { talentdetail } from "@/api/api";

export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      ruleForm: {
        imageUrl: "", //头像
        name: "", //姓名
        radio1: "男", //选项
        phone: "", //手机号
        email: "", //邮箱
        age: "", //年龄
        Education: "本科", //学历
        Working: "", //工作年限
        major: "", //专业
        delivery: true, // 简历公开
        position: "", //期望职位
        salary: "", //薪资要求
        industry: "", //行业
        city: "", //城市
        other: "",
        domains: [
          {
            company: "",
            jobType: "",
            date: "", //日期
            textarea: "",
          }
        ],
        educations: [
          {
            schoolName: "", //日期
            schoolMajor: "",
            schoolDate: "",
            schoolTextarea: ""
          }
        ],
        trains: [
          {
            trainName: "", //日期
            trainMajor: "",
            trainDate: ""
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        age: [
          { required: true, message: "年龄不能为空" },
          { type: "number", message: "年龄必须为数字值" }
        ],
        Working: [
          { required: true, message: "工作时间不能为空" },
          { type: "number", message: "工作时间必须为数字值" }
        ],
        major: [
          { required: true, message: "请输入学习专业", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        position: [
          { required: true, message: "请输入职位", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        salary: [
          { required: true, message: "请输入薪资", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        industry: [
          { required: true, message: "请输入期望的行业", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        city: [
          { required: true, message: "请输入城市", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('提交成功');
          this.$router.push({name:'resume'})
        } else {
          // this.$router.push({name:'resume'})
          alert("请填写完整表单！！")
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    removeDomain(item) {
      var index = this.ruleForm.domains.indexOf(item);
      if (index >0) {
        this.ruleForm.domains.splice(index, 1);
      }else{
        alert("当前就一条不允许删除")
      }
    },
    addDomain() {
      this.ruleForm.domains.push({
        value:"",
        key: Date.now()
      });
    },
    removeSchool(item) {
      var index = this.ruleForm.educations.indexOf(item);
      if (index >0) {
        this.ruleForm.educations.splice(index, 1);
      }else{
        alert("当前就一条不允许删除")
      }
    },
    addSchool() {
      this.ruleForm.educations.push({
        domains: "",
        key: Date.now()
      });
    },
    removetrain(item) {
      var index = this.ruleForm.trains.indexOf(item);
      if (index >0) {
        this.ruleForm.trains.splice(index, 1);
      }else{
        alert("当前就一条不允许删除")
      }
    },
    addtrain() {
      this.ruleForm.trains.push({
        value: "",
        key: Date.now()
      });
    }
  },
  components: {
    schoolFooter
  }
};
</script>
<style lang="less" scoped>
.personnel {
  width: 1000px;
  background-color: #fff;
  margin: 0 auto;
  padding: 20px 20px 60px;
  h4 {
    margin: 0 80px 20px;
  }
  p {
    margin: 0 100px;
    cursor: pointer;
    font-size: 20px;
    color: rgb(33, 79, 137);
  }
}
.input_css {
  width: 260px !important;
}
.textarea_css {
  width: 345% !important;
}
.el-button {
  float: right !important;
}
</style>
<style>
.avatar-uploader {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  width: 150px;
  height: 150px;
}
.avatar-uploader .el-upload img {
  width: 100%;
  height: 100%;
}
.avatar-uploader .el-upload__tip {
  font-size: 14px;
  color: rgb(33, 79, 137);
}
.avatar-uploader .el-upload:hover {
  border-color: rgb(33, 79, 137);
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
