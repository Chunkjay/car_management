var vm = new  Vue({
  el:'#sysapp',
  data:{
    user:{}
  },
  methods:{
    getUser(){
      this.user = parent.vm.user
      // console.log(this.user)
    },
    updata(){
      axios.post('/updataUser',{
        user:this.user
      }).then(function(result){
        if(result.data.status != 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          layer.alert('修改信息成功',{icon:6})
          
        }
      })
    }
  },
  created(){
    this.getUser()
  },
  updated(){

  }
})