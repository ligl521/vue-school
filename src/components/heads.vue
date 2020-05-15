<template>
  <div id="heads" class="heads hidden-xs-only">
    <el-menu
      mode="horizontal"
      :default-active="$route.path"
      class="el-menu-demo"
      background-color="#214f89"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/school">国际学校库</el-menu-item>
      <el-menu-item index="/company">教育机构库</el-menu-item>
      <el-menu-item index="/talent">教育人才库</el-menu-item>
      <el-menu-item index="/project">项目数据库</el-menu-item>
      <el-menu-item index="/visible">数据可视化</el-menu-item>
      <el-button
        round
        class="login_btn"
        type="text"
        v-show="!WechatLogin"
        @click="
          dialogVisible = true;
          get_msg();
        "
        >登录</el-button
      >
      <div class="headimgurl" round v-show="!headimgurl">
        <img @click="personalCenter" :src="imgurl" />
        <span @click="personalCenter" class="userTurename">{{
          userTurename
        }}</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="iconfont icon-ellipsis-vertical"></i>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="dropdown_name('username')"
              >注销</el-dropdown-item
            >
            <el-dropdown-item @click.native="personalCenter"
              >个人中心</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 点击触发登录dialog -->
    </el-menu>
    <el-dialog
      :visible.sync="dialogVisible"
      width="300px !important"
      center
      :modal="true"
      :modal-append-to-body="true"
      :append-to-body="true"
      :close-on-press-escape="false"
      :lock-scroll="true"
    >
      <el-tabs stretch v-model="activeName" @tab-click="handleClick">
        <!-- 二维码登录 -->
        <el-tab-pane label="扫码登录" name="first">
          <div v-show="!opacity" class="opacity"></div>
          <div v-show="!opacity" class="opacity_text">
            <p>二维码已失效</p>
            <el-button type="danger" @click="opacity_text()">刷新</el-button>
          </div>
          <div class="img_code" v-loading="loading">
            <img id="qr_code" v-bind:src="imgCode" />
          </div>
          <p class="span_text">请使用微信扫码登录</p>
        </el-tab-pane>
        <!-- 账号密码登录 -->
        <el-tab-pane label="账号密码" name="second">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            :show-message="true"
            :status-icon="true"
          >
            <el-form-item prop="userMail">
              <el-input
                v-model="ruleForm.userMail"
                prop="userMail"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input
                type="password"
                v-model="ruleForm.pwd"
                prop="pwd"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="send_msg('ruleForm')"
                class="login"
                >登录</el-button
              >
            </el-form-item>
            <el-form-item style="margin-bottom:0">
              <span>
                <!-- 注册账号 -->
                <el-button type="text">
                  <a class="a_color" href="javascript:;" @click="nowRegister"
                    >注册账号</a
                  >
                </el-button>
                <!-- 忘记密码 -->
                <el-button type="text" @click="centerDialogVisible = true">
                  <a class="a_color" href="javascript:;">忘记密码</a>
                </el-button>

                <!--遇到问题 -->
                <el-button type="text" @click="feedback">
                  <a class="a_color" href="javascript:;">遇到问题</a>
                </el-button>
              </span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible1"
      width="25%"
      center
      :modal-append-to-body="true"
      :append-to-body="true"
    >
      <div class="bindBox">
        <img src="../assets/bind.png" alt class="img-responsive" />
        <h4>新学说与微信账号绑定</h4>
        <p class="mail"><i class="iconfont icon-youxiang"></i>邮箱</p>
        <el-input v-model="bindMail" placeholder="请输入邮箱"></el-input>
        <p class="password"><i class="iconfont icon-mima"></i>密码</p>
        <el-input
          v-model="bindPwd"
          placeholder="请输入密码"
          show-password
        ></el-input>
        <p>
          <el-button type="primary" @click="nowBind">立即绑定</el-button>
        </p>
        <p>
          <span @click="nowRegister">立即注册</span> |
          <span>忘记密码</span>
        </p>
      </div>
    </el-dialog>

    <el-dialog
      title="找回密码"
      :visible.sync="centerDialogVisible"
      width="500px"
      center
      :modal="true"
      :modal-append-to-body="true"
      :append-to-body="true"
      :close-on-press-escape="false"
      :lock-scroll="true"
    >
      <el-tabs
        v-model="activePwd"
        @tab-click="handleClick"
        class="forgetPwd"
        stretch
      >
        <el-tab-pane label="验证码输入" name="first">
          <el-form :rules="codeRules" ref="ruleFormCode" :model="ruleFormCode">
            <el-form-item
              center
              label="邮箱账号"
              :label-width="formLabelWidth"
              prop="inputMail"
            >
              <el-button @click="sendPW">发送验证码</el-button>
              <el-input v-model="ruleFormCode.inputMail"></el-input>
            </el-form-item>
            <el-form-item
              center
              label="验证码"
              :label-width="formLabelWidth"
              prop="getCode"
            >
              <el-input v-model="ruleFormCode.getCode" @blur="next"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="重置密码" name="second" :disabled="resetPW">
          <el-form :rules="pwdRules" ref="ruleFormPwd" :model="ruleFormPwd">
            <el-form-item
              center
              label="重置密码"
              :label-width="formLabelWidth"
              prop="passWordOne"
            >
              <el-input v-model="ruleFormPwd.passWordOne"></el-input>
            </el-form-item>
            <el-form-item
              center
              label="确认密码"
              :label-width="formLabelWidth"
              prop="passWordTwo"
            >
              <el-input v-model="ruleFormPwd.passWordTwo"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer pwdFooter">
        <el-button
          type="primary"
          :disabled="nextStep"
          @click="second('ruleFormCode')"
          >下一步</el-button
        >
        <el-button @click="reset('ruleFormPwd')">完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { constants } from "fs";
import { setTimeout, setInterval } from "timers";
import {
  wechatBind,
  login,
  getQrcode,
  getCheckLogin,
  weChatLogin,
  forgetPwd,
  forgetPWverify,
  resetPwd
} from "@/api/api";
export default {
  data() {
    return {
      loading:true,
      dialogVisible: false, //登录的弹框
      dialogVisible1: false, //扫码未绑定的弹框
      activeName: "first",
      activePwd: "first",
      sceneStr: "", //请求微信轮询的参数
      sceneStrName: null, //请求微信轮询定时器的名字
      totalTime: 120, //倒计时时间
      totalTimeName: null, //定时器名字
      OpenId: "", //微信ID
      imgCode: "", //微信二维码
      WechatLogin: false, //登录显示隐藏
      headimgurl: true, //头像名字显示隐藏
      imgurl: "", //用户微信头像
      userTurename: "", //用户真实姓名
      opacity: true, //二维码失效
      ruleForm: {
        //登录的表单
        userMail: "",
        pwd: ""
      },
      activeIndex: "1",
      //账号密码输入规则，elementUI:Form表单
      rules: {
        userMail: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 0, max: 100, message: "用户名不能为空", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 0, max: 100, message: "密码不能为空", trigger: "blur" }
        ]
      },
      defaultUrl: "./",
      bindMail: "", //绑定的邮箱
      bindPwd: "", //绑定的密码
      // 找回密码
      centerDialogVisible: false,
      nextStep: true,
      resetPW: true,
      formLabelWidth: "80px",
      ruleFormCode: {
        inputMail: "",
        getCode: ""
      },
      codeRules: {
        inputMail: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          { type: "email", trigger: "blur" }
        ],
        getCode: [
          { required: true, message: "请输入验证码" },
          { min: 6, max: 6, message: "验证码为6位" }
        ]
      },
      ruleFormPwd: {
        passWordOne: "",
        passWordTwo: ""
      },
      pwdRules: {
        passWordOne: [
          { required: true, message: "请设置密码", trigger: "blur" },
          { min: 6, max: 10, message: "密码至少是6位", trigger: "blur" }
        ],
        passWordTwo: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { min: 6, max: 10, message: "密码至少是6位", trigger: "blur" }
        ]
      }
    };
  },
  name: "App",
  created() {
    //coolie 是否存在存在
    if (this.getCookie("username") == null) {
      this.WechatLogin = false;
      this.headimgurl = true;
    } else {
      this.userTurename = decodeURI(this.getCookie("User_TureName")); //名字
      this.WechatLogin = true;
      this.headimgurl = false;
      if (this.getCookie("UserImg") == null) {
        //用户头像
        this.imgurl = require("../assets/tx.png");
      } else {
        this.imgurl = this.getCookie("UserImg"); //用户头像
      }
    }
    console.log(this.userTurename)
  },
  methods: {
    sendPW() {
      forgetPwd({
        UserMail: this.ruleFormCode.inputMail
      }).then(res => {
        if (res.code == 0) {
          this.$message({
            message: "验证码发送成功，请输入验证码",
            center: true,
            type: "success"
          });
        }
      });
    },
    next() {
      if (
        this.ruleFormCode.inputMail !== "" &&
        this.ruleFormCode.getCode !== ""
      ) {
        this.nextStep = false;
      } else {
        this.nextStep = true;
      }
    },
    second(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          forgetPWverify({
            UserMail: this.ruleFormCode.inputMail,
            Code: this.ruleFormCode.getCode
          }).then(res => {
            if (res.code == 0) {
              this.$message({
                message: "验证码正确",
                center: true,
                type: "success"
              });
              this.nextStep = false;
              this.activePwd = "second";
              this.resetPW = false;
            } else {
              this.$message({
                message: "验证码错误",
                center: true,
                type: "warning"
              });
              this.nextStep = true;
              this.resetPW = true;
              this.activePwd = "first";
            }
          });
        } else {
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          resetPwd({
            UserMail: this.ruleFormCode.inputMail,
            password: this.ruleFormPwd.passWordTwo
          }).then(res => {
            if (
              res.code == 0 &&
              this.ruleFormPwd.passWordOne == this.ruleFormPwd.passWordTwo
            ) {
              this.dialogVisible = true;
              this.centerDialogVisible = false;
            } else {
              this.$message({
                message: "两次密码不一致",
                center: true,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //设置coolie
    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
      console.log(d);
    },
    //coolie 读取存在
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    //点击注销coolie
    dropdown_name(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null) {
        this.setCookie("username", "", -1);
        this.setCookie("memberSign", "", -1);
        this.setCookie("UserVerifyCode", "", -1);
        this.setCookie("User_TureName", "", -1);
        this.setCookie("UserId", "", -1);
        this.setCookie("UserImg", "", -1);
        this.WechatLogin = false;
        this.headimgurl = true;
        alert("注销成功");
      }
    },
    //点击跳转到个人中心
    personalCenter() {
      this.$router.push({ name: "personalCenter", query: { id: "0" } });
    },
    //点击跳转到个人中心的问题反馈
    feedback() {
      this.dialogVisible = false;
      this.$router.push({ name: "personalCenter", query: { id: "2" } });
    },
    //从新加载二维码
    opacity_text() {
      this.opacity = true;
      this.get_msg(); //获取后台给的二维码
    },
    //账号密码传给后台
    send_msg(formName) {
      let that = this;
      if (that.ruleForm.userMail != "" && that.ruleForm.pwd != "") {
        login({
          userName: that.ruleForm.userMail,
          passWord: that.ruleForm.pwd
        }).then(response => {
          console.log(response);
          if (response.code == 0) {
            that.userTurename = response.data.userTurename;
            that.setCookie("username", response.data.username, 7); //用户邮箱
            that.setCookie("memberSign", response.data.memberSign, 7); //用户等级
            that.setCookie("UserVerifyCode", response.data.userRegistercode, 7); //用户检验码
            that.setCookie("User_TureName", response.data.userTurename, 7); //用户真实名字
            that.setCookie("UserId", response.data.id, 7); //用户ID
            that.setCookie("UserImg", response.data.userPortrait, 7);
            that.imgurl = response.data.userPortrait
            that.dialogVisible = false;
            that.WechatLogin = true;
            that.headimgurl = false;
          } else {
            that.dialogVisible = false;
            that.dialogVisible1 = true;
          }
        });
      }
    },
    //获取后台给的二维码
    get_msg() {
      let that = this;
      that.opacity = true;
      clearInterval(that.totalTimeName);
      clearInterval(that.sceneStrName);
      that.totalTime = 120;
      getQrcode({}).then(function(response) {
        console.log(response.data);
        that.imgCode = response.data.qrCode;
        that.sceneStr = response.data.scenStr;
        console.log(that.sceneStr);
        that.handleClick();
        that.loading=false
      });
    },
    //二维码倒计时
    time() {
      let that = this;
      that.totalTimeName = window.setInterval(() => {
        that.totalTime--;
        console.log(that.totalTime);
        if (that.totalTime <= 0) {
          that.opacity = false;
          clearInterval(that.totalTimeName);
          clearInterval(that.sceneStrName);
          that.totalTime = 120;
        }
      }, 1000);
    },
    //微信扫码登录轮询
    set_wx() {
      let that = this;
      that.sceneStrName = window.setInterval(() => {
        getCheckLogin({
          sceneStr: that.sceneStr
        })
          .then(function(response) {
            if (response.code == 0) {
              clearInterval(that.totalTimeName);
              clearInterval(that.sceneStrName);
              that.imgurl = response.data.headimgurl; //用户头像
              that.OpenId = response.data.openid; //用户微信ID
              console.log(that.OpenId + "用户微信ID");
              that.user_cx();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }, 3000);
    },
    //用户校验身份
    user_cx() {
      let that = this;
      weChatLogin({
        OpenId: that.OpenId
      })
        .then(function(response) {
          if (response.code == 0) {
            that.userTurename = response.data.userTurename;
            that.setCookie("username", response.data.username, 7); //用户邮箱
            that.setCookie("memberSign", response.data.memberSign, 7); //用户等级
            that.setCookie("UserVerifyCode", response.data.userRegistercode, 7); //用户检验码
            that.setCookie("User_TureName", response.data.userTurename, 7); //用户真实名字
            that.setCookie("UserId", response.data.id, 7);
            that.setCookie("UserImg", that.imgurl, 7);
            that.dialogVisible = false;
            that.WechatLogin = true;
            that.headimgurl = false;
          } else {
            that.dialogVisible = false;
            that.dialogVisible1 = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleClick() {
      if (this.activeName != "first") {
        clearInterval(this.totalTimeName);
        clearInterval(this.sceneStrName);
        this.totalTime = 120;
      }
      if (this.activeName == "first") {
        this.time();
        this.set_wx();
      }
    },
    // 微信绑定
    wechat() {
      wechatBind({
        UserName: this.bindMail,
        Password: this.bindPwd,
        OpenId: this.OpenId
      }).then(res => {
        if (res.code == 0) {
          this.user_cx();
          console.log("绑定成功");
          this.dialogVisible1 = false;
        } else {
          console.log("邮箱或密码错误");
        }
      });
    },
    // 点击绑定
    nowBind() {
      this.wechat();
    },
    nowRegister() {
      this.$router.push({ path: "./register" });
      this.dialogVisible = false;
      this.dialogVisible1 = false;
    }
  },
  watch: {
    dialogVisible: function() {
      let that = this;
      if (that.dialogVisible == false) {
        clearInterval(that.totalTimeName);
        clearInterval(that.sceneStrName);
      }
    },
    centerDialogVisible: function() {
      let that = this;
      if (that.centerDialogVisible == true) {
        this.dialogVisible = false;
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.forgetPwd .el-tab-pane .el-form {
  margin-top: 20px;
}
.forgetPwd .el-tab-pane .el-form .el-input {
  width: 250px !important;
  float: left;
}
.forgetPwd .el-tab-pane .el-form .el-button {
  float: right;
  width: 100px;
}
.pwdFooter .el-button {
  margin: 0 20px !important;
}
.el-dropdown-link {
  cursor: pointer;
  color: #eee;
  margin-left: 20px;
}
.el-dropdown {
  vertical-align: top;
}
/* 导航 */
.heads {
  position: fixed;
  top: 0px;
  width: 100%;
  min-width: 1200px;
  z-index: 999;
}
.opacity {
  width: 210px;
  height: 210px;
  position: absolute;
  left: 14px;
  background-color: #000;
  opacity: 0.6;
}
.opacity_text {
  position: absolute;
  text-align: center;
  color: #fff;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
}
.opacity_text p {
  margin-bottom: 20px;
  font-size: 18px;
}
.img_code {
  border: 1px solid #ddd;
  width: 210px;
  height: 210px;
  margin: 10px auto 20px;
  padding: 10px;
}
.headimgurl {
  height: 52px;
  margin-left: 200px;
  line-height: 52px;
}
.headimgurl:focus {
  outline: none;
}
.headimgurl img {
  width: 32px;
  height: 32px;
  margin: 10px auto;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
}
.headimgurl .userTurename {
  display: inline-block;
  color: #fff;
  vertical-align: top;
  margin-left: 10px;
  cursor: pointer;
}
.el-dialog--center .el-dialog__body {
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 35px;
  padding-bottom: 80px;
}
.el-dialog__body {
  height: 15%;
}
.el-dialog__header {
  padding: 0%;
}
#qr_code {
  display: block;
  height: 100%;
  width: 100%;
}
.span_text {
  text-align: center;
  font-size: 14px;
}
.login {
  width: 100%;
}
#pane-first {
  width: 100%;
  height: 100%;
}
#el-form-item__lable {
  float: left;
}
.el-dialog--center .el-dialog__body {
  text-align: center;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #409eff;
  color: #909399;
}
.el-form-item__label {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 20px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-dialog--center {
  border-radius: 15px;
}
.el-menu-item {
  font-size: 16px;
}
.el-dialog__headerbtn {
  top: 10px;
  right: 13px;
}
.el-menu {
  justify-content: center;
}
.el-dialog--center .el-dialog__body {
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 35px;
  padding-bottom: 5px;
}
.el-loading-spinner {
  top: 43%;
  margin-top: -21px;
  width: 106%;
  text-align: center;
  position: absolute;
}
.el-input__inner {
  margin-bottom: 20px;
}

.el-button--text {
  color: rgb(169, 169, 169);
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
  margin: 9px;
}
.el-dialog .el-dialog--center {
  width: 320px;
  height: 350px;
}
.a_color {
  color: #409eff;
  text-decoration: none;
}
.a_color:hover {
  color: rgb(136, 173, 230);
}
.el-menu.el-menu--horizontal {
  background: rgb(33, 80, 137);
}
.login_btn {
  margin-left: 200px;
  margin-top: 9px;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
  display: flex;
}
.el-button.is-round {
  background-color: #eee;
  color: #6e6e6e;
  border-radius: 20px;
  padding: 8px 25px;
}
.el-button.is-round:hover {
  color: #fff;
  background: #3a74b5;
}
.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 50px;
  line-height: 50px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: #909399;
  color: #ffffff;
}
ul.el-menu-demo.el-menu--horizontal.el-menu {
  padding-bottom: 2px;
}
.bindBox {
  text-align: center;
}
.bindBox h4 {
  margin-top: 10px;
}
.bindBox .el-input {
  width: 250px;
}
.bindBox img {
  height: 100px;
  margin: 0 auto;
}
.bindBox p.mail,
.bindBox p.password {
  position: relative;
  left: -88px;
  margin: 20px 0 10px;
  font-size: 18px;
  letter-spacing: 5px;
}
.bindBox p.mail {
  margin-top: 40px;
}
.bindBox p i {
  margin: 0 5px;
  font-size: 18px;
}
.bindBox button {
  margin: 40px 0 20px;
  padding: 10px 90px;
  font-size: 16px;
}
.bindBox p span {
  margin: 5px 15px 15px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
}
</style>
