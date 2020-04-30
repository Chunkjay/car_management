var vm = new Vue({
  el:'#app',
  data:{
    username:'',
    orderList:[],
    istozhifu:false,
    start:{},
    end:{},
    logisticsInfo:[]
	},
	computed:{
	},
  methods:{
    closelog(){
      $('.logistics').slideUp()
    },
    searchLogistics(id,logid){
      if(!logid){
        layer.alert('请等待工作人员录入物流信息')
        return
      }
      axios.post('/logistics/getLogisticsInfo',{
        logisticsid:logid
      }).then(function(result){
        // console.log(result.data.logisticsInfo)
        if(result.data.status === 10000){
          vm.start = result.data.start
          vm.logisticsInfo = result.data.logisticsInfo
          vm.end = result.data.end
          $(`.logistics#${id}`).slideDown()
        }else{
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
        }
      }) 
    },
    close(){
      this.istozhifu = false
      this.getOrderList()
    },
    tozhifu(id,goods){
      this.istozhifu = true
      axios.post('/user/order/update',{
        id
      }).then(result => {
        if(result.data.status === 10000){
          // console.log('ok')
        }else{
          alert('出错了')
        }
      })

      //减少库存，增加售出
      for(var i=0;i<goods.length;i++){
        axios.post('/user/product/updatenum/mai',{
          goodsname:goods[i].goodsname,
          num:goods[i].num
        }).then(result => {
          if(result.data.status === 10000){

          }else{
            layer.alert(result.data.msg)
          }
        })
      }
    },
    delOrder(id,goods){
      axios.post('/affirmOrder/del',{
        id:id
      }).then(function(result){
        if(result.data.status !== 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          layer.msg('成功删除订单')
          vm.getOrderList()
        }
      })

      for(var i=0;i<goods.length;i++){
        axios.post('/user/product/updatenum/tui',{
          goodsname:goods[i].goodsname,
          num:goods[i].num
        }).then(result => {
          if(result.data.status === 10000){

          }else{
            layer.alert('出错了')
          }
        })
      }
    },
    getOrderList(){
      axios.post('/user/order/get',{
        username:this.username
      }).then(function(result){
        if(result.data.status !== 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          // console.log(result)
          vm.orderList = result.data.orderList
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
  },
  created(){
		this.username = this.getCookie('username')
		this.getOrderList()
	},
	mounted(){
  }
})