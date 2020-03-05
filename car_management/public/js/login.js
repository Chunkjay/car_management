var vm = new Vue({
  el:'#app',
  data:{
    adminName:'',
    adminPassword:'',
    adminVertify:'',
    captcha:''
  },
  methods:{
    upcaptcha(){
      this.$refs.imgyzm.src = '/login/captcha?d='+Math.random()
    },
    login(){
      var captcha = this.getCookie('captcha')
      // console.log(captcha)
      if(this.adminVertify === captcha){
        axios.post('/login/encry',{
          adminName:this.adminName,
          adminPassword:this.adminPassword
        }).then(function(result){
          // console.log(result)
          document.cookie = `token=${result.data}`
        })
        var token = this.getCookie('token')
        axios.post('/login',{
          token:token
        }).then(function(result){
          // console.log(result)
          if(result.data.status != 10000){
            layer.alert(`错误代码：${result.data.status}\n错误信息：${result.data.msg}`)
            return
          }else{
            location.href = '../index.html'
          }

        })
      }else{
        layer.alert('验证码错误！请重新输入')
        this.upcaptcha()
      }
    },
    getCookie(key){
      // console.log(key)
      var arr1 = document.cookie.split(';')
      // console.log(arr1)
      for(var i = 0;i < arr1.length;i++){
        var arr2 = arr1[i].split('=')
        // console.log(arr2[0]+'.....'+arr2[0].length)
        if(arr2[0] == " "+key){
          return arr2[1]
        }
      }
    }
  }
})