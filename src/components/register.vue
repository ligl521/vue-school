<template>
    <div class="registerBox">
        <!-- 上传头像 -->
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="avatar-uploader-icon upload-img">上传头像</i>
            <!-- <el-row>
                <el-button type="primary">上传头像</el-button>
            </el-row> -->
        </el-upload>
        <div class="inputBox">
            <el-form :model="ruleForm" :rules="rules">
                <el-form-item  prop="inputMail">
                    <el-row>
                        <el-col :span="4"><i class="iconfont icon-youxiang"></i></el-col>
                        <el-col :span="20"><el-input v-model="ruleForm.inputMail" placeholder="邮箱"></el-input></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="inputName">
                    <el-row>
                        <el-col :span="4"><i class="iconfont icon-xingming"></i></el-col>
                        <el-col :span="20"><el-input v-model="ruleForm.inputName" placeholder="姓名"></el-input></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="inputCompany">
                    <el-row>
                        <el-col :span="4"><i class="iconfont icon-jianzhu"></i></el-col>
                        <el-col :span="20"><el-input v-model="ruleForm.inputCompany" placeholder="所属机构"></el-input></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="inputJob">
                    <el-row>
                        <el-col :span="4"><i class="iconfont icon-suoshuzhiwei"></i></el-col>
                        <el-col :span="20"><el-input v-model="ruleForm.inputJob" placeholder="职位"></el-input></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item round prop="inputTel">
                     <el-row>
                        <el-col :span="4"> <i class="iconfont icon-shoujihao"></i></el-col>
                        <el-col :span="20"><el-input v-model="ruleForm.inputTel" placeholder="手机号"><template slot="append">获取验证码</template></el-input></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="inputCode">
                    <el-row>
                        <el-col :span="4"><i class="iconfont icon-yanzhengma"></i></el-col>
                        <el-col :span="20"><el-input v-model="ruleForm.inputCode" placeholder="验证码"></el-input></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="inputPwd">
                    <el-row>
                        <el-col :span="4"><i class="iconfont icon-mima"></i></el-col>
                        <el-col :span="20"><el-input v-model="ruleForm.inputPwd" placeholder="密码" show-password></el-input></el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data() {
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
          {required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {type: "email", message: "请输入正确的邮箱地址",trigger: ["blur", "change"]}
        ],
        inputName: [
            { required: true, message: "名字不能为空" }
        ], 
        inputCompany: [
            { required: true, message: "机构不能为空" }
        ],
        inputJob: [
            { required: true, message: "职位不能为空" }
        ],
        inputTel: [
            { validator: validatePhone }
        ],
        inputCode: [
            { required: true, message: "验证码不能为空" },
            { min: 4, max: 4, message: "密码必须为4位" }
        ],
        inputPwd: [
            { required: true, message: "密码不能为空" },
            { min: 6, max: 6, message: "密码必须为6位" }
        ]
      },
      imageUrl: ""
    };
  },
  methods: {
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.registerBox {
  box-shadow: 0px 0px 10px #ccc;
  padding: 50px 0;
  width: 50%;
  margin: 100px auto;
  .inputBox {
    width: 50%;
    margin: 0 auto;
    i {
        font-size: 30px;
        line-height: 60px;
        margin-right: 20px;
    }
    .el-input {
        margin: 10px 0;
    }
    .el-form-item__error {
      left: 60px !important;
    }
    .el-input-group__append {
      background: #214f89;
      color: #fff;
    }
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
    .avatar{
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
        border: 1px dashed #d9d9d9;
        margin-bottom: 30px;
        display: inline-block;
        border-radius: 50%;
    }
  }
}
</style>
