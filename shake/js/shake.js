$(function(){	
	//add deviceorientation event listener
	// 倾斜
	var bwid = $('.devicebox').width(),
		bhei = $('.devicebox').height(),
		fwid = $('.firebug').width(),
		fhei = $('.firebug').height(),
		con_x = (bwid - fwid)/2,
		con_y = (bhei - fhei)/2;
	var posx = posy = 0;
	
	function slantController(threshold, stepLength, callback){		
		window.DeviceOrientationEvent && window.addEventListener('deviceorientation',DeviceOrientationHandler,false);		
		var last_update = 0;
		function DeviceOrientationHandler(event){
			// alert("shaked");
			var	curTime = new Date().getTime(),
				diffTime = curTime - last_update;
			if(diffTime > 50){
				last_update = curTime;
				var alpha = +event.alpha,    // 0--360
					beta = +event.beta,      // -180--180
					gamma = +event.gamma;    // -90--90
				if(Math.abs(beta) > threshold || Math.abs(gamma) > threshold){
					var _obj = {
						beta : beta,
						gamma : gamma,						
						stepLength : stepLength
					}
					callback && callback(_obj);					
				}
			}
		}
	}	
	
	function toplay(opt){
		var gamma = opt.gamma,
			beta = opt.beta,
			step = opt.stepLength;			
		posx = gamma > 0 ? posx+step : posx-step;
		posy = beta > 0 ? posy+step : posy-step;
		
		//控制元素移动的范围在屏幕内				
		if(posx < -con_x){
			posx = -con_x;
		}else if(posx > con_x){
			posx = con_x;
		}				
		if(posy < -con_y){
			posy = -con_y;
		}else if(posy > con_y){
			posy = con_y;
		}	
		$('.firebug').css({'-webkit-transform':'translate3d('+ posx +'px,' + posy +'px,0)'});		
	}
	
	slantController(10,3, function(s){
		// alert(22);
		toplay(s);
	});
	
	
	
	// devicemotion
	// 摇晃
	function Shake(threshold,callback){           
		this.SHAKE_THRESHOLD = threshold ? threshold : 2000; //定义阈值            
		this.last_update = 0;            
		this.x = this.y = this.z = this.last_x = this.last_y = this.last_z = 0;            
		this.init = function(){			
			window.DeviceMotionEvent && window.addEventListener('devicemotion', this.deviceMotionHandler, false);
		};            
		var that = this;            
		this.deviceMotionHandler = function(eventData) {		
			var acceleration = eventData.accelerationIncludingGravity;
				curTime = new Date().getTime(),
				diffTime = curTime - that.last_update;
			if (diffTime > 100) {				
				that.last_update = curTime;  
				that.x = acceleration.x;
				that.y = acceleration.y;
				that.z = acceleration.z;
				
				var speed = Math.abs(that.x + that.y + that.z - that.last_x - that.last_y - that.last_z) / diffTime * 10000;
				if (speed > that.SHAKE_THRESHOLD) {
					if(window.console && console.log){
						console.log("shaked");
					}                        
					if(callback != undefined){
						callback(that);
					}                    
				}                    
				that.last_x = that.x;
				that.last_y = that.y;
				that.last_z = that.z;
			}            
		}        
	};	

	
	var shake1 = new Shake(2000,function(obj){            
		// alert("shaked");		        
		$('#tex1').text(obj.x);    
		$('#tex2').text(obj.y);    
		$('#tex3').text(obj.z);    
	});        
	// shake1.init();  


	
	
	/*
	var bwid = $('.devicebox').width(),
		bhei = $('.devicebox').height(),
		fwid = $('.firebug').width(),
		fhei = $('.firebug').height(),
		con_x = (bwid - fwid)/2,
		con_y = (bwid - fhei)/2;
	
	window.DeviceMotionEvent && window.addEventListener('devicemotion', deviceMotionHandler, false);
	
	var SHAKE_THRESHOLD = 1000;
	var last_update = 0;
	var x = y = z = last_x = last_y = last_z = 0;	
	var canShake = 1;   //摇一摇开关，1表示开，0表示关
	
	function deviceMotionHandler(eventData) {
		var acceleration = eventData.accelerationIncludingGravity,
			curTime = new Date().getTime(),
			diffTime = curTime - last_update;

		//100ms监听一次，拒绝重复监听
		// if ((curTime - last_update) > 100 && canShake == 1){
		if (diffTime > 100) {		// 每隔100ms监听一次	
			last_update = curTime;  //进入后开始重新计时
			x = +acceleration.x;
			y = +acceleration.y;
			z = +acceleration.z;
			
			// console.log(typeof x);
			var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
			// console.log(typeof speed);
			// console.log(speed);
			if (speed > SHAKE_THRESHOLD){
				// canShake = 0;  //已经开始了，就关掉				
				$('#texp1').text(x);
				$('#texp2').text(y);
				$('#texp3').text(z);
				
				//控制元素移动的范围在屏幕内
				var tox, toy;
				if(x*20 < -con_x){
					tox = -con_x;
				}else if(20*x > con_x){
					tox = con_x;
				}else{
					tox = x*20;
				}
				
				if(y*20 < -con_y){
					toy = -con_y;
				}else if(20*y > con_y){
					toy = con_y;
				}else{
					toy = y*20;
				}
				
				$('.firebug').css({transform:'translate3d(' + tox + 'px,'+ toy +'px,0)'});
			}
			
			// 结束之后刷新坐标，以备重新开始
			last_x = x;
			last_y = y;
			last_z = z;
		}
	}	
	*/
	
});


