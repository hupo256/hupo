$(function(){
//canvas动画类
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
				y : Math.random()*cans.height,
				r : 2+Math.random(),
				speed : 2+Math.random()*3
			});
		}
		return arr;
	},
	
	//根据元素画出对象
	draw : function(arr, color){
		var cans = this.canvas,
			c = cans.getContext('2d');		
		c.clearRect(0, 0, cans.width, cans.height);
		c.fillStyle = color; //填充样式
		for(var i=0, k=arr.length; i<k; i++){
			var obj = arr[i];					  
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
			obj.x += x/7;
			obj.y += y/7;
		}
	}
}

/*   开始调用   */
var cans1=document.getElementById("myCanvas1");
	cans2=document.getElementById("myCanvas2"),
	cans=document.getElementById("myCanvas"),
	cir1 = new creatCircle(cans1),
	arr1 = cir1.createArr(50),
	
	cir2 = new creatCircle(cans2),
	arr2 = cir2.createArr(50),
	
	cir = new creatCircle(cans),
	arr = cir.createArr(50),
	reqtime = null;
	
var loop = function(){	
	cir1.draw(arr1, '#c00');
	cir2.draw(arr2, '#f90');
	cir.draw(arr, '#16a');
	reqtime = requestAnimationFrame(loop);
}
loop();

/*   添加交互事情    */
var px = 0, py = 0;
$('.canv').on('mouseenter', function(e){
	px = e.pageX; 
	py = e.pageY;	
	cancelAnimationFrame(reqtime);
}).on('mouseleave', function(){	
	loop();
}).on('mousemove', function(e){
	var x = px - e.pageX,
		y = py - e.pageY;		
	px = e.pageX; 
	py = e.pageY;
	if(Math.abs(x) > 5 || Math.abs(y) > 5 ){
		cir1.updateXY(arr1, -x, -y);
		cir2.updateXY(arr2, -x/4, -y/4);
		cir.updateXY(arr, x, y);
		cir1.draw(arr1);
		cir2.draw(arr2);
		cir.draw(arr);
	}
});

});












