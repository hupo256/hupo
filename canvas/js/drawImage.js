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
	
	
$(function(){
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d');
	ctx.strokeStyle = "#aaa";
	ctx.rect(20,20,80,80);  //先画个矩形
	// ctx.stroke();
	
	console.log(ctx);
	
	
	function creatRoll(){
		return {
			px : Math.random()*canvas.width,
			py : 0,
			speed: 2+Math.random()*5, //between 2 and 5
			rw: 30+Math.random()*60  //between 5 and 8			      
		}
	}
	var obj = creatRoll();
	// console.log(obj);
	
	//循环添加
	// preImage('image/redpage.png', function(){
		// // ctx.rotate(1.1);
		// // ctx.drawImage(this, 10, 10, 160, 200);
		
		
		// return;
		// var that = this;
		// var obj = creatRoll();
		
		// var py = 0, px = 0;
		// var imgTime = setInterval(function(){
			// ctx.clearRect(0, 0, 375, 605);
			// py += obj.speed;
			// px += obj.speed/2;
			// if(py > 605 && px >375){
				// obj = creatRoll();
				// py = -obj.rw*5/4;				
				// px = obj.px;				
				// // console.log(obj);
			// }
			// ctx.drawImage(that, px, py, obj.rw, obj.rw*5/4);
		// }, 17);
	// });
	
	/*
	//匀速平移
	preImage('image/scene9.jpg', function(){
		var that = this;		
		var py = 0, px =0;		
		var imgTime = setInterval(function(){
			// ctx.drawImage(that, 0, 0, 2420, 375);
			// return;
			ctx.clearRect(0, 0, 375, 605);
			py += 3;
			px -= 2;
			// if(py > 605 && px > 375){
			if(px < 375 - 2420){				
				py = -100;
				px = 0;
			}					
			ctx.drawImage(that, px, 0, 2420, 375);
		}, 17);
	});
	*/
	
	/*
	//循环添加
	preImage('image/redpage.png', function(){
		var that = this;
		// ctx.drawImage(this, 20, 20, 80, 100);
		// ctx.scale(1.5,1.5);		
		// ctx.drawImage(this, 20,20, 80, 100,120,120,80,100);
				
		var py = 0;		
		var imgTime = setInterval(function(){
			ctx.clearRect(20, py-2, 400, 300);
			py += 3;
			if(py > 300){
				py = -100;
			}
			// ctx.clearRect(0, 0, 400, 300);			
			ctx.drawImage(that, 20, py, 80, 100);
		}, 17);
	});
	*/
	
	/*
	//场景切换
	preImage('image/scene3t4.jpg', function(){	
		var that = this;
		// ctx.drawImage(this, 0, 0, 750, 1210, 0, 0, 375, 605);	
		
		var py = -1210;		
		var imgTime = setInterval(function(){			
			py += 1210;			
			if(py > 7260){				
				clearInterval(imgTime);
				
				preImage('image/scene4.jpg', function(){
					// ctx.drawImage(this, 0, 0, 750, 1210, 0, 0, 375, 605);
					// return;
					var that = this;
					var py1 = -1210;			
					var imgTime = setInterval(function(){						
						py1 += 1210;
						if(py1 > 3630){									
							py1 = -1210;							
						}else{
							ctx.clearRect(0, 0, 375, 605);
							ctx.drawImage(that, 0, py1, 750, 1210, 0, 0, 375, 605);
						}						
					}, 150);
				});
			}else{
				ctx.clearRect(0, 0, 375, 605);
				ctx.drawImage(that, 0, py, 750, 1210, 0, 0, 375, 605);
			}			
		}, 150);
	});
	*/	
});


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
	this.ctx.fillStyle = 'rgba(255,255,255,.3)';
	// this.ctx.fillStyle = '#fff';
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
		var arr = this.rollArr;			
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
		var arr = this.rollArr;
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
		
		// preImage('image/fontimg.png', function(){
			// ctx.drawImage(this, 0, 0, 375, 605);
		// });
		
		// var _imgX = ctx.canvas.width/2;
		// preImage('image/icon.png', function(){
			// ctx.drawImage(this,375, 0, 40,45, _imgX-20, 400, 40,45);
		// });
	}
}

var canforSnow = document.getElementById('canvas'),
	tosnow = new snowMaker(canforSnow),
	reqtime = null;
tosnow.start(500, 16.7);

canforSnow.onclick = function(e){
	var x = e.offsetX, y = e.offsetY;
	// console.log(x,y);	
	
	preImage('image/icon.png', function(){
		var ctx = tosnow.ctx;
		ctx.drawImage(this,375, 0, 40,45, 160, 400, 40,45);		
		ctx.rect(160, 400, 40,45);  //确定点击框 
		if(ctx.isPointInPath(x,y)){
			console.log(22);			
		}
	});
	
	cancelAnimationFrame(reqtime);
}


/*  requestAnimationFrame   */
//requestAnimationFrame 需要在循环中调用自己
function loop(){	
	console.log(23);
	
	reqtime = requestAnimationFrame(loop);
}
requestAnimationFrame(loop);




/*
//下雪效果
var canvas = document.getElementById('canvas'),
	c = canvas.getContext('2d');
	c.fillStyle = '#16a';
var particles = [];

function loop() {
    createParticles();
    updateParticles();
    killParticles();
    drawParticles();
}

function createParticles() {
	if(particles.length < 80) {
		particles.push({
			x: Math.random()*canvas.width,
			y: 0,
			speed: 2+Math.random()*5, //between 2 and 5
			radius: 2+Math.random()*2  //between 5 and 10
		});
	}
}
function updateParticles() {
    for(var i in particles) {
        var part = particles[i];
        part.y += part.speed;
    }
}
function killParticles() {
    for(var i in particles) {
        var part = particles[i];
        if(part.y > canvas.height) {
            part.y = 0;
        }
    }
}

function drawParticles() {
    var c = canvas.getContext('2d');	
	c.clearRect(0, 0, 375, 605);	
    for(var i in particles) {
        var part = particles[i];
        c.beginPath();
        c.arc(part.x, part.y, part.radius, 0, Math.PI*2);
        c.closePath();     
        c.fill();
    }
}
setInterval(loop,30);
*/

/*
function createCanopyPath(ctx) {
	// Draw the tree canopy
	ctx.beginPath();

	ctx.moveTo(-25, -50);
	ctx.lineTo(-10, -80);
	ctx.lineTo(-20, -80);
	ctx.lineTo(-5, -110);
	ctx.lineTo(-15, -110);

	// 树的顶点
	ctx.lineTo(0, -140);

	ctx.lineTo(15, -110);
	ctx.lineTo(5, -110);
	ctx.lineTo(20, -80);
	ctx.lineTo(10, -80);
	ctx.lineTo(25, -50);
	
	// 连接起点，闭合路径
	ctx.closePath();
}

function drawTrails() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	ctx.save();
	ctx.translate(130, 250);
	createCanopyPath(ctx);
	ctx.restore();

	// // 在 X=260, Y=500 处绘制第二棵树
	ctx.save();
	ctx.translate(260, 500);

	// 将第二棵树的高宽放大到原来的2倍
	ctx.scale(2, 2);
	createCanopyPath(ctx);
	//颜色
	ctx.strokeStyle = '#663300';
	// 绘制当前路径
	ctx.fillStyle = "#339900";
	ctx.fill();
				
	ctx.restore();
}

window.addEventListener("load", drawTrails, true);
*/










