<template>
  <div style="background: #f5f5f5;padding:40px 0 0">
    <div class="resume">
      <h2>个人简历 提交成功</h2>
      <h4>
        您还可以添加简历，让我们更了解您
      </h4>
      <div class="resume_main">
        <el-upload
          class="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
          <p>上传简历</p>
        </el-upload>
        <div slot="tip" class="el-upload__tip upload_right">
          支持PDF、JPG、PNG格式附件 <br />文件大小不超过8M
        </div>
      </div>
      <el-divider></el-divider>
      <div style="text-align: center;margin-top: 40px;">
        <span style="font-size: 16px;color: #215089;">添加标签：</span>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" @click="showInput" size="small"
          >+ 添加 {{ this.dynamicTags.length }}/5</el-button
        >
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
      </div>
      <div>
        <el-button class="ruleForm" type="primary">提交</el-button>
      </div>
    </div>
    <schoolfooter />
  </div>
</template>

<script>
import schoolfooter from "./schoolFooter";
import { talentlist } from "@/api/api";
export default {
  data() {
    return {
      fileList: [],
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: ""
    };
  },
  created() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传1个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        if (this.dynamicTags.length < 5) {
          this.dynamicTags.push(inputValue);
        } else {
          alert("最多添加五个");
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    }
  },
  components: {
    schoolfooter
  }
};
</script>
<style lang="less" scoped>
.resume {
  width: 900px;
  background-color: #fff;
  margin: 0 auto;
  padding: 40px 90px;
  h2 {
    text-align: center;
    margin: 20px 0;
    color: #214f89;
  }
  h4 {
    font-size: 22px;
    text-align: center;
    color: #bdbdbd;
    margin: 30px 0;
  }
  .ruleForm {
    background-color: #215089 !important;
    margin: 52px auto 10px !important;
    display: block;
    font-size: 18px;
    color: #fff;
    outline: none;
  }
  .ruleForm:hover {
    background-color: #306bb5 !important;
  }
  .resume_main {
    width: 400px;
    margin: 0 auto;
    display: flex;
    .upload {
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 140px;
      height: 140px;
      cursor: pointer;
      text-align: center;
      margin-right: 20px;
      position: relative;
      i {
        font-size: 28px;
        color: #8c939d;
        display: block;
        margin: 40px 0 20px;
      }
      p {
        font-size: 18px;
      }
    }
    .upload_right {
      margin: 20px 0;
      line-height: 30px;
    }
  }
  .el-upload__tip {
    font-size: 16px;
  }
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 600px;
  margin: 24px auto;
}
</style>
<style>
.el-upload-list {
  width: 320px !important;
  position: absolute!important;
  left: 160px!important;
  bottom: 20px!important;
  text-align: left!important;
}
.el-tag {
  margin-left: 10px;
  color: #fff;
  background-color: #215089 !important;
}
.button-new-tag {
  margin-right: 8px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.el-tag .el-icon-close {
  color: #fff;
}
.button-new-tag:hover {
  color: #fff;
  background-color: #215089 !important;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
