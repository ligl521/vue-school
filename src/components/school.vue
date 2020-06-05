<template>
  <div id="container">
    <!-- 搜索学校 -->
    <div class="searchSchool">
        <div id="searchBar">
            <el-autocomplete
            id="schoolInput"
            v-model="input"
            :fetch-suggestions="querySearch"
            placeholder="请输入学校关键字"
            :trigger-on-focus="false"
            @select="handleSelect"
            @keyup.enter.native="getschool"
            class="inputBtn"
            >
            <el-button slot="append" id="searchBtn" type="primary"  @click="getschool"><i class="iconfont icon-sousuo"></i></el-button>
            </el-autocomplete>
            <p>注：国际学校库包括的中国大陆国际学校，其中获得认证或授权的学校有821所。(截止至2018年11月11日)</p>
        </div>
        <div class="schoolSiku">
             <p>加入国际学校库</p> 
             <p @click="addschool">马上加入</p>
        </div>
    </div>
    <div class="advancedSearch">
        <div class="searchBox">
            <div class="area">
                <ul class="clearfix">
                    <li>选择地区：</li>
                    <li  v-for="(everyArea,index) in areaSplit" :key="index" @click="clickArea(everyArea,index)" :class="areaClass==index?'clickStyle':''">{{everyArea}}</li>
                </ul>
            </div>
            <div class="line"></div>
            <div class="grade">
                <ul class="clearfix">
                    <li>办学性质：</li>
                    <li  v-for="(everySys,index) in sysSplit" :key="index" @click="clickSys(everySys,index)" :class="sysClass==index?'clickStyle':''">{{everySys}}</li>
                </ul>
            </div>
            <div class="line"></div>
            <div class="grade">
                <ul class="clearfix">
                    <li>学制要求：</li>
                    <li  v-for="(everyGrade,index) in gradeSplit" :key="index" @click="clickGrade(everyGrade,index)" :class="gradeClass==index?'clickStyle':''">{{everyGrade}}</li>
                </ul>
            </div>
            <div class="line"></div>
            <div class="grade">
                <ul class="clearfix">
                    <li>课&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;程：</li>
                    <li  v-for="(everyApprove,index) in approveSplit" :key="index" @click="clickApprove(everyApprove,index)" :class="approveClass==index?'clickStyle':''">{{everyApprove}}</li>
                </ul>
            </div>
        </div>
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
    <div class="schoolDetail" v-if="schoolDetail"  v-loading="isLoading"> 
      <span id="search_res">{{this.no_school}}</span>
      <el-row :gutter="50" type="flex" style="flex-wrap:wrap">
        <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="3" v-for="(item,index) in schoolLists" :key="index">
            <div class="grid-content bg-purple" @click="enterSchoolDetail(item.id)">
              <div class="logoimg" v-if="item.schoolLogo? true:false">
                <img :src="item.schoolLogo" />
              </div>
              <div class="logoimg" v-if="item.schoolLogo? false:true">
                <img :src="schoolLogoUrlTwo" />
              </div>
              <ul>
                <li class="schoolName">{{item.schoolName | ellipsisName}}</li>
                <li>建校时间：{{item.foundingTime | iszero}}</li>
                <li v-if="isSchoolSystem!=''">学制：<span v-for="(v,i) in item.schoolSystem" :key="i">{{v}}，</span></li>
                <li v-else></li>
              </ul>
            </div>
        </el-col>
      </el-row>
    </div>
    <!-- 学校展示列表two -->
    <div class="schoolDetailTwo" v-if="!schoolDetail" v-loading="isLoading" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate="false">
        <span id="search_res">{{this.no_school}}</span>
        <div class="detailBox" v-for="(item,i) in schoolLists" :key="i" @click="enterSchoolDetail(item.id)">
            <div class="DeatailTwoLeft"><img :src='item.schoolLogo?item.schoolLogo:"https://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png"' /></div>
            <div class="DeatailTwoCenter" id="DeatailTwoCenterId">
            <ul>
                <li>{{item.schoolName | ellipsisSchoolNameTwo}}<span :class="item.operationState!=='运营中'?'operationA':'operationB'">{{item.operationState}}</span></li>
                <li>类型：<span>{{item.schoolProperties}}</span>
                    <p v-if="isSchoolSystem!=''">学制：<span v-for="(v,i) in item.schoolSystem" :key="i">{{v}}</span></p>
                    <p v-else></p>
                </li>
                <li>课程：<span>{{item.course | iszero}}</span></li>
            </ul>
            </div>
            <div class="DeatailTwoRight">
                <ul>
                    <li>地址：<span>{{item.province | ellipsisAddress}}</span></li>
                    <li>建校时间：<span>{{item.foundingTime | iszero}}</span></li>
                    <li>认证：<span v-for="(v,i) in item.authentication" :key="i" :class="v=='无'?'authenticationNull':'authenticationText'">{{v}}</span></li>
                </ul>
            </div>
        </div>
    </div>
    <p class="finish" v-show="finish" style="padding: 10px 0 70px 0;text-align:center;">没有更多了</p>
    <!-- 分页组件 -->
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total_school"
      ></el-pagination>
    </div>
    <bottomMenuH5 class="bottomMenuH5"></bottomMenuH5>
    <schoolFooter />
  </div>
</template>

<script>
//ajax请求
import axios from "axios";
import { getSchoolLibrary,getadvancedSearch } from "@/api/api";
import loding from "@/components/loding";
import schoolFooter from "./schoolFooter";
import bottomMenuH5 from "./bottomMenuH5"
import { isUndefined } from "util";
export default {
    components: {
        loding,
        schoolFooter,
        bottomMenuH5
    },
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
      schoolLogoUrlTwo:"https://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png",
      areaSplit:[],
      searchArea:"",
      areaClass:0,
      advancedList:{areas: "不限;北京;上海;天津;重庆;浙江;江苏;广东;福建;湖南;湖北;辽宁;吉林;河北;河南;山东; 陕西;甘肃;新疆;青海;山西;四川;贵州;安徽;江西;云南;西藏;广西;宁夏;海南;香港;澳门;台湾;黑龙江;内蒙古"},
      sysSplit:[],
      searchSys:'',
      sysClass:0,
      sysList:{sys: "不限;民办;外籍;公办;其他"},
      gradeSplit:[],
      searchGrade:'',
      gradeClass:0,
      gradeList:{grade: "不限;高中;初中;小学;幼儿园"},
      approveSplit:[],
      searchApprove:'',
      approveClass:0,
      approveList:{approve: "不限;IPC;IBPYP;IBDP;AP;A-LEVEL;美国课程;双语课程;加拿大课程;其他"},
      loading: false, //默认是false 可以滚动哦！
      finish:false,
      isLoading:true,
      isSchoolSystem:"",
    };
  },
  created() {
    this.input = this.$route.query.item;
  },
  methods: {
      //coolie 读取存在
    getCookie(name) {
      var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    // 加入学校
    addschool(){
        if(this.getCookie("username") == null){
            this.$message({
                message: '您还没有登录，登陆后即可加入！',
                type: 'warning'
            });
        }else{
            this.$router.push('/schoolAdd');
        }
    },
    enterSchoolDetail(id){
        if(this.getCookie("username") == null){
            this.$message({
                message: '您还没有登录，登陆后即可查看！',
                type: 'warning'
            });
        }else{
            let routeData= this.$router.resolve({path: '/schoolDetail',query:{id:id}})
            window.open(routeData.href, '_blank');
        }
    },
    querySearch(queryString, cb) {
      let that = this;
      let urldata = new URLSearchParams();
      urldata.append("keyword", that.input);
      axios
        .post(
          "https://data.xinxueshuo.cn/nsi-1.0/school/suggest_search.do",
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
    clickArea(value,index){
        this.areaClass=index
        this.pageNum=1
        this.currentPage=1
        if(value=='不限'){
            this.searchArea=''
        }else{
            this.searchArea=value
        }
        this.advancedSearch()
    },
    clickGrade(value,index){
        this.gradeClass=index
        this.pageNum=1
        this.currentPage=1
        if(value=='不限'){
            this.searchGrade=''
        }else{
            this.searchGrade=value
        }
        this.advancedSearch()
    },
    clickSys(value,index){
        this.sysClass=index
        this.pageNum=1
        this.currentPage=1
        if(value=='不限'){
            this.searchSys=''
        }else{
            this.searchSys=value
        }
        this.advancedSearch()
    },
    clickApprove(value,index){
        this.approveClass=index
        this.pageNum=1
        this.currentPage=1
        if(value=='不限'){
            this.searchApprove=''
        }else{
            this.searchApprove=value
        }
        this.advancedSearch()
    },
    searchSplit(){
        this.areaSplit=this.advancedList.areas.split(";")
        this.sysSplit=this.sysList.sys.split(";")
        this.gradeSplit=this.gradeList.grade.split(";")
        this.approveSplit=this.approveList.approve.split(";")
    },
    advancedSearch(){
        getadvancedSearch({
            area:this.searchArea,
            system:this.searchGrade,
            properties:this.searchSys,
            course:this.searchApprove,
            pageNum:this.pageNum,
            pageSize:this.pageSize,
        }).then(respons=>{
            var that=this
            if(respons.code==0){
                that.schoolLists = respons.data.list;
                //判断有无搜索结果
                that.total_school = respons.data.total;
                that.total_school == 0 ? (that.no_school = "未搜索到结果，请重新输入关键字！") : (that.no_school = "");
                // console.log("查询成功")
               
                for (var i = 0; i < respons.data.list.length; i++) {
                    // 学制
                    var str = respons.data.list[i].schoolSystem;
                    if (str.search("；") != -1) {
                        var arr1 = str.split("；");
                    }else{
                        var arr1 = str.split(";");
                    }
                    var arr2 = arr1.slice(0, arr1.length - 1);
                    var arr3 = [];
                    for (var j = 0; j < arr2.length; j++) {
                        arr3.push(arr2[j].slice(0, 1));
                    }
                    respons.data.list[i].schoolSystem = arr3;
                    // 认证课程
                    var cardArr1 = respons.data.list[i].authentication;
                    if(cardArr1 == "无" || cardArr1 == "0" || cardArr1 == ""||cardArr1 == "0;"){
                        respons.data.list[i].authentication = "无"
                    }else{
                        var cardArr2 = cardArr1.split(";");
                        var cardArr3 = cardArr2.slice(0,cardArr2.length-1);
                        respons.data.list[i].authentication = cardArr3;
                    }
                }
            }else{
                console.log("查询失败")
            }
        })
    },
    //搜索提示的点击操作
    handleSelect(item) {
      console.log(111);
      this.getschool();
    },  
    schoolList() {
      //获取学校List数据(包括学校搜索)
      getSchoolLibrary({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        searchKey: this.input
      }).then(respons => {
        let that = this;
        that.isLoading=false
        if(screen.width<768){
            that.schoolLists = that.schoolLists.concat(respons.data.list);
            this.pageNum++
            if(respons.data.total < 24 & respons.data.total>0) {
                that.finish = true;
                that.no_school = ""
            }else if(respons.data.total==0){
                that.finish = false;
                that.no_school = "未搜索到结果，请重新输入关键字！"
            }else{
                that.finish = false; 
                that.no_school = ""
            }
        }else{
            that.schoolLists = respons.data.list;
             that.total_school = respons.data.total;
            //判断有无搜索结果
            that.total_school == 0
            ? (that.no_school = "未搜索到结果，请重新输入关键字！")
            : (that.no_school = "");
        }
        //截取 幼 小 中 高
        for (var i = 0; i < respons.data.list.length; i++) {
          var str = respons.data.list[i].schoolSystem;
          this.isSchoolSystem=respons.data.list[i].schoolSystem
          if (str.search("；") != -1) {
            var arr1 = str.split("；");
          }else{
            var arr1 = str.split(";");
          }
        //   去除最后空格
          var arr2 = arr1.slice(0, arr1.length - 1);
          var arr3 = [];
          for (var j = 0; j < arr2.length; j++) {
            arr3.push(arr2[j].slice(0, 1));
          }
          respons.data.list[i].schoolSystem = arr3;
        }
        //截取 学校 类型 民办
        for(var i=0;i < respons.data.list.length; i++){
            var properties = respons.data.list[i].schoolProperties
            if(properties==''){
                respons.data.list[i].schoolProperties='无'
            }else{
                respons.data.list[i].schoolProperties = properties.substring(0,1);
            }
        }
        //认证 分割
        for(var i=0;i<respons.data.list.length;i++){
          var cardArr1 = respons.data.list[i].authentication;
          if(cardArr1 == "无" || cardArr1 == "0" || cardArr1 == ""||cardArr1 == "0;" || cardArr1 == 0){
            respons.data.list[i].authentication = "无"
          }else{
            if (cardArr1.search("；") != -1) { 
                var cardArr2 = cardArr1.split("；");
            }else{
               var cardArr2 = cardArr1.split(";");
            }
            var cardArr3 = cardArr2.slice(0,cardArr2.length-1);
            respons.data.list[i].authentication = cardArr3;
            // if(cardArr3.length>5){
            //   cardArr3.length=5
            // }
          }
          
        }
       
      });
    },
    loadMore() {
        if(screen.width < 768){
             this.schoolList();
        }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //分页
    handleCurrentChange(val) {
      this.pageNum = val;
      if(this.areaClass!=0||this.gradeClass!=0||this.approveClass!=0||this.sysClass!=0){
        this.advancedSearch(sessionStorage.getItem("iptVal"))
      }else{
        this.schoolList(sessionStorage.getItem("iptVal"));
      }
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
    },
    // 点击搜索
    getschool(){
        this.schoolLists=[]
        this.pageNum=1
        this.schoolList();
    },
    // 判断是否有上一页
    goBack: function(){
        console.log(window.history.length)
        if (window.history.length <= 1) {
            window.location.href='../index.html'
            return false
        } else {
            window.history.go(-1);
        }
    },

  },
  mounted() {
      this.searchSplit()
      if(screen.width < 768){
        this.schoolDetail = false;
        this.chageIcon = true;
      }else{
          this.schoolList();
      }
  },

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
      if(value.length > 10 && screen.width<768){
        return value.slice(0,10) + "...";
      }
      return value
    },
    iszero(obj){
        // console.log(obj)
        if(obj==0 || obj==null || obj=="0" || obj == "无" || obj == ""||obj == "0;"){
            return "暂无"
        }else{
            return obj
        }
    }
  }
};
</script>
<style lang="less" scoped type="text/less">
.bottomMenuH5{
    display: none;
    @media screen and(max-width: 768px){
        display: block;
    }
}
@media screen and (max-width: 768px)  {
    .advancedSearch,.toggleBut,.schoolDetail,.block,.schoolSiku{
        display:none;
    }
    .inputBtn{
        width:350px !important;
    }
    #searchBar{
        padding: 20px 0 10px !important;
        p{
            display:none;
        }
    }
    .schoolDetailTwo{
        .detailBox{
            background:#fff !important;
            .DeatailTwoLeft{
                height:100px;
                img{
                    width:80px !important;
                }
            }
            .DeatailTwoCenter ul li{
                &:first-of-type{
                    font-size: 16px;
                    color: #010101;
                    margin-top: 12px;
                    .operation{
                        font-size: 14px !important;
                        border:1px solid #ccc;
                    }
                }
                &:nth-of-type(2){
                    font-size: 16px !important;
                    margin-top:15px !important;
                    p{
                        font-size: 16px;
                        text-align: center;
                        margin-left: 20px !important;
                    }
                }
                &:nth-of-type(3){
                    font-size: 16px !important;
                    margin-top:15px;
                    span{
                        font-size: 14px;
                    }
                    p span{
                        padding:2px 3px;
                    }
                }
            }
        }
        .loading{
            text-align: center;
            font-size: 16px;
            padding: 5px;
            color: #999;
        }
    }
}
.advancedSearch{
    width: 1000px;
    margin: 50px auto 0;
    border-radius: 5px;
    background:#fff;
    &:hover{
        box-shadow:0px 0px 20px rgba(153, 153, 153, 0.8);
        transition: all 0.5s;
    }
    .searchBox{
        padding: 25px 20px 50px;
        .line{
            border-bottom: 1px dashed #c1c2c3;
            width: 800px;
            margin:0 0 8px 105px;
            display: inline-block;
        }
        .area ul,.grade ul{
            &.clearfix{
                clear:both;
                height:0;
                content:'';
                display:block;
            }
            li{
                float:left;
                margin:0 20px 10px 0;
                cursor: pointer;
                padding: 7px 10px;
                border-radius: 2px;
                &.clickStyle{
                    background:#214f89;
                    color:#fff;
                }
                &:first-of-type{
                    color: #949ba1;
                    font-size: 16px;
                    margin-right:10px;
                    height:70px;
                    &:hover{
                        background:#f5f5f5;
                        color:#949ba1;
                    }
                }

            }
        }
        .grade ul li:first-of-type{
            height:0;
            // width:100px;
            // text-align: right;
        }
    }
}
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



//学校搜索
.searchSchool{
  display: flex;
  justify-content: center;
  #searchBar {
    display: inline-table;
    padding: 55px 0 10px;
    p{
        color: #a19c9c;
        font-size: 14px;
        margin-top: 30px;
    }
  }
  #schoolInput {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 200%;
    margin-left: -200px;
  }
  .schoolSiku{
    width: 280px;
    height: 100px;
    border-radius: 10px;
    background-color: #eaf4ff;
    color: #215089;
    font-weight: bold;
    text-align: center;
    margin: 50px 0 0 70px;
    p:first-of-type{
        padding-top: 20px;
        font-size: 20px;
        color: #215089;
        font-weight: bold;
        letter-spacing: 1px;
    }
    p:last-of-type{
        border-radius: 20px;
        padding: 8px 25px;
        margin-top: 10px;
        display: inline-block;
        background-color: #215089;
        color: #fff;
        transition: all .3s;
        letter-spacing: 1px;
    }
  }
  .schoolSiku:hover{
    cursor: pointer;
    color: #3075c9;
  }
}
.school_infomation {
  line-height: 25px;
  margin-top: 10px;
}
#searchBtn {
    i{
        font-size: 30px;
        color:#fff;
    }
}
.inputBtn{
    border-radius: 6px !important;
    border: 2px solid #214f89 !important;
    width:400px;
}
.inputBtn:focus {
    box-shadow: 0px 0px 10px #214f89 !important;
    border-color:#fff;
}




// 学校列表
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
  box-shadow: 0px 0px 10px rgba(153, 153, 153, 0.8);
  transition:all .5s;
  cursor: pointer;
}
.grid-content ul {
  margin-bottom: 20px;
  line-height: 30px;
  color: #777;
}
.grid-content ul li{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
    width: 650px;
  }
  .schoolDetailTwo {
    width: 65%;
    margin: 0 auto;
    .detailBox {
      border: 1px solid #ccc;
      margin-top: 0.2rem;
      border-radius: 10px;
      background: #fff;
      &:hover{
        box-shadow: 0px 0px 10px rgba(153, 153, 153, 0.8);
        transition:all .5s;
      }
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
//   background: #f5f5f5;
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
    width: 50%;
    ul{
      li{
        margin-top: 0.1rem;
        color: #999;
      }
      li:first-of-type{
        font-size: 0.2rem;
        font-weight: bold;
        color: #2c2c2c;
        cursor: pointer;
        a{
            text-decoration: none;
        }
        .operationA{
            font-size: 12px !important;
            border: 1px solid #10a050;
            position: relative;
            top: -5px;
            margin-left: 20px;
            padding: 3px 8px;
            color: #10a050;
            border-radius: 3px;
        }
        .operationB{
           display: none;
        }
      }
      li:nth-of-type(2){
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
          font-size: 0.13rem;
          display:inline;
          width: 12px;
          height: 12px;
          text-align: center;
          line-height: 12px;
          padding: 0.05rem 0.05rem;
          border-radius: 0.05rem;
          color: #337ddb;
          background: #cedff4;
        }
        
      }
      li:nth-of-type(3){
          width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          span{
                font-size: 16px;
                color: #333;
          }
      }
    }
  }
  .DeatailTwoRight{
    width: 30%;
    ul{
      li{
        margin-top: 0.1rem;
        color:#999;
      };
      li:nth-of-type(3){
        .authenticationText{
          font-size: 0.12rem;
          display:inline;
          text-align: center;
          line-height: 12px;
          padding: 0.05rem 0.05rem;
          border-radius: 0.05rem;
          color: #337ddb;
          background: #cedff4;
          margin-right: 8px;
        }
        .authenticationNull{
          display:inline;
          text-align: center;
          line-height: 12px;
          padding: 0.05rem 0.05rem;
          border-radius: 0.05rem;
          margin-right: 8px;
        }
      }
      li:nth-of-type(2){
          span{
              color:#333;
              font-size: 16px;
          }
      }
      li:nth-of-type(1){
          span{
              color:#333;
              font-size: 16px;
          }
      }
    }
  }
}

</style>
<style>
.el-input-group__append {
    border: 0;
    background: #214f89;
}
</style>
