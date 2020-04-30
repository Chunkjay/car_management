var vm = new Vue({
  el:'#sysapp',
  data:{
    adminName:'',
    user:{},
    userList:[],
    fyList:[],
    n:'',
    cur:1
  },
  methods:{
    searchUser(){
      var username = this.user.username
      var userid = this.user.userid
      var cur = this.cur
      axios.post('/postGoodsList',{
        username:username,
        userid:userid,
        cur:cur
      }).then(function(result){
        if(result.data.status != 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          vm.userList = result.data.data.userList
          vm.n = result.data.data.n
          // console.log(result.data.data.n)
          vm.setFy(1)
        }
      })
    },
    toAdd(){
      parent.vm.sysHtml = '../../sys/goods_sys/add.html'
      parent.vm.secondLevel = '添加商品'
      parent.vm.arr.push({id:2,sysHtml:parent.vm.sysHtml})
    },
    toUpdate(user){
      parent.vm.sysHtml = '../../sys/goods_sys/updata.html'
      parent.vm.secondLevel = '编辑商品信息'
      parent.vm.arr.push({id:2,sysHtml:parent.vm.sysHtml})
      parent.vm.user = user
    },
    del(name){
      // console.log(name)
      axios.post('/delGoods',{
        username:name
      }).then(function(result){
        if(result.data.status != 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          layer.alert('删除商品成功',{icon:6})
          vm.searchUser()
        }
      })
    },
    getUserList(cur){
      var username = this.user.username
      var userid = this.user.userid
      // console.log('1............ok')
      // console.log(typeof cur)
      if(typeof cur == 'number'&&vm.n){
        // console.log('2............ok')
        axios.post('/postGoodsList',{
          username:username,
          userid:userid,
          cur:cur
        }).then(function(result){
          if(result.data.status != 10000){
            layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
            return
          }else{
            vm.userList = result.data.data.userList
            vm.n = result.data.data.n
            // console.log(result.data.data.n)
            vm.setFy(cur)
          }
        })
      }
      
    },
    setFy(cur){
      if(vm.n <= 5){
        vm.fyList = []
        for(var i = 1;i<=vm.n;i++){
          vm.fyList.push({id:i,text:i})
        }
        return
      }
      if(vm.n>5&&cur<=3){
        vm.fyList = []
        vm.fyList = [
          {id:1,text:1},
          {id:2,text:2},
          {id:3,text:3},
          {id:4,text:4},
          {id:5,text:'...'}
        ]
        return
      }
      if(vm.n>5&&cur>3&&cur<vm.n-2){
        vm.fyList = []
        vm.fyList = [
          {id:1,text:'...'},
          {id:2,text:cur-1},
          {id:3,text:cur},
          {id:4,text:cur+1},
          {id:5,text:'...'}
        ]
        return
      }
      if(vm.n>5&&cur>3&&cur==vm.n-2){
        vm.fyList = []
        vm.fyList = [
          {id:1,text:'...'},
          {id:2,text:cur-1},
          {id:3,text:cur},
          {id:4,text:cur+1},
          {id:5,text:cur+2}
        ]
        return
      }
      if(vm.n>5&&cur>3&&cur>vm.n-2){
        vm.fyList = []
        vm.fyList = [
          {id:1,text:'...'},
          {id:2,text:vm.n-2-1},
          {id:3,text:vm.n-2},
          {id:4,text:vm.n-2+1},
          {id:5,text:vm.n-2+2}
        ]
        return
      }
    },
    getAdminName(){
      var token = this.getCookie('token')//请求adminName
      // console.log(token)
      if(!token){
        layer.alert('您还没有登录，点击去登录吧！！')
        return
      }
      axios.post('/login',{
        token:token
      }).then(function(result){
        if(result.data.status != 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          vm.adminName = result.data.adminName
        }
      })
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
    }
  },//methods方法结束
  created(){
    this.getAdminName()
    this.searchUser()
  }
})