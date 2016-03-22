$(function(){
	var hei = $(document).height();	
	$('.wrapper').height(hei*8);	
	var pg1 = $('.pg1'),
		btop = 0;
	
	$(window).on('scroll', function(e){
		var _bp = document.body.scrollTop;
		if(Math.abs(btop - _bp) < 20 ) return false;		
		var num = pg1[0].getBoundingClientRect().top;		
		if(num>-hei*2/3 && num <hei/3){		
			debr.goTogether(_fuc);			
		}else{		
			debr.goDisperse(_fuc);			
		}
		btop = _bp;  //刷新滚动的值
	});	
	
	
	
	var _fuc = function(e){
		console.log(e);
	}
	
	/***********    碎片效果   *************/
	var debr_opt = {
		container : $('.effect'),
		row : 15,
		column : 8,
		continueTime : '800'
	}
	var debr = new DRmkt_Tool.debrisEffect(debr_opt);		
	debr.creatDivs();
	
	
	/***********    雪花效果   *************/	
	var snowopt = {
			container : $('.transbox'),
			imgUrl : 'image/transimg.png',
			autoPlay : true,  //自动播放，默认不自动	
			num : 20         //雪花片数,默认10片				
		},
		snow = new DRmkt_Tool.snowEffect(snowopt);	
	
	
	/***********    引用微信SDK   *************/
	var wxobj = {
		debug : true,		
		imgUrl: '',
		momentsTitle: '朋友圈',
		chatTitle: '好友',
		description: '分享给好友的一段描述',
		callback : function(){
			alert('done');
		}
	}
	// var wxsdk = new DRmkt_Tool.insertWXSDK(wxobj);

	
	
});