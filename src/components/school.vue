<template>
  <div id="container">
    <!-- <loding v-if="this.$store.state.loding"/> -->
    <div id="searchBar">
      <!-- 搜索学校 -->
      <el-autocomplete
        id="schoolInput"
        v-model="input"
        :fetch-suggestions="querySearch"
        placeholder="请输入学校关键字"
        :trigger-on-focus="false"
        @select="handleSelect"
        @keyup.enter.native="getschool"
      ></el-autocomplete>
      <el-button id="searchBtn" type="primary" icon="el-icon-search" @click="getschool"></el-button>
    </div>
    <!-- 切换按钮 -->
    <div class="toggleBut clearfix">
      <p>
        <span>
          <i
            class="iconfont icon-icontubiao"
            :class="chageIcon?'black':'blackTwo'"
            @click="toggleButLongitudinal"
          ></i>
        </span>
        <span>
          <i
            class="iconfont icon-gongneng"
            :class="chageIcon?'blackTwo':'black'"
            @click="toggleButTransverse"
          ></i>
        </span>
      </p>
    </div>
    <!-- 学校展示列表one -->
    <div class="schoolDetail" v-if="schoolDetail">
      <span id="search_res">{{this.no_school}}</span>
      <el-row :gutter="50" type="flex" style="flex-wrap:wrap">
        <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="3" v-for="(item,index) in schoolLists" :key="index">
            <div class="grid-content bg-purple">
              <div class="logoimg" v-if="item.schoolLogo? true:false">
                <img :src="schoolLogoUrlOne+item.schoolLogo" />
              </div>
              <div class="logoimg" v-if="item.schoolLogo? false:true">
                <img :src="schoolLogoUrlTwo" />
              </div>
              <ul>
                <!-- http://localhost:8080/#/schoolDetail02?id=101370 -->
                <li class="schoolName"> <a href="/#/schoolDetail02?id=101370">{{item.schoolName | ellipsisName}} </a></li>
                <!-- <li class="schoolName"> <a href="http://localhost:8080/#/schoolDetail02?id=101370">{{item.schoolName | ellipsisName}} </a></li> -->
                <li>学制：<span v-for="(v,i) in item.schoolSystem" :key="i">{{v}},</span></li>
                <li>课程：AP:美国课程</li>
              </ul>
            </div>
        </el-col>
      </el-row>
    </div>
    <!-- 学校展示列表two -->
    <div class="schoolDetailTwo" v-if="!schoolDetail">
      <div class="detailBox" v-for="(item,i) in schoolLists" :key="i">
        <div class="DeatailTwoLeft"><img :src='item.schoolLogo?schoolLogoUrlOne+item.schoolLogo:"http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png"' /></div>
        <div class="DeatailTwoCenter" id="DeatailTwoCenterId">
          <ul>
            <li>{{item.schoolName}}</li>
            <li>{{item.schoolEnglishname | ellipsisSchoolNameTwo}}</li>
            <li>类型：<span>{{item.schoolProperties}}</span><p>学制：<span v-for="(v,i) in item.schoolSystem" :key="i">{{v}}</span></p></li>
          </ul>
        </div>
        <div class="DeatailTwoRight">
          <ul>
            <li>认证：IBO CIE</li>
            <li>建校时间：{{item.loadTime}}</li>
            <li>{{item.areas03 | ellipsisAddress}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="block">
      <span class="demonstration"></span>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total_school"
      ></el-pagination>
    </div>
    <schoolFooter />
  </div>
</template>

<script>
//ajax请求
import axios from "axios";
import { getSchoolLibrary } from "@/api/api";
import loding from "@/components/loding";
import schoolFooter from "./schoolFooter";
import { isUndefined } from "util";
export default {
  data() {
    return {
      schoolDetail: true,
      input: "",
      schoolLists: [],
      currentPage: 1,
      pageSize: 24,
      pageNum: 1,
      total_school: 0,
      no_school: "",
      schools: [],
      timeout: null,
      chageIcon: false,
      lodingshow: true,
      lodinghide: false,
      isclick: true,
      schoolLogoUrlOne: "http://data.xinxueshuo.cn/",
      schoolLogoUrlTwo:
        "http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png"
    };
  },
  beforeCreate() {
    this.$store.commit("loding", true);
  },
  created() {
    this.input = this.$route.query.item;
    this.handleSelect();
  },
  methods: {
    querySearch(queryString, cb) {
      let that = this;
      let urldata = new URLSearchParams();
      urldata.append("keyword", that.input);
      axios
        .post(
          "http://data.xinxueshuo.cn/nsi-1.0/school/suggest_search.do",
          urldata
        )
        .then(function(respons) {
          var arr = [];
          for (var i = 0; i < respons.data.data.length; i++) {
            let a1 = {}; //创建对象
            a1.value = respons.data.data[i];
            arr.push(a1);
          }
          cb(arr);
        });
    },
    //搜索提示的点击操作
    handleSelect(item) {
      console.log(111);
      this.getschool();
    },
    getschool() {
      //获取学校List数据(包括学校搜索)
      getSchoolLibrary({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        searchKey: this.input
      }).then(respons => {
        this.$store.commit("loding", false);
        let that = this;
        that.schoolLists = respons.data.list;
        that.total_school = respons.data.total;
        //判断有无搜索结果
        that.total_school == 0
          ? (that.no_school = "未搜索到结果，请重新输入关键字！")
          : (that.no_school = "");
        window.scrollTo(0, 0);
        //截取 幼 小 中 高
        for (var i = 0; i < respons.data.list.length; i++) {
          var str = respons.data.list[i].schoolSystem;
          var arr1 = str.split("；");
          var arr2 = arr1.slice(0, arr1.length - 1);
          var arr3 = [];
          for (var j = 0; j < arr2.length; j++) {
            arr3.push(arr1[j].slice(0, 1));
          }
          // respons.data.list[i].schoolSystems
          that.schoolLists[i].schoolSystem = arr3;
        }

        //截取时间
        var CutTime = [];
        for (var i = 0; i < respons.data.list.length; i++) {
          var str = respons.data.list[i].loadTime.substring(0, 10);
          CutTime.push(str);
          respons.data.list[i].loadTime = CutTime[i];
        }
        //截取 学校 类型 民办
        var CutSchoolType = [];
        for(var i=0;i < respons.data.list.length; i++){
          var str = respons.data.list[i].schoolProperties.substring(0, 1);
          CutSchoolType.push(str);
          respons.data.list[i].schoolProperties = CutSchoolType[i];
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //分页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getschool(sessionStorage.getItem("iptVal"));
      // window.scrollTo(0,0)
    },
    //切换学校列表
    toggleButTransverse: function() {
      this.schoolDetail = false;
      this.chageIcon = true;
    },
    toggleButLongitudinal: function() {
      this.schoolDetail = true;
      this.chageIcon = false;
    }
  },
  components: {
    loding,
    schoolFooter
  },

  mounted() {},

  beforeDestroy() {
    // this.bus.$off('em',this.em);
  },
  //学校过滤超出显示...
  filters: {
    ellipsisName(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10) + "...";
      }
      return value;
    },
    //学校地址
    ellipsisAddress(value){
      if(!value) return "";
      if(value.length > 10){
        return value.slice(0,10) + "...";
      }
      return value
    },
    //学校姓名
    ellipsisSchoolNameTwo(value){
      if(!value) return "";
      if(value.length > 100){
        return value.slice(0,100) + "...";
      }
      return value
    }
  }
};
</script>
<style lang="less" scoped type="text/less">
#container{
  background: #f5f5f5;
}
#search_res {
  display: flex;
  justify-content: center;
}
.el-button {
  border-radius: 0px;
}
.el-input__inner {
  border-radius: 0px;
}
#searchBar {
  padding-top: 25px;
  text-align: center;
}
#schoolInput {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 200%;
  margin-left: -200px;
}
.school_infomation {
  line-height: 25px;
  margin-top: 10px;
}
#searchBtn {
  padding: 12px 25px;
  margin-left: -5px;
}
.schoolDetail {
  width: 94%;
  margin: 0 auto;
}
.schoolList {
  border-radius: 10px;
  background-color: white;
  display: flex;
  width: 80%;
  margin: auto;
  height: 150px;
  align-items: center;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.schoolList:hover {
  box-shadow: 0px 0px 1px 1px rgb(169, 169, 169);
}
.el-button--primary {
  background: rgb(33, 80, 137);
  border-color: rgb(33, 80, 137);
}
.school_info {
  display: block;
  margin-top: 5px;
}
.school_right {
  /* flex: 1; */
  text-align: center;
}
.school_right_info {
  display: block;
  margin-top: 5px;
}
.el-pagination {
  text-align: center;
  margin-top: 50px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-top: 30px; /* margin-left: 5px; */
  text-align: center;
  // height: 2.6rem;
  border: 1px solid #ccc;
  background: #fff;
}
.black {
  color: #777;
}
.blackTwo {
  color: #214f89;
}
.grid-content:hover {
  box-shadow: 0px 0px 15px #ccc;
}
.grid-content ul {
  margin-top: 10px;
  margin-bottom: 20px;
  line-height: 30px;
  color: #777;
}
.grid-content ul li:first-of-type {
  font-size: 15px;
  font-weight: 600;
  color: #000;
}
.logoimg {
  position: relative;
  height: 1.3rem;
}
.logoimg img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
}
.schoolList {
  border-radius: 10px;
  border: 1px solid gray;
  background-color: white;
  display: flex;
  width: 1168px;
  margin: auto;
  height: 150px;
  align-items: center;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.schoolList:hover {
  box-shadow: 0px 0px 1px 1px rgb(169, 169, 169);
}
.toggleBut {
  margin-top: 20px;
}
.toggleBut p {
  border: 1px solid #cccccc;
  float: right;
  margin-right: 25px;
}
.toggleBut {
  span {
    display: inline-block;
    float: left;
  }
  span:first-child {
    border-right: 1px solid #cccccc;
  }
}
.toggleBut span:first-child {
  margin-top: 2px;
}
.toggleBut i {
  padding: 5px;
  font-size: 25px;
  display: inline-block;
}
.toggleBut span:first-child i {
  font-size: 22px;
}
.toggleBut i:hover {
  color: #214f89;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fafa-enter-active,
.fafa-leave-active {
  transition: opacity 1s;
}
.fafa-enter,
.fafa-leave-active {
  opacity: 0;
} /* 学校two css*/
.schoolDetailTwo {
  font-size: 0.18rem;
  line-height: 0.3rem;
}
.listTwoMin:hover {
  box-shadow: 0px 0px 15px #ccc;
}
.schoolListInfomation {
  line-height: 28px;
  margin-top: 20px;
}
.schoolTwoRight {
  line-height: 28px;
  margin-top: 20px;
  text-align: center;
}
@media screen and (min-width: 1200px) {
  .el-autocomplete {
    width: 20%;
  }
  .schoolDetailTwo {
    width: 75%;
    margin: 0 auto;
    .detailBox {
      border: 1px solid #ccc;
      margin-top: 0.2rem;
      border-radius: 10px;
      background: #f9f9f9;

    }
    .detailBox:hover {
      box-shadow: 0px 0px 15px #ccc;
    }
  }
}
@media screen and (min-width: 960px) and (max-width: 1199px) {
  .schoolDetailTwo {
   .detailBox {
     background: #fff;
   }
  }
}
@media screen and (min-width: 768px) and (max-width: 959px) {
  .schoolDetailTwo {
   .detailBox {
     background: #fff;
   }
   .DeatailTwoLeft{
      flex: 3;
    }
    .DeatailTwoCenter{
      flex:7;
      li:nth-of-type(2){
        width: 350px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 767px) {
  .schoolDetailTwo {
    .detailBox {
     background: #fff;
    }
    .DeatailTwoLeft{
      flex: 3;
    }
    .DeatailTwoCenter{
      flex:7;
      li:nth-of-type(2){
        width: 350px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .DeatailTwoRight{
      display: none;
    }
  }
}
@media screen and (max-width: 479px) {
  .schoolDetailTwo {
    .detailBox {
     background: #fff;
    }
    .DeatailTwoLeft{
      flex: 3;
    }
    .DeatailTwoCenter{
      flex:7;
      li:nth-of-type(2){
        width: 230px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

    }
    .DeatailTwoRight{
      display: none;
    }
  }
}
.detailBox{
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  background: #f5f5f5;
  margin-top: 0.2rem;
  display: flex;
  overflow: hidden;
  .DeatailTwoLeft{
    position: relative;
    width: 20%;
    img{
      width: 1rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .DeatailTwoCenter{
    width: 55%;
    ul{
      // line-height:0.4rem;
      li{
        margin-top: 0.15rem;
        color: #999;
      }
      li:first-of-type{
        font-size: 0.2rem;
        color: #010101;
      }
      li:nth-of-type(2){
        font-size: 0.19rem;
        color: #030303;
        margin-top: 0.09rem;
      }
      li:nth-of-type(3){
        P{
          display: inline-block;
        }
        p:last-of-type{
          margin-left: 0.3rem;
          span{
            margin-right: 10px;
          }
        }
        span{
          display:inline;
          width: 12px;
          height: 12px;
          text-align: center;
          line-height: 12px;
          padding: 0.05rem 0.05rem;
          border-radius: 0.05rem;
          color: #fff;
          background: #214f89;
        }
      }
    }
  }
  .DeatailTwoRight{
    width: 25%;
    ul{
      li{
        margin-top: 0.1rem;
        margin-bottom: 0.12rem;
      };
      li:first-of-type{
        display: inline-block;
        background: #214f89;
        color: #fff;
        padding: 0.02rem 0.05rem;
        border-radius: 0.05rem;
      }
    }
  }
}

</style>
