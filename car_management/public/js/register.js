var vm = new Vue({
  el:'#app',
  data:{
    adminName:'',
    adminPassword:'',
    adminPasswordVerify:''
  },
  methods:{
    register(){
      if(this.adminPassword !== this.adminPasswordVerify){
        alert('密码输入不一致')
        return
      }
      if(this.adminName != "" && this.adminPassword != ""){
        console.log('ok')
        axios.post('/register',{
          adminName:this.adminName,
          adminPassword:this.adminPassword
        }).then(function(res){
          console.log(res)
          if(res.data.status == 10000){
            alert('注册成功！！')
            location.href = "../login.html"
          }else{
            alert(`出错了：${res.msg}`)
          }
        })
      }else{
        alert('请输入用户名和密码后进行注册')
      }
    }
  }
})