<template>
    <div>
        <div class="detailBox">
          <div class="detailTop">
              <div class="companyLeft">
                  <img :src="detail.institutionLogo?detail.institutionLogo:'http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png'" alt="" width="170">
              </div>
              <div class="conpanyRight">
                  <p>{{detail.name}}</p>
                  <p>机构标签：<span v-for="(everylabel,index) of labelsplit" :key="index">{{everylabel}}</span></p>
              </div>
          </div>  
          <div class="detailContent">
                <h1 class="companyTitle">基本信息</h1> 
                <div class="basic">
                    <el-row>
                        <el-col :span="8">类型：<span>{{detail.type}}</span></el-col>
                        <el-col :span="8">成立时间：<span>{{detail.foundedTime}}</span></el-col>
                        <el-col :span="8">官网：<span @click="toWebsite(detail.website)" class="website">{{detail.website | isZero}}</span></el-col>
                        <el-col :span="24">地址：<span>{{detail.areas01 | isOther}}{{detail.areas02 | isOther}}{{detail.areas03}}</span></el-col>
                    </el-row>
                </div>
                <h1 class="companyTitle">联系方式</h1>
               <div class="contact">
                    <el-row>
                        <el-col :span="12">个人姓名：<span>{{detail.contactname}}</span></el-col>
                        <el-col :span="12">个人职位：<span>{{detail.contactposition}}</span></el-col>
                        <el-col :span="12">联系电话：<span>{{detail.contactphone}}</span></el-col>
                        <el-col :span="12">联系邮箱：<span>{{detail.contactmail}}</span></el-col>
                    </el-row>
               </div>
               <h1 class="companyTitle">服务介绍</h1>
               <div class="introduce">
                   <p>服务简介<br><span>{{detail.service}}</span></p>
                   <p>过往服务学校<br><span>{{detail.servedschool | isZero}}</span></p>
               </div>
               <h1 class="companyTitle" :class="introduction?'show':'hide'">详细介绍</h1>
               <div class="introduceMore" ref="obj">
                   <p class="short" :style="'height:'+introductionHeight+'px'" :class="short?'show':'hide'">{{detail.introduction | isOther}}</p>
                   <p class="long" :class="long?'show':'hide'">{{detail.introduction | isOther}}</p>
                   <span @click="more" :class="showMore?'show':'hide'">展开更多</span>
               </div>
               <h1 class="companyTitle">详情备注</h1>
               <div class="remark">
                   <p>投资信息：{{detail.investment | isZero}}</p>
                   <p>备注：{{detail.remark | isZero}}</p>
               </div>
          </div>
        </div>
        <school-footer></school-footer>
    </div>
</template>

<script>
import SchoolFooter from "./schoolFooter.vue";
import {companyDetail} from "@/api/api";
export default {
    components: {
        SchoolFooter,
    },
    data(){
        return{
            detail:{},
            labelsplit:[],
            short:true,
            long:false,
            showMore:false,
            introduction:true,
            introductionHeight:"",
        }
    },
    filters:{
        isOther(obj){
            if(obj=="其他" || obj == "0"){
                return ''
            }else{
                return obj
            }
        },
        isZero(value){
            if(value==0){
                return '暂无'
            }else{
                return value
            }
        }
    },
    methods:{
        getDetail(){
            let that=this
            let companyId=that.$route.query.id
            companyDetail({
                institutionId:companyId,
            }).then(res=>{
                that.detail=res.data
                that.introduction= that.detail.introduction
                if(that.detail.introduction=="0"){
                    that.introduction=false
                    this.introductionHeight=0
                }else{
                    that.introduction=true
                }
                // 分割标签
                var label = res.data.label;
                that.labelsplit = label.split(";");
                that.labelsplit = that.labelsplit.slice(0, that.labelsplit.length - 1)
                this.$nextTick(()=>{
                    if (this.$refs.obj.offsetHeight > 210) {
                        this.showMore = true;
                        this.introductionHeight=210
                    }else{
                        this.showMore = false;
                    }
                })
                
            })
        },
        // 点击跳转到学校网站 判断是否带有http  
        toWebsite(web){
            if(web.substr(0, 7).toLowerCase() == "http://" || web.substr(0, 8).toLowerCase() == "https://"){
                window.open(web,"_blank")
            }else{
                window.open("http://"+web,"_blank")
            }
        },
        more(){
            this.short=false
            this.long=true
            this.showMore=false
        }
    },
    mounted(){
        this.getDetail()
    }

}
</script>

<style lang="less" scoped>
    .detailBox{
        width:1110px;
        margin:65px auto;
        border-radius: 5px;
        padding:20px 30px;
        border:1px solid #ddd;
        .detailTop{
            position: relative;
            .conpanyRight p{
               &:first-of-type{
                    position: absolute;
                    top: 50px;
                    left: 240px;
                    font-size: 25px;
                    font-weight: bold;
                    letter-spacing: 1px;
               }
               &:nth-of-type(2){
                    position: absolute;
                    top: 100px;
                    left: 240px;
                    font-size: 18px;
                    span{
                        background: #214f89;
                        margin-right: 7px;
                        color: #fff;
                        border-radius: 10px;
                        font-size: 16px;
                        text-align: center;
                        padding: 5px 10px;
                        margin: 5px 7px;
                        display: inline-block;
                        letter-spacing: 1px;
                    }
               }
            }
        }
        .detailContent{
            .companyTitle{
                margin: 50px 0 20px;
                font-size: 20px;
                font-weight: bold;
                color: #fff;
                background: -webkit-linear-gradient(left, #6b83a2 40%, #214f89);
                width: 10%;
                padding: 8px 0px;
                border-radius: 5px;
                text-align: center;
            }
            .basic {
                padding:0 50px;
                .el-row .el-col{
                    font-size: 16px;
                    margin:10px 0;
                    span{
                        font-weight: bold;
                        &.website{
                            cursor: pointer;
                            &:hover{
                                color:#214f89;
                            }
                        }
                    }
                }
            }
            .contact {
                padding:0 50px;
                .el-row .el-col{
                    font-size: 16px;
                    margin:10px 0;
                    span{
                        font-weight: bold;
                    }
                }
            }
            .introduce{
                padding:0 50px;
                p{
                    font-size: 16px;
                    line-height: 30px;
                    color: #214f89;
                    font-weight: 600;
                    span{
                        font-weight: 400;
                        color:#333;
                        margin: 10px 0;
                        display: inline-block;
                    }
                }
            }
            .introduceMore{
                padding:0 50px;
                font-size: 16px;
                line-height: 30px;
                p.short{
                    overflow: hidden;
                }
                span{
                    color: #214f89;
                    font-weight: bold;
                    cursor: pointer;
                }
            }
            .remark{
                padding:0 50px;
                p{
                    font-size: 16px;
                    margin:10px 0;
                    line-height:30px;
                }
            }
        }
    }
</style>
