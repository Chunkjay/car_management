var vm = new Vue({
  el:'#app',
  data:{
		gwcList:[],
		username:'',
		quanbuy:[],
		buy:[],
		sumarr:[],
		quansumarr:[],
		istoOrder:false,
		order:{},
		goods:[]
	},
	computed:{
		idquanChecked(){
			return this.buy.length==this.quanbuy.length?true:false
		},
		sum(){
			var sum = 0
			for(var i=0;i<this.sumarr.length;i++){
				sum = Number(sum)+Number(this.sumarr[i])
			}

			return sum
		}
	},
  methods:{
		toOrder(){
			if(this.buy.length<1){
				layer.alert('请勾选商品后进行购买！！',{icon:5})
				return
			}
			this.istoOrder = true
		},
		closeAdd(){
			this.istoOrder = false
		},
		addOrder(){
			if(!this.order.adress||!this.order.phone){
				layer.alert('请输入信息后进行下单！！',{icon:5})
				return
			}else{
				var goods = []
				var sum  = 0
				for(var i=0;i<this.buy.length;i++){
					var good = {}
					good.goodsname = this.buy[i].goodsname
					good.size = this.buy[i].size
					good.color = this.buy[i].color
					good.price = this.buy[i].price
					good.num = this.buy[i].num
					sum = sum+Number(good.price)*Number(good.num)
					goods.push(good)
					var id = this.buy[i]._id
					axios.post('/user/gwc/removeone',{
						id
					}).then(result => {
						if(result.data.status === 10000){
							console.log('ok')
						}else{
							layer.alert('出错了',{icon:5})
						}
					})
				}
				this.order.name = this.username
				this.order.sum = sum
				this.order.goods = goods
				this.order.status = '未支付'
				this.order.logID = ""
				// console.log(this.order)
				axios.post('/user/order/add',{
					order:this.order
				}).then(result => {
					if(result.data.status === 10000){
						this.closeAdd()
					}else{
						layer.alert('出错了',{icon:5})
					}
				})
			}
			this.getGwcList()
		},
		sumjisuan(e){
			if(e.target.checked){
				this.buy = this.quanbuy
				this.sumarr = this.quansumarr
			}else{
				this.buy = []
				this.sumarr = []
			}
		},
		jisuan(p,n,e){
			var sgsum = p*n
			if(!e.target.checked){
				var index = this.sumarr.indexOf(sgsum)
				if(index>-1){
					this.sumarr.splice(index,1)
				}
			}else{
				this.sumarr.push(sgsum)
			}
		},
		getGwcList(){
			axios.post('/user/gwc/get',{
				username:this.username
			}).then(result => {
				if(result.data.status ===10000){
					this.gwcList = result.data.gwcList
				}else{
					this.gwcList = []
					layer.alert('您的购物车还没有东西哦！！！快去商城看看吧！',{icon:5})
				}
			})
		},
		delGwc(id){
			axios.post('/user/gwc/del',{
				id
			}).then(result => {
				if(result.data.status ===10000){
					this.getGwcList()
				}else{
					layer.alert('删除失败',{icon:5})
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
		this.getGwcList()
		
	},
	mounted(){
		var _this = this
		setTimeout(function(){
			for(var i=0;i<_this.gwcList.length;i++){
				_this.quanbuy.push(_this.gwcList[i])
				var sgsum = Number(_this.gwcList[i].price)*Number(_this.gwcList[i].num)
				_this.quansumarr.push(sgsum)
			}
		},2000)

		if(!this.username){
			alert('您还没有登录！')
			location.href = './index.html'
		}

		
	}
})