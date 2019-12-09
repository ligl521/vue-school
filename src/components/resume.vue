<template>
  <div style="background: #f5f5f5;">
    <div class="resume">
      <h2>个人简历 提交成功</h2>
      <h4>附件简历管理</h4>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <div slot="tip" class="el-upload__tip">
          支持DOC、DOCX、PDF、JPG、PNG格式附件 文件大小不超过8M
        </div>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
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
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
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
    }
  },
  components: {
    schoolfooter
  }
};
</script>
<style lang="less" scoped>
.resume {
  width: 1000px;
  background-color: #fff;
  margin: 0 auto;
  padding: 20px 20px 60px;
  h2 {
    text-align: center;
  }
  h4{
      margin-bottom:10px;
  }
}
</style>
