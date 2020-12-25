export default {
    //coolie 读取存在
    getCookie(name) {
        var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
        else return null;
    },
    enterDetail(id,farther_that){
        var that=this
        if(that.getCookie("username") == null){
            farther_that.$message({
                message: '您还没有登录，登陆后即可查看！',
                type: 'warning'
            });
        }else{
            window.open('https://www.xinxueshuo.cn/data/school/'+id+'.html', '_blank')
            // farther_that.$router.push({path: '/schoolDetail', query: {id:id}});
        }
    },
}
