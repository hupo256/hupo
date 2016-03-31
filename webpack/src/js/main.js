/* 内容区模块代码 */
var i = 0;
var time = setInterval(function(){
		console.log(i);
		i++;
		if(i>20) {
			clearInterval(time);
		}
		var tex = '<p>' + i + '</p>'
		$('#content').html(tex);
	}, 400);