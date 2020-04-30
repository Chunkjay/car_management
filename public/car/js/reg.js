var vm = new Vue({
  el:'#regapp',
  data:{
    user:{},
    verifypassword:''
  },
  methods:{
    getTime(){
      this.user.startTime = parent.vm.time
    },
    verify(e){
      if(this.user.password !== this.verifypassword){
        layer.tips('密码不一致，请正确输入',e.target)
      }
    },
    addUser(){
      this.user.startTime = new Date()
      if(this.user.password === this.verifypassword){
        axios.post('/addUser',{
          user:vm.user
        }).then(function(result){
          if(result.data.status != 10000){
            layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
            return
          }else{
            alert('注册成功')
            location.href = './login.html'
          }
        })
      }else{
        layer.msg('密码不一致，请正确输入')
      }
      this.user = {}
      this.verifypassword = ''
    },
    getCookie(key){
      // console.log(key)
      var arr1 = document.cookie.split(';')
      // console.log(arr1)
      for(var i = 0;i < arr1.length;i++){
        var arr2 = arr1[i].split('=')
        // console.log(arr2[0]+'.....'+arr2[0].length)
        if(arr2[0] ==key || arr2[0] == ' '+key){
          return arr2[1]
        }
      }
    },
    setCookie(name, value, iDay) {
      //分别代表cookie名称、cookie值、过期时间
      var oDate = new Date(); //当前时间
      oDate.setDate(oDate.getDate() + iDay); //当前月的日期+过期时间
      document.cookie = name + "=" + value + ";expires=" + oDate;
    },
    delCookie(key) {
      this.setCookie(key, '', -1);  //cookie的过期时间设为昨天
    }
  }
})