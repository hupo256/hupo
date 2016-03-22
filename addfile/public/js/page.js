$(function(){	
	$('#add').on('click', function(){		
		var para = {
			name : $('#fstn').val(),
			age : $('#lstn').val()
		}
		
		$.ajax({			
			url : 'http://127.0.0.1:8082/addper',
			type : 'POST',
			dataType : "json",
			data : para,			
			success : function (res) {
				console.log(res);
			},
			error : function(){
				console.log('fail');
			}
		});		
		return false;
	});
	
	
	$('#get').on('click', function(){	
		$.ajax({			
			url : 'http://127.0.0.1:8082/getper',			
			dataType : "json",				
			success : function (res) {				
				var arr = res.toString().split(';'), Arr = [];
				arr.shift();
				for(var i=0,k=arr.length; i<k; i++){
					var _ar = arr[i].split(',');
					Arr.push(_ar);
				}
				console.log(Arr);
			},
			error : function(){
				console.log('fail');
			}
		});
		
		return false;
	});
	
	$('#edit').on('click', function(){
		console.log(22);
		var para = '';
		$.ajax({			
			url : 'http://127.0.0.1:8082/editper',
			type : 'POST',
			data : para,
			dataType : "json",				
			success : function (res) {
				console.log(res);
			},
			error : function(){
				console.log('fail');
			}
		});
		
		return false;
	});
	
	$('#del').on('click', function(){	
		$.ajax({			
			url : 'http://127.0.0.1:8082/delper',
			type : 'POST',
			dataType : "json",				
			success : function (res) {
				console.log(res);
			},
			error : function(){
				console.log('fail');
			}
		});
		
		return false;
	});
	
	
	
});