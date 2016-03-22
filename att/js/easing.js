$(function(){
	var bd = $('body'),
		anibg = $('.anibg'),
		effectType = 'easeOutBack',   //easeInOutBack  easeOutBounce  easeOutBack
		effectTypeEnd = 'easeInOutBack',
		conTime = 1000,
		litTime = 200,
		midTime = 400,
		
		pageIndex = 9,
		pages = $('.animbox > section');
	
	//进来时先跑一次
	setTimeout(function(){
		toAnimText(pageIndex);
	}, 800);
		
	
	//上滑
	touchFunc(bd[0], 'top', function(){
		var tp = $('.animbox').position().top,
			_h = $('.animbox').height(),
			hei = $(this).height();
		
		//先缓动一下
		$('.animbox').animate({bottom: '+=10px'}, litTime, effectType, function(){
			$(this).animate({bottom: '-=10px'}, midTime, effectType);
		});
		
		//背景
		anibg.animate({bottom: '-=7px'}, litTime, effectType, function(){
			$(this).animate({bottom: '+=5px'}, midTime, effectType);
		});
		
		if(tp < -(_h-hei-1)) return false;	//如果到底就不响应		
		$('.animbox').animate({bottom: '+=' + hei + 'px'}, conTime, effectType, function(){
			console.log('top');
			
			
			pageIndex++;	
			toAnimText(pageIndex);
		});
	});
	
	//下滑
	touchFunc(bd[0], 'down', function(){
		var tp = $('.animbox').position().top,
			hei = $(this).height();
		
		//先缓动一下
		$('.animbox').animate({bottom: '-=10px'}, litTime, effectType, function(){
			$(this).animate({bottom: '+=10px'}, midTime, effectType);
		});
		
		//背景
		anibg.animate({bottom: '+=7px'}, litTime, effectType, function(){
			$(this).animate({bottom: '-=5px'}, midTime, effectType);
		});
		
		if(tp > -1) return false;		//如果到顶就不响应			
		$('.animbox').animate({bottom: '-=' + hei + 'px'}, conTime, effectType, function(){
			console.log('down');
			
			pageIndex--;			
			toAnimText(pageIndex);
		});
	});
	
	//文字出现
	function toAnimText(index){
		pages.find('.texbox').removeClass('texanim');
		pages.eq(index).find('.texbox').addClass('texanim');		
	}
	
	
	
	
});