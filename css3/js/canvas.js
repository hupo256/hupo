$(function(){
	console.log(22);
	
	var canvas = document.querySelector('#game'),
		cxt = canvas.getContext('2d');
	
	// console.log(canvas);
	console.log(cxt);
	
	//画矩形
	cxt.fillStyle="#c00";
	// cxt.fillRect(0,0,150,75);
	
	//画折线
	// cxt.moveTo(10,10);
	// cxt.lineTo(150,50);
	// cxt.lineTo(10,50);
	// cxt.stroke();
	
	//画圆
	// cxt.beginPath();
	// cxt.arc(70,70,20,0,Math.PI*2,true);
	// cxt.closePath();
	// cxt.fill();
	
	//添加位图
	var img=new Image();
	img.src="image/firebug.png";

	preImage('image/firebug.png', function(){
		cxt.drawImage(img,10,10);
		
		// $(img).animate({'margin-top': '100px'},400, function(){
			// console.log(33);
		// });
		
		cxt.translate(1,canvas.height);
	});
		
	

	function preImage(url, callback) {
		var img = new Image(); //创建一个Image对象，实现图片的预下载
		img.src = url;

		if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
			callback.call(img);
			return; // 直接返回，不用再处理onload事件
		}

		img.onload = function () { //图片下载完毕时异步调用callback函数。
			callback.call(img); //将回调函数的this替换为Image对象
		};
	}


}); 
