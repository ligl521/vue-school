<template>
  <div id="container">
    <div id="schoolBoard">
      <div>
        <span>{{this.schoolAdd}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import helloworld from "./HelloWorld";
import axios from "axios";
export default {
  created: function() {
     this.getschool();
  },
  data() {
    return {
      schoolId:1,
      schoolAdd:'',
    };
  },
  methods: {
    //获取学校详情
    getschool() {
      let that = this;
      axios
        .get("http://192.168.0.28:8080/nsi-1.0/new/school/detail?schoolId="+this.schoolId)
        .then(function(respons) {
          console.log(respons.data);
          that.schoolAdd=respons.data.data.address;
        });
    },
    //在地址栏获取学校id
    getQueryStringArgs(){
      var qs=[];
      var full_code_arr=[];
      var code_arr=[];
      qs=location.hash.split('');//获取#号后面的数据
      for(var i =0;i<qs.length;i++)
      {
        if(qs[i]=="?")
        {
          full_code_arr=qs.slice(i)
        }
      }
      for(var j=0;j<full_code_arr.length;j++)
      {
        if(full_code_arr[j]=="=")
        {
          code_arr=full_code_arr.slice(j+1);
        }
      } 
      var final_school_code=code_arr.join('');
      return final_school_code;
    },

  },
  components: {
    helloworld
  }
};
</script>
<style>
</style>