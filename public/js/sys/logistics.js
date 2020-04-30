var vm = new Vue({
  el:'#sysapp',
  data:{
    start:{},
    end:{},
    logisticsList:[],
    logisticsInfo:[]
  },
  methods:{
    updateLogID(orderid,log_id,logid){//给订单表和物流表都加一个logid
      if(logid){
        axios.post('/user/logistic/updateLogid',{
          logid,
          log_id
        }).then(result => {
          if(result.data.status === 10000){
            this.getOrderList()
          }else{
            laayer.msg('添加失败')
          }
        })
        axios.post('/user/order/updateLogid',{
          logid,
          orderid
        }).then(result => {
          if(result.data.status === 10000){

          }else{
            laayer.msg('添加失败')
          }
        })
      }else{
        layer.msg('请输入物流单号')
      }
    },
    searchLogistics(id,logid){
      if(!logid){
        layer.alert('请输入物流单号后进行查询')
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
      $('.logistics').slideUp()
    },
    getOrderList(){
      axios.get('/logistics/getLogisticsList').then(function(result){
        if(result.data.status === 10000){
          vm.logisticsList = result.data.logisticsList
        }else{
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
        }
      })
    }
  },
  created(){
    this.getOrderList()
  }
})