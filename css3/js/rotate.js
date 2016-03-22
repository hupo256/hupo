

var _outW = $('.imgbox').width(),
	orig = $("#orig"),
	timg = $('#timg');

window.DeviceMotionEvent && window.addEventListener('devicemotion',deviceMotionHandler, false);
// window.DeviceOrientationEvent && window.addEventListener('deviceorientation',deviceorientationH, false);
var ox = oy = oz = lastox = lastoy = lastoz = 0;

function deviceMotionHandler(e){
	console.log(e);
	var acceleration = e.accelerationIncludingGravity;
	x = acceleration.x;
	y = acceleration.y;
	z = acceleration.z;	
	
	console.log(x);
	$('#orig2').html("x:"+x+"<br />y:"+y+"<br />z:"+z);	
	// if(Math.abs(x - lastx) > 10){
		// orig.text(oz);		
		// lastoz = oz;
		
		// // var _left = (oz-360)/360 *1440;
		// var _left = (-oz)/360 *1440;
		// if( _left < (-1440 + _outW) && _left>0){
			// timg.stop().animate({'left':-_left}, 800, function(){
				// $('#orig2').text(_left);
				// // $('#orig2').text('done');
			// });
		// }
	// }	
}




 




/*
var color = [];
for (var i = 1; i < 11; i++) {color.push(i);}
var temp = []; 

window.DeviceMotionEvent && window.addEventListener('devicemotion',deviceMotionHandler, false);
var speed = 3;
var x = y = z = lastX = lastY = lastZ = 0;
function deviceMotionHandler(eventData){
	console.log(eventData);
	var acceleration = eventData.accelerationIncludingGravity;
	x = acceleration.x;
	y = acceleration.y;
	z = acceleration.z;
	if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed || Math.abs(z - lastZ) > speed) {
		var _nmb = Math.round(Math.random() * 10),
			rad = color[_nmb];
		// document.getElementById("num").innerHTML = _nmb;
		if (temp.length == 10) {
			document.getElementById("tips").innerHTML = "好吧，他们都暗恋过你~~ 貌似你很自恋 ——！";
			return false;
		}
		if (temp.in_array(rad)) {
			document.getElementById("tips").innerHTML = "已经摇到过df一次了~~";
		} else {			
			temp.push(rad);			
		}
		
		rad = rad == '10' ? '010' : '00' + rad;
		document.getElementById("img").setAttribute("src", "image/img/" + rad + ".jpg");
		
		
		// document.getElementById("num").innerHTML = "x:"+x+"<br />y:"+y+"<br />z:"+z;
		document.getElementById("num").innerHTML = "x:"+x;
	}
	lastX = x;
	lastY = y;
	lastZ = z;	
}
Array.prototype.in_array = function (e) {
	for (i = 0; i < this.length; i++) {
		if (this[i] == e)  return true;
	}
	return false;
} 
*/