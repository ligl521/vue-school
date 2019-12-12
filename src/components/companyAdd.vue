<template>
  <div>
    <div class="addBox">
      <h2>新增机构数据</h2>
      <div class="first">
        <h4>基本信息</h4>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          :inline="true"
          class="demo-ruleForm"
        >
          <el-form-item label="机构名称" prop="name">
            <el-input v-model="ruleForm.name" @blur="checkRepeat"></el-input>
          </el-form-item>
          <el-form-item label="成立时间" prop="time">
            <el-input v-model="ruleForm.time"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" prop="address">
            <el-cascader
              size="large"
              :options="options"
              v-model="ruleForm.address"
              @change="handleChange"
              ref="cascaderAddr"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="detailAddress">
            <el-input v-model="ruleForm.detailAddress"></el-input>
          </el-form-item>
          <el-form-item label="机构类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择机构类型">
              <el-option label="教育集团" value="教育集团"></el-option>
              <el-option label="投资机构" value="投资机构"></el-option>
              <el-option label="服务商" value="服务商"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构官网" prop="website">
            <el-input v-model="ruleForm.website"></el-input>
          </el-form-item>
          <el-form-item label="机构标签" prop="companyLabel">
            <el-checkbox-group v-model="ruleForm.companyLabel" class="type">
              <el-checkbox label="课程服务" name="type"></el-checkbox>
              <el-checkbox label="艺术教育" name="type"></el-checkbox>
              <el-checkbox label="留学咨询" name="type"></el-checkbox>
              <el-checkbox label="营地" name="type"></el-checkbox>
              <el-checkbox label="教材" name="type"></el-checkbox>
              <el-checkbox label="职业体验" name="type"></el-checkbox>
              <el-checkbox label="体育" name="type"></el-checkbox>
              <el-checkbox label="投资" name="type"></el-checkbox>
              <el-checkbox label="校车" name="type"></el-checkbox>
              <el-checkbox label="校服" name="type"></el-checkbox>
              <el-checkbox label="保洁" name="type"></el-checkbox>
              <el-checkbox label="餐饮服务" name="type"></el-checkbox>
              <el-checkbox label="保险" name="type"></el-checkbox>
              <el-checkbox label="课后培训" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="服务简介" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-divider></el-divider>
          <h4>联系方式</h4>
          <el-form-item label="个人姓名" prop="contactName">
            <el-input v-model="ruleForm.contactName"></el-input>
          </el-form-item>
          <el-form-item label="个人职位" prop="contactPost">
            <el-input v-model="ruleForm.contactPost"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="contactPhone">
            <el-input v-model="ruleForm.contactPhone"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱" prop="contactMail">
            <el-input v-model="ruleForm.contactMail"></el-input>
          </el-form-item>
          <el-divider></el-divider>
          <h4>详情&备注</h4>
          <el-form-item label="投资信息" prop="message">
            <el-input v-model="ruleForm.message"></el-input>
          </el-form-item>
          <el-form-item label="过往服务学校" prop="servedschool">
            <el-input v-model="ruleForm.servedschool"></el-input>
          </el-form-item>
          <el-form-item label="详细介绍" prop="introduce">
            <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
          </el-form-item>
          <el-form-item label="特别备注" prop="remark">
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button @click="submit('ruleForm')">提交</el-button>
      </div>
    </div>
    <schoolFooter />
  </div>
</template>

<script>
import { checkName, companyAdd } from "@/api/api";
import { regionData } from "element-china-area-data";
import schoolFooter from "./schoolFooter";
export default {
  components: {
    schoolFooter
  },
  data() {
    return {
      options: regionData,
      thisAreaCode: "",
      ruleForm: {
        name: "",
        time: "",
        type: "",
        website: "",
        address: [],
        detailAddress: "",
        companyLabel: [],
        desc: "",
        contactName: "",
        contactPost: "",
        contactPhone: "",
        contactMail: "",
        servedschool: "",
        introduce: "",
        message: "",
        remark: ""
      },
      rules: {
        name: [
          { required: true, message: "机构名称不能为空", trigger: "blur" }
        ],
        time: [
          {
            required: true,
            message: "请输入成立时间，不添加月份",
            trigger: "blur"
          },
          {
            min: 4,
            max: 4,
            message: "成立时间为4位,例如：2019",
            trigger: "change"
          }
        ],
        address: [{ required: true, message: "请选择地址", trigger: "blur" }],
        detailAddress: [
          { required: true, message: "请完善详细地址", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "服务描述不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择机构类型", trigger: "change" }
        ],
        website: [
          { required: true, message: "请输入机构官网", trigger: "blur" }
        ],
        companyLabel: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个机构标签",
            trigger: "change"
          }
        ]
      },
      labelSplice: "",
      labelJoin: ""
    };
  },
  methods: {
    handleChange(e, form, thisAreaCode) {
      this.thisAreaCode = this.$refs["cascaderAddr"].currentLabels;
    },
    //coolie 读取存在
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    checkRepeat() {
      checkName({
        InstitutionName: this.ruleForm.name
      }).then(res => {
        if (res.code == 1 && this.ruleForm.name !== "") {
          this.$message({
            message: "机构名已存在，请不要重复提交",
            type: "error",
            duration: 0,
            showClose: true
          });
        }
      });
    },
    submit(formName) {
      this.labelSplice = this.ruleForm.companyLabel.slice(
        0,
        this.ruleForm.companyLabel.length
      );
      this.labelJoin = this.labelSplice.join(",");
      this.$refs[formName].validate(valid => {
        if (valid) {
          companyAdd({
            name: this.ruleForm.name,
            foundedTime: this.ruleForm.time,
            areas: this.thisAreaCode[0],
            areas02: this.thisAreaCode[2],
            areas03: this.ruleForm.detailAddress,
            type: this.ruleForm.type,
            label: this.labelJoin,
            website: this.ruleForm.website,
            service: this.ruleForm.desc,
            contactposition: this.ruleForm.contactPost,
            contactname: this.ruleForm.contactName,
            contactphone: this.ruleForm.contactPhone,
            contactmail: this.ruleForm.contactMail,
            introduction: this.ruleForm.introduce,
            investment: this.ruleForm.message,
            remark: this.ruleForm.remark,
            servedschool: this.ruleForm.servedschool,
            loadPeople: this.getCookie("username"),
            batchinputSign: this.getCookie("usertitle")
          }).then(res => {
            if (res.code == 0) {
              this.$message({
                message: "数据提交成功，请等待管理员审核",
                type: "success"
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.addBox {
  width: 1000px;
  border: 1px solid #ccc;
  margin: 0 auto 20px;
  h2 {
    text-align: center;
    margin: 20px 0;
  }
  .first {
    width: 800px;
    margin: 0 auto;
    h4 {
      margin: 40px 0 20px;
    }
    .el-form-item {
      margin: 15px 40px;
      .el-cascader {
        width: 230px !important;
      }
      .el-select {
        width: 230px !important;
      }
      .el-form-item__content {
        .el-input {
          width: 230px !important;
        }
        .el-textarea {
          width: 500px;
        }
      }
      .type {
        width: 630px !important;
      }
    }
  }
  .second {
    width: 800px;
    margin: 0 auto;
    h4 {
      margin: 40px 0 20px;
      font-weight: bold;
      color: #4d4d4d;
    }
    .el-form-item {
      margin: 15px 40px;
      .el-form-item__content {
        .el-input {
          width: 230px !important;
        }
      }
    }
  }
  .third {
    width: 800px;
    margin: 0 auto;
    h4 {
      margin: 40px 0 20px;
    }
    .el-form-item {
      margin: 15px 40px;
      .el-form-item__content {
        .el-input {
          width: 230px !important;
        }
        .el-textarea {
          width: 500px;
        }
      }
    }
  }
  .submit {
    text-align: center;
    margin: 40px 0;
    .el-button {
      background: #214f89;
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>
