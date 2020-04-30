var goods = {
		name:' ',
		src:'abc',
		info:' ',
		size:' ',
		color:' ',
		price:' ',
		number:' '};

$(function(){
	/* banner开始 */
	//自动播放
	var colors = ['#d2cffb','#55fed8','#3e3f3f','#c0b484'];
	var timer = null;
	var num = 0;
	function autoplay(){
		num++;
		if(num>3){
			num=0;
		}
		$('.section1 .banner ul li').eq(num).addClass('active').siblings().removeClass('active');
		$('.section1 .banner ol li').eq(3-num).addClass('active').siblings().removeClass('active');
		$('.section1').css("background",colors[num]);
	}
	timer = setInterval(autoplay,3000);
	
	//移上显示
	$('.section1 .banner ol li').hover(function(){
		clearInterval(timer);
		var index = $(this).index();
		$('.section1 .banner ul li').eq(3-index).addClass('active').siblings().removeClass('active');
		$('.section1 .banner ol li').eq(index).addClass('active').siblings().removeClass('active');
		$('.section1').css("background",colors[3-index]);
		num = 3-index;
	},function(){
		timer = setInterval(autoplay,3000);
	});
	
	/* banner结束 */
	/* function Banner(){}
	$.extend(Banner.prototype,{
		init:function(options){
			this.item_list = $(options.item_list);
			this.list_btn = $(options.list_btn);
			this.father = $(options.father);
			this.affair = options.affair;
			this.num = 0;
			if(options.autoPlay){
			    this.autoPlay();
			}
		},
		autoPlay:function(){
			timer = setInterval(function(){
				this.num++;
				if(this.num>3){
					this.num=0;
				}
				var index = this.num;
				this.item_list.eq(index).addClass('active').siblings().removeClass('active');
				this.father.css("background",colors[index]);
			},3000);
			
		},
		bindEvent:function(){
			var affair = this.affair;
			if(affair == 'click'){
				this.list_btn.click(function(){
					var index = $(this).index();
					this.item_list.eq(3-index).addClass('active').siblings().removeClass('active');
					this.father.css("background",colors[3-index]);
					num = 3-index;
				});
			}else{
				this.list_btn.hover(function(){
					clearInterval(timer);
					var index = $(this).index();
					this.item_list.eq(3-index).addClass('active').siblings().removeClass('active');
					this.father.css("background",colors[3-index]);
					num = 3-index;
				},function(){
					timer = setInterval(this.autoplay,3000);
				});
			};
		}
	});
	var banner = new Banner();
	banner.init({
		item_list:'.section1 .banner ul li',
		list_btn:'.section1 .banner ol li',
		father:'.section1',
		affair:'mouseover',
		autoPlay:true
	}) */
	
	/* navbar开始 */
	$('.section1 .navbar .navbar_box').hover(function(){
		$(this).css({
			'background':'#fff6a6'
		});
		$('.section1 .navbar ul').css("display","block");
		var index = $(this).index();
		$('.section1 .navbar ul li').eq(index).addClass('active').siblings().removeClass('active');
	},function(){
		$(this).css({
			'background':'#ffc928'
		});
		$('.section1 .navbar ul').css("display","none");
	});
	$('.section1 .navbar ul li').hover(function(){
		var index = $(this).index();
		$('.section1 .navbar .navbar_box').eq(index).css({
			'background':'#fff6a6'
		});
		$('.section1 .navbar ul').css("display","block");
	},function(){
		var index = $(this).index();
		$('.section1 .navbar .navbar_box').eq(index).css({
			'background':'#ffc928'
		});
		$('.section1 .navbar ul').css("display","none");
	});
	/* navbar结束 */
	
	/* 返回顶部开始 */
	var sHeight = $(window).height();
	window.onscroll=function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop>sHeight){
			$('.aside').show();
		}else{
			$('.aside').hide();
		}
	};
	$('.aside img').click(function(){
		$('html,body').animate({
			scrollTop:0
		},500);
	});
	/* 返回顶部结束 */


	/* nav固定效果 */
	window.onscroll=function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop>700&&scrollTop<7000){
			$('.section2 nav').css({
				position: 'fixed',
				left: 5+'%',
				top: 0,
				width: 90+'%',
				height: 30+'px',
				borderRadius: 5+'px',
				background: '#D2CFFB',
			});
		}else{
			$('.section2 nav').css({
				width:100+'%',
				position: 'relative',
				left: 0,
			});
		}
		if(scrollTop>sHeight){
			$('.aside').show();
		}else{
			$('.aside').hide();
		}
	};
	/* nav固定效果结束 */
	
});