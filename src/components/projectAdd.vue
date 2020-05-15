<template>
    <div>
        <div class="addBox">
        <h2>发布项目信息</h2>
        <div class="basic">
            <h4>项目信息</h4>
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                :inline="true"
                class="demo-ruleForm"
            >
            <el-form-item label="项目名称" prop="subjectName">
                <el-input v-model="ruleForm.subjectName"></el-input>
            </el-form-item>
            <el-form-item label="发布单位" prop="company">
                    <el-input v-model="ruleForm.company"></el-input>
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
            <el-form-item label="项目标签" prop="companyLabel">
                <el-checkbox-group v-model="ruleForm.companyLabel" class="type">
                <el-checkbox label="投资" name="type"></el-checkbox>
                <el-checkbox label="场地" name="type"></el-checkbox>
                <el-checkbox label="运营团队" name="type"></el-checkbox>
                <el-checkbox label="投建" name="type"></el-checkbox>
                <el-checkbox label="人才培训" name="type"></el-checkbox>
                <el-checkbox label="课程设计" name="type"></el-checkbox>
                <el-checkbox label="市场调研" name="type"></el-checkbox>
                <el-checkbox label="品牌推广" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="联系人" prop="contactName">
                <el-input v-model="ruleForm.contactName"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="contactPhone">
                <el-input v-model="ruleForm.contactPhone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="contactMail">
                <el-input v-model="ruleForm.contactMail"></el-input>
            </el-form-item>
            <el-form-item label="项目简介" prop="introduce">
                <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
            </el-form-item>
            <el-form-item label="详细信息" prop="message">
                <el-input type="textarea" v-model="ruleForm.message"></el-input>
            </el-form-item>
            <el-form-item label="项目要求" prop="remark">
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
import schoolFooter from './schoolFooter'
import { regionData } from "element-china-area-data";
import {projectAdd} from '@/api/api'
import { setTimeout } from 'timers';
export default {
    components:{
        schoolFooter
    },
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
            options: regionData,
            ruleForm: {
                subjectName: "",
                company: "",
                address: [],
                detailAddress: "",
                companyLabel: [],
                desc: "",
                contactName: "",
                contactPhone: "",
                contactMail: "",
                introduce: "",
                message: "",
                remark: ""
            },
            rules: {
                subjectName: [
                    { required: true, message: "项目名称不能为空", trigger: "blur" }
                ],
                address: [
                    { required: true, message: "请选择地址", trigger: "blur" }
                ],
                detailAddress: [
                    { required: true, message: "请完善详细地址", trigger: "blur" }
                ],
                contactPhone: [
                    { required: true, validator: checkPhone, trigger: "blur" }
                ],
                contactMail:[
                    { required: true, message: "请输入邮箱地址", trigger: "blur" },
                    { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"]}
                ],
                companyLabel: [
                    {type: "array", required: true, message: "请至少选择一个项目标签", trigger: "change" }
                ]
            },
        }
    },
    methods:{
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
        submit(formName) {
            this.labelSplice = this.ruleForm.companyLabel.slice(
                0,
                this.ruleForm.companyLabel.length
            );
            this.labelJoin = this.labelSplice.join(",");
            this.$refs[formName].validate(valid => {
                if (valid) {
                    projectAdd({
                        subjectname: this.ruleForm.subjectName,
                        company:this.ruleForm.company,
                        areas: this.thisAreaCode[0],
                        areas02: this.thisAreaCode[2],
                        areas03: this.ruleForm.detailAddress,
                        subjectlabel: this.labelJoin,
                        name: this.ruleForm.contactName,
                        phone: this.ruleForm.contactPhone,
                        mail: this.ruleForm.contactMail,
                        subjectintroduction: this.ruleForm.introduce,
                        detailinstitution: this.ruleForm.message,
                        requirement: this.ruleForm.remark,
                        usermail: this.getCookie("username"),
                        subjectLogo:"0",
                        subjectShow:"0",
                    }).then(res => {
                        if (res.code == 0) {
                            this.$message({
                                message: "项目发布成功，请等待管理员审核",
                                type: "success"
                            });
                            setTimeout(() => {
                                this.$router.push('/project');
                             }, 1000);
                        }
                    });
                } else {
                    return false;
                }
            });
        }
    }

}
</script>

<style lang="less">
.addBox {
    width: 1000px;
    border: 1px solid #ccc;
    margin: 0 auto 20px;
    h2 {
        text-align: center;
        margin: 20px 0;
    }
    .basic{
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
