<template>
    <div class="bottomBox">
        <el-row>
            <el-col :span="6">
                <router-link  :to="{path:'/school'}">
                    <span class="iconfont icon-xuexiao1"></span>
                    <p>国际学校库</p>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link  :to="{path:'/schoolIndex'}">
                    <span class="iconfont icon-jigou"></span>
                    <p>教育机构库</p>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link  :to="{path:'/schoolTalent'}">
                    <span class="iconfont icon-02"></span>
                    <p>教育人才库</p>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link  :to="{path:'/schoolTalent'}">
                    <span class="iconfont icon-shuju"></span>
                    <p>项目数据库</p>
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.bottomBox{
    padding:10px 0;
    width:100%;
    background:#fff;
    position: fixed;
    bottom:0px;
    text-align:center;
    box-shadow: 0 -2px 5px #efefef;
    span{
        font-size: 20px;
    }
    p{
        margin-top:10px;
        font-size: 12px;
    }
}
</style>
