$(function(){
	var currentIndex = 0;
	
	var nextbtn = $('[data-next]');
	nextbtn.on('click', function(){	
		currentIndex++
		var currp = $(this).parents('.pagebox'),  //当前页
			_cls = $(this).data().next,
			nextp = $('.' + _cls);      //下一页		
		nextPage(currp, nextp, funback);
	});
	
	var prevbnt = $('.prev');
	prevbnt.on('click', function(){
		var currp = $(this).parents('.pagebox'),    //当前页
			nextp = $('.__level' + currentIndex);   //下一页
		// console.log(nextp);
		prevPage(currp, nextp, funback);
		currentIndex--;
	});	
	
	
	//下一页
	function nextPage(currp, nextp, callback){		
		currp.css({'-webkit-transform':'translate3D(-100%,0,0)'})
			.addClass('__level' + currentIndex); 
		nextp.css({'-webkit-transform':'translate3D(0,0,0)'});
		if(callback) callback(nextp);
	}
	
	//上一页
	function prevPage(currp, nextp, callback){
		currp.css({'-webkit-transform':'translate3D(-100%,0,0)'})
			.addClass('__level' + currentIndex); 
		nextp.css({'-webkit-transform':'translate3D(0,0,0)'});
		if(callback) callback(nextp);
	}
	
	function funback(){
		console.log('done');
	}
});