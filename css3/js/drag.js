$(function(){
//样式
//$("#drag").css({"position":"absolute","top":"100px","left":"100px","border":"1px solid #789","width":"150px","height":"90px","background":"#988f82","cursor":"move"})
	/*+++++ 拖曳效果 ++++++
	*原理：标记拖曳状态dragging，坐标位置iX、iY
	*   mousedown:fn(){dragging = true：记录起始坐标位置，设置鼠标捕获}
	*   mouseover:fn(){判断如果dragging = true，则当前坐标位置 - 记录起始坐标位置，绝对定位的元素获得差值}
	*   mouseup:fn(){dragging = false：释放鼠标捕获，防止冒泡}
	*/
	var dragging = false;
	var iX, iY;
	$("#drag").mousedown(function(e) {
		dragging = true;                 //按下时，打开拖动
		iX = e.clientX - this.offsetLeft;   //当鼠标按的那刻，就可以确定用以定位的差值
		iY = e.clientY - this.offsetTop;
		this.setCapture && this.setCapture();  //锁定光标于当前窗口
		return false;
	});
	$('#dragout').mousemove(function(e) {
		if (dragging) {
			var e = e || window.event,
				oX = e.clientX - iX,
				oY = e.clientY - iY,
				outx = this.offsetLeft,
				outt = this.offsetTop,
				_w = $("#dragout").width(),
				_h = $('#dragout').height(),
				_sw = $("#drag").width(),
				_sh = $('#drag').height();			
			// if(oX < 0) oX = 0;
			// if(oX > e.clientX + _w - _sw) oX = e.clientX + _w - _sw;
			oX = oX > outx + _w - _sw ? outx + _w - _sw : oX;
			oY = oY > outt + _h - _sh ? outt + _h - _sh : oY;
			oX = oX > 0 ? oX : 0;
			oY = oY > 0 ? oY : 0;
			$("#drag").css({"left":oX, "top":oY});
			return false;
		}
	});
	$('#dragout').mouseup(function(e) {
		dragging = false;         //松开时关闭手动
		$("#drag")[0].releaseCapture();   //释放光标的锁定
		e.cancelBubble = true;
	});
	
	
})