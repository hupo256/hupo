$(function(){
	// console.log(33);
	
	setTimeout(function(){
		$('.barragebox').addClass('run');
	}, 400);
	
	$.get('json.txt', function(rs){
		// console.log(rs);		
		var arr = JSON.parse(rs),
			_arr = []
		for(var i =0, k=arr.length; i<k; i++){
			_arr.push(arr[i].deptName);
		}
	
		var	htex = updateCart(_arr);
		$('.barragebox').html(htex);
	});
	
	
	var tex = "在以下文档模式中受到支持,Internet Explorer 8,标准模式,Internet Explorer 9 标准模式,Internet Explorer 10 标准模式,Internet Explorer 11 标准模式,此外，也在应用商店应用",
		texArr = tex.split(',');
	var htex = updateCart(texArr)
	// $('.barragebox').html(htex);	
	
	function updateCart(arr){
		var _html = '';
		for(var i=0,k=arr.length; i<k; i++){
			var num = 100 + Math.random()*100;
			var p = '<p style="transform:translateX(' + num + '%); animation-delay:' + Math.random()*5 + 's;">' + arr[i] + '</p>';
			_html += p;
		}	
		return _html;
	}
	
	
	for( var i in document.location){
		console.log(i);
	}
});