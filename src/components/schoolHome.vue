<template>
  <div>
    <div class="homeBanner">
      <img src="../assets/one.png">
    </div>
    <div class="schoolHome">
      <div class="homeToolbar clearfix">
        <div class="toolbarLeft clearfix">
          <ul>
            <li><i class="iconfont icon-shijian"></i></li>
            <li>国际学校库</li>
          </ul>
          <ul>
            <li><i class="iconfont icon-shijian"></i></li>
            <li>国际学校库</li>
          </ul>
          <ul>
            <li><i class="iconfont icon-shijian"></i></li>
            <li>国际学校库</li>
          </ul>
          <ul>
            <li><i class="iconfont icon-shijian"></i></li>
            <li>国际学校库</li>
          </ul>
          <ul>
            <li><i class="iconfont icon-shijian"></i></li>
            <li>国际学校库</li>
          </ul>
        </div>
        <div class="toolbarRight">
          <ul>
            <li>
              <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
            </li>
            <li><el-button type="info">查询信息</el-button></li>
          </ul>
        </div>
      </div>
      <div class="schoolHomeCenter">
        <div class="homeCenterToobar clearfix">
          <p><span id="btnpath">北京</span><span>上海</span><span>深圳</span><span>深圳</span><span>深圳</span><span>深圳</span></p>
          <el-button type="info">更多</el-button>
        </div>
        <div class="homeList clearfix">
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="homeInquiry">
        <h1>行业动态</h1>
        <div class="homeInquiryBox clearfix">
          <div class="homeInquiryLeft" v-for="(v,i) in schoolInquiruList" :key="i">
            <p><img :src="v.coverImage"></p>
            <ul>
              <li>{{v.title}}</li>
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
import schoolFooter from './schoolFooter'
import axios from 'axios'
import {getSchoolHomeInquiry} from '@/api/api'
import {getSchoolLibrary} from '@/api/api'
import {getSchoolHomeSearch} from '@/api/api'
export default {
  data() {
    return {
      state:"",
      schoolInquiruList:[],
    }
  },
  methods: {
    getData(){
      getSchoolHomeInquiry({
        pageNum:1,
        pageSize:6
      }).then((res)=>{
        console.log(res.data.list)
        this.schoolInquiruList = res.data.list;
      })
    },
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
      ];
    },
    querySearchAsync(queryString, cb) {
      getSchoolHomeSearch({
        keyword:"北京"
      }).then((res)=>{
        console.log(res)
      })
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      cb(results);

    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.getData();
    this.restaurants = this.loadAll();
  },
  components:{
    schoolFooter
  }
}
</script>

<style conped>
  .schoolHome{
    margin: 0 auto;
    width: 1200px;
  }
  /* bannenr */
  .homeBanner{
    width: 100%;
    height: 400px;
  }
  .homeBanner img{
    width: 100%;
    height: 100%;
  }



/* 导航搜索 */
  .homeToolbar{
    margin-top: 20px;
  }
  .toolbarLeft{
    float: left;
    background: #f8f8f8;
  }
  .toolbarLeft ul{
    width: 120px;
    height: 120px;
    border: 1px solid #ccc;
    float: left;
    border-radius: 5px;
    margin: 30px;
  }
  .toolbarLeft ul li:first-of-type{
     height: 90px;
     text-align: center;
  }
  .toolbarLeft ul li:first-of-type i{
    line-height: 90px;
    text-align: center;
    font-size: 50px;
  }
   .toolbarLeft ul li:last-of-type{
     text-align: center;
   }
  .toolbarRight{
    float: left;
    width: 250px;
    margin-left: 50px;
    text-align: center;
    background: #f8f8f8;
  }
  .toolbarRight li:first-of-type{
    margin-top: 10px;
  }
  .toolbarRight li:last-of-type{
    padding-bottom: 30px;
  }
 .toolbarRight button.el-button.el-button--info,.toolbarRight input{
    width: 200px;
    margin-top: 30px;
  }


  /* 学校列表 */
  .schoolHomeCenter{
    margin-top: 20px;
    margin-bottom: 20px;
    /* border: 1px solid #cccccc; */
    background: #f8f8f8;
    overflow: hidden;
  }
  .homeCenterToobar{
    width: 95%;
    margin: 20px auto 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #cccccc;
    font-size: 24px;
  }
  .homeCenterToobar p{
    float: left;
  }
  #btnpath{
    color: red;
  }
  .homeCenterToobar p span{
    padding: 0 10px;
    color: #777;
  }
  .homeCenterToobar button.el-button.el-button--info{
    float: right;
  }
  .homeList{
    width: 95%;
    margin:20px auto;
    /* display: flex; */
  }
  .homeList>div{
    float: left;
    border: 1px solid #cccccc;
    width: 265px;
    margin: 10px;
    height: 100px;
  }
  .homeList>div p{
    float: left;
    /* background: red; */
    width: 50px;
    height: 50px;
    margin-left: 20px;
    margin-top: 20px;
  }
  .homeList>div i{
    font-size: 55px;

  }
  .homeList>div ul{
    float: left;
    margin-left: 15px;
    margin-top: 15px;
    line-height: 30px;
  }


  /* 行业动态 */
  .homeInquiry{
    background: #f8f8f8;
    overflow: hidden;
  }
  .homeInquiry h1{
    margin-left: 2.5%;
    font-size: 32px;
    margin-top: 20px;
  }
  .homeInquiryBox{
    margin-top: 10px;
    margin-left:50px;
    margin-right: 30px;
    margin-bottom: 10px;
    /* border-bottom: 2px solid #cccccc; */
  }
  .homeInquiryBox>div{
    /* border: 1px solid #cccccc; */
    width: 520px;
    /* padding-left: 10px; */
    /* height: 180px; */
    /* margin-left: 30px; */
    /* margin-top: 30px; */
    /* margin-bottom: 30px; */
  }
  .homeInquiryBox>div:last-of-type{
    /* margin-left: 75px; */
  }
  .homeInquiryBox p{
    float: left;
    /* width: 150px;
    width: 180px; */
    /* margin-left: 20px; */
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .homeInquiryBox p img{
    width: 200px;
    height: 100px;
  }
  .homeInquiryBox ul{
    float: left;
    width: 290px;
    margin-left: 20px;
    margin-top: 20px;
    line-height: 26px;
  }
  .homeInquiryBox ul li:first-of-type{
    font-size: 18px;
  }
  .homeInquiryBox ul li:last-of-type{
    color: #777;
  }
  .homeInquiryLeft{
    float: left;
    margin-left: 30px;
  }
</style>
