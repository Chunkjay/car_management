var vm = new  Vue({
  el:'#sysapp',
  data:{
    user:{}
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
        axios.post('/announce/add',{
          user:vm.user
        }).then(function(result){
          if(result.data.status != 10000){
            layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
            return
          }else{
            layer.alert('添加公告成功',{icon:6})
            
          }
        })
      this.user = {}
    }
  }
})