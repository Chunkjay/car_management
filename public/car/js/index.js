var vm = new Vue({
  el:'#app',
  data:{
    username:'',
    jpzsList:[],
    dppjList:[],
    dzdhList:[],
    mrbyList:[],
    user:{},
    cur:1,
    n:'',
    gwc:{},
    isToAdd:false,
    ggList:[]
  },
  methods:{
    open(id){
      $(`#${id}`).slideToggle()
    },
    getggList(){
      axios.get('/user/gg').then(result => {
        if(result.data.status === 10000){
          this.ggList = result.data.ggList
        }else{
          alert('出错了')
        }
      })
    },
    logout(){
      this.delCookie('username')
      this.username = this.getCookie('username')
    },
    toAdd(item){
      // console.log('ok')
      this.gwc = item
      // console.log(this.gwc)
      this.isToAdd = true
    },
    closeAdd(){
      this.isToAdd = false
    },
    addGwc(){
      var ngwc = {}
      ngwc.photo = this.gwc.photo
      ngwc.jianj = this.gwc.introduction
      ngwc.size = this.gwc.size
      ngwc.color = this.gwc.color
      ngwc.price = this.gwc.price
      ngwc.num = this.gwc.num
      ngwc.name = this.username
      ngwc.goodsname = this.gwc.goodsname
      // console.log(ngwc.num+'..............'+typeof ngwc.num)
      if(!ngwc.num){
        layer.alert('请正确选择购买数量！',{icon:5})
        // console.log(Number(ngwc.num)+'..............'+typeof Number(ngwc.num))
        
        return
      }
      if(Number(ngwc.num)<=0){
        layer.alert('请正确选择购买数量！',{icon:5})
        return
      }
      axios.post('/user/gwc/add',{
        ngwc
      }).then(result => {
        if(result.data.status === 10000){
          layer.alert('添加购物车成功',{icon:1})
          this.closeAdd()
        }else{
          layer.alert(result.data.msg,{icon:2})
        }
      })
    },
    searchUser(){
      var username = this.user.username
      var userid = this.user.userid
      var cur = this.cur
      axios.post('/user/goods/get',{
        username:username,
        userid:userid,
        cur:cur
      }).then(function(result){
        if(result.data.status != 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          // console.log(result)
          vm.jpzsList = result.data.data.userList.filter(item => {
            if(item.lieb === '精品装饰'){
              return item
            }
          })
          vm.dppjList = result.data.data.userList.filter(item => {
            if(item.lieb === '大牌配件'){
              return item
            }
          })
          // console.log(vm.dppjList)
          vm.dzdhList = result.data.data.userList.filter(item => {
            if(item.lieb === '电子导航'){
              return item
            }
          })
          vm.mrbyList = result.data.data.userList.filter(item => {
            if(item.lieb === '美容保养'){
              return item
            }
          })
          vm.n = result.data.data.n
          // console.log(result.data.data.n)
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
    this.searchUser()
    this.getggList()
  }
})