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
		order:{}
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
		
	},
	mounted(){}
})