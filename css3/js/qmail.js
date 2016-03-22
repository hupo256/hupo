function app(){
	function getSelectedContents() {
		if (window.getSelection) { //chrome,firefox,opera
			var range = window.getSelection().getRangeAt(0);
			var container = document.createElement('div');
			container.appendChild(range.cloneContents());
			return container.innerHTML;
			//return window.getSelection(); //只复制文本
		} else if (document.getSelection) { //其他
			var range = window.getSelection().getRangeAt(0);
			var container = document.createElement('div');
			container.appendChild(range.cloneContents());
			return container.innerHTML;
			//return document.getSelection(); //只复制文本
		} else if (document.selection) { //IE特有的
			return document.selection.createRange().htmlText;
			//return document.selection.createRange().text; //只复制文本
		}
	}
	
	function getSelectedContents() {
		if (window.getSelection) { //chrome,firefox,opera
			var range = window.getSelection().getRangeAt(0);
			console.log(range);
			// var container = document.createElement('div');
			// container.appendChild(range.cloneContents());
			// return container.innerHTML;
			return range.cloneContents();
		}
	}

	var tt = getSelectedContents();
	console.log(tt);
	console.log(typeof tt);
	document.forms[0].selectedtext.value = tt; 
	
	var _ds = $(tt);
	console.log(_ds);
	console.log(_ds.length);
	_ds.each(function(i,d){
		if(d.nodeType === 1){
			$(d).addClass('on');
		}
	});
	
	console.log(_ds);
	$('#newbox').append(_ds);
	// $('#libox').empty().append(_ds);
	
	
	
	
}

 
