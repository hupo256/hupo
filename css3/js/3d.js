$(function(){	
	var _box = $('.item');
	_box.on('click', function(e){
		console.log(11);
		$(this).css({'-webkit-transform':'rotateX(180deg)', 'transform':'rotateX(180deg)'})
	});
	
	// touch.on(document, 'touchstart', function(ev){
		// ev.preventDefault();
	// });	
	
	_box.on('swipeUp', function(){		
	// touch.on(_box, 'swipeup', function(){		
		console.log('swipeUp');
		$(this).css('transform','rotateX(180deg)')
		
		return false;
	});
	
	
	$('#sdom').on('swipeUp', function(){		
		console.log('swipeUp');
		$(this).css('transform','rotateX(180deg)');
		
		$('#stex').text('swipeUp');
	});
	
	
});