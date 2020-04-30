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
      
    },
    addphoto(){
      var target = document.getElementById('photo')
      var file = target.files[0]
      if(file){
        // console.log(file)
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload=function(e){
        // console.log(e)
        // console.log(this.result)
        vm.user.photo = this.result
        // console.log(vm.user.photo)
      }
      }else{
        return
      }
      
    }
    
  },
  created(){
    
  },
  updated(){

  }
})