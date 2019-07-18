<template>
  <div>
    <div class="homeBanner">
      <h1>
        <span>国际学校四库全</span>书
      </h1>
      <h6>
        <i class="el-icon-caret-right"></i>
        <span>新学说国际学校行业</span>
        <i class="el-icon-caret-right"></i>
        <span>掌握行业发展水准</span>
        <i class="el-icon-caret-right"></i>
        <span>了解自身成长阶段</span>
      </h6>
      <ul class="homeBnnerSearch clearfix">
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
      <p class="homeBannerP">
        <a
          href="http://data.xinxueshuo.cn/nsi/school/detail.html?School_name=100053&whereFrom=search"
        >北京国际双语学校</a>
        <a>北京京西学校</a>
        <a>北京乐成国际学校</a>
        <a>北京BISS国际学校</a>
        <a>上海哈罗国际学校</a>
        <br />
        <a>上海世界外国语学校</a>
        <a>上海融育北美教育学校</a>
        <a>成都美视国际学校</a>
        <a>深圳国际交流学校</a>
      </p>
    </div>
    <div class="schoolHome">
      <!-- 首页导航 -->
      <div class="homeToolbar clearfix">
        <div class="Service-box">
          <div class="Service-content clearfix">
            <a href="javascript:;" class="Service-item">
              <router-link tag="ul" to="./">
                <div class="item-image">
                  <img src="../assets/icon-tag001.png" alt />
                </div>
                <h3 class="item-title">国际学校库</h3>
                <div class="item-text">为国际学校提供科学的行业数据分析</div>
                <span class="item-link">立即进入</span>
              </router-link>
            </a>
            <a href="javascript:;" class="Service-item">
              <div class="item-image">
                <img src="../assets/icon-tag002.png" alt />
              </div>
              <h3 class="item-title">教育机构库</h3>
              <div class="item-text">提供国际教育类服务机构和服务提供商的详细信息</div>
              <span class="item-link">立即进入</span>
            </a>
            <a href="javascript:;" class="Service-item">
              <div class="item-image">
                <img src="../assets/icon-tag003.png" alt />
              </div>
              <h3 class="item-title">教育人才库</h3>
              <div class="item-text">可以上传个人简历进入国际教育人才储备库</div>
              <span class="item-link">立即进入</span>
            </a>
            <a href="javascript:;" class="Service-item">
              <div class="item-image">
                <img src="../assets/icon-tag004.png" alt />
              </div>
              <h3 class="item-title">项目数据库</h3>
              <div class="item-text">为国际学校和机构提供最权威的行业数据</div>
              <span class="item-link">立即进入</span>
            </a>
            <a href="javascript:;" class="Service-item">
              <div class="item-image">
                <img src="../assets/icon-tag005.png" alt />
              </div>
              <h3 class="item-title">数据可视化</h3>
              <div class="item-text">收集整理大量数据分析数据直观展示</div>
              <span class="item-link">立即进入</span>
            </a>
          </div>
        </div>
      </div>

      <!-- 城市切换 -->
      <div class="schoolHomeCenter">
        <div class="homeCenterToobar clearfix">
          <p>
            <span
              v-for="(v,i) in arr"
              :key="i"
              @click="son(v,i)"
              :class="i==index?'btnpath':''"
            >{{v}}</span>
          </p>
          <el-button type="info">更多</el-button>
        </div>
        <div class="homeList clearfix">
          <div v-for="(v,i) in schoolLists" :key="i" @click="homeListBtn(v.id)">
            <p>
              <img v-if="v.schoolLogo? true:false" :src="v.schoolLogo" />
              <img v-if="v.schoolLogo? false:true" :src="schoolLogoUrlTwo" />
            </p>
            <ul>
              <li>
                <a
                  :href="xinxueshuoSite+'schoolDetail02?id='+choochId"
                  target="_blank"
                >{{v.schoolName | ellipsisName}}</a>
              </li>

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
            <p>
              <img :src="v.coverImage" />
            </p>
            <ul>
              <li>
                <a :href="v.articleUrl" target="_blank">{{v.title | ellschoolHomeTitle}}</a>
              </li>
              <li>{{v.summary}}</li>
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
import { getSchoolHomeInquiry } from "@/api/api";
import { getSchoolCity } from "@/api/api";
import { getSchoolHomeSearch } from "@/api/api";
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
      choochId: 101371,
      schoolLists: [],
      SchoolCitypageNum: 1,
      SchoolCitySearchKey: "北京",
      schoolLogoUrlOne: "http://data.xinxueshuo.cn/",
      schoolLogoUrlTwo:
        "http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png",
      xinxueshuoSite: "http://data.xinxueshuo.cn/vue-project/dist/index.html#/"
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
    },
    //el点击按钮查询信息
    queryBtn() {
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
      console.log(i, v);
      this.index = i;
      this.SchoolCitypageNum = 1;
      this.SchoolCitySearchKey = v;
      this.getData();
    }
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
    ellschoolHomeTitle(value) {
      if (!value) return "";
      if (value.length > 28) {
        return value.slice(0, 28) + "...";
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
@media screen and (min-width: 1200px) {
  .homeBanner {
    background: url(../assets/bannerTwo.png) no-repeat;
    background-size: contain;
    background-size: 100% 600px;
    width: 100%;
    height: 550px;
    overflow: hidden;
    h1 {
      color: #fff;
      font-size: 0.5rem;
      text-align: center;
      margin-top: 160px;
      font-weight: bold;
      span {
        letter-spacing: 7px;
        margin-right: 5px;
      }
    }
    h6 {
      font-size: 0.15rem;
      color: #fff;
      display: table;
      margin: 20px auto 0;
      span {
        letter-spacing: 2px;
      }
    }
    i {
      color: #e7b560;
    }
    .homeBannerP {
      a {
        color: #f0f0f0;
        margin: 0 10px;
        cursor: pointer;
      }
      display: table;
      margin: 0 auto;
      line-height: 25px;
      margin-top: 15px;
    }
  }
  .homeBnnerSearch {
    width: 35%;
    margin: 20px auto 0px;
    border-radius: 5px;
    background: #fff;
    li {
      float: left;
    }
    li:first-of-type {
      width: 90%;
      .el-autocomplete {
        width: 100%;
      }
    }
    li:last-of-type {
      width: 10%;
      text-align: center;
      i {
        font-size: 20px;
        margin-top: 10px;
        color: #ccc;
      }
    }
    li:last-of-type:hover i {
      color: #409eff;
    }
  }
}
@media screen and (min-width: 960px) and (max-width: 1199px) {
  .homeBanner {
    background: url(../assets/bannerTwo.png) no-repeat;
    background-size: contain;
    background-size: 100% 480px;
    width: 100%;
    height: 480px;
    overflow: hidden;
    h1 {
      color: #fff;
      font-size: 0.5rem;
      text-align: center;
      margin-top: 120px;
      font-weight: bold;
      span {
        letter-spacing: 7px;
        margin-right: 5px;
      }
    }
    h6 {
      font-size: 0.15rem;
      color: #fff;
      display: table;
      margin: 20px auto 0;
      span {
        letter-spacing: 2px;
      }
    }
    i {
      color: #e7b560;
    }
    .homeBannerP {
      a {
        color: #f0f0f0;
        padding: 0 10px;
      }
      display: table;
      margin: 0 auto;
      line-height: 20px;
      margin-top: 15px;
    }
  }
  .homeBnnerSearch {
    width: 40%;
    margin: 20px auto 0px;
    border-radius: 5px;
    background: #fff;
    li {
      float: left;
    }
    li:first-of-type {
      width: 90%;
      .el-autocomplete {
        width: 100%;
      }
    }
    li:last-of-type {
      width: 10%;
      text-align: center;
      i {
        font-size: 20px;
        margin-top: 10px;
        color: #ccc;
      }
    }
    li:last-of-type:hover i {
      color: #409eff;
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 959px) {
  .homeBanner {
    background: url(../assets/bannerTwo.png) no-repeat;
    background-size: contain;
    background-size: 100% 390px;
    width: 100%;
    height: 390px;
    overflow: hidden;
    h1 {
      color: #fff;
      font-size: 0.4rem;
      text-align: center;
      margin-top: 100px;
      font-weight: bold;
      span {
        letter-spacing: 7px;
        margin-right: 5px;
      }
    }
    h6 {
      font-size: 0.15rem;
      color: #fff;
      display: table;
      margin: 20px auto 0;
      span {
        letter-spacing: 2px;
      }
    }
    i {
      color: #e7b560;
    }
  }
  .homeBnnerSearch {
    width: 40%;
    margin: 20px auto 0px;
    border-radius: 5px;
    background: #fff;
    li {
      float: left;
    }
    li:first-of-type {
      width: 85%;
      .el-autocomplete {
        width: 100%;
      }
    }
    li:last-of-type {
      width: 15%;
      text-align: center;
      i {
        font-size: 20px;
        margin-top: 10px;
        color: #ccc;
      }
    }
    li:last-of-type:hover i {
      color: #409eff;
    }
  }
}
@media screen and (min-width: 480px) and (max-width: 767px) {
  .homeBanner {
    background: url(../assets/bannerTwo.png) no-repeat;
    background-size: contain;
    background-size: 100% 300px;
    width: 100%;
    height: 300px;
    overflow: hidden;
    h1 {
      color: #fff;
      font-size: 0.3rem;
      text-align: center;
      margin-top: 70px;
      font-weight: bold;
      span {
        letter-spacing: 7px;
        margin-right: 5px;
      }
    }
    h6 {
      font-size: 0.15rem;
      color: #fff;
      display: table;
      margin: 20px auto 0;
      span {
        letter-spacing: 2px;
      }
    }
    i {
      color: #e7b560;
    }
  }
  .homeBnnerSearch {
    width: 50%;
    margin: 20px auto 0px;
    border-radius: 5px;
    background: #fff;
    li {
      float: left;
    }
    li:first-of-type {
      width: 85%;
      .el-autocomplete {
        width: 100%;
      }
    }
    li:last-of-type {
      width: 15%;
      text-align: center;
      i {
        font-size: 20px;
        margin-top: 10px;
        color: #ccc;
      }
    }
    li:last-of-type:hover i {
      color: #409eff;
    }
  }
}
@media screen and (max-width: 479px) {
  .homeBanner {
    background: url(../assets/bannerTwo.png) no-repeat;
    background-size: contain;
    background-size: 100% 200px;
    width: 100%;
    height: 200px;
    overflow: hidden;
    h1 {
      color: #fff;
      font-size: 0.3rem;
      text-align: center;
      margin-top: 50px;
      font-weight: bold;
      span {
        letter-spacing: 2px;
        margin-right: 0px;
      }
    }
    h6 {
      font-size: 0.01rem;
      color: #fff;
      display: table;
      margin: 20px auto 0;
    }
    i {
      color: #e7b560;
    }
  }
  .homeBnnerSearch {
    width: 40%;
    height: 40px;
    margin: 20px auto 0px;
    border-radius: 5px;
    background: #fff;
    .el-button--info {
      width: 100%;
    }
    li {
      float: left;
    }
    li:first-of-type {
      width: 70%;
      height: 20px;
      .el-autocomplete {
        width: 100%;
      }
    }
    li:last-of-type {
      width: 30%;
      text-align: center;
      i {
        font-size: 20px;
        margin-top: 10px;
        color: #ccc;
      }
    }
    li:last-of-type:hover i {
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
  margin-top: 30px;
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
  height: 180px;
  margin-left: 50px;
  text-align: center;
  img {
    height: 70%;
  }
  p {
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
}
.homeBanner img {
  width: 100%;
}

.homeList {
  width: 95%;
  margin: 20px auto;
}
.homeList {
  div {
    float: left;
    border: 1px solid #cccccc;
    width: 265px;
    margin: 10px;
    height: 100px;
    p {
      float: left;
      width: 100px;
      height: 100px;
      position: relative;
      img {
        width: 80%;
        height: 80%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    ul {
      float: left;
      margin-left: 15px;
      margin-top: 15px;
      line-height: 30px;
      li:first-of-type {
        font-weight: 600;
      }
      li:nth-of-type(2) {
        color: #777;
      }
    }
  }
}

/* 学校列表 */
.schoolHomeCenter {
  margin-top: 20px;
  margin-bottom: 20px;
  background: #fafafa;
  overflow: hidden;
}
.homeCenterToobar {
  width: 95%;
  margin: 35px auto 10px;
  padding-bottom: 5px;
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
  color: rgb(33, 79, 137);
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(33, 79, 137);
  font-weight: 700;
}
.homeCenterToobar p span:hover {
  color: rgb(33, 79, 137);
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
}
.homeInquiryBox > div {
  width: 520px;
}
.homeInquiryBox p {
  float: left;
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
  color: rgb(33, 79, 137)
}
.homeInquiryBox {
  margin-top: 10px;
  margin-left: 0px;
  margin-right: 30px;
  margin-bottom: 15px;
}
.homeInquiryBox > div {
  width: 555px;
}
.homeInquiryBox p {
  float: left;
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

.Service-box {
  background-color: #fff;
  box-sizing: border-box;
}

.Service-content {
  width: 1200px;
  margin: 0 auto;
  padding: 0;
}

.Service-item {
  display: block;
  width: 200px;
  padding: 30px 16px;
  text-align: center;
  float: left;
  height: 240px;
  margin: 0 0 10px;
  border: 1px solid #e7e7e7;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
}

.Service-content .Service-item {
  transition: all 160ms;
}

.item-image {
  display: inline-block;
  height: 100px;
  width: 100px;
  line-height: 100px;
  text-align: center;
  border: 3px solid transparent;
  margin: 0;
  border-radius: 100%;
  box-sizing: border-box;
  transition: all 160ms;
}

.item-image img {
  width: 100%;
  height: 100%;
  display: block;
  border: none;
}

.item-title {
  line-height: 25px;
  font-size: 18px;
  color: #3d3d3d;
  padding: 22px 0 7px;
  font-weight: normal;
}

.item-text {
  color: #9a9a9a;
  font-size: 12px;
  line-height: 17px;
  height: 34px;
  overflow: hidden;
}

.item-link {
  color: #ffffff;
  display: none;
  padding: 6px 20px;
  background-color: rgb(33, 79, 137);
  margin: 17px auto;
  font-size: 14px;
  line-height: 25px;
  border-radius: 5px;
  transition: all 160ms;
  font-weight: normal;
}

.Service-item:hover {
  border-color: #dedddd;
  padding-top: 26px;
  position: relative;
  z-index: 99;
  text-decoration: none;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transform: translate3d(0, -3px, 0);
}

.Service-item:hover .item-image {
  height: 60px;
  width: 60px;
  line-height: 60px;
  margin: 0 auto;
}

.Service-item:hover .item-link {
  display: block;
}

.Service-item:hover .item-title {
  padding: 10px 0 7px;
}

.Service-item + .Service-item {
  margin-left: 50px;
  position: relative;
}

.item-tag {
  width: 67px;
  height: 67px;
  color: #ffffff;
  position: absolute;
  transform: rotateZ(-315deg);
  top: 9px;
  right: 9px;
  font-size: 12px;
  line-height: 17px;
}

.item-background {
  width: 67px;
  height: 67px;
  position: absolute;
  top: 0px;
  right: 0px;
}

.item-background img {
  width: 100%;
  height: 100%;
}
</style>
