$(function(){
	var bd = $('body'),
		bHeight = bd.height(),		
		effectType = 'easeInCirc',   //easeOutCirc  easeOutQuint  easeInCirc	 	
		effectTypeEnd = 'linear',   
		conTime = 1000,   
		litTime = 300,		
		pages = $('.coverlaye > section'),
		animteDom = $('.animbox > section');
		
	$('.animbox, .coverlaye').animate({top: -6*bHeight}, 10, 'linear');
	// $('.animbox, .coverlaye').animate({top: -5.5*bHeight}, 10, 'linear');
	
	var firstPot = startPot = 0;
	//start
	touchFunc(bd[0], 'start', function(e){
		firstPot = startPot = e.targetTouches[0].pageY;
	});
	
	// move
	touchFunc(bd[0], 'move', function(e){		
		var currPot = e.targetTouches[0].pageY,
			dis = currPot - startPot,
			tp = $('.coverlaye').position().top,
			dom = e.target,
			ind = pages.index(dom);
		toAnimUp(ind);
		if(tp < -bHeight*6+1 || tp > -1) return false;		
		$('.animbox, .coverlaye').stop().animate({top: '+=' + dis + 'px'}, 10, 'linear');  		
		startPot = e.targetTouches[0].pageY;    //重新开始		
	});
	
	//抬起
	touchFunc(bd[0], 'end', function(e){		
		simulateTab(e)
	});
	
	//下滑
	touchFunc(bd[0], 'down', function(e){		
		toDown(e);
	});
	
	//上滑
	touchFunc(bd[0], 'top', function(e){		
		toUp(e);
	});
	
	//手指抬起来时判断上行还是下行
	function simulateTab(e){
		var dom = e.target,
			ind = pages.index(dom),
			distan = startPot - firstPot;		
		if(ind === 0 && ind === 6) return false;
		if(Math.abs(distan) > 5){  //开始切换	
			distan > 0 ? toDown(e) : toUp(e);
		}
	}
	
	//下行
	function toDown(e){
		var dom = e.target,
			ind = pages.index(dom) - 1;
		if(ind < 0) return false;	//如果到顶就不响应	
		$('.animbox, .coverlaye').stop().animate({top: -ind*bHeight}, conTime, effectType, function(){			
			//缓动一下
			$('.animbox, .coverlaye').stop().animate({top: '-=10px'}, litTime, effectTypeEnd, function(){
				console.log($(this));
				$(this).animate({top: '+=10px'}, litTime, effectTypeEnd);
			});
		});		
	}
	
	//上行
	function toUp(e){
		var dom = e.target,
			ind = pages.index(dom) + 1;
		if(ind > 9) return false;	//如果到底就不响应	
		$('.animbox, .coverlaye').stop().animate({top: -ind*bHeight}, conTime, effectType, function(){			
			//先缓动一下			
			$('.animbox, .coverlaye').stop().animate({top: '+=10px'}, litTime, effectTypeEnd, function(){
				$(this).animate({top: '-=10px'}, litTime, effectTypeEnd);
			});	
		});
	}		
	
	//向上缓动
	function toAnimUp(index){
		animteDom.find('.texbox').removeClass('toup');
		animteDom.eq(index).find('.texbox').addClass('toup');
	}
	
	//向下缓动
	function toAnimDown(index){
		animteDom.find('.texbox').removeClass('todown');
		animteDom.eq(index).find('.texbox').addClass('todown');
	}
	
	
	/*******************
	 *
	 * class
	 * 百分比加载效果
	 * @param  container 放进度条的容器
	 *
	 * @discription 
	 * @date 20151229
	 *
	 *******************/
	function progressBar(container){
		this.container = container;
		this.imgNum = 0;
		this.createBar()
	}
	
	progressBar.prototype = {
		//主进度条
		pres : $('<div>'),

		//显示百分比
		texbox: $('<p>'),
		
		//生成进度条并CSS
		createBar : function(){		
			var _pres = this.pres,
				_texb = this.texbox,
				presborde = $('<div>').css({
					width:'100%',
					border:'1px solid #ccc',
					borderRadius:'5px'
				});
			_pres.css({
				transition:'all 0.4s ease 0.1s',
				boxShadow:'1px 1px 1px #333 inset',
				height:'10px',
				borderRadius:'5px',
				background:'#16a'
			});
			_texb.css({
				textAlign:'center',
				fontSize:'1em'
			});
			presborde.append(_pres);
			this.container.append(presborde);
			this.container.append(_texb);
		},
		
		//加载完毕后进行进度处理
		imgDone : function (toatal){
			this.imgNum++;			
			var pct = Math.floor(this.imgNum/toatal*100) + '%', that = this;			
			this.pres.width(pct);
			this.texbox.text(pct);			
			if(this.imgNum === toatal){
				setTimeout(function(){
					that.container.hide();
				}, 600);
			}
		},	
		
		//加载页面中所需的img们
		loadimgs : function (arr){
			var that = this;
			for(var i=0, k=arr.length; i<k; i++){
				var img = document.createElement('img');
				img.src = arr[i];
				
				//加载失败时报错
				img.onerror = function(e){					
					that.texbox.text('网络出现问题，请稍后再试');
				}
				
				if (img.complete) {				
					this.imgDone(k);
				} else {
					img.onload = function(){					
						// img.onload = null;
						that.imgDone(k);
					}
				};	
			}
		}
	}
	
	
	/***********    加载进度条    *************/	
	var imgArr = [
		'image/sens1.gif',
		'image/sens2.gif',
		'image/sens3.gif',
		'image/sens4.gif',
		'image/sens5.gif',
		'image/sens6.gif',
		'image/sens7.gif'		
	],
	prog = new progressBar($('#pbox'));
	prog.loadimgs(imgArr);
});