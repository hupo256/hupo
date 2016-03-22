var canv = document.getElementById('myCanvas');	
var ctx = canv.getContext('2d');
var reqFame = null, count = num = 0;
var cwidth = canv.width;
var cheight = canv.height;
var speed = 0;
var speed2 = 0;


preImage('image/gif25.gif', function(){				
	var iw = this.width,
		ih = this.height,
		w = cwidth*0.8,
		h = w*ih/iw,
		x = cwidth*0.1,
		y = (cheight-h)/2;
	// console.log(x,y,w,h);
	ctx.drawImage(this, x, y, w, h);
});

//往canvas里加 img 
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


function toTrans(){		
	ctx.save();	
	//抖动
	ctx.translate(0, getNum()/2);
	
	//阴影
	ctx.shadowBlur = 3;
	ctx.shadowColor="rgba(0,0,0,.5)";
	
	var iw = imgs[0].width,
		ih = imgs[0].height,
		w = cwidth*0.8,
		h = w*ih/iw,
		x = cwidth*0.1,
		y = (cheight-h)/2;	
	ctx.drawImage(imgs[0], x, y, w, h);
	ctx.restore();	
	
	ctx.drawImage(imgs[1],375,0,40, 45, 240, 20, 40,45);
}

//返回一个数 //这个数从0开始，每次加1，到10之后又每次减1
function getNum(){
	if(num%2 === 0){  //每一次到达边界，就改变增量方式
		count++;
	}else{
		count--;
	}
	
	if(count === 10 || count ===0){  //当到达边界时加1
		num += 1;
	}	
	return count;
}

setInterval(function(){
	// ctx.clearRect(0, 0, 300, 500);
	// toTrans();
}, 100);


//点击事件
$(canv).on('click tap', function(e){
	ctx.beginPath();
	ctx.rect(240, 20, 40,45);  //确定点击框
	if(ctx.isPointInPath(e.offsetX, e.offsetY)){			
		toTrans();
	}		
});