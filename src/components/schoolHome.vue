<template>
  <div>
    <div class="homeBanner">
      <h1><span>国际学校四库全</span>书</h1>
      <h6><i class="el-icon-caret-right"></i><span>新学说国际学校行业</span><i class="el-icon-caret-right"></i><span>掌握行业发展水准</span><i class="el-icon-caret-right"></i><span>了解自身成长阶段</span></h6>
      <!-- <img src="../assets/one.png" class="img-responsive" alt="Responsive image"> -->
      <!-- <img src="../assets/banner.png" class="img-responsive" alt="Responsive image"> -->
      <ul class="homeBnnerSearch  clearfix">
        <li class="aaa">
          <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
          @keyup.enter.native="queryBtn"
        ></el-autocomplete>
        </li>
        <li class="bbb">
          <i class="el-icon-search" @click="queryBtn"></i>
        </li>
      </ul>
      <p class="homeBannerP"><a href="http://data.xinxueshuo.cn/nsi/school/detail.html?School_name=100053&whereFrom=search">北京国际双语学校</a><a>北京京西学校</a><a>北京乐成国际学校</a><a>北京BISS国际学校</a><a>上海哈罗国际学校</a><br/><a>上海世界外国语学校</a><a>上海融育北美教育学校</a><a>成都美视国际学校</a><a>深圳国际交流学校</a></p>
    </div>
    <div class="schoolHome">

      <!-- 首页导航 -->
      <div class="homeToolbar clearfix">
        <div class="toolbarLeft clearfix">
          <router-link tag="ul" to="./">
            <li><i class="iconfont icon-jianzhu"></i></li>
            <li>国际学校库</li>
          </router-link>
          <router-link tag="ul" to="./school">
            <li><i class="iconfont icon-jixinrenshu"></i></li>
            <li>教育机构库</li>
          </router-link>
          <router-link tag="ul" to="./school">
            <li><i class="iconfont icon-rencai"></i></li>
            <li>教育人才库</li>
          </router-link>
          <router-link tag="ul" to="./school">
            <li><i class="iconfont icon-xiangmu"></i></li>
            <li>项目数据库</li>
          </router-link>
          <router-link tag="ul" to="./school">
            <li><i class="iconfont icon-keshihua-"></i></li>
            <li>数据可视化</li>
          </router-link>
        </div>
        <div class="toolbarRight">
          <img src="https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-pc/miniProgram.jpg">
          <p>国际学校四库全书<br/>微信小程序</p>
        </div>
      </div>

      <!-- 城市切换 -->
      <div class="schoolHomeCenter">
        <div class="homeCenterToobar clearfix">
         <p><span  v-for="(v,i) in arr" :key="i" @click="son(v,i)" :class="i==index?'btnpath':''">{{v}}</span></p>
         <el-button type="info">更多</el-button>
        </div>
        <div class="homeList clearfix">
          <div v-for="(v,i) in schoolLists" :key="i" @click="homeListBtn(v.id)" >
            <p>
              <img v-if="v.schoolLogo? true:false" :src="v.schoolLogo">
              <img v-if="v.schoolLogo? false:true" :src="schoolLogoUrlTwo">
            </p>
            <ul>
              <!-- <li><a :href="xinxueshuoSite+'schoolDetail02?id=101371'" target="_blank">{{v.schoolName | ellipsisName}}</a></li> -->
              <li><a :href="xinxueshuoSite+'schoolDetail02?id='+choochId" target="_blank">{{v.schoolName | ellipsisName}}</a></li>

              <li>课程：美国课程</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 行业动态 -->
      <div class="homeInquiry">
        <h1>行业动态</h1>
        <div class="homeInquiryBox clearfix">
          <div class="homeInquiryLeft" v-for="(v,i) in schoolInquiruList" :key="i">
            <p><img :src="v.coverImage"></p>
            <ul>
              <li><a :href="v.articleUrl" target="_blank">{{v.title | ellschoolHomeTitle}}</a></li>
              <li>{{v.summary}}</li>
              <!-- <li v-html="v.articleContent"></li> -->
            </ul>
          </div>
        </div>

      </div>
    </div>
    <schoolFooter />
  </div>
</template>

<script>
    import schoolFooter from "./schoolFooter";
    import axios from "axios";
    import {
        getSchoolHomeInquiry
    } from "@/api/api";
    import {
        getSchoolCity
    } from "@/api/api";
    import {
        getSchoolHomeSearch
    } from "@/api/api";
    export default {
        data() {
            return {
                state: "",
                homeJump: "",
                schoolInquiruList: [],
                arr: [
                    "北京",
                    "上海",
                    "广州",
                    "深圳",
                    "沈阳",
                    "成都",
                    "杭州",
                    "郑州",
                    "重庆"
                ],
                index: 0,
                choochId:101371,
                schoolLists: [],
                SchoolCitypageNum: 1,
                SchoolCitySearchKey: "北京",
                schoolLogoUrlOne: "http://data.xinxueshuo.cn/",
                schoolLogoUrlTwo: "http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png",
                xinxueshuoSite:"http://data.xinxueshuo.cn/vue-project/dist/index.html#/"
            };
        },
        methods: {
            //请求数据
            getData() {
                //学校列表
                getSchoolCity({
                    pageNum: this.SchoolCitypageNum,
                    pageSize: 12,
                    searchKey: this.SchoolCitySearchKey
                }).then(res => {
                    console.log(res.data.list);
                    this.schoolLists = res.data.list;
                });
                //行业动态
                getSchoolHomeInquiry({
                    pageNum: 1,
                    pageSize: 6
                }).then(res => {
                    // console.log(res.data.list)
                    this.schoolInquiruList = res.data.list;
                });
            },
            //渲染element搜索列表
            querySearchAsync(queryString, cb) {
                getSchoolHomeSearch({
                    keyword: this.state
                }).then(res => {
                    var arr = [];
                    for (var i = 0; i < res.data.length; i++) {
                        var a1 = {};
                        a1.value = res.data[i];
                        arr.push(a1);
                    }
                    cb(arr);
                });
            },
            //点击select选项跳转
            handleSelect(item) {
                this.homeJump = item.value;
                this.$router.push({
                    name: "school",
                    query: {
                        item: this.homeJump
                    }
                });
                // this.$nextTick(function () {
                //   this.bus.$emit("em",item);
                // })
            },
            //el点击按钮查询信息
            queryBtn() {
                // console.log(this.homeJump)
                this.$router.push({
                    path: "school",
                    query: {
                        item: this.state
                    }
                });
                console.log(111);
            },
            //城市切换按钮
            son(v, i) {
                console.log(i,v);
                this.index = i;
                this.SchoolCitypageNum = 1;
                this.SchoolCitySearchKey = v;
                this.getData();
            },
            //点击学校进入详情页
            // homeListBtn(id) {
            //     this.$router.push({
            //         path: "./schoolDetail02",
            //         query: {
            //             id: id
            //         }
            //     });
            // }
        },
        mounted() {
            this.getData();
        },
        components: {
            schoolFooter
        },
        //学校过滤超出显示...
        filters: {
          ellipsisName(value) {
              if (!value) return "";
              if (value.length > 7) {
                  return value.slice(0, 9) + "...";
              }
              return value;
          },
          //行业动态过滤
          ellschoolHomeTitle(value){
            if(!value) return "";
            if(value.length >28){
              return value.slice(0,28) + "...";
            }
            return value;
          }
        }
    };
</script>
<style>
  .homeBnnerSearch input.el-input__inner {
    border: 1px solid #fff;
  }
</style>
<style lang="less" scoped>
@media screen and (min-width:1200px){
  .homeBanner {
    background: url(../assets/bannerTwo.png) no-repeat;
    background-size: contain;
    background-size: 100% 600px;
    width: 100%;
    height: 550px;
    overflow: hidden;
    h1{
      color: #fff;
      font-size: 0.5rem;
      text-align: center;
      margin-top: 160px;
      font-weight: bold;
      span{
        letter-spacing:7px;
        margin-right: 5px;
      }
    }
    h6{
      font-size: 0.15rem;
      color: #fff;
      display: table;
      margin: 20px auto 0;
      span{
        letter-spacing:2px;
      }
    }
    i{
      color: #e7b560;
    }
    .homeBannerP{
      a{
        color: #f0f0f0;
        margin: 0 10px;
        cursor:pointer;
      }
      display: table;
      margin: 0 auto;
      line-height: 25px;
      margin-top: 15px;
    }
  }
  .homeBnnerSearch{
    width: 35%;
    margin: 20px auto 0px;
    border-radius: 5px;
    background: #fff;
    li{
      float: left;
    }
    li:first-of-type{
      width: 90%;
      .el-autocomplete {
        width: 100%;
      }
    }
    li:last-of-type{
      width: 10%;
      text-align: center;
      i{
        font-size: 20px;
        margin-top: 10px;
        color: #ccc;
      }
    }
    li:last-of-type:hover i{
          color: #409eff;
    }
  }

}
@media screen and (min-width:960px) and (max-width:1199px){
  .homeBanner {
    background: url(../assets/bannerTwo.png) no-repeat;
    background-size: contain;
    background-size: 100% 480px;
    width: 100%;
    height: 480px;
    overflow: hidden;
    h1{
      color: #fff;
      font-size: 0.5rem;
      text-align: center;
      margin-top: 120px;
      font-weight: bold;
      span{
        letter-spacing:7px;
        margin-right: 5px;
      }
    }
    h6{
      font-size: 0.15rem;
      color: #fff;
      display: table;
      margin: 20px auto 0;
      span{
        letter-spacing:2px;
      }
    }
    i{
      color: #e7b560;
    }
    .homeBannerP{
      a{
        color: #f0f0f0;
        padding: 0 10px;
      }
      display: table;
      margin: 0 auto;
      line-height: 20px;
      margin-top: 15px;
    }
  }
  .homeBnnerSearch{
    width: 40%;
    margin: 20px auto 0px;
    border-radius: 5px;
    background: #fff;
    li{
      float: left;
    }
    li:first-of-type{
      width: 90%;
      .el-autocomplete {
        width: 100%;
      }
    }
    li:last-of-type{
      width: 10%;
      text-align: center;
      i{
        font-size: 20px;
        margin-top: 10px;
        color: #ccc;
      }
    }
    li:last-of-type:hover i{
      color: #409eff;
    }
  }
}
@media screen and (min-width:768px) and (max-width:959px){
  .homeBanner {
    background: url(../assets/bannerTwo.png) no-repeat;
    background-size: contain;
    background-size: 100% 390px;
    width: 100%;
    height: 390px;
    overflow: hidden;
    h1{
      color: #fff;
      font-size: 0.4rem;
      text-align: center;
      margin-top: 100px;
      font-weight: bold;
      span{
        letter-spacing:7px;
        margin-right: 5px;
      }
    }
    h6{
      font-size: 0.15rem;
      color: #fff;
      display: table;
      margin: 20px auto 0;
      span{
        letter-spacing:2px;
      }
    }
    i{
      color: #e7b560;
    }
  }
  .homeBnnerSearch{
    width: 40%;
    margin: 20px auto 0px;
    border-radius: 5px;
    background: #fff;
    li{
      float: left;
    }
    li:first-of-type{
      width: 85%;
      .el-autocomplete {
        width: 100%;
      }
    }
    li:last-of-type{
      width: 15%;
      text-align: center;
      i{
        font-size: 20px;
        margin-top: 10px;
        color: #ccc;
      }
    }
    li:last-of-type:hover i{
          color: #409eff;
    }
  }
}
@media screen and (min-width:480px) and (max-width:767px){
  .homeBanner {
    background: url(../assets/bannerTwo.png) no-repeat;
    background-size: contain;
    background-size: 100% 300px;
    width: 100%;
    height: 300px;
    overflow: hidden;
    h1{
      color: #fff;
      font-size: 0.3rem;
      text-align: center;
      margin-top: 70px;
      font-weight: bold;
      span{
        letter-spacing:7px;
        margin-right: 5px;
      }
    }
    h6{
      font-size: 0.15rem;
      color: #fff;
      display: table;
      margin: 20px auto 0;
      span{
        letter-spacing:2px;
      }
    }
    i{
      color: #e7b560;
    }
  }
  .homeBnnerSearch{
    width: 50%;
    margin: 20px auto 0px;
    border-radius: 5px;
    background: #fff;
    li{
      float: left;
    }
    li:first-of-type{
      width: 85%;
      .el-autocomplete {
        width: 100%;
      }
    }
    li:last-of-type{
      width: 15%;
      text-align: center;
      i{
        font-size: 20px;
        margin-top: 10px;
        color: #ccc;
      }
    }
    li:last-of-type:hover i{
      color: #409eff;
    }
  }
}
@media screen and (max-width:479px) {
  .homeBanner {
    background: url(../assets/bannerTwo.png) no-repeat;
    background-size: contain;
    background-size: 100% 200px;
    width: 100%;
    height: 200px;
    overflow: hidden;
    h1{
      color: #fff;
      font-size: 0.3rem;
      text-align: center;
      margin-top: 50px;
      font-weight: bold;
      span{
        letter-spacing:2px;
        margin-right: 0px;
      }
    }
    h6{
      font-size: 0.01rem;
      color: #fff;
      display: table;
      margin: 20px auto 0;
      span{
        // letter-spacing:2px;
      }
    }
    i{
      color: #e7b560;
    }
  }
  .homeBnnerSearch{
    width: 40%;
    height: 40px;
    margin: 20px auto 0px;
    border-radius: 5px;
    background: #fff;
    .el-button--info{
      width: 100%;
    }
    li{
      float: left;
    }
    li:first-of-type{
      width: 70%;
      height: 20px;
      .el-autocomplete {
        width: 100%;
      }

    }
    li:last-of-type{
      width: 30%;
      text-align: center;
      i{
        font-size: 20px;
        margin-top: 10px;
        color: #ccc;
      }
    }
    li:last-of-type:hover i{
      color: #409eff;
    }
  }
}
.schoolHome {
  margin: 0 auto;
  width: 1200px;
}
/* bannenr */
.homeBanner img {
  width: 100%;
  /* height: 100%; */
}

/* 导航搜索 */
.homeToolbar {
  margin-top: 20px;
}
.toolbarLeft {
  float: left;
}
.toolbarLeft ul {
  width: 120px;
  height: 120px;
  border: 1px solid #999;
  float: left;
  border-radius: 5px;
  margin: 30px 40px;
}
.toolbarLeft ul:hover {
  box-shadow: 0 0 10px #214f89;

}
.toolbarLeft ul li:first-of-type {
  height: 90px;
  text-align: center;
}
.toolbarLeft ul li:first-of-type i {
  line-height: 90px;
  text-align: center;
  font-size: 60px;
  color: #214f89;
  // text-shadow:0px 0px 6px #214f89;
}
.toolbarLeft ul li:last-of-type {
  text-align: center;
  font-size: 16px;
  margin-top: 5px;
  font-weight: 600;
  color: #555;
}
.toolbarRight {
  float: left;
  // width: 250px;
  height: 180px;
  margin-left: 50px;
  text-align: center;
  // background: #fafafa;
  img{
    // width: 100%;
    height: 70%;
  }
  p{
    margin-top: 5px;
    line-height: 18px;
    color: #214f89;
  }
}

.schoolHome {
  margin: 0 auto;
  width: 1200px;
}
/* bannenr */
.homeBanner {
  width: 100%;
  /* height: 400px; */
}
.homeBanner img {
  width: 100%;
  /* height: 50%; */
}

.homeList {
  width: 95%;
  margin: 20px auto;
  /* display: flex; */
}
.homeList {
  div{
    float: left;
    border: 1px solid #cccccc;
    width: 265px;
    margin: 10px;
    height: 100px;
    p{
      float: left;
      // background: red;
      width: 100px;
      height: 100px;
      position: relative;
      img{
        width: 80%;
        height: 80%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
    ul {
      float: left;
      margin-left: 15px;
      margin-top: 15px;
      line-height: 30px;
      li:first-of-type{
        font-weight: 600;
      }
      li:nth-of-type(2){
        color: #777;
      }
    }
  }

}

/* 学校列表 */
.schoolHomeCenter {
  margin-top: 20px;
  margin-bottom: 20px;
  /* border: 1px solid #cccccc; */
  background: #fafafa;
  overflow: hidden;
}
.homeCenterToobar {
  width: 95%;
  margin: 35px auto 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
  font-size: 24px;
}
.homeCenterToobar p {
  float: left;
}
.homeCenterToobar p span {
  padding: 0 10px;
  color: #777;
}
.homeCenterToobar p .btnpath {
  color: red;
  padding-bottom: 15px;
  border-bottom: 2px solid red;
}
.homeCenterToobar p span:hover {
  color: red;
  cursor: pointer;
}
.homeCenterToobar button.el-button.el-button--info {
  float: right;
  margin-top: -8px;
}


/* 行业动态 */
.homeInquiry {
  background: #fafafa;
  overflow: hidden;
}
.homeInquiry h1 {
  margin-left: 2.5%;
  font-size: 32px;
  margin-top: 25px;
}
.homeInquiryBox {
  margin-top: 10px;
  margin-left: 50px;
  margin-right: 30px;
  margin-bottom: 30px;
  /* border-bottom: 2px solid #cccccc; */
}
.homeInquiryBox > div {
  /* border: 1px solid #cccccc; */
  width: 520px;
  /* padding-left: 10px; */
  /* height: 180px; */
  /* margin-left: 30px; */
  /* margin-top: 30px; */
  /* margin-bottom: 30px; */
}
.homeInquiryBox p {
  float: left;
  /* width: 150px;
    width: 180px; */
  /* margin-left: 20px; */
  margin-top: 20px;
  margin-bottom: 20px;
}
.homeInquiryBox ul {
  float: left;
  width: 290px;
  margin-left: 20px;
  margin-top: 20px;
  line-height: 26px;
}
.homeInquiryBox ul li:first-of-type {
  font-size: 18px;
}
.homeInquiryBox ul li:last-of-type {
  color: #777;
}
.homeInquiryLeft {
  float: left;
  margin-left: 30px;
}

/* 行业动态 */
.homeInquiry {
  background: #fafafa;
  overflow: hidden;
}
.homeInquiry h1 {
  margin-left: 2.5%;
  font-size: 32px;
  margin-top: 25px;
}
.homeInquiryBox {
  margin-top: 10px;
  margin-left: 0px;
  margin-right: 30px;
  margin-bottom: 15px;
  /* border-bottom: 2px solid #cccccc; */
}
.homeInquiryBox > div {
  width: 555px;
  /* background: #ccc; */
}
.homeInquiryBox p {
  float: left;
  /* width: 150px;
    width: 180px; */
        /* margin-left: 20px; */
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .homeInquiryBox p img {
        width: 250px;
        height: 120px;
    }

    .homeInquiryBox ul {
        float: left;
        width: 270px;
        margin-left: 20px;
        margin-top: 20px;
        line-height: 26px;
    }

    .homeInquiryBox ul li:first-of-type {
        font-size: 18px;
    }

    .homeInquiryBox ul li:last-of-type {
        color: #777;
    }

    .homeInquiryLeft {
        float: left;
        margin-left: 30px;
    }
</style>
