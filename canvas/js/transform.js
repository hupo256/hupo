/*******************
	 *	
	 * 下雪效果 /  震动效果
	 * @param  
	 * @discription  雪花飘舞的效果  给其不同的加速度，那么最后它的运动速度也就不一样了
	 * @date 20151228
	 *
	 *******************/
function snowMaker(canvas){
	this.ctx = canvas.getContext('2d');
	// this.ctx.fillStyle = 'rgba(255,181,81,.3)';
	// this.ctx.fillStyle = 'rgba(255,255,255,.3)';	
	this.ctx.fillStyle = '#16a';	
	this.rollArr = [];
}
snowMaker.prototype = {
	start : function (total, inter) {
		var that = this,
			num = total || 20;
		setInterval(function(){
			that.createParticles(num);
			that.updateParticles();
			that.killParticles();
			that.drawParticles();
		}, inter);		
	},	

	createParticles : function (num) {
		var arr = this.rollArr,
			canvas = this.ctx.canvas;
		if(arr.length < num){			
			arr.push({
				// x: Math.random()*canvas.width,
				// y: 0,
				// // y: Math.random()*canvas.height,
				// speed: 2+Math.random()*5, //between 2 and 5
				// rw: 10+Math.random()*10   //between 5 and 8

				x: Math.random()*canvas.width,
				// y: 0,
				y: Math.random()*canvas.height,
				speed: 2+Math.random()*5,  //between 2 and 5
				radius: 2+Math.random()*2  //between 5 and 10
			});
		}
	},
	
	//返回两个数之间的随机数
	randomNum : function (n, m){
		return parseInt(Math.random()*(m-n)+n);
	},
	
	updateParticles : function () {
		var arr = this.rollArr,
			rdm = this.randomNum;
		for(var i=0, k=arr.length; i<k; i++) {
			var part = arr[i];
			//下落
			part.y += part.speed;
			
			//震动
			// part.y += rdm(-6,6);
			// part.x += rdm(-3,3);	
			
			//旋转			
			// this.ctx.rotate(rdm(-1.1,1.1)*Math.PI/180);				
		}
	},
	
	killParticles : function () {
		var arr = this.rollArr,
			canvas = this.ctx.canvas;
		for(var i=0, k=arr.length; i<k; i++) {
			var part = arr[i];
			if(part.y > canvas.height){
				part.y = 0;
				part.x = Math.random()*canvas.width;
			}
		}
	},

	drawParticles : function () {
		var arr = this.rollArr,
			ctx = this.ctx,
			that = this;
		ctx.clearRect(0, 0, 375, 605);
		
		for(var i=0, k=arr.length; i<k; i++) {
			var part = arr[i];	
			// preImage('image/redpage.png', function(){			
				// ctx.drawImage(this, part.x, part.y, part.rw, part.rw*5/4);	
			// });
			
			ctx.beginPath();
			ctx.arc(part.x, part.y, part.radius, 0, Math.PI*2);
			ctx.closePath();     
			ctx.fill();	
		}
	},
	
	//返回一个数自动递增/减的数
	getNum :function(){
		if(num%2 === 0){  //每一次到达边界，就改变增量方式
			count++;
		}else{
			count--;
		}
		
		if(count === 10 || count ===0){  //当到达边界时加1
			num += 1;
		}	
		return count;
	},

	//往canvas里加 img 
	preImage : function (url, callback){  
		var img = new Image(); //创建一个Image对象，实现图片的预下载  
		img.src = url; 
		if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
			if(callback) callback.call(img);		
			return; // 直接返回，不用再处理onload事件  
		} 
		img.onload = function () { //图片下载完毕时异步调用callback函数。  
			if(callback) callback.call(img);				
		};
	},
	
	toTrans : function (deg){	
		var n = 1+ getNum()/10;
		ctx.clearRect(0, 0, 300, 500);
		ctx.save();
		
		//平移配transform
		// ctx.translate(100,100);	  
		// ctx.rotate(deg*Math.PI/180);
		// ctx.scale(n,n);
		// ctx.translate(-100,-100);
		
		//抖动
		ctx.translate(0, getNum()/4);
		
		//透明度
		// ctx.globalAlpha = 0.6;
		
		//阴影
		ctx.shadowBlur = 1;
		// ctx.shadowOffsetX = 1;
		ctx.shadowOffsetY = 1;
		ctx.shadowColor="rgba(0,0,0,.5)";
		
		//加图
		preImage('image/3dimg.gif', function(){	
			ctx.drawImage(this,10, 20, 280, 288);			
		});
		ctx.restore();
	}

}

function toTrans(deg){	
	var n = 1+ getNum()/10;
	ctx.clearRect(0, 0, 300, 500);
	ctx.save();
	
	//平移配transform
    // ctx.translate(100,100);	  
	// ctx.rotate(deg*Math.PI/180);
	// ctx.scale(n,n);
	// ctx.translate(-100,-100);
	
	//抖动
	ctx.translate(0, getNum()/4);
	
	//透明度
	// ctx.globalAlpha = 0.6;
	
	//阴影
	ctx.shadowBlur = 1;
	// ctx.shadowOffsetX = 1;
	ctx.shadowOffsetY = 1;
	ctx.shadowColor="rgba(0,0,0,.5)";
	
	//加图
	preImage('image/3dimg.gif', function(){	
		ctx.drawImage(this,10, 20, 280, 288);			
	});
	ctx.restore();
}

//返回一个数  //这个数从0开始，每次加1，到10之后又每次减1
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




/************
	开始调用
************/
var canv = document.getElementById('myCanvas');	
var ctx = canv.getContext('2d');
var deg = count = num = 0;

var tosnow = new snowMaker(canv);
// tosnow.start(50, 100);

setInterval(function(){
	toTrans(deg++);		
}, 100);







