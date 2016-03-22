$(function(){	
	var zl = 150 / Math.tan(20 / 180 * Math.PI);
	var le = 150 / Math.tan(22.5 / 180 * Math.PI);
	// console.log(zl*2);	
	// console.log(le);		
	
	function _fuc(n){
		console.log(n);
	}	
	
	/***********    去掉loading 开始动画    *************/	
	var hideLoad = new DRmkt_Tool.hideLoading($('#point'), $('.loading'));
	hideLoad.init(hidld);
	
	function hidld(){		
		var _obj ={
				roles : $('section'),
				loop : true,
				// autoPlay : true,
				// interval : 1000
			};			
		var looper = new DRmkt_Tool.swipeUpDown(_obj).bindSwipe(callbackFun);    //上下
		//var looper = new DRmkt_Tool.SwipeLeftRight(_obj).bindSwipe(_fuc);	  //左右
		
		setTimeout(function(){
			$('.pg1>div').addClass('todown');
		},400);
	}		
	
	function callbackFun(n){
		console.log(n);
		setTimeout(function(){
			$('.effect').addClass('todown');
		},400);		
	}
	
	
	/***********    加载进度条    *************/	
	var imgArr = [
		'image/img/scene1.jpg',
		'image/img/scene1_2.jpg',
		'image/img/scene1t2.jpg',
		'image/img/scene2.jpg',
		'image/img/scene2t3.jpg',
		'image/img/scene3.jpg',
		'image/img/scene3t4.jpg',
		'image/img/scene4.jpg',
		'image/img/scene4t5.jpg',
		'image/img/scene5.jpg',
		'image/img/scene6.jpg',			
		'image/img/scene6t7.jpg',
		'image/img/scene7.jpg',
		'image/img/scene7t8.jpg',
		'image/img/scene8.jpg',
		'image/img/scene9.jpg'
	],
	prog = new DRmkt_Tool.progressBar($('#pbox'));
	prog.loadimgs(imgArr);

	
	/***********    碎片效果   *************/
	var debr_opt = {
		container : $('.effect'),
		row : 4,
		column : 8,
		continueTime : '800'
	}
	var debr = new DRmkt_Tool.debrisEffect(debr_opt);		
	debr.creatDivs();
	
	setTimeout(function(){
		debr.goTogether(_fuc);
	}, 400);
	$('.together').on('touchstart', function(){		
		debr.goTogether(_fuc);
	});
	
	$('.disperse').on('touchstart', function(){
		debr.goDisperse(_fuc);
	});
	
	
	/***********    雪花效果   *************/	
	var snowopt = {
			container : $('.transbox'),
			imgUrl : 'image/firebug.png',
			autoPlay : true,  //自动播放，默认不自动	
			num : 40          //雪花片数,默认10片				
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

	
	/***********    localStorage   *************/
	// var lcs = window.localStorage,
		// u_name = lcs.name,
		// u_result = lcs.result;
	// if(u_name){
		// var pers ={
			// name : u_name,
			// result : u_result
		// }
		// console.log(pers);
		// alert(pers);
	// }else{
		// lcs.name = 'wer';
		// lcs.result = 3;
		// console.log('one');
		// alert('one');
	// }
	







	
	
});