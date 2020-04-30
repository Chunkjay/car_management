var vm = new Vue({
  el:'#sysapp',
  data:{
    orderList:[],
  },
  computed:{
  },
  methods:{
    affirmOrder(item){
      axios.post('/affirmOrder',{
        item:item
      }).then(function(result){
        if(result.data.status !== 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          layer.msg('成功确认订单，请到物流管理处查询单号！')
        }
      })
    },
    delOrder(id){
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
    },
    getOrderList(){
      axios.get('/affirmOrder/getOrderList').then(function(result){
        if(result.data.status !== 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          // console.log(result)
          vm.orderList = result.data.orderList
        }
      })
    }
  },
  created(){
    this.getOrderList()
  },
  mounted(){
  }
})