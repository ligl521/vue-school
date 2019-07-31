<template>
    <div class="registerBox">
        <h3>国际学校四库全书-账号注册</h3>
        <!-- 上传头像 -->
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="avatar-uploader-icon upload-img"></i>  
        </el-upload>
        <p>推荐尺寸大小为150*150</p>
        <div class="inputBox">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <div class="FaBox">
                    <i class="iconfont icon-youxiang"></i>
                    <el-form-item  prop="inputMail">
                        <el-input v-model="ruleForm.inputMail" placeholder="邮箱"></el-input>
                    </el-form-item>
                </div>
                <div class="FaBox">
                    <i class="iconfont icon-xingming"></i>
                    <el-form-item prop="inputName">
                        <el-input v-model="ruleForm.inputName" placeholder="姓名"></el-input>
                    </el-form-item>
                </div>
                <div class="FaBox">
                    <i class="iconfont icon-jianzhu"></i>
                    <el-form-item prop="inputCompany">
                        <el-input v-model="ruleForm.inputCompany" placeholder="所属机构"></el-input>
                    </el-form-item>
                </div>
                <div class="FaBox">
                    <i class="iconfont icon-suoshuzhiwei"></i>
                    <el-form-item prop="inputJob">
                        <el-input v-model="ruleForm.inputJob" placeholder="职位"></el-input>
                    </el-form-item>
                </div>
                <div class="FaBox">
                    <i class="iconfont icon-shoujihao"></i>
                    <el-form-item round prop="inputTel">
                        <el-input v-model="ruleForm.inputTel" placeholder="手机号" @keyup.native="getPhone(ruleForm.inputTel)">
                            <template slot="append">
                                <el-button  :class="{getCodeBtn:isGet}" :disabled="disabled1" @click="getCode()" v-html="getTime"></el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                 </div>
                <div class="FaBox">
                    <i class="iconfont icon-yanzhengma"></i>
                    <el-form-item prop="inputCode">
                        <el-input v-model="ruleForm.inputCode" placeholder="验证码" @keyup.native="checkCode(ruleForm.inputCode)"></el-input>
                    </el-form-item>
                </div>
                <div class="FaBox">
                    <i class="iconfont icon-mima"></i>
                    <el-form-item prop="inputPwd">
                        <el-input v-model="ruleForm.inputPwd" placeholder="密码" show-password></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <drag-verify 
            :width="width" 
            :height="height" 
            :text="text" 
            :success-text="successText" 
            :background="background" 
            :progress-bar-bg="progressBarBg" 
            :completed-bg="completedBg" 
            :handler-bg="handlerBg" 
            :handler-icon="handlerIcon" 
            :text-size="textSize" 
            :success-icon="successIcon"
            ref="Verify">
        </drag-verify>
        <el-button type="primary" class="registerBtn" @click="finishBtn('ruleForm')"  :disabled="disabled">完成注册</el-button>
    </div>
</template>

<script>
import dragVerify from "vue-drag-verify";
import {register,isRegister,getVerifyCode,checkVerifyCode} from "@/api/api";
export default {
  components: {
    dragVerify
  },
  data() {
    //校验手机号
    var phoneReg = /^[1][3,4,5,7,8,6][0-9]{9}$/;
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      } else if (!phoneReg.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    // 验证是否注册过
    var mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    var checkisRegister=(rule,value,callback)=>{
        isRegister({
            UserMail:this.ruleForm.inputMail
        }).then(res=>{
            if(res.code==1){
                return callback(new Error("邮箱已被注册")); 
            }else if(!mailReg.test(value)){
                callback(new Error("请输入正确的邮箱地址"));
            }else{
                callback();
            }
        })  
    }
    return {
      ruleForm: {
        inputMail: "",
        inputName: "",
        inputCompany: "",
        inputJob: "",
        inputTel: "",
        inputCode: "",
        inputPwd: ""
      },
      rules: {
        inputMail: [
            {required: true, message: "邮箱地址不能为空",trigger:'blur'},
            {type: "email",validator: checkisRegister,trigger:'blur'}
        ],
        inputName: [
            {required: true, message: "名字不能为空" }
        ],
        inputCompany: [
            {required: true, message: "机构不能为空" }
        ],
        inputJob: [
            {required: true, message: "职位不能为空" }
        ],
        inputTel: [
            {validator: validatePhone }
        ],
        inputCode: [
            {required: true, message: "验证码不能为空" },
            {min: 4, max: 4, message: "密码必须为4位" }
        ],
        inputPwd: [
            {required: true, message: "密码不能为空" },
            {min: 6, max: 6, message: "密码必须为6位" }
        ]
      },
      imageUrl: " ",
      handlerIcon: "iconfont icon-yanzhengma",
      successIcon: "iconfont icon-yanzhengma",
      background: "#cccccc",
      progressBarBg: "#4b0",
      completedBg: "#66cc66",
      handlerBg: "#fff",
      text: "拖动滑块完成验证",
      successText: "验证成功",
      width: 320,
      height: 42,
      textSize: "18px",
      isCircle: "true",
      disabled: true,
      disabled1: true,
      isGet:false,
      totalTime:60,
      totalTimeName:null,
      getTime:'获取验证码',
    };
  },
  created() {
    //coolie 是否存在存在
    if (this.getCookie("UserImg") == null) {
        this.imageUrl="https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-user/samplePic/eg04.png"
    } else {
        this.imageUrl = this.getCookie("UserImg"); //头像
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //coolie 读取存在
    getCookie(name) {
      var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 注册
    finishBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.$refs.Verify.isPassing==true) {
          let that = this;
          register({
            username: that.ruleForm.inputMail,
            userTurename: that.ruleForm.inputName,
            userOrganization: that.ruleForm.inputCompany,
            userPosition: that.ruleForm.inputJob,
            userPhone: that.ruleForm.inputTel,
            password: that.ruleForm.inputPwd,
            userPortrait:that.UserPortrait
          }).then(res => {
            that.$message({
                message: '注册成功',
                type: 'success'
            });
            this.$router.push({ path: "./" }); 
          });
        }else if(this.$refs.Verify.isPassing==false) {
           this.$message({
                message: '请完成滑动验证',
                type: 'warning'
            });
        }else {
           return false;
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 输完号码点击
    getPhone(e) {
      if (this.ruleForm.inputTel.length == 11) {
        this.disabled1 = false;
        this.isGet= true
      }else{
        this.disabled1 = true;
        this.isGet= false
      }
    },
    // 获取验证码
    getCode() {
        getVerifyCode({
          mobile: this.ruleForm.inputTel
        }).then(res => {
          this.time()
        });
    },
    //验证码倒计时
    time() {
        let that = this;
        that.getTime=that.totalTime+'s后重新获取'
        that.totalTimeName = window.setInterval(() => {
            that.totalTime--;
            this.disabled1 = true;
            that.getTime=that.totalTime+'s后重新获取'
            if (that.totalTime <= 0) {
                clearInterval(that.totalTimeName);
                that.totalTime = 60;
                that.getTime='重新获取验证码'
                this.disabled1 = false;
            }
        }, 1000);
    },
    // 验证验证码
    checkCode(e) {
      console.log(this.ruleForm.inputCode);
      if (this.ruleForm.inputCode.length == 4) {
        checkVerifyCode({
          mobile: this.ruleForm.inputTel,
          code: this.ruleForm.inputCode
        }).then(res => {
          if (res.code == 0) {
            this.disabled = false;
          } else {
            this.$message({
                message: '验证码输入错误',
                type: 'error'
            });
          }
        });
      }
    }
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
.registerBox {
  box-shadow: 0px 0px 10px #ccc;
  padding: 20px 0;
  width: 50%;
  margin: 100px auto;
  h3{
    text-align: center;
    margin-bottom: 40px;
    letter-spacing: 1px;
    padding-bottom:20px;
    border-bottom:1px solid #ccc;
  }
  .inputBox {
    width: 50%;
    margin: 0 auto;
    .FaBox {
      display: flex;
      .getCodeBtn{
          border-radius: 0;
          color:#fff;
          border:1px solid #ccc;
          background:#409eff;
      }
      i {
        font-size: 30px;
        line-height: 60px;
        margin-right: 20px;
      }
      .el-form-item {
        width: 100%;
        .el-input {
          margin: 10px 0;
        }
      }
    }
  }
  p {
    text-align: center;
    margin-bottom: 30px;
  }
  .avatar-uploader {
    text-align: center;
    .el-upload__input {
      display: none !important;
    }
    .el-upload {
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
    }
    .avatar-uploader-icon,
    .avatar {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
      border: 1px dashed #d9d9d9;
      margin-bottom: 15px;
      display: inline-block;
      border-radius: 50%;
    }
  }
  .drag_verify {
    margin: 20px auto 0;
  }
  .registerBtn {
    margin: 50px auto 0;
    width: 20%;
    display: inherit;
    font-size: 16px;
    letter-spacing: 2px;
  }
}
</style>
