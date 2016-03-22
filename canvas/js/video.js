$(function(){
	var myVideo = document.getElementById("video"),
		canvas = document.getElementById("canvas"),
		i = null;
	ctx = canvas.getContext('2d');
	myVideo.addEventListener('play', function () {
		var hei = $(canvas).height(),
			wei = $(canvas).width();			
		i = window.setInterval(function () {			
			ctx.drawImage(myVideo, 0, 0, 270, 135);
			// ctx.drawImage(myVideo, 0, 0);
			// ctx.drawImage(myVideo, 0, 0, 300, 500);
		}, 100);
	}, false);
	myVideo.addEventListener('pause', function () {
		clearInterval(i);
	}, false);
	myVideo.addEventListener('ended', function () {
		clearInterval(i);
	}, false);
	
	
	// setTimeout(function(){
		// alert(11);
		// // myVideo.play();
		// if (myVideo.paused){
			// myVideo.play(); 
		// }else{
			// myVideo.pause(); 
		// }
		
		// ctx.drawImage(myVideo, 0, 0, 270, 135);
	// }, 1000);
	
	// setTimeout(function exit(){
		// //檢查瀏覽器是否處於全屏
		// if(invokeFieldOrMethod(document,'FullScreen') || invokeFieldOrMethod(document,'IsFullScreen') || document.IsFullScreen)	{
			// alert(23);
		// }
	// },500);
	
	$('#btn').on('click', function(){		
		if (myVideo.paused){
			// alert(11);
			myVideo.play(); 
		}else{
			// alert(22);
			myVideo.pause(); 
		}
	});
	
	
	// 去掉video的上下文	
	myVideo.addEventListener("contextmenu",	function (e) {
		e.preventDefault(); 
		e.stopPropagation(); 
		return false;
	},false);
	
	//去掉控件
	if (myVideo.controls) {
		console.log('has controls');
		myVideo.controls = null; 
	}	
	
	
	//自定义事件
	var btn = $('#btn');
	btn.bind('over', function(){
		console.log('done _');
	});
	btn.trigger('over');
	
	
});


















