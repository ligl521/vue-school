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
      <el-button round class="login_btn" type="text" @click="dialogVisible = true;get_msg()">登录</el-button>
      <!-- 点击触发登录dialog -->
    </el-menu>
    <el-dialog
      :visible.sync="dialogVisible"
      width="17%"
      center
      :modal-append-to-body="true"
      :append-to-body="true"
    >
      <el-tabs stretch v-model="activeName" @tab-click="handleClick">
        <!-- 二维码登录 -->
        <el-tab-pane label="扫码登录" name="first">
          <span>
            <img id="qr_code" src />
            <p class="span_text"></p>
          </span>
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
              <span>
                <el-button type="text">注册账号</el-button>
                <!-- 注册账号 -->
                <el-button type="text">忘记密码</el-button>
                <!-- 忘记密码 -->
                <el-button type="text">遇到问题?</el-button>
                <!--遇到问题 -->
              </span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { constants } from "fs";
import { setTimeout, setInterval } from "timers";
export default {
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
      ruleForm: {
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
      defaultUrl: "./"
    };
  },
  name: "App",
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
      axios({
        method: "post",
        url: "http://data.xinxueshuo.cn/nsi-1.0/user/get_qrcode.do"
      }).then(function(response) {
        document.getElementById("qr_code").src = response.data.data.qrCode;
        var sceneStr = response.data.data.scenStr;
        console.log(sceneStr);
        //微信扫码登录轮询
        //倒计时
        var totalTime = 120;
        let clock = window.setInterval(() => {
          totalTime--;
          console.log(totalTime);
          if (totalTime <= 0) {
            window.clearInterval(clock);
            console.log($(".span_text").html("二维码已失效，请从新打开二维码"));
            window.clearInterval(t1);
            totalTime = 120;
          }
        }, 1000);
        var t1 = window.setInterval(() => {
          axios
            .get(
              "http://data.xinxueshuo.cn/nsi-1.0/user/get_check_login.do?sceneStr=" +
                sceneStr
            )
            .then(function(response) {
              console.log(response.data);
              if (response.data.code == 0) {
                window.clearInterval(t1);
                window.clearInterval(clock);
                console.log(response.data.data.headimgurl); //用户头像
                var OpenId = response.data.data.openid;//用户微信ID
                axios
                  .get(
                    "http://data.xinxueshuo.cn/nsi-1.0/user/WechatLogin.do?OpenId=" +
                      OpenId
                  )
                  .then(function(response) {
                    console.log(response.data);
                    if (response.data.code == 0) {
                      document.cookie="username="+response.data.data.username;//用户邮箱
                      document.cookie="memberSign="+response.data.data.memberSign;//用户等级
                      document.cookie="UserVerifyCode="+response.data.data.userRegistercode;//用户检验码
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }, 3000);
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
  display: center;
  margin-left: 12px;
  margin-bottom: 36px;
  height: 200px;
  width: 200px;
  margin-top: 15px;
}
.el-button {
  margin: 5px auto;
}
.el-button--primary {
  padding: 8px 87px;
}
#pane-first {
  display: flex;
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
form {
  display: block;
  margin: 10px;
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
.el-input {
  width: 200px;
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
  background-color: beige;
  border-radius: 20px;
  padding: 8px 25px;
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
</style>
