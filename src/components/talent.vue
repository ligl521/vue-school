<template>
  <div style="background: #f5f5f5;">
    <div class="schoolTalent">
      <!-- 搜索栏 -->
      <div class="companyBox">
        <div class="companyGroup">
          <div class="searchBox">
            <el-autocomplete
              placeholder="请输入内容"
              v-model="state"
              @keyup.enter.native="searchCompany"
              :trigger-on-focus="false"
            >
              <el-button @click="searchCompany" slot="append"
                ><i class="iconfont icon-sousuo"></i
              ></el-button>
            </el-autocomplete>
          </div>
          <p class="homeBannerP"  >
            <span class="search">热门搜索：</span>
            <span @click="homeBannerP(1,'英语老师')">英语老师</span>
            <span @click="homeBannerP(1,'数学老师')">数学老师</span>
            <span @click="homeBannerP(1,'升学指导')">升学指导</span>
            <span @click="homeBannerP(1,'人事经理')">人事经理</span>
            <span @click="homeBannerP(1,'园长')">园长</span>
          </p>
        </div>
        <div class="companyku">
          <p>加入教育人才库</p>
          <p @click="personnel">马上加入</p>
        </div>
      </div>
      <!-- 数据列表 -->
      <div class="schoolTalent_list">
        <div class="list" v-for="(item,index) in list_arr" :key="index">
          <div class="list_left">
            <img
              :src="item.avatar=='0'?'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png':item.avatar"
              alt=""
            />
            <p>
              期望年薪：{{
                item.salary == ""|| item.salary== '0' ? "面议" : item.salary
              }}
            </p>
          </div>
          <div class="list_Middle">
            <p>
              <span class="list_Middle_name" @click="details(item.id)">{{
                item.username == "" ||item.username=="0" ? "无" : item.username
              }}</span>
              <span style="margin-left:16px" v-for="tag in item.tag">
               <el-tag style="vertical-align:text-bottom" size="small" type="success">{{tag}}</el-tag>
              </span>
            </p>
            <p>
              <span>{{
                item.expectedWork == ""||item.expectedWork=="0" ? "无" : item.expectedWork
              }}</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;<span>{{ item.expreience==""||item.expreience=="0"?"无": item.expreience}}</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;<span>{{ item.highEducation==""||item.highEducation=="0"?"无": item.highEducation}}</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <span
                >入职时间：{{
                  item.entryTime == "" ? "无" : item.entryTime
                }}</span
              >
            </p>
            <p>
              期望职位：<span>{{
                item.position == "" || item.position=="0" ? "无" : item.position
              }}</span>
            </p>
            <p>
              现工作地点：{{ item.workplace == ""|| item.workplace=="0" ? "无" : item.workplace }}
            </p>
          </div>
          <div class="list_right">
            <p>
              工作经历：<span v-for="(workExperience,index) in item.workExperience" v-if="index<2" :key="index">
               <br>{{workExperience.company == ""||workExperience.company=="0" ? "无" : workExperience.company }} 
               {{workExperience.jobType == ""||workExperience.jobType=="0" ? "无" : workExperience.jobType}}
              </span>
              <br>
              毕业院校：<span v-for="(education,index) in item.education" v-if="index<2" :key="index">
               <br>{{education.schoolName == "" ||education.schoolName=="0" ? "无" : education.schoolName }} 
               {{education.schoolMajor== "" ||education.schoolMajor=="0" ? "无" : education.schoolMajor}}
              </span>
            </p>
          </div>
          <div @click="details(item.id)" class="details">
            <i class="el-icon-right"></i>
          </div>
        </div>
      </div>
      <!-- 页数 -->
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="list_count"
      >
      </el-pagination>
      <schoolFooter />
    </div>
  </div>
</template>

<script>
import schoolFooter from "./schoolFooter";
import { talentlist } from "@/api/api";
export default {
  data() {
    return {
      restaurants: [],
      state: "",
      timeout: null,
      list_arr: [], //渲染数组
      list_count: 0, //总条数只能是数字
    };
  },
  created() {
    this.list_num();
  },
  methods: {
    handleCurrentChange(val) {
      this.list_num(val);
    },
    list_num(num,name) {
      talentlist({
        pageNum: num,
        pageSize: "10",
        searchKey: name,
      }).then(res => {
        this.list_count = res.data.total
        for (var i in res.data.list) {
           res.data.list[i].workExperience = JSON.parse(res.data.list[i].workExperience);
           res.data.list[i].education = JSON.parse(res.data.list[i].education);
           res.data.list[i].tag = JSON.parse(res.data.list[i].tag);
           this.list_arr = res.data.list;
        }
        console.log(res.data.list)
      });
    },
    details(e) {
      if (this.getCookie("username") == null) {
        this.$message({
          message: "您还没有登录，登陆后即可查看！",
          type: "warning"
        });
      } else {
        this.$router.push({ name: "talentDetails", query: { id: e } });
      }
    },
    //coolie 读取存在
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    personnel() {
      if (this.getCookie("username") == null) {
        this.$message({
          message: "您还没有登录，登陆后即可加入！",
          type: "warning"
        });
      } else {
        this.$router.push({ name: "personnel" });
      }
    },
    //搜索引擎
    searchCompany() {
      this.list_num(1, this.state);
    },
    homeBannerP(num,name){
      this.list_num(num, name); 
    }
  },
  components: {
    schoolFooter
  }
};
</script>
<style lang="less" scoped>
.el-tag.el-tag--success {
    background-color: #f0f9eb !important;
    border-color: #e1f3d8 !important;
    color: #67c23a !important;
    margin-left: 0 !important;
}
.schoolTalent {
  text-align: center;
  // 头部css
  .top {
    padding-top: 20px;
  }
  // 搜索按钮css
  .searchBox {
    display: inline-block;
    margin: 20px 0;
    .btn_left {
      text-align: left;
    }
    .el-input {
      margin-top: 5px;
      width: 450px;
      i {
        font-size: 40px;
        color: #fff;
      }
    }
    .search {
      font-size: 26px;
      padding: 10px 15px;
    }
  }
  //数据列表css
  .schoolTalent_list {
    margin: 0 auto;
    width: 1100px;
    .list {
      overflow: hidden;
      position: relative;
      z-index: 1;
      transition: all 0.5s;
      margin: 15px 0;
      background-color: #fff;
      border-radius: 8px;
      padding: 20px 15px;
      display: flex;
      .list_left {
        width: 20%;
        img {
          display: block;
          margin: 0 auto;
          width: 100px;
          height: 100px;
          border-radius: 50px;
          box-shadow: 0 0 6px #000;
          padding: 4px;
          border: 2px solid #f5f5f5;
        }
        p {
          display: block;
          margin: 0 auto;
          text-align: center;
          background: #215089;
          color: #fff;
          margin-top: 15px;
          padding: 5px 10px;
          border-radius: 15px;
          width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .list_Middle {
        width: 38%;
        margin-left: 10px;
        text-align: left;
        p {
          line-height: 36px;
          .list_Middle_name {
            font-size: 18px;
            color: rgb(33, 79, 136);
            cursor: pointer;
          }
        }
      }
      .list_right {
        width: 40%;
        margin-left: 10px;
        text-align: left;
        p {
          white:100%;
          height:145px;
          display:table-cell;
          vertical-align:middle;
          vertical-align: middle;
          line-height: 22px;
          color: #b1b1b1;
        }
        span{
            color:#000;
        }
      }
      .details {
        text-align: right;
        transform: translateY(-50%);
        position: absolute;
        bottom: -8%;
        right: -10%;
        z-index: 2;
        transition: all 0.5s;
        font-size: 60px;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
      }
    }
    .list:before {
      content: "";
      background: radial-gradient(
        circle at 23% 70%,
        rgba(33, 79, 136, 0.8),
        rgb(96, 143, 201) 30%
      );
      width: 50%;
      height: 150%;
      opacity: 0;
      transform: rotate(45deg);
      position: absolute;
      top: 96%;
      right: -50%;
      z-index: 1;
      transition: all 0.35s ease;
      cursor: pointer;
    }
    .list:hover:before {
      opacity: 1;
      right: -35%;
    }
    .list:hover .details {
      right: 1%;
    }
  }
}

.companyBox {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  .companyGroup {
    .searchBox {
      display: inline-block;
      margin-top: 50px;
      .el-autocomplete {
        width: 570px;
        i {
          font-size: 40px;
          color: #fff;
        }
      }
    }
    .homeBannerP{
        font-size: 14px;
        margin-top: 10px;
        text-align: left;
        .search{
          color: #a19c9c;
          margin:0;
        }
        .search:hover{
          color: #a19c9c;
        }
        span{
          margin:0 10px;
          cursor: pointer;
        }
        span:hover{
          color:#337ab7;
          text-decoration:underline
        }
    }
  }
  .companyku {
    width: 280px;
    height: 100px;
    border-radius: 10px;
    background-color: #eaf4ff;
    color: #215089;
    font-weight: bold;
    text-align: center;
    margin: 50px 0 0 70px;
    &:hover {
      cursor: pointer;
    }
    p:first-of-type {
      padding-top: 20px;
      font-size: 20px;
      color: #215089;
      font-weight: bold;
      letter-spacing: 1px;
    }
    p:last-of-type {
      border-radius: 20px;
      padding: 8px 25px;
      margin-top: 10px;
      display: inline-block;
      background-color: #215089;
      color: #fff;
      transition: all 0.3s;
      letter-spacing: 1px;
    }
  }
}
</style>
<style>
.companyGroup .el-input__inner {
  height: 50px !important;
  border: 2px solid #214f89;
}
.companyGroup .el-input-group__append {
  border: 0;
  background: #214f89;
}
.el-autocomplete-suggestion{
  display:block;
}
</style>
