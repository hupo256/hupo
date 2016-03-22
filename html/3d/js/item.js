$(function(){	
	function _fuc(n){
		console.log(n);
	}
	var zl = 150 / Math.tan(20 / 180 * Math.PI);
	var le = 150 / Math.tan(22.5 / 180 * Math.PI);
	// console.log(zl*2);	
	// console.log(le);	
	// console.log(zl*2);	
	// console.log(le);	
	
	
	//去掉loading 开始动画 
	var hideLoad = new DRmkt_Tool.hideLoading($('#point'), $('.loading'));
	hideLoad.init(hidld);
	function hidld(){		
		var _obj ={
				roles : $('section'),
				loop : true,
				// autoPlay : true,
				// interval : 1000
			};			
		var looper = new DRmkt_Tool.swipeUpDown(_obj).bindSwipe(_fuc);    //上下
		//var looper = new DRmkt_Tool.SwipeLeftRight(_obj).bindSwipe(_fuc);	  //左右
	}
	
	//碎片效果
	var debr_opt = {
		container : $('.ctn'),
		row : 15,
		column : 12,
		continueTime : '800'
	}
	var debr = new DRmkt_Tool.debrisEffect(debr_opt);		
	debr.creatDivs();
	$('.together').on('touchstart', function(){		
		debr.goTogether(_fuc);
	});
	
	$('.disperse').on('touchstart', function(){
		debr.goDisperse(_fuc);
	});
	
	
	//重力加速度
	if(window.orientation){
		console.log('orientation');
		alert('orientation');
	}
	if(window.deviceorientation){
		console.log('deviceorientation');
		alert('deviceorientation');
	}
	if(window.ondeviceorientation ){
		console.log('ondeviceorientation ');
		alert('ondeviceorientation ');
	}
	if(window.DeviceMotionEvent ){
		console.log('DeviceMotionEvent ');
		alert('DeviceMotionEvent ');
	}
	
	var S_TIME = 0,
		shake = false,
		bpiao = document.getElementById('bpiao');
	window.DeviceMotionEvent && window.addEventListener('devicemotion', deviceMotionHandler, false);
	// 首先，定义一个摇动的阀值
	var SHAKE_THRESHOLD = 300;
	// 定义一个变量保存上次更新的时间
	var last_update = 0;
	// 紧接着定义x、y、z记录三个轴的数据以及上一次出发的时间
	var x = y = z = last_x =last_y=last_z =0;

	function deviceMotionHandler(eventData) {			
		// 获取含重力的加速度
		var acceleration = eventData.accelerationIncludingGravity;
		x = acceleration.x;
		y = acceleration.y;
		z = acceleration.z;
		
		$('#texp1').text(x);
		$('#texp2').text(y);
		$('#texp3').text(z);

		// 获取当前时间
		var curTime = new Date().getTime();
		var diffTime = curTime - last_update;
		// 固定时间段
		if(diffTime > 400) {
			last_update = curTime;								
			var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;				
			if(speed > SHAKE_THRESHOLD) {
				if(!playTime){
					S_TIME = new Date().getTime();  //开始计时
					playTime = setInterval(beganPunp, 200);
				}
			}else if(Math.abs(x - last_x)<1 && Math.abs(y - last_y)<1 && Math.abs(z - last_z)<1){
				if(shake){
					S_TIME = new Date().getTime() - S_TIME;
					setTimeout(endPunp, 500);
					
					window.removeEventListener('devicemotion', deviceMotionHandler, false);
					deviceMotionHandler = null;
				}
			}	
			last_x = x;
			last_y = y;
			last_z = z;
		}
	}		
	
	/*			
	function bindEvents () {
		var ua = navigator.userAgent;
		var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
		var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
		var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
		var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
		if(android || ipad || ipod || iphone) {
			$('#btn').on('touchstart', hideAndShow);
		} else {
			$('#btn').on('click', hideAndShow);
		}		
	}	  
	*/	
});