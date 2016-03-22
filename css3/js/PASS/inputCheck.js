$(function(){
	var inp = $("#inp"),
		btn = $("#btn");

	inp.bind('keyup onafterpaste', function(){
		// this.value = this.value.replace(/\D/g,'');   //数字
		this.value = this.value.replace(/[^a-zA-Z]/g,'');   //英文
		// this.value = this.value.replace(/[^\u4E00-\u9FA5]/g,'');  //汉字
		
		// var len = getSrtLength(this.value);
		// console.log(len);
	})
	
	function getSrtLength(str){
		// var len = 0;
		// for(var i=0,k= str.length; i<k; i++){
			// var charCode = str.charCodeAt(i);
			// if (charCode >= 0 && charCode <= 128){
				// len += 1;
			// }else{
				// len += 2;
			// }
		// }
		// return len;
		
		return str.replace(/[^\x00-\xff]/g,"aa").length;
	}

});