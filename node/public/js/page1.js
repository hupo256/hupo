$(function(){	
	
	$('#add').on('click', function(){
		$.ajax({
			url:'node_get',
			type:'GET',
			dateType:'json',
			success : function(rs){
				console.log(rs);
			},
			error : function(){
				console.log('fail');
			}
		});
	});
	
});