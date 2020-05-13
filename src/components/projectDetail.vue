<template>
    <div class="projectDetail">
        <!-- <div class="container-fluid">
            <ol class="breadcrumb">
                <li>首页</li>
                <li>项目数据库</li>
                <li style= "color:#000033" class="projectName">{{projectDetail.subjectname}}</li>
            </ol>
        </div> -->
        <div class="container top">
            <div class="row topContent">
                <div class="col-lg-4">
                    <!-- <img :src="projectDetail.subjectLogo=='0'?'../assets/project/project01.jpg':projectDetail.subjectLogo" alt="重庆德普" class="img-responsive"> -->
                    <img src="../assets/project/project01.jpg" alt="重庆德普" class="img-responsive">
                </div>
                <div class="col-lg-8 rightContent">
                    <h3 class="text-center projectName">{{projectDetail.subjectname}}</h3>
                    <p >项目简介:</p>
                    <p class="SubjectIntroduction">{{projectDetail.subjectintroduction}}</p>
                </div>
            </div>
        </div>
        <div class="container basic">
            <div class="row basicContent">
                <div class="col-lg-12">
                    <div class="baseInfo">
                        <h5>基本信息</h5>
                        <p><span>项目标签：</span><span class="SubjectLabel">{{projectDetail.subjectlabel}}</span></p>
                        <p><span>项目地点：</span><span class="Areas">{{projectDetail.areas}}</span> <span class="Areas02">{{projectDetail.areas02 | isArea}}</span> <span class="Areas03">{{projectDetail.areas03 | isArea}}</span></p>
                        <p><span>发布单位：</span><span class="Company">{{projectDetail.company}}</span></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container basic">
            <div class="row basicContent">
                <div class="col-lg-12">
                    <div class="baseInfo">
                        <h5>项目详细</h5>
                        <p><span>项目要求：</span><span class="SubjectLabel">{{projectDetail.requirement | isnull}}</span></p>
                        <p><span>详细信息：</span><span class="Company">{{projectDetail.detailinstitution | isnull}} </span></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container basic">
            <div class="row basicContent">
                <div class="col-lg-12">
                    <div class="baseInfo">
                        <h5>联系方式</h5>
                        <p><span>联系人：</span><span class="SubjectLabel">{{projectDetail.name}}</span></p>
                        <p><span>电话：</span><span class="Company">{{projectDetail.phone}} </span></p>
                        <p><span>邮箱：</span><span class="Company">{{projectDetail.mail}} </span></p>
                    </div>
                </div>
            </div>
        </div>
      <schoolFooter />
        
    </div>
    
</template>

<script>
import schoolFooter from './schoolFooter'
import {getProjectDetail} from '@/api/api'
export default {
    components:{
        schoolFooter
    },
    data() {
        return {
            projectDetail:""
        }
    },
    filters:{
        isnull(obj){
            if(obj=="0"){
                return "暂无"
            }else{
                return obj
            }
        },
        isArea(area){
            if(area == "0"){
                return ""
            }else{
                return area
            }
        }
    },
    methods:{        
        getDetail(){
            getProjectDetail({
                projectId: this.$route.query.id
            }).then(res=>{
                this.projectDetail=res.data
            })
        }
    },
    mounted(){
        this.getDetail()
    },
}
</script>

<style lang="less">
.projectDetail{
    background: #f5f5f5;
    .top{
        margin-bottom: 10px;
        .topContent{
            background: #fff;
            margin-top:20px;
            padding-top:15px;
            padding-bottom:15px;
            .rightContent{
                h3{
                    font-weight: bold;margin-top:10px;
                }
                p{
                    &:first-of-type{
                        font-weight: bold;
                        margin:20px 0;
                    }
                    &:last-of-type{
                        text-indent: 2em;
                        line-height: 1.5;
                    }
                }
            }
        }
    }
    .basic{
        .basicContent{
            background: #fff;
            margin-top:30px;
            border-left:15px solid rgb(33,80,137);
            padding: 15px 0;
            .baseInfo{
                h5{
                    font-size:16px;
                    color:rgb(33,80,137);
                    font-weight: bold;
                    margin-bottom:0;
                    padding-bottom:10px;
                    border-bottom: 1px solid rgb(33,80,137);
                }
                p{
                    padding-top:10px;
                    text-indent: 2em;
                    line-height: 2;
                    span{
                        &:first-of-type{
                            font-weight: bold;
                        }
                    }
                }
            }
        }

    }

}

</style>
