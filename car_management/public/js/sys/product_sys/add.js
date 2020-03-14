var vm = new  Vue({
  el:'#sysapp',
  data:{
    user:{}
  },
  methods:{
    addUser(){
      
        axios.post('/addGoods',{
          user:vm.user
        }).then(function(result){
          if(result.data.status != 10000){
            layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
            return
          }else{
            layer.alert('添加商品成功',{icon:6})
            
          }
        })
      
    }
  },
  created(){
    
  },
  updated(){

  }
})