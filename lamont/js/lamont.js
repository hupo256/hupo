$(function(){	
	var roles = $('.rolebox>li'),
		roles1 = $('li[data-row1]'),
		roles2 = $('li[data-row2]'),
		roles3 = $('li[data-row3]'),
		roArr = [roles1, roles2, roles3];
	
	var isWin = {   //中奖与否
		status : 0,
		content : 5
	};
	
	
	$('.begain').on('touchstart', function(){		
		var _cls = $('.rolebox')[0].className,
			_ind = _cls.indexOf('roleplay');
		_ind > -1 ? showResult(isWin) : gotoPlay(roles);
		return false;
	});	

	/*
	$('.begain').on('tap', function(){
		trunBG(roles1);
		return false;
	});
	*/
	
	//停止后，根据中奖与否刷新role们
	function showResult(winObj){
		$('.rolebox').removeClass('roleplay');	
		if(winObj.status){  //中了			
			setTimeout(function(){  //设置定时，缓动才有缓动效果
				var num = winObj.content;			
				trunBG(roles2, [num,num,num]);
			}, 20);	
		}else{  //没中
			setTimeout(function(){  //设置定时，缓动才有缓动效果
				for(var i=0,k=roArr.length; i<k; i++){
					trunBG(roArr[i]);
				}	
			}, 20);			
		}
	}

	//开始运行
	function gotoPlay(roleArr){
		//初始化就是将JS控制的CSS清空，然后class也还原
		roleArr.each(function(i,d){d.style.cssText = '';});
		$('.rolebox').addClass('roleplay');
	}
	
	//改变背景坐标
	function trunBG(roleArr, numArr){	
		var arr =  numArr || returnTheArr(9);
		console.log(arr);		
		for(var i=0, k=arr.length; i<k; i++){
			var pos = '0 ' + arr[i]*100/9 + '%';
			roleArr.eq(i).css('background-position', pos);
		}		
	}	
	
	//返回至少有一个不同的个三数 数组
	function returnTheArr(number){
		var n1 = Math.floor(Math.random()*number),
			n2 = Math.floor(Math.random()*number),
			n3 = Math.floor(Math.random()*number);
		while( n1===n2===n3){
			n3 = Math.floor(Math.random()*number);
		}		
		return [n1, n2, n3];		
	}	
});