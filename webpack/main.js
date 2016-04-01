/* 内容区模块代码 */
require('./src/css/loadbox.css'); //加载初始化样式
// require('./src/js/zepto.min.js'); //加载初始化样式
require('./src/js/loadbox.js'); //加载初始化样式

var i = 0;
var time = setInterval(function(){	
	i++;
	if(i>5) {
		console.log(i);
	}	
}, 400);