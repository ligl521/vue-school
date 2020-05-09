<template>
  <div style="background: #f5f5f5;">
    <div id="cover" :class="active ? 'active' : 'hide'"></div>
    <div :class="active ? 'show' : 'hide'">
      <h3 class="show_title">头像裁剪</h3>
      <i class="el-icon-close guanbi" @click="close"></i>
      <div class="cropper-content">
        <div class="cropper">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
            @imgLoad="imgLoad"
          ></vueCropper>
        </div>
        <div
          class="show-preview"
          :style="{
            overflow: 'hidden',
            margin: '0 auto'
          }"
        >
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
          <h4 style="margin-top: 20px">头像预览</h4>
        </div>
      </div>
      <div class="footer-btn">
        <el-button class="ruleForm" type="primary" @click="down('blob')"
          >提交</el-button
        >
      </div>
    </div>
    <div class="personnel">
      <div class="scope-btn">
        <label class="el-icon-edit-outline label_btn" for="uploads"></label>
        <input
          type="file"
          id="uploads"
          style="position:absolute; clip:rect(0 0 0 0);"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="uploadImg($event, 1)"
        />
        <img :src="ruleForm.imageUrl" class="personnel_img" />
      </div>
      <el-form
        :inline="true"
        status-icon
        :model="ruleForm"
        :rules="rules"
        label-position="right"
        label-width="170px"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <h4>个人信息</h4>
        <el-form-item label="姓名" prop="username">
          <el-input
            placeholder="请输入姓名"
            class="input_css"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group class="input_css" v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="telphone">
          <el-input
            placeholder="请输入手机号"
            class="input_css"
            v-model.number="ruleForm.telphone"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            placeholder="请输入邮箱"
            class="input_css"
            v-model="ruleForm.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            placeholder="请输入年龄"
            class="input_css"
            v-model.number="ruleForm.age"
          ></el-input>
        </el-form-item>
        <el-form-item label="最高学历" :required="true" prop="high_education">
          <el-select class="input_css" v-model="ruleForm.high_education">
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作年限" :required="true" prop="expreience">
          <el-select class="input_css" v-model="ruleForm.expreience">
            <el-option label="应届生" value="应届生"></el-option>
            <el-option label="1-3" value="1-3"></el-option>
            <el-option label="3-5" value="3-5"></el-option>
            <el-option label="5-10" value="5-10"></el-option>
            <el-option label="10年以上" value="10年以上"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="profession">
          <el-input
            placeholder="请输入专业"
            class="input_css"
            v-model.number="ruleForm.profession"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否公开简历">
          <el-switch v-model="ruleForm.delivery"></el-switch>
          <span>建议公开简历，获得更多展示机会</span>
        </el-form-item>
        <el-divider></el-divider>
        <h4>期望职位</h4>
        <el-form-item label="职位名称" prop="position">
          <el-input
            placeholder="请输入职位名称"
            class="input_css"
            v-model="ruleForm.position"
          ></el-input>
        </el-form-item>
        <el-form-item label="薪资(年薪)" prop="salary">
          <el-input
            placeholder="请输入薪资(年薪)"
            class="input_css"
            v-model="ruleForm.salary"
          ></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="expected_work">
          <el-input
            placeholder="请输入工作地点"
            class="input_css"
            v-model="ruleForm.expected_work"
          ></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="entry_time">
          <el-input
            placeholder="请输入入职时间"
            class="input_css"
            v-model="ruleForm.entry_time"
          ></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <h4>工作经历</h4>
        <div
          v-for="(domain, index) in ruleForm.work_experience_text"
          :key="domain.key"
        >
          <el-form-item
            label="公司名称"
            :prop="'work_experience_text.' + index + '.company'"
            :rules="{
              required: true,
              message: '公司名称不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              placeholder="请输入公司名称"
              class="input_css"
              v-model="domain.company"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="职位名称"
            :prop="'work_experience_text.' + index + '.jobType'"
            :rules="{
              required: true,
              message: '职位名称不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              placeholder="请输入职位名称"
              class="input_css"
              v-model="domain.jobType"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="在职时间"
            :prop="'work_experience_text.' + index + '.date'"
            :rules="{ required: true, message: '请输入日期', trigger: 'blur' }"
          >
            <el-date-picker
              class="input_css"
              v-model="domain.date"
              type="monthrange"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
            ></el-date-picker>
          </el-form-item>
          <br />
          <el-form-item
            label="工作内容"
            :prop="'work_experience_text.' + index + '.textarea'"
            :rules="{
              required: true,
              message: '请输入工作内容',
              trigger: 'blur'
            }"
          >
            <el-input
              class="textarea_css"
              type="textarea"
              size="medium"
              placeholder="请输入工作内容"
              v-model="domain.textarea"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
          <p class="remove">
            <el-button @click.prevent="removeDomain(domain)" type="danger"
              >删除</el-button
            >
          </p>
          <el-divider></el-divider>
        </div>
        <p @click="addDomain" class="addcss">
          <i class="el-icon-circle-plus-outline"></i>添加工作经历
        </p>
        <h4>教育背景</h4>
        <div v-for="(school, index) in ruleForm.education" :key="school.key">
          <el-form-item
            label="学校名称"
            :prop="'education.' + index + '.schoolName'"
            :rules="{
              required: true,
              message: '学校名称不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              placeholder="请输入学校名称"
              class="input_css"
              v-model="school.schoolName"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="专业"
            :prop="'education.' + index + '.schoolMajor'"
            :rules="{
              required: true,
              message: '专业名称不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              placeholder="请输入专业名称"
              class="input_css"
              v-model="school.schoolMajor"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="在校时间"
            :prop="'education.' + index + '.schoolDate'"
            :rules="{
              required: true,
              message: '在校时间不能为空',
              trigger: 'blur'
            }"
          >
            <el-date-picker
              class="input_css"
              v-model="school.schoolDate"
              type="monthrange"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
            ></el-date-picker>
          </el-form-item>
          <br />
          <el-form-item
            label="在校经历"
            :prop="'education.' + index + '.schoolTextarea'"
            :rules="{
              required: true,
              message: '请输入在校经历',
              trigger: 'blur'
            }"
          >
            <el-input
              class="textarea_css"
              type="textarea"
              size="medium"
              placeholder="请输入在校经历"
              v-model="school.schoolTextarea"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
          <p class="remove">
            <el-button @click.prevent="removeSchool(school)" type="danger"
              >删除</el-button
            >
          </p>
          <el-divider></el-divider>
        </div>
        <p @click="addSchool" class="addcss">
          <i class="el-icon-circle-plus-outline"></i>添加教育背景
        </p>
        <h4>培训经历</h4>
        <div v-for="(train, index) in ruleForm.training" :key="train.key">
          <el-form-item
            label="培训名称"
            :prop="'training.' + index + '.trainName'"
            :rules="{
              required: true,
              message: '培训名称不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              placeholder="请输入培训名称"
              class="input_css"
              v-model="train.trainName"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="培训时间"
            :prop="'training.' + index + '.trainDate'"
            :rules="{
              required: true,
              message: '培训时间不能为空',
              trigger: 'blur'
            }"
          >
            <el-date-picker
              class="input_css"
              v-model="train.trainDate"
              type="monthrange"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
            ></el-date-picker>
          </el-form-item>
          <br />
          <el-form-item
            label="培训经历"
            :prop="'training.' + index + '.trainTextarea'"
            :rules="{
              required: true,
              message: '培训经历不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              class="textarea_css"
              type="textarea"
              size="medium"
              placeholder="请输入培训内容"
              v-model="train.trainTextarea"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
          <p class="remove">
            <el-button @click.prevent="removetrain(train)" type="danger"
              >删除</el-button
            >
          </p>
          <el-divider></el-divider>
        </div>
        <p @click="addtrain" class="addcss">
          <i class="el-icon-circle-plus-outline"></i>添加培训经历
        </p>
        <h4>资格证书</h4>
        <el-form-item
          label="证书名称"
          prop="certificate"
          :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }"
        >
          <el-input
            placeholder="请输入证书名称"
            class="input_css"
            v-model="ruleForm.certificate"
          ></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <h4>其他要求</h4>
        <el-form-item
          label="内容"
          prop="other"
          :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }"
        >
          <el-input
            class="textarea_css"
            type="textarea"
            size="medium"
            placeholder="例：福利待遇、薪资要求等。"
            v-model="ruleForm.other"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button class="ruleForm" type="primary" @click="submitForm('ruleForm')"
        >提交</el-button
      >
    </div>
    <schoolFooter />
  </div>
</template>

<script>
import schoolFooter from "./schoolFooter";
import { newTalent, upImage_base64 } from "@/api/api";

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
      crap: false,
      active: false,
      previews: {},
      option: {
        img:
          "http:img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png",
        size: 1,
        full: false, // 输出原图比例截图 props名full
        outputType: "png",
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true
      },
      fileName: "", //本机文件地址
      downImg: "#", //上传后的图片的地址（不带服务器域名）
      ruleForm: {
        imageUrl:
          "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png", //头像
        username: "", //姓名
        sex: "", //选项
        telphone: "", //手机号
        email: "", //邮箱
        age: "", //年龄
        high_education: "本科", //学历
        expreience: "1-3", //工作年限
        profession: "", //专业
        delivery: true, // 简历公开
        position: "", //期望职位
        salary: "", //薪资要求
        expected_work: "", //城市
        entry_time: "", //入职时间
        other: "", //其他要求
        certificate: "", //资格证书
        submitter: "", //提交人邮箱
        work_experience_text: [
          //工作经验
          {
            company: "",
            jobType: "",
            date: "",
            textarea: ""
          }
        ],
        education: [
          //教育背景
          {
            schoolName: "",
            schoolMajor: "",
            schoolDate: "",
            schoolTextarea: ""
          }
        ],
        training: [
          //培训经历
          {
            trainName: "",
            trainMajor: "",
            trainDate: ""
          }
        ]
      },
      rules: {
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        telphone: [{ required: true, validator: checkPhone, trigger: "blur" }],
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
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        profession: [
          { required: true, message: "请输入学习专业", trigger: "blur" }
        ],
        position: [{ required: true, message: "请输入职位", trigger: "blur" }],
        salary: [
          { required: true, message: "请输入薪资", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        entry_time: [
          { required: true, message: "请输入薪资", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        expected_work: [
          { required: true, message: "请输入城市", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.ruleForm.submitter = this.getCookie("username"); //名字
    console.log(this.ruleForm.submitter);

    
    // console.log(d)
    // console.log(new Date(d).getTime())
  },
  methods: {
    //coolie 读取存在
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.work_experience_text[0].date[0]=new Date(this.ruleForm.work_experience_text[0].date[0]).getFullYear() + '.' + (new Date(this.ruleForm.work_experience_text[0].date[0]).getMonth() + 1) + '.' + new Date(this.ruleForm.work_experience_text[0].date[0]).getDate();
          this.ruleForm.work_experience_text[0].date[1]=new Date(this.ruleForm.work_experience_text[0].date[1]).getFullYear() + '.' + (new Date(this.ruleForm.work_experience_text[0].date[1]).getMonth() + 1) + '.' + new Date(this.ruleForm.work_experience_text[0].date[1]).getDate();
          if (this.ruleForm.delivery) {
            this.ruleForm.delivery = "0";
          } else {
            this.ruleForm.delivery = "1";
          }
          //   alert('提交成功');
          //   this.$router.push({name:'resume'})
          newTalent({
            // avatar: this.ruleForm.avatar, //头像
            username: this.ruleForm.username, //姓名
            sex: this.ruleForm.sex, //选项
            telphone: this.ruleForm.telphone, //手机号
            userMail: this.ruleForm.email, //邮箱
            age: this.ruleForm.age, //年龄
            highEducation: this.ruleForm.high_education, //学历
            expreience: this.ruleForm.expreience, //工作年限
            profession: this.ruleForm.profession, //专业
            isPublic: this.ruleForm.delivery, // 简历公开
            position: this.ruleForm.position, //期望职位
            salary: this.ruleForm.salary, //薪资要求
            expectedWork: this.ruleForm.expected_work, //城市
            entryTime: this.ruleForm.entry_time, //入职时间
            workExperience: JSON.stringify(this.ruleForm.work_experience_text), //工作经验
            education: JSON.stringify(this.ruleForm.education), //教育背景
            training: JSON.stringify(this.ruleForm.training), //培训经历
            certificate: this.ruleForm.certificate, //资格证书
            other: this.ruleForm.other, //其他要求
            submitter: this.ruleForm.submitter //提交人邮箱
          }).then(res => {
            console.log(res);
          });
        } else {
          alert("请填写完整表单！！");
          return false;
        }
      });
    },
    //工作经历添加
    addDomain() {
      this.ruleForm.work_experience_text.push({});
    },
    //工作经历删除
    removeDomain(item) {
      var index = this.ruleForm.work_experience_text.indexOf(item);
      if (index > 0) {
        this.ruleForm.work_experience_text.splice(index, 1);
      } else {
        alert("当前就一条不允许删除");
      }
    },
    //教育背景添加
    addSchool() {
      this.ruleForm.education.push({});
    },
    //教育背景删除
    removeSchool(item) {
      var index = this.ruleForm.education.indexOf(item);
      if (index > 0) {
        this.ruleForm.education.splice(index, 1);
      } else {
        alert("当前就一条不允许删除");
      }
    },
    //培训经历添加
    addtrain() {
      this.ruleForm.training.push({});
    },
    //培训经历删除
    removetrain(item) {
      var index = this.ruleForm.training.indexOf(item);
      if (index > 0) {
        this.ruleForm.training.splice(index, 1);
      } else {
        alert("当前就一条不允许删除");
      }
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    down(type) {
      console.log("finish");
      let _this = this;
      let formData = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          console.log(data);
          let img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
          formData.append("file", data, this.fileName);
          formData.append("type", "nsi-pc/ResumePortrait/");
          _this
            .axios({
              url: "http://192.168.0.103:8080/nsi-1.0/CommonApi/upload.do",
              method: "POST", //  这个地方注意
              data: formData,
              processData: false,
              contentType: false
            })
            .then(response => {
              console.log("upload_success_response:", response);
              if (response.data.code == 0) {
                console.log(response.data.data.url);
                this.ruleForm.imageUrl = response.data.data.url;
              }
            });
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    uploadImg(e, num) {
      this.active = true;
      var _this = this;
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.example2.img = data;
        }
      };
      // 转化为base64
      //reader.readAsDataURL(file);
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {
      console.log(msg);
    },
    //关闭按钮
    close() {
      this.active = false;
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
  .scope-btn {
    width: 200px;
    margin: 0 auto;
    position: relative;
    .label_btn {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      position: absolute;
      cursor: pointer;
      left: 150px;
      top: 0;
      font-size: 36px;
      color: #214f89;
    }
    .personnel_img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 1px solid #ccc;
    }
  }
  h4 {
    margin: 0 80px 20px;
  }
  p {
    margin: 0 100px;
    cursor: pointer;
    font-size: 20px;
    color: rgb(33, 79, 137);
  }
  .addcss {
    margin: 0 100px;
    width: 160px;
    cursor: pointer;
    font-size: 20px;
    color: rgb(33, 79, 137);
    position: relative;
    top: -80px;
    left: 0;
  }
  .remove {
    margin: 0 auto;
    text-align: center;
  }
}
.input_css {
  width: 260px !important;
}
.textarea_css {
  width: 344% !important;
}
.ruleForm {
  background-color: rgb(33, 79, 137) !important;
  float: none !important;
  margin: 0 auto !important;
  display: block;
  font-size: 18px;
}

.hide {
  display: none;
}
.active {
  display: block;
}
.show {
  position: fixed;
  left: 50%;
  top: 20%;
  width: 700px;
  height: 450px;
  z-index: 2222;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

#cover {
  position: absolute;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0);
  width: 100%; /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
  height: 100%;
  filter: alpha(opacity=60); /*设置透明度为60%*/
  opacity: 0.5; /*非IE浏览器下设置透明度为60%*/
  z-index: 999;
}
.show_title {
  text-align: center;
}
.guanbi {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 26px;
  cursor: pointer;
}
.cropper-content {
  text-align: center;
  .cropper {
    margin: 46px 60px 0 0;
    display: inline-block;
    width: 240px;
    height: 240px;
  }
  .show-preview {
    display: inline-block;
    .preview {
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #cccccc;
      background: #cccccc;
    }
  }
}
.footer-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
