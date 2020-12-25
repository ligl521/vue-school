<template>
    <div>
        <div class="schoolUpload">
            <div class="uploadTitle">
                <h2>学校信息 提交成功</h2>
                <h4>您还可以上传学校logo和环境图，让我们更了解这所学校</h4>
                <div id="cover1" :class="active1 ? 'active1' : 'hide1'"></div>
                <div :class="active1 ? 'show1' : 'hide1'">
                    <h3 class="show_title1">logo裁剪</h3>
                    <i class="el-icon-close guanbi1" @click="close1"></i>
                    <div class="cropper-content1">
                            <div class="cropper1">
                                    <vueCropper
                                        ref="cropper1"
                                        :img="option1.img"
                                        :outputSize="option1.size"
                                        :outputType="option1.outputType"
                                        :info="true"
                                        :full="option1.full"
                                        :canMove="option1.canMove"
                                        :canMoveBox="option1.canMoveBox"
                                        :original="option1.original"
                                        :autoCrop="option1.autoCrop"
                                        :autoCropWidth="option1.autoCropWidth"
                                        :autoCropHeight="option1.autoCropHeight"
                                        :fixedBox="option1.fixedBox"
                                        @realTime="realTime1"
                                        @imgLoad="imgLoad1">
                                    </vueCropper>
                            </div>
                            <div  class="show-preview1">
                                <div :style="previews1.div" class="preview1">
                                    <img :src="previews1.url" :style="previews1.img" />
                                </div>
                                <h4>logo预览</h4>
                            </div>
                    </div>
                    <div class="footer-btn1">
                        <el-button class="ruleForm" type="primary" @click="down1('blob')"
                        >提交</el-button
                        >
                    </div>
                </div>
                <div class="uploadlogo personnel">
                    <div class="scope-btn">
                        <input
                        type="file"
                        id="uploads1"
                        style="position:absolute; clip:rect(0 0 0 0);"
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        @change="uploadImg1($event, 1)"
                        />
                        <img :src="schoolLogo" :class="schoolLogo == ''?'imageUrlHide':'personnel_img'"/>
                        
                    </div>
                    <div slot="tip" class="el-upload__tip upload-right">学校logo图，尺寸200*200px，jpg/png格式，小于500kb
                      <label class="label_btn"  for="uploads1"><span>上传logo</span></label>
                    </div>
                </div>
                <el-divider></el-divider>
                <div id="cover" :class="active ? 'active' : 'hide'"></div>
                <div :class="active ? 'show' : 'hide'">
                    <h3 class="show_title">图片裁剪</h3>
                    <i class="el-icon-close guanbi" @click="close"></i>
                    <div class="cropper-content">
                        <div class="cropper">
                        <vueCropper
                            ref="cropper"
                            :img="option.img"
                            :outputSize="option.size"
                            :outputType="option.outputType"
                            :info="true"
                            :full="option.full"
                            :canMove="option.canMove"
                            :canMoveBox="option.canMoveBox"
                            :original="option.original"
                            :autoCrop="option.autoCrop"
                            :autoCropWidth="option.autoCropWidth"
                            :autoCropHeight="option.autoCropHeight"
                            :fixedBox="option.fixedBox"
                            @realTime="realTime"
                            @imgLoad="imgLoad"
                        ></vueCropper>
                        </div>
                    </div>
                    <div class="footer-btn">
                        <el-button class="ruleForm" type="primary" @click="down('blob')"
                        >提交</el-button
                        >
                    </div>
                </div>
                <div class="scope-btn">
                    <h2>学校环境图</h2>
                    <div class="uploadBanner">
                        <p>只能上传jpg/png文件，最多5张且不超过2M(推荐尺寸1100*400)</p>
                            <input
                            type="file"
                            id="uploads"
                            style="position:absolute; clip:rect(0 0 0 0);"
                            accept="image/png, image/jpeg, image/gif, image/jpg"
                            @change="uploadImg($event, 1)"
                            />
                            <img v-for="(item,index) in bannerBox" :key="index" :src="item.url" class="banner_img" v-if="index<5"/>
                            <label :class="bannerBox.length == 5?'hide':'bannerBoxCss'" for="uploads"><i class="el-icon-plus avatar-uploader-icon"></i></label>
                    </div>
                </div>
                <div class="submit">
                    <el-button  type="primary" @click="submit">提交</el-button>
                </div>
            </div>
        </div>
        <schoolfooter />
    </div>
</template>
<script>
import schoolfooter from "./schoolFooter";
import {schoolUpdate} from '@/api/api'
export default {
  components: {
    schoolfooter
  },
  data() {
    return {
        schoolLogo:"",//头像
        schoolShowOne:"",  //大图1
        schoolShowTwo:"",  //大图2
        schoolShowThird:"",  //大图3
        schoolShowFour:"",  //大图4
        schoolShowFive:"",  //大图5
        active: false,
        previews: {},
        option: {
            img:
            "http:img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png",
            size: 1,
            full: false, // 输出原图比例截图 props名full
            outputType: "png",
            canMove: true,
            original: false,
            canMoveBox: true,
            autoCrop: true,
            autoCropWidth: 1100,
            autoCropHeight: 400,
            fixedBox: true
        },
        previews1: {},
        active1: false,
        option1: {
            img:
            "http:img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png",
            size: 1,
            full: false, // 输出原图比例截图 props名full
            outputType: "png",
            canMove: true,
            original: false,
            canMoveBox: true,
            autoCrop: true,
            autoCropWidth: 200,
            autoCropHeight: 200,
            fixedBox: true
        },
        fileName1: "", //本机文件地址
        schoolBanner:{},
        bannerBox:[],
    };
  },
  created() {
  },
  methods: {
    imgLoad(msg) {
      console.log(msg);
    },
    //关闭裁剪按钮
    close() {
      this.active = false;
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    uploadImg(e, num) {
      console.log(11111)
      this.active = true;
      var _this = this;
      var file = e.target.files[0];
      console.log(file.name)
      _this.fileName = file.name;
      if (!/\.(jpg|png|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是jpg,png中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        console.log(data)
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.example2.img = data;
        }
      };
      // 转化为base64
      //reader.readAsDataURL(file);
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    down(type) {
      // 输出
      if (type === "blob") {
          this.$refs.cropper.getCropBlob(data => {
                let that = this;
                let formData = new FormData();
                formData.append("file",data,that.fileName);
                formData.append("type", "nsi-pc/SchoolShow/");
                that.axios({
                    url: "https://data.xinxueshuo.cn/nsi-1.0/CommonApi/upload.do",
                    method: "POST", //  这个地方注意
                    data: formData,
                    processData: false,
                    contentType: false
                }).then(response => {
                    that.schoolBanner=response.data.data
                    that.active=false
                    that.bannerBox.push((that.schoolBanner))
                    if(that.bannerBox.length==1){
                        that.schoolShowOne=that.bannerBox[0].url
                    }else if(that.bannerBox.length==2){
                        that.schoolShowOne=that.bannerBox[0].url
                        that.schoolShowTwo=that.bannerBox[1].url
                    }else if(that.bannerBox.length==3){
                        that.schoolShowOne=that.bannerBox[0].url
                        that.schoolShowTwo=that.bannerBox[1].url
                        that.schoolShowThird=that.bannerBox[2].url
                    }else if(that.bannerBox.length==4){
                        that.schoolShowOne=that.bannerBox[0].url
                        that.schoolShowTwo=that.bannerBox[1].url
                        that.schoolShowThird=that.bannerBox[2].url
                        that.schoolShowFour=that.bannerBox[3].url
                    }else if(that.bannerBox.length==5){
                         that.schoolShowOne=that.bannerBox[0].url
                        that.schoolShowTwo=that.bannerBox[1].url
                        that.schoolShowThird=that.bannerBox[2].url
                        that.schoolShowFour=that.bannerBox[3].url
                        that.schoolShowFive=that.bannerBox[4].url
                    }else if(that.bannerBox.length>5){
                        this.$message({
                            message: '只能上传五张哦',
                            type: 'warning'
                        });
                    }
                });
                console.log(that.schoolBanner)
                console.log(that.bannerBox)
          })
      }
    },
    submit(){
        let that=this
        schoolUpdate({
            id:this.$route.query.id,
            schoolLogo:that.schoolLogo, //学校logo
            schoolShowOne:that.schoolShowOne,  //大图1
            schoolShowTwo:that.schoolShowTwo,  //大图2
            schoolShowThird:that.schoolShowThird,  //大图3
            schoolShowFour:that.schoolShowFour,  //大图4
            schoolShowFive:that.schoolShowFive,  //大图5
        }).then(res=>{
            if(res.code==0){
                alert("已提交成功、请等待审核")
                this.$router.push({path: "school"});
            }
        })
    },
    //logo
     // 实时预览函数
    realTime1(data) {
      this.previews1 = data;
    },
    down1(type) {
      console.log("finish");
      let _this = this;
      let formData1 = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper1.getCropBlob(data1 => {
          console.log(data1);
          let img1 = window.URL.createObjectURL(data1);
          this.model = true;
          this.modelSrc = img1;
          formData1.append("file", data1, this.fileName1);
          formData1.append("type", "nsi-pc/ResumePortrait/");
          _this
            .axios({
              url: "https://data.xinxueshuo.cn/nsi-1.0/CommonApi/upload.do",
              method: "POST", //  这个地方注意
              data: formData1,
              processData: false,
              contentType: false
            })
            .then(response => {
              console.log("upload_success_response:", response);
              if (response.data.code == 0) {
                this.close1()
                this.schoolLogo = response.data.data.url;
              }
            });
        });
      } else {
        this.$refs.cropper1.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    uploadImg1(e, num) {
      console.log(e)
      this.active1 = true;
      var _this = this;
      var file1 = e.target.files[0];
      _this.fileName1 = file1.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader1 = new FileReader();
      reader1.onload = e => {
        let data1;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data1 = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data1 = e.target.result;
        }
        if (num === 1) {
          _this.option1.img = data1;
        } else if (num === 2) {
          _this.example2.img = data1;
        }
      };
      reader1.readAsArrayBuffer(file1);
    },
    imgLoad1(msg) {
      console.log(msg);
    },
    //关闭按钮
    close1() {
      this.active1 = false;
    }
  },
  
};
</script>

<style lang="less" scoped>
.schoolUpload{
    padding:30px 0;
    background: #f5f5f5;
    .uploadTitle{
    width: 1200px;
    background-color: #fff;
    margin: 0 auto;
    padding: 20px 0px;
    h2 {
        text-align: center;
        color: #214f89;
    }
    h4 {
        font-size: 20px;
        text-align: center;
        color: #bdbdbd;
        margin: 15px 0;
    }
    .uploadlogo{
        display: flex;
        width:500px;
        margin:0 auto;
        .avatar-uploader{
            .el-upload {
                position: relative;
                overflow: hidden;
                &:hover{
                    border-color: #409EFF;
                }
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 148px;
                height: 148px;
                line-height: 148px;
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                text-align: center;
            }
            .avatar {
                width: 148px;
                height: 148px;
                display: block;
                border: 1px solid #ccc;
            }
        }
        .el-upload__tip{
            margin-left:20px;
            font-size: 16px;
            line-height:2;
        }
        
    }
    .el-divider--horizontal {
        display: block;
        height: 1px;
        width: 600px;
        margin: 24px auto;
    }
    .hide {
        display: none;
    }
    .active {
        display: inline-block;
    }
    .show {
        position: fixed;
        left: 50%;
        top: 20%;
        width: 1140px;
        height: 550px;
        z-index: 2222;
        transform: translateX(-50%);
        background-color: #fff;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    #cover {
        position: absolute;
        left: 0px;
        top: 0px;
        background: rgba(0, 0, 0);
        width: 100%; /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
        height: 100%;
        filter: alpha(opacity=60); /*设置透明度为60%*/
        opacity: 0.5; /*非IE浏览器下设置透明度为60%*/
        z-index: 999;
    }
    .show_title {
        text-align: center;
    }
    .guanbi {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 26px;
        cursor: pointer;
    }
    .cropper-content {
        text-align: center;
        .cropper {
            margin-top:20px;
            width:1100px;
            height:400px;
        }
        .show-preview {
            display: inline-block;
            .preview {
                overflow: hidden;
                border-radius: 50%;
                border: 1px solid #cccccc;
                background: #cccccc;
            }
        }
    }
    .footer-btn {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
    .submit{
        text-align: center;
        margin:20px 0;
    }
    .uploadBanner{
        text-align: center;
        margin-top: 15px;
        label{
            display: inline-block;
            text-align: center;
            margin: 20px 10px;
            width: 150px;
            padding: 10px;
            line-height: 100px;
            font-size: 28px;
            color: #8c939d;
            border: 1px solid #d9d9d9;
            border-radius: 5px;
            background: #fff;
            cursor: pointer;
            vertical-align: middle;
        }
    }
    .banner_img{
        width:200px; 
        height:120px;
        border:1px solid #d9d9d9;
        border-radius: 5px;
        margin:20px 10px;
        background:#ccc;
        vertical-align: middle;
    }
    }
}
.personnel {
  width: 1000px;
  background-color: #fff;
  margin: 0 auto;
  .scope-btn {
    width: 200px;
    margin: 0 auto;
    position: relative;
    .personnel_img {
      width: 150px;
      height: 150px;
      border:1px solid #d9d9d9;
      overflow: hidden;
    }
  }
  h4 {
    margin: 0 80px 20px;
  }
  p {
    margin: 0 100px;
    cursor: pointer;
    font-size: 20px;
    color: rgb(33, 79, 137);
  }
  .addcss {
    margin: 0 100px;
    width: 160px;
    cursor: pointer;
    font-size: 20px;
    color: rgb(33, 79, 137);
    position: relative;
    top: -80px;
    left: 0;
  }
  .remove {
    margin: 0 auto;
    text-align: center;
  }
}
.hide1 {
  display: none;
}
.active1 {
  display: inline-block;
}
.show1 {
  position: fixed;
  left: 50%;
  top: 20%;
  width: 700px;
  height: 450px;
  z-index: 2222;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.label_btn {
    display: block;
    font-size: 28px;
    color: #8c939d;
    background: #fff;
    cursor: pointer;
    vertical-align: middle;
    width:120px;
    span{
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;     
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        vertical-align: middle;
        margin-left:10px;
    }
    span:hover{
        background-color:#64b0ff;;
    }
}
#cover1 {
  position: absolute;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0);
  width: 100%; /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
  height: 100%;
  filter: alpha(opacity=60); /*设置透明度为60%*/
  opacity: 0.5; /*非IE浏览器下设置透明度为60%*/
  z-index: 999;
}
.show_title1 {
  text-align: center;
}
.guanbi1 {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 26px;
  cursor: pointer;
}
.cropper-content1 {
  text-align: center;
  margin-top: 40px;
  .cropper1 {
    margin: 0 60px 0 0;
    display: inline-block;
    width: 240px;
    height: 240px;
  }
  .show-preview1 {
    display: inline-block;
    overflow: hidden;
    margin: 0 auto;
    width: 200px;
    height: 240px;
    .preview1 {
      overflow: hidden;
      border: 1px solid #cccccc;
      background: #cccccc;
    }
  }
}
.footer-btn1 {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
}
.imageUrlHide{
    display:none
}
</style>