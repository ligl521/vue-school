<template>
  <div>
    <div class="handerH5 hidden-sm-and-up">
      <div class="handerH5_left">
        <img class="handerH5_left_img" src="../assets/logoh5.png" alt />
        <span class="handerH5_left_span"></span>
      </div>
      <div class="handerH5_right">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
          @keyup.enter.native="queryBtn"
        ></el-autocomplete>
        <i class="el-icon-search" @click="queryBtn"></i>
      </div>
    </div>
    <div class="block hidden-sm-and-up">
      <el-carousel height="226px" arrow="never" ref="carousel">
        <el-carousel-item v-for="(item,index) in imglist" :key="item.id" name="index">
          <img :src="item.img" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="homeBanner hidden-xs-only">
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
      <div class="homeToolbar clearfix hidden-xs-only">
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
      <div class="schoolHomeCenter hidden-xs-only">
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
          <div v-for="(v,i) in schoolLists" :key="i">
            <p>
              <img v-if="v.schoolLogo? true:false" :src="v.schoolLogo" />
              <img v-if="v.schoolLogo? false:true" :src="schoolLogoUrlTwo" />
            </p>
            <ul>
              <li>
                <a
                  :href="xinxueshuoSite+'schoolDetail?id='+v.id"
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
    <bottomMenuH5 />
  </div>
</template>

<script>
import schoolFooter from "./schoolFooter";
import schoolFooterH5 from "./schoolFooterH5";
import axios from "axios";
import bottomMenuH5 from "./bottomMenuH5"
import { getSchoolHomeInquiry } from "@/api/api";
import { getSchoolCity } from "@/api/api";
import { getSchoolHomeSearch } from "@/api/api";
export default {
    components: {
        schoolFooter,
        // schoolFooterH5
        bottomMenuH5
    },
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
      imglist: [
        { img: require("../assets/bg.png") },
        { img: require("../assets/bg1.png") },
        { img: require("../assets/bg2.png") }
      ],
      index: 0,
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
    aa(index) {
      this.setActiveItem(index);
    },
    setActiveItem(index) {
      console.log(index);
      this.$refs.carousel.setActiveItem(index);
    },
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
.el-carousel__item img {
  width: 100%;
  height: auto;
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.homeBanner {
  background: url(../assets/bannerTwo.png) no-repeat;
  background-size: contain;
  background-size: 100% 600px;
  width: 100%;
  min-width: 1200px;
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

.schoolHome {
  margin: 0 auto;
  width: 1200px;
  min-width: 1200px;
}
/* bannenr */
.homeBanner img {
  width: 100%;
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
.homeList {
  width: 95%;
  margin: 20px auto;
}
.homeList {
  div {
    float: left;
    border: 1px solid #f2eaea;
    border-radius: 4px;
    width: 265px;
    margin: 10px;
    height: 100px;
    background-color: #fff;
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
      margin-left: 0;
      margin-top: 15px;
      line-height: 30px;
      li:first-of-type {
        font-weight: 600;
        font-size: 16px;
        color: #424242;
        a {
          color: #424242;
        }
      }
      li:nth-of-type(2) {
        color: #757575;
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
  margin-top: -4px;
  width: 52px;
  height: 34px;
  padding: 0;
  text-align: center;
  font-size: 16px;
  line-height: 34px;
}

/* 行业动态 */
.homeInquiry {
  background: #fafafa;
  overflow: hidden;
}
.homeInquiryBox p {
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
.homeInquiryLeft {
  float: left;
  margin-left: 30px;
}
.homeInquiry h1 {
  margin-left: 2.5%;
  font-size: 32px;
  margin-top: 25px;
  color: rgb(33, 79, 137);
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
  font-weight: 600;
}
.homeInquiryBox ul li:first-of-type a {
  color: #424242;
}
.homeInquiryBox ul li:last-of-type {
  color: #757575;
}
//鼠标进入css
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
  display: hidden-sm-and-up;
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
  height: 70px;
  width: 70px;
  line-height: 70px;
  margin: 0 auto;
}

.Service-item:hover .item-link {
  display: block;
}

.Service-item .item-link:hover {
  background-color: rgb(92, 130, 175);
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

@media screen and (max-width: 768px) {
  .handerH5 {
    position: absolute;
    z-index: 99;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    display: flex;
    padding: 0 28px;
    .handerH5_left {
      width: 24%;
      margin-right: 7%;
      .handerH5_left_img {
        width: 56px;
        vertical-align: top;
        height: auto;
        float: left;
      }
      .handerH5_left_span {
        display: inline-block;
        width: 2px;
        height: 34px;
        border: 1px solid #fff;
        vertical-align: top;
        float: right;
      }
    }
    .handerH5_right {
      width: 70%;
      i {
        position: absolute;
        top: 4px;
        right: 36px;
        font-size: 24px;
        color: rgb(176, 168, 168);
      }
    }
  }

  .el-autocomplete {
    margin-top: -4px;
    width: 100%;
  }
  .el-carousel__arrow {
    display: none;
  }
  .schoolHome {
    margin: 0 auto;
    width: 100%;
    min-width: 0;
  }
  .homeInquiry h1 {
    text-align: center;
    font-size: 25px;
    margin: 20px 0;
    color: #214f89;
  }
  .homeInquiryBox {
    margin: 0;
    padding: 0 10px;
  }
  .homeInquiryBox > div {
    width: 100%;
    margin: 0;
    float: none;
    height: 110px;
    border-bottom: 1px solid #eee;
  }
  .homeInquiryBox > div:last-of-type{
      padding-bottom:170px;
  }
  .homeInquiryBox p {
    float: none;
    margin: 10px 0;
    width: 40%;
    height: 90px;
    display: inline-block;
  }
  .homeInquiryBox p img {
    width: 100%;
    height: 100%;
  }
  .homeInquiryBox ul {
    float: right;
    width: 55%;
    margin: 10px 0;
    height: 70px;
    display: inline-block;
  }
  .homeInquiryBox ul li {
    font-weight: 400;
    font-size: 16px !important;
    line-height: 1.3 !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    min-height: 40px;
    max-height: 40px;
    margin-top: 0;
    margin-bottom: 10px;
    color: #07111b;
  }
  .homeInquiryBox ul li:last-of-type {
    color: #777;
    font-size: 15px !important;
  }
}
</style>
