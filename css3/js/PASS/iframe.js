// iframe 里的操作
window.onload = function () {
	var ifr1 = document.getElementById('iframeId'),
		_idy = ifr1.contentWindow.document.body.scrollHeight,   //获取子框架的高
		ihie = ifr1.contentWindow.document.getElementById('idw');  //获取子框架中的ID
	
	
	ihie.style.background = '#c00';
	ifr1.height = _idy + 30;
	
	
	var _bo = document.body;
	var els = _bo.childNodes;
	var _tex = '';
	for(var i=0, k=els.length; i<k; i++){
		_tex += els[i] + '<br />';
		// console.log(_tex);
	}
	var stex = document.getElementById('stex');
	stex.innerHTML = _tex;
}