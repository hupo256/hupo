$(function () {
	//banner1
	var banAni1 = {   
		getDom : function(){
			return $('.ban1').find('span');
		},
		play : function(){
			var domArr = this.getDom();
			domArr.eq(3).animate({top:'212',opacity:1}, 800);		
			domArr.eq(0).delay(500).animate({left:'297', opacity:1}, 600);
			domArr.eq(1).delay(500).animate({left:'535', opacity:1}, 600);
			domArr.eq(2).delay(1000).animate({top:'136',opacity:1}, 400);
		},
		goBack : function(){
			var domArr = this.getDom();
			returnBack(domArr);
		}
	}
	
	//banner2
	var banAni2 = {
		getDom : function(){
			return $('.ban2').find('span');
		},
		play : function(){
			var imgArr = this.getDom();
			imgArr.eq(0).animate({opacity:1}, 800)	
				  .next().delay(500).animate({top:'108', opacity:1}, 600)
				  .next().delay(1000).animate({left:'43', opacity:1}, 400)
				  .next().delay(1000).animate({left:'43',opacity:1}, 400);
		},
		goBack : function(){
			var domArr = this.getDom();
			returnBack(domArr);
		}
	}
	
	//banner3
	var banAni3 = {
		getDom : function(){
			return obj = {
				bArr1 : $('.circle_bg').find('b'),
				imgArr2 : $('.aniCircle2').find('span'),
				imgArr3 : $('.img_ban3').find('span')
			}
		},
		play : function(){
			var obj = this.getDom(),
				bArr1 = obj.bArr1,
				imgArr2 = obj.imgArr2,
				imgArr3 = obj.imgArr3;
			imgArr2.eq(0).animate({opacity:1},1200);
			bArr1.delay(400).animate({opacity:0.2},50, function(){
					 bArr1.eq(0).addClass('cirbg1')
					 .next().delay(400).addClass('cirbg2')	
					 .next().delay(400).addClass('cirbg3')	
					 .next().delay(400).addClass('cirbg4');
			});
			imgArr2.eq(1).delay(1200).animate({opacity:1}, 200, function(){
				$(this).next().animate({opacity:1}, 50)
					 .next().animate({opacity:1}, 50)
					 .next().animate({opacity:1}, 50)
					 .next().animate({opacity:1}, 50, function(){
						$(this).parent().addClass('aniCircle');						
						imgArr3.eq(0).animate({left:'495', opacity:1}, 400)
							   .next().animate({left:'494', opacity:1}, 400);
					 });
			});
		},
		goBack : function(){
			var obj = this.getDom(),
				bArr1 = obj.bArr1,
				imgArr2 = obj.imgArr2,
				imgArr3 = obj.imgArr3;			
			bArr1.each(function(i,d){d.className = '';}); //还原就是去掉class
			returnBack(imgArr2);
			returnBack(imgArr3);
		}
	}
	
	//banner4
	var banAni4 = {
		getDom : function(){
			return $('.ban4').find('span');
		},
		play : function(){
			var imgArr = this.getDom();
			imgArr.eq(0).animate({opacity:1}, 400, function(){
			imgArr.eq(0).animate({top:'195'}, 200, function(){
					$(this).animate({opacity:1,top:'218'}, 100);
				});			
			});
			imgArr.eq(1).delay(800).animate({opacity:1,height:'185'}, 400, function(){
				$(this).next().next().animate({opacity:1}, 50)
					   .next().delay(100).animate({opacity:1}, 50)
					   .next().delay(150).animate({opacity:1}, 50)
					   .next().delay(200).animate({opacity:1}, 50)
					   .next().delay(250).animate({opacity:1}, 50)
					   .next().delay(300).animate({opacity:1}, 50);			
			});
			imgArr.eq(2).delay(1200).animate({opacity:1}, 800, function(){
				imgArr.eq(9).animate({left:'6', opacity:1}, 400);
			});		
		},
		goBack : function(){
			var domArr = this.getDom();
			returnBack(domArr);			
		}
	}
	
	//初始化就是将JS控制的CSS清空，然后class也还原
	function returnBack(domArr){		
		domArr.each(function(i,d){d.style.cssText = '';});
	}

	//单例动画	
	function displayer(){
		_bans.eq(_index).stop(true, true).fadeIn(200).siblings().fadeOut(400);
		_tags.removeClass('on').eq(_index).addClass('on');		
		var anim = aniArr[_index],
			_ani = aniArr[_inde_];
		anim.goBack();
		anim.play();
		_ani.goBack();	//记下上一次的值，不用每次都全部循环
	}	
		
	// 首页banner切换
	var _ban = $('#banner'),
		_bans = _ban.children('li'),
		_tags = _ban.next().children('span'),		
		aniArr = [banAni1,banAni2,banAni3,banAni4],
		_len = _bans.length,		
		_time = null,
		_inde_ = -1,   //上一条索引值
		_index = 0;				
	
	//鼠标控制切换
	_tags.mouseover(function () { 	
		_inde_ = _index;
		_index = _tags.index(this);	
		displayer();	
	}).eq(0).mouseover();

	//自动切换
	_ban.hover(function () {
		clearTimeout(_time);  //悬停时停止切换
	}, function () {	
		_time = setTimeout(function(){
			_inde_ = _index;
			_index++;			
			if (_len === _index) _index = 0;
			displayer();
			_time = setTimeout(arguments.callee, 5000);
		}, 5000);		
	}).trigger('mouseleave');	
});	
	
