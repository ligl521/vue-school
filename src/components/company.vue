<template>
    <div style="background: #f5f5f5;">
        <div class="companyGroup">
            <div class="searchBox">
                <el-input placeholder="请输入内容" v-model="searchKey">
                    <template slot="append"><i class="iconfont icon-sousuo"  @click="searchCompany"></i></template>
                </el-input>
            </div>
        </div>
        <div class="companyList" v-for="(item,index) in list" :key="index">
            <div class="companyLogo">
                <img :src='item.institutionLogo?item.institutionLogo:"http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png"' >
            </div>
            <div class="companyContent">
                <div class="contentLeft">
                    <p> <a :href="xinxueshuoSite+'companyDetail?id='+item.id" target="_blank">{{item.name}}</a></p>
                    <p>标签：{{item.label}}</p>
                    <p><span>类型：{{item.type}}</span><span>地址：{{item.areas}}</span></p>
                </div>
                <div class="contentRight">
                    <p>成立时间：{{item.foundedTime}}年</p>
                    <p>提交时间：{{formatDateTime(new Date(Number(item.loadTime)))}}</p>
                </div>
            </div>
        </div>
        <div v-html="searchNull" class="searchNull"></div>
        <!-- 分页组件 -->
        <div class="block">
            <span class="demonstration"></span>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="totalNum">
            </el-pagination>
        </div>
        <schoolFooter />
    </div>
</template>

<script>
import schoolFooter from './schoolFooter'
import {companyList} from "@/api/api";
export default {
    components:{
        schoolFooter
    },
  data() {
    return {
      pageNum:1,
      pageSize:24,
      searchKey:'',
      list:[],
      currentPage1: 1,
      totalNum:'',
      xinxueshuoSite:"http://data.xinxueshuo.cn/vue-project/dist/index.html#/",
      searchNull:''
    }
  },
  methods:{
    getList(){
        let that=this
        companyList({
            pageNum:that.pageNum,
            pageSize:that.pageSize,
            searchKey:that.searchKey
        }).then(res=>{
            that.list=res.data
            that.totalNum=res.count
            if(that.totalNum==0){
                that.searchNull="未搜索到结果，请重新输入关键字！"
            }else{
                that.searchNull=''
            }
        })
    },
    searchCompany(){
        this.getList()
    },
    // 时间戳
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
        return m + '月' + d + '日'
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
    },
  },
  mounted() {
      this.getList()
  },
}
</script>
<style lang="less" scoped>
.companyGroup{
    text-align: center;
    .searchBox{
        width: 450px;
        display: inline-block;
        margin-top: 50px;
        i{
            font-size: 40px;
            color: #fff;
        }
    }
}
.companyList{
    width: 60%;
    margin: 50px auto 0;
    border: 1px solid #ccc;
    position: relative;
    border-radius: 10px;
    background: #f9f9f9;
    &:first-of-type{
        margin-top:80px !important;
    }
    &:hover{
        box-shadow: 0px 0px 15px #ccc;
    }
    .companyLogo{
        img{
            padding: 20px 30px;
            width: 200px;
            height:170px;
        }
    }
    .contentLeft{
        position: absolute;
        top: 25px;
        left: 200px;
        p{
            margin-top: 18px;
            &:first-of-type{
                font-size: 20px;
            }
            &:nth-of-type(2){
                font-size: 16px;
            }
            &:nth-of-type(3){
                font-size: 16px;
            }
            span{
                margin-right:10px;
            }
            a{
                &:hover{
                    text-decoration: none;
                }
            }
        }
    }
    .contentRight{
        position: absolute;
        top: 65px;
        right: 35px;
        p{
            margin-top: 20px;
            &:first-of-type{
                font-size: 16px;
            }
            &:last-of-type{
                font-size: 16px;
            }
        }
    }
}
.block{
    text-align: center;
    margin: 88px 0;
}
.searchNull{
    text-align: center;
    margin: 170px 0;
}
</style>
<style>
    .companyGroup .el-input__inner{
        height: 50px !important;
        border: 2px solid #214f89;
    }
    .companyGroup .el-input-group__append {
        border: 0;
        background: #214f89;
    }
</style>