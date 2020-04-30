var vm = new  Vue({
  el:'#sysapp',
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
            layer.alert('添加用户成功',{icon:6})
            
          }
        })
      }else{
        layer.msg('密码不一致，请正确输入')
      }
      this.user = {}
      this.verifypassword = ''
    }
  },
  created(){
    
  },
  updated(){

  }
})