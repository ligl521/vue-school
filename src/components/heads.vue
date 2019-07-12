<template>
  <div class="heads">
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
      <el-menu-item index="/schoolku">教育机构库</el-menu-item>
      <el-menu-item index="4">教育人才库</el-menu-item>
      <el-menu-item index="5">项目数据库</el-menu-item>
      <el-menu-item index="6">数据可视化</el-menu-item>
      <el-button
        round
        class="login_btn"
        type="text"
        v-show="!WechatLogin"
        @click="dialogVisible = true;get_msg()"
      >登录</el-button>
      <div class="headimgurl" round v-show="!headimgurl">
        <img v-bind:src="imgurl" />
        <span>{{userTurename}}</span>
      </div>
      <!-- 点击触发登录dialog -->
    </el-menu>
    <el-dialog
      :visible.sync="dialogVisible"
      width="18%"
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
          <div class="img_code">
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
              <el-input v-model="ruleForm.userMail" prop="userMail" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input type="password" v-model="ruleForm.pwd" prop="pwd" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="send_msg('ruleForm')">登录</el-button>
            </el-form-item>
            <el-form-item style="margin-bottom:0">
              <span>
                <el-button type="text">
                  <a class="a_color" href="javascript:;">注册账号</a>
                </el-button>
                <!-- 注册账号 -->
                <el-button type="text">
                  <a class="a_color" href="javascript:;">忘记密码</a>
                </el-button>
                <!-- 忘记密码 -->
                <el-button type="text">
                  <a class="a_color" href="javascript:;">遇到问题</a>
                </el-button>
                <!--遇到问题 -->
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
        <p class="mail">
          <i class="iconfont icon-youxiang"></i>邮箱
        </p>
        <el-input v-model="bindMail" placeholder="请输入邮箱"></el-input>
        <p class="password">
          <i class="iconfont icon-mima"></i>密码
        </p>
        <el-input v-model="bindPwd" placeholder="请输入密码" show-password></el-input>
        <p>
          <el-button type="primary" @click="nowBind">立即绑定</el-button>
        </p>
        <p>
          <span>立即注册</span> |
          <span>忘记密码</span>
        </p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { constants } from "fs";
import { setTimeout, setInterval } from "timers";
import { wechatBind } from "@/api/api";
export default {
  data() {
    return {
      dialogVisible: false, //登录的弹框
      dialogVisible1: false, //扫码未绑定的弹框
      activeName: "first",
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
      bindPwd: "" //绑定的密码
    };
  },
  name: "App",
  created() {
    if (this.getCookie("username") != "") {
      this.userTurename =this.getCookie("User_TureName")
      this.WechatLogin = true;
      this.headimgurl = false;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //coolie 是否存在
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    //从新加载二维码
    opacity_text() {
      this.opacity = true;
      this.get_msg(); //获取后台给的二维码
    },
    //账号密码传给后台
    send_msg(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      let self = this;
      var params = new URLSearchParams();
      params.append("userName", self.ruleForm.userMail);
      params.append("passWord", self.ruleForm.pwd);
      if (params.userName != "" && params.passWord != "") {
        axios({
          method: "post",
          url: "http://192.168.0.28:8080/nsi-1.0/user/login.do",
          data: params
        }).then(function(respons) {
          if (respons.data.code == 0) {
            alert(respons.data.msg);
          } else {
            alert(respons.data.msg);
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
      axios({
        method: "post",
        url: "http://data.xinxueshuo.cn/nsi-1.0/user/get_qrcode.do"
      }).then(function(response) {
        that.imgCode = response.data.data.qrCode;
        that.sceneStr = response.data.data.scenStr;
        console.log(that.sceneStr);
        that.time();
        that.set_wx();
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
        axios
          .get(
            "http://data.xinxueshuo.cn/nsi-1.0/user/get_check_login.do?sceneStr=" +
              that.sceneStr
          )
          .then(function(response) {
            if (response.data.code == 0) {
              clearInterval(that.totalTimeName);
              clearInterval(that.sceneStrName);
              that.imgurl = response.data.data.headimgurl; //用户头像
              that.OpenId = response.data.data.openid; //用户微信ID
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
      axios
        .get(
          "http://data.xinxueshuo.cn/nsi-1.0/user/WechatLogin.do?OpenId=" +
            that.OpenId
        )
        .then(function(response) {
          console.log(response.data);
          if (response.data.code == 0) {
            that.userTurename = response.data.data.userTurename;
            document.cookie = "username=" + response.data.data.username; //用户邮箱
            document.cookie = "memberSign=" + response.data.data.memberSign; //用户等级
            document.cookie =
              "UserVerifyCode=" + response.data.data.userRegistercode; //用户检验码
            document.cookie =
              "User_TureName=" + response.data.data.userTurename; //用户真实名字
            document.cookie = "UserId=" + response.data.data.id; //用户ID
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

    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 微信绑定
    wechat() {
      wechatBind({
        UserName: this.bindMail,
        Password: this.bindPwd,
        OpenId: this.OpenId
      }).then(res => {
        if (res.code == 0) {
          console.log("绑定成功");
          this.dialogVisible1 = false;
          this.user_cx();
        } else {
          console.log("邮箱或密码错误");
        }
      });
    },
    // 点击绑定
    nowBind() {
      this.wechat();
    }
  },
  watch: {
    dialogVisible: function() {
      let that = this;
      if (that.dialogVisible == false) {
        clearInterval(that.totalTimeName);
      }
    }
  }
};
</script>
<style scoped>
@media (max-width: 768px) {
  .heads {
    display: none;
  }
  #app {
    margin-top: -52px;
  }
}
/* 导航 */
.heads {
  position: fixed;
  top: 0px;
  width: 100%;
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
.headimgurl img {
  width: 32px;
  height: 32px;
  margin: 10px auto;
  border-radius: 50%;
}
.headimgurl span {
  display: inline-block;
  color: #fff;
  vertical-align: top;
  margin-left: 10px;
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

.el-button {
  margin: 5px auto;
}
.el-button--primary {
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
  color: rgb(46, 130, 255);
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
