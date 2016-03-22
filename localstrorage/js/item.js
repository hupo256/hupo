
	var lcs = window.localStorage,
		u_name = lcs.name,
		u_result = lcs.result;
	if(u_name){
		var pers ={
			name : u_name,
			result : u_result
		}
		console.log(pers);
		alert(pers);
	}else{
		lcs.name = 'wer';
		lcs.result = 3;
		console.log('one');
		alert('one');
	}