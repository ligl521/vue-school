<template>
  <div style="background: #f5f5f5;">
    <div class="talentDetails">
      <div class="top">
        <div class="top_left">
          <h2>{{ name==""||name=="0"?"":name }}</h2>
          <p>
            <span>{{ sex==""||sex=="0"?"无":sex}}</span
            ><span>{{ education==""||education=="0"?"无":education }}</span
            ><span>{{ workYear==""||workYear=="0"?"无":workYear }} 年</span>
          </p>
        </div>
        <div class="top_right">
          <img
            :src="avatar=='0'?'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png':avatar"
            alt=""
          />
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 期望职位 -->
      <div class="title">
        <div class="title_name">
          <el-divider direction="vertical"></el-divider><span>期望职位</span>
        </div>
        <p>
          <span>{{ expectWorkPosition==""||expectWorkPosition=="0"?"无":expectWorkPosition }}</span
          ><span>{{ expectWorkPlace==""||expectWorkPlace=="0"?"无":expectWorkPlace }}</span
          ><span>{{ expectSalary==""||expectSalary=="0"?"面议":expectSalary }}</span>
        </p>
      </div>
      <el-divider></el-divider>
      <!-- 工作经历 -->
      <div class="experience">
        <div class="experience_name title_name">
          <el-divider direction="vertical"></el-divider><span>工作经历</span>
        </div>
        <p v-for="item in workExperience">
          <span class="experience_one">{{ item.company==""||item.company=="0"?"无":item.company}}</span>
          <span class="experience_tow">{{ item.jobType==""||item.jobType=="0"?"":item.jobType }}</span>
          <span class="experience_three">{{ item.date[0]==""||item.date[0]=="0"?"":item.date[0]}}</span>
          <br />
          <span>{{ item.textarea==""||item.textarea=="0"?"":item.textarea }}</span>
        </p>
      </div>
      <el-divider></el-divider>
      <!-- 教育背景 -->
      <div class="educational">
        <div class="title_name">
          <el-divider direction="vertical"></el-divider><span>教育背景</span>
        </div>
        <p v-for="item in educationBackground">
          <span class="educational_one">{{ item.schoolName==""||item.schoolName=="0"?"无":item.schoolName  }}</span
          ><span>{{ item.schoolMajor==""||item.schoolMajor=="0"?"":item.schoolMajor }}</span
          ><span class="educational_tow">{{ item.schoolDate[0]==""||item.schoolDate[0]=="0"?"":item.schoolDate[0] }}</span>
        </p>
      </div>
      <el-divider></el-divider>
      <!-- 培训经历 -->
      <div class="educational">
        <div class="title_name">
          <el-divider direction="vertical"></el-divider><span>培训经历</span>
        </div>
        <p v-for="item in training">
          <span class="educational_one">{{ item.trainName==""||item.trainName=="0"?"无":item.trainName }}</span>
          <span class="educational_tow">{{ item.trainDate[0]==""||item.trainDate[0]=="0"?"":item.trainDate[0] }}</span>
          <br />
          <span>{{ item.trainTextarea==""||item.trainTextarea=="0"?"":item.trainTextarea }}</span>
        </p>
      </div>
      <el-divider></el-divider>
      <!-- 其他要求 -->
      <div class="educational">
        <div class="title_name">
          <el-divider direction="vertical"></el-divider><span>其他要求</span>
        </div>
        <p class="other">
          <span>{{other==""||other=="0"?"无":other}}</span>
        </p>
      </div>
      <el-divider></el-divider>
      <!-- 联系方式 -->
      <div class="contact">
        <div class="contact_name">
          <el-divider direction="vertical"></el-divider>
          <div>
            <p class="contact_mode">联系方式</p>
            <p class="contact_people">联系人：新学说-小新</p>
            <p class="contact_phone">电话：15010927730</p>
            <p class="contact_email">邮箱：zhoujing@xinxueshuo.cn</p>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
    <schoolFooter />
  </div>
</template>

<script>
import schoolFooter from "./schoolFooter";
import { talentdetail } from "@/api/api";
export default {
  data() {
    return {
      avatar:"",//头像
      name: "", //名字
      education: "", //学历
      workYear: "", //工作年限
      sex: "", //性别
      expectWorkPlace: "", //工作地点
      expectWorkPosition: "", //期望工作
      expectSalary: "", //期望年薪
      educationBackground: [], //教育背景
      workExperience: [],//工作经历
      training:[],//培训经历
      other:''//其他要求
    };
  },
  created() {
    this.talentDetails(this.$route.query.id);
  },
  methods: {
    talentDetails(id) {
      talentdetail({
        talentId: id
      }).then(res => {
        console.log(res.data);
        this.avatar = res.data.avatar; //头像
        this.name = res.data.username; //名字
        this.education = res.data.highEducation; //学历
        this.workYear = res.data.expreience; //工作年限
        this.sex = res.data.sex; //性别
        this.expectWorkPlace = res.data.expectedWork; //工作地点
        this.expectWorkPosition = res.data.position; //期望工作
        this.expectSalary = res.data.salary; //期望年薪
        this.other = res.data.other; //期望年薪
        this.educationBackground = JSON.parse(res.data.education); //教育背景
        this.workExperience = JSON.parse(res.data.workExperience); //工作经历
        this.training = JSON.parse(res.data.training) //培训经历
      });
    },
    //时间戳转换
    formatDateTime(inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-'+ m + '-' + d 
    },
  },
  components: {
    schoolFooter
  }
};
</script>
<style lang="less" scoped>
// 通用的css
.title_name {
  font-size: 22px;
  vertical-align: top;
  .el-divider {
    background-color: #215089;
    margin-top: -2px;
    width: 4px;
  }
  span {
    vertical-align: text-bottom;
  }
}

.talentDetails {
  width: 1000px;
  background-color: #fff;
  margin: 0 auto;
  padding: 40px;
  .top {
    display: flex;
    .top_left {
      padding-top: 20px;
      width: 80%;
      h2 {
        margin-bottom: 30px;
      }
      p {
        padding: 0 40px;
        font-size: 16px;
        span {
          display: inline-block;
          padding: 0 40px;
          border-right: 1px solid #ddd;
        }
        span:first-child {
          padding: 0 40px 0 0;
        }
        span:last-child {
          border-right: none;
        }
      }
    }
    .top_right {
      width: 20%;
      text-align: right;
      margin-right: 40px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
  }
  .title {
    p {
      padding: 30px 20px 10px 0;
      font-size: 16px;
      span {
        display: inline-block;
        padding: 0 40px;
        border-right: 1px solid #ddd;
      }
      span:last-child {
        border-right: none;
      }
    }
  }
  .experience {
    p {
      padding: 30px 40px 10px;
      line-height: 30px;
      .experience_one {
        font-weight: 700;
        font-size: 18px;
        margin-right: 40px;
      }
      .experience_tow {
        font-weight: 700;
      }
      .experience_three {
        font-weight: 700;
        margin-left: 40px;
        color: #9fa3b0;
      }
    }
  }
  .educational {
    .other{
        font-size: 18px;
        font-weight: 700;
    }
    p {
      padding: 30px 40px 10px;
      line-height: 30px;
      .educational_one {
        font-weight: 700;
        font-size: 18px;
        margin-right: 40px;
      }
      .educational_tow {
        float: right;
        font-weight: 700;
        color: #9fa3b0;
      }
      
    }
    
  }
  .contact {
    .contact_name {
      display: flex;
      .el-divider {
        background-color: #215089;
        margin-top: -2px;
        width: 6px;
        height: 130px;
      }
      p {
        padding: 0 20px 20px;
        font-size: 16px;
      }
      .contact_mode {
        font-size: 18px;
        font-weight: 700;
        color: #215089;
      }
    }
  }
}
</style>
