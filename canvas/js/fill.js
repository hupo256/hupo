var cans=document.getElementById("myCanvas");
var ctx=cans.getContext("2d");
ctx.fillStyle = "#16a"; //填充样式

function creatCircle(canvas){	
	this.canvas = canvas;	
}
creatCircle.prototype = {
	//生成元素
	createArr : function(num){
		var cans = this.canvas;		
		var arr = [];
		while(arr.length < num){
			arr.push({
				x : Math.random()*cans.width,
				y : 0,
				r : 2+Math.random()*2,
				speed : 2+Math.random()*3
			});
		}
		return arr;
	},
	
	//根据元素画出对象
	draw : function(arr){
		var cans = this.canvas,
			c = cans.getContext('2d');		
		c.clearRect(0, 0, cans.width, cans.height);	
		for(var i=0, k=arr.length; i<k; i++){
			var obj = arr[i];
			this.updateY(obj);			  
			c.beginPath();
			c.arc(obj.x,obj.y, obj.r, 0, Math.PI*2);
			c.closePath();     
			c.fill();		
		}			
	},
	
	//刷新坐标
	updateY : function(obj){
		var cans = this.canvas,
			hei = cans.height,
			h = obj.y;
		if(h < hei){
			obj.y += obj.speed;
		}else{  //到下边界后，归零y,顺便改一下x;
			obj.y = 0;    
			obj.x = Math.random()*cans.width;
		}		
	},
	
	updateXY : function(arr, x, y){
		for(var i=0, k=arr.length; i<k; i++){
			var obj = arr[i];
			obj.x -= x/9 +1;
			obj.y -= y/9 +1;
		}
	}
}

var cir = new creatCircle(cans),
	arr = cir.createArr(10),
	reqtime = null;
var loop = function(){	
	cir.draw(arr);
	reqtime = requestAnimationFrame(loop);
}
requestAnimationFrame(loop);


var px = 0, py = 0;
$('#myCanvas').on('mouseenter', function(e){
	px = e.pageX; 
	py = e.pageY;	
	cancelAnimationFrame(reqtime);
}).on('mouseleave', function(){	
	cir.draw(arr);
	reqtime = requestAnimationFrame(loop);
});


$('#myCanvas').on('mousemove', function(e){
	var x = px - e.pageX,
		y = py - e.pageY;
		
	px = e.pageX; 
	py = e.pageY;
	// console.log(e);
	
	if(Math.abs(x) > 5 || Math.abs(y) > 5 ){
		// console.log(x);
		
		cir.updateXY(arr, x, y);
		cir.draw(arr);
	}
});

















