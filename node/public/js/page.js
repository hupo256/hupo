$(function(){	
	$('#add').on('click', function(){		
		var para = {
			name : $('#fstn').val(),
			age : $('#lstn').val()
		}
		
		$.ajax({			
			url : 'http://127.0.0.1:8082/addDate',
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
			url : 'http://127.0.0.1:8082/getList?age=4',
			dataType : "json",
			success : function (res) {
				console.log(res);
				
				var html = createList(res);
				$('#rsbox').html(html);
				
				function createList(arr){		
					var html = '';
					for(var i=0,k=arr.length; i<k; i++){			
						var o = arr[i],
							_n = o.name,
							_a = o.age,
							li = '<li>' + _n + ':  ' + _a  + '</li>';
						html += li;	
					}
					// console.log(html);
					return html;
				}
			},
			error : function(){
				console.log('fail');
			}
		});
		
		return false;
	});
	
	$('#edit').on('click', function(){
		var para = {			
			age : 16
		}
		$.ajax({			
			url : 'http://127.0.0.1:8082/updateDate',
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
	
	$('#del').on('click', function(){
		var para = {			
			age : ''
		}
		$.ajax({			
			url : 'http://127.0.0.1:8082/delDate',
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
	
	
	$('.addtb').on('click', function(){		
		$.ajax({			
			url : 'http://127.0.0.1:8082/newDB',
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