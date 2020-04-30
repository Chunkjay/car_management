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
		$('#app>.left .banner ul li').eq(num).addClass('active').siblings().removeClass('active');
		$('#app>.left .banner ol li').eq(3-num).addClass('active').siblings().removeClass('active');
		$('#app').css("background",colors[num]);
	}
	timer = setInterval(autoplay,3000);
	
	//移上显示
	$('#app>.left .banner ol li').hover(function(){
		clearInterval(timer);
		var index = $(this).index();
		$('#app>.left .banner ul li').eq(3-index).addClass('active').siblings().removeClass('active');
		$('#app>.left .banner ol li').eq(index).addClass('active').siblings().removeClass('active');
		$('#app').css("background",colors[3-index]);
		num = 3-index;
	},function(){
		timer = setInterval(autoplay,3000);
	});
	
	/* banner结束 */
})