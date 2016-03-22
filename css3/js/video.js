$(function(){
	console.log(22);
	
	var bgAudio = document.getElementById('bgAudio'),
		ado_control = $('.audio_handle');
	ado_control.on('click', function(){
		$(bgAudio).show();
		bgAudio.webkitEnterFullscreen();
		bgAudio.play();
		
		/*
		if(bgAudio.paused){			
			bgAudio.play();
		}else{			
			bgAudio.pause();
		}
		*/		
	});	
	

	bgAudio.onended = function(){
		console.log(22);
		
		// $(this).fadeOut();
		
		bgAudio.parentNode.removeChild(bgAudio);
	}
	
	
	$('.fullscreen').on('click', function() {
	   //For Webkit
	   video[0].webkitEnterFullscreen();
	 
	   //For Firefox
	   video[0].mozRequestFullScreen();
	 
	   return false;
	});
});