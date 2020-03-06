var vm = new Vue({
  el:'#app',
  data:{
    adminName:'',
    time:'',
    adminPassword:'',
    newPassword:'',
    newPasswordVerify:'',
    sysHtml:'',
    firstLevel:'',
    secondLevel:'',
    thirdLevel:'',
    arr:[]
  },//data数据结束
  methods:{
    getDate(){
      var curtime = new Date()
      // console.log(curtime)
      var hh = curtime.getHours()
      // console.log(hh)
      var mm = curtime.getMinutes()<10?`0${curtime.getMinutes()}`:curtime.getMinutes()
      // console.log(mm)
      var ss = curtime.getSeconds()<10?`0${curtime.getSeconds()}`:curtime.getSeconds()
      // console.log(ss)
      // console.log(`${hh}:${mm}:${ss}`)
      
      var month = curtime.getMonth()+1<10?`0${curtime.getMonth()+1}`:curtime.getMonth()+1
      // console.log(month)
      var day = curtime.getDate()<10?`0${curtime.getDate()}`:curtime.getDate()
      // console.log(day)
      var year = curtime.getFullYear()
      // console.log(year)
      var week = curtime.getDay()
      switch(week){
        case 1:week = 'Monday';break
        case 2:week = 'Tuesday';break
        case 3:week = 'Wednesday';break
        case 4:week = 'Thursday';break
        case 5:week = 'Friday';break
        case 6:week = 'Saturday';break
        case 7:week = 'Sunday';break
      }
      // console.log(week)
      this.time = `The ${week}   ${month}/${day}/${year}   ${hh}:${mm}:${ss}`
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
    revisePassword(){
      vm.adminPassword =vm.newPassword =vm.newPasswordVerify =''
      layer.open({
				type: 1,
				skin: 'layui-layer-molv',
				title: "修改密码",
				area: ['550px', '320px'],
				shadeClose: false,
				content: jQuery("#passwordLayer"),
				btn: ['修改','取消'],
				btn1: function (index) {
          if(vm.newPassword=="" || vm.adminPassword=='' || vm.newPasswordVerify==''){
            layer.msg('请输入信息后点击确定')
          }
          if(vm.newPassword != vm.newPasswordVerify){
            layer.msg('确认密码与新密码不符合！')
            return
          }
          axios.post('/rePassword',{
            adminName:vm.adminName,
            adminPassword:vm.adminPassword,
            newPassword:vm.newPassword
          }).then(function(result){
            if(result.data.status != 10000){
              layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
              return
            }
            layer.alert('修改密码成功！')
          })
          layer.closeAll()
        }
			});
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
    },
    toWelcome(){
      this.sysHtml = '../sys/welconme.html'
      this.firstLevel = '汽车网上用品销售管理系统'
      this.arr = [{id:1,sysHtml:this.sysHtml}]
      // console.log(this.arr)
    },
    toUser(){
      this.sysHtml = '../sys/user.html'
      this.firstLevel = '系统用户管理'
      this.arr = [{id:1,sysHtml:this.sysHtml}]
    },
    toProduct(){
      this.sysHtml = '../sys/product.html'
      this.firstLevel = '商品信息管理'
      this.arr = [{id:1,sysHtml:this.sysHtml}]
    },
    toOrder(){
      this.sysHtml = '../sys/order.html'
      this.firstLevel = '订单及结账管理'
      this.arr = [{id:1,sysHtml:this.sysHtml}]
    },
    toLogistics(){
      this.sysHtml = '../sys/logistics.html'
      this.firstLevel = '物流配送'
      this.arr = [{id:1,sysHtml:this.sysHtml}]
    },
    toAnnouncement(){
      this.sysHtml = '../sys/announcement.html'
      this.firstLevel = '公告管理'
      this.arr = [{id:1,sysHtml:this.sysHtml}]
    },
    toService(){
      this.sysHtml = '../sys/service.html'
      this.firstLevel = '售后与顾客服务'
      this.arr = [{id:1,sysHtml:this.sysHtml}]
    },
    toSkip(e){
      var index = Number(e.target.dataset.index)
      // console.log(index)
      // console.log(this.arr)
      var currentTag = this.arr.filter(item => {
        if(item.id === index){
          return item
        }
      })
      // console.log(currentTag)
      // console.log(currentTag[0])
      this.sysHtml = currentTag[0].sysHtml
      // console.log(this.sysHtml)
      switch(index){
        case 1:this.secondLevel = this.thirdLevel = '';break;
        case 2:this.thirdLevel = '';break;
      }
    }
  },//methods方法结束
  created(){
    //时间的更新
    setInterval(this.getDate,1000)
    this.getAdminName()
    setTimeout(this.getAdminName,60*30*1000)
    this.toWelcome()
  }
})