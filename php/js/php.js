$(function(){
	console.log(22);
	$.get('getD.php', function(e){
		console.log(e);
		// $('#divbox').html(e);
	});
	
	
	var inps = $('#formbox>input');
	$('#submit').on('click', function(){
		var para = {
			fname : inps[0].value,
			lname : inps[1].value,
			age : inps[2].value
		}
		
		$.ajax({
			type : 'post',
			url : 'postD.php',
			data : para,
			success : function(rs){
				console.log(rs);
				$("#divbox").text(rs);
			},
			error : function(){
				console.log('fail');
				$("#divbox").text(rs);
			}
		});	
		
		return false;
	});
	
	
	
	
});


