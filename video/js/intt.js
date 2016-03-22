$(function(){
	var myVideo = document.getElementById('tvideo');
	// myVideo.play(); // 加载完成先播放一次
	var time = null,
		casv = document.getElementById('canvas'),
		ctx = casv.getContext('2d');
	
	//取消默认划屏事件
	touch.on(document, 'touchstart', function(ev){
		ev.preventDefault();
	});	
	
	//上划
	touch.on($('.poptips'), 'swipeup', function(e){
		$('.tips').addClass('tips2');
		$('.videobox').removeClass('d_none');
		myVideo.play();
		
		//关掉浮层
		setTimeout(function(){
			// $('.poptips').addClass('d_none');	
			$('.poptips').fadeOut();	
		}, 2500);
	});

	myVideo.addEventListener('play', function () {	
		time = window.setInterval(function () {
			ctx.drawImage(myVideo, 0, 0, 375, 605)
			// ctx.drawImage(myVideo, 0, 0,w,h);
		}, 20);
	}, false);

	// 去掉video的上下文	
	myVideo.addEventListener("contextmenu",	function (e) {
		e.preventDefault(); 
		e.stopPropagation(); 
	},false);

	//去掉控件
	if (myVideo.controls) {
		console.log('has controls');
		myVideo.controls = null; 
	}	
	
	//再试一次	
	$('.tryagain').on('tap', function(){		
		$(this).parent().addClass('d_none');
		$('.tips').removeClass('tips2');
		$('.poptips').addClass('d_none');		
		
		setTimeout(function(){
			$('.poptips').fadeIn();	
		}, 800);
		return false;
	});	
	
	setTimeout(function(){
		// $('.loading').addClass('d_none');
		$('.loading').fadeOut(600);
		setTimeout(function(){			
			// $('.poptips').removeClass('d_none');
		}, 100);
	}, 1000);
	
	
	//结束后将自己隐藏
	//在android里, autoplay无法触发ended，并且在video资源未加载完成时用play(),也无法触发ended
	//所以只能等资源加载完后，用video.play()进行预播放
	
	
	 /* the one */
	//或者绕过预播放，直接用JS来控制，这样面临一个卡顿的问题(多加载一会儿？)   /**/
	//这样就不可用autoplay了，因为会加大运行时间，也不好控制第一次播放什么时候结束
	
	/* 接下来解决 在android里 隐藏播放控件的问题 */
	//高度上放大一点，将控件挤下去
	
	/********************
	*
	*  现在好的，亲们，
	*  只接放到 canvas 里面播放好了
	*  这里面唯一的坑就是cavas元素高宽应直接编码到 html 里，如果写成100%,会出问题
	*  
	*  只是android下完全行不通
	*  
	**************************/
	
	
	myVideo.addEventListener("ended", function () {		
		var cls = this.className,
			nmb = cls.indexOf('run');
		
		// if(nmb === -1){
			// var tim = new Date() - star;
			// alert(tim);
			// $(this).addClass('run');
			// $('.poptips').removeClass('d_none'); //进入后先播放一次以备用，然后再允许操作
		// }else{
			// alert(22);
			// // 弹出结果
			// $('.int_rst').removeClass('d_none');
			// var num = Math.floor(Math.random()*10)*11 + '%';		
			// $('.scorebox').css('background-position','50% '+ num);
			
			// // 隐藏视频
			// $(this).parent().addClass('d_none');		
		// }
		
		//弹出结果
		$('.int_rst').removeClass('d_none');
		var num = Math.floor(Math.random()*10)*11 + '%';		
		$('.scorebox').css('background-position','50% '+ num);
		
		//隐藏视频
		$(this).parent().addClass('d_none');		
	}, false);
});

