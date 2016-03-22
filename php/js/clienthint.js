function showHint(str) {
	if(str.length === 0) return false;
	var _url = "gethint.php" +  "?q=" + str + "&sid=" + Math.random();			
	$.ajax({
		url : _url,
		type : 'get',
		success : function(rs){
			console.log(rs);
			$("#txtHint").text(rs);
		},
		error : function(){
			console.log('fail');
			$("#txtHint").text(rs);
		}
	});	
}

$('#txt1').on('keyup', function(){
	showHint(this.value);
});