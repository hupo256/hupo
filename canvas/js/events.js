var canforSnow = document.getElementById('myCanvas');
var ctx = canforSnow.getContext('2d');
var aerArr = [
		{
			x : 80,
			y : 120,
			width : 55,
			height : 100
		},{
			x : 25,
			y : 140,
			width : 50,
			height : 20
		},{
			x : 140,
			y : 140,
			width : 50,
			height : 20
		},{
			x : 80,
			y : 225,
			width : 20,
			height : 80
		},{
			x : 115,
			y : 225,
			width : 20,
			height : 80
		}
	];
function changeBg(layer){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = '#F39814';
	ctx.rect(layer.x, layer.y, layer.width, layer.height);  //确定点击框
	ctx.fill();
	ctx.restore();
}

$(canforSnow).on('click tap', function(e){
	var poi = {x:e.offsetX, y:e.offsetY},
		indArr = getLayerOnEvent(ctx, aerArr, poi, changeBg);
	console.log(indArr);		
});


	
//每次点击都重绘一下给定的坐标，从而返回被点中索引值数组
//根据这个索引值数组来确定被点中的图片
//然后绑定相应的事件
function getLayerOnEvent(ctx, arrPt, point, callback){
	var arr = [];
	for(var i=0, k=arrPt.length; i<k; i++){
		var layer = arrPt[i],
			px = layer.x,     //矩形左上角x坐标
			py = layer.y,     //矩形左上角y坐标
			sw = layer.width,     //矩形宽
			sh = layer.height;     //矩形高
		ctx.beginPath();
		ctx.rect(px, py, sw, sh);  //确定点击框
		ctx.fill();
		if(ctx.isPointInPath(point.x, point.y)){	
			arr.push(i);
			callback && callback(layer);
		}	
	}
	return arr;	
}


//添加图片
function preImage(url, callback){  
	var img = new Image(); //创建一个Image对象，实现图片的预下载  
	img.src = url; 
	if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
		if(callback) callback.call(img);		
		return; // 直接返回，不用再处理onload事件  
	} 
	img.onload = function () { //图片下载完毕时异步调用callback函数。  
		if(callback) callback.call(img);				
	};
}

preImage('image/icon.png', function(){	
	ctx.drawImage(this,375, 0, 40,45, 160, 400, 40,45);	
	console.log(22);	
});




/*
//初始时画小人
window.onload = function () {
	var canvas = document.getElementById('myCanvas');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		
		//画左边头
		ctx.fillStyle = '#1c94c4';
		ctx.beginPath();
		ctx.arc(105, 75, 35, Math.PI / 2, Math.PI * 1.5, false);
		ctx.fill();

		//画右边头
		ctx.beginPath();
		ctx.arc(110, 75, 35, Math.PI * 1.5, Math.PI / 2, false);
		ctx.fill();

		//画躯干
		ctx.beginPath();
		ctx.rect(80, 120, 55, 100);
		ctx.fill();

		//画左臂
		ctx.beginPath();
		ctx.rect(25, 140, 50, 20);
		ctx.fill();

		//画右臂
		ctx.beginPath();
		ctx.rect(140, 140, 50, 20);
		ctx.fill();

		//画左腿
		ctx.beginPath();
		ctx.rect(80, 225, 20, 80);
		ctx.fill();

		//画右腿
		ctx.beginPath();
		ctx.rect(115, 225, 20, 80);
		ctx.fill();

		//添加事件响应
		// canvas.addEventListener('click', function (e) {
			// p = getEventPosition(e);
			// reDraw(p, ctx);
		// }, false);
	}
}


//得到点击的坐标
function getEventPosition(ev) {
	var x,	y;
	if (ev.layerX || ev.layerX == 0) {
		x = ev.layerX;
		y = ev.layerY;
	} else if (ev.offsetX || ev.offsetX == 0) { // Opera
		x = ev.offsetX;
		y = ev.offsetY;
	}
	return {
		x : x,
		y : y
	};
}
//重绘
function reDraw(p, ctx) {
	arr = [
		{
			x : 105,
			y : 75,
			width : Math.PI / 2,
			height : Math.PI * 1.5
		},
		{
			x : 110,
			y : 75,
			width : Math.PI * 1.5,
			height : Math.PI / 2
		},
		{
			x : 80,
			y : 120,
			width : 55,
			height : 100
		},
		{
			x : 25,
			y : 140,
			width : 50,
			height : 20
		},
		{
			x : 140,
			y : 140,
			width : 50,
			height : 20
		},
		{
			x : 80,
			y : 225,
			width : 20,
			height : 80
		},
		{
			x : 115,
			y : 225,
			width : 20,
			height : 80
		}
	]

	//保存序号的数组，这样，即使一次点多个，也能保存——本例中只能每次点一个
	var whichObject = [];
	for (var i = 0; i < arr.length; i++) {
		//用圆画头
		if (i < 2) {
			ctx.fillStyle = '#1c94c4';
			ctx.beginPath();
			ctx.arc(arr[i].x, arr[i].y, 35, arr[i].width, arr[i].height, false);
			ctx.fill();
			if (p && ctx.isPointInPath(p.x, p.y)) {
				whichObject.push(i);
				//修改点中区域的颜色
				ctx.fillStyle = '#F39814';
				ctx.beginPath();
				ctx.arc(arr[i].x, arr[i].y, 35, arr[i].width, arr[i].height, false);
				ctx.fill();
			}
			//用矩形画躯干
		} else {
			ctx.fillStyle = '#1c94c4';
			ctx.beginPath();
			ctx.rect(arr[i].x, arr[i].y, arr[i].width, arr[i].height);
			ctx.fill();
			if (p && ctx.isPointInPath(p.x, p.y)) {
				whichObject.push(i);
				ctx.fillStyle = '#F39814';
				ctx.beginPath();
				ctx.rect(arr[i].x, arr[i].y, arr[i].width, arr[i].height);
				ctx.fill();
			}
		}
	}
	//显示点击了哪个部分
	alert("click:"+ whichObject[0]);
}
*/
