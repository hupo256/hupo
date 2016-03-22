//检测浏览器是否支持HTML5，否则跳到提示页
(function checkVideo() {
	if (!!document.createElement('video').canPlayType) {
		var vidTest = document.createElement("video"),
			oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');			
		if (!oggTest) {
			var h264Test = vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
			if (!h264Test) stopDOM();
		}
	} else {
		stopDOM();
	}

	function stopDOM() {
		// window.stop ? window.stop() : document.execCommand("Stop");    //停止加载DOM		
		document.location.href = 'http://127.0.0.1/app/open/error.html'
	}
})();

//合法化IE9以下的HTML5标签
(function () {
	// if (!0)	return;
	var e = "abbr, article, aside, audio, canvas, datalist, details, dialog, eventsource, figure, footer, header, hgroup, mark, menu, meter, nav, output, progress, section, time, video".split(', ');
	var i = e.length;
	while (i--) {document.createElement(e[i])}
})();

/*
//checkVideo函数用来检测浏览器是否支持HTML5，检测方法源自W3C。若不支持则停止加载DOM。
function checkVideo() {
	if (!!document.createElement('video').canPlayType) {
		var vidTest = document.createElement("video"),
			oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"'),
			h264Test = vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
		if (!oggTest) {			
			if (!h264Test) {
				alert("不支持HTML5，推荐你下载个chrome或者IE9版本之上的浏览器，要不就回家洗洗睡吧");
				stopDOM();
			} else {
				if (h264Test == "probably") {
					alert("支持HTML5，不错嘛。精彩内容，马上呈现！");
				} else {
					alert("唉，支持一部分html5，不给你显示了，换个浏览器吧，比如Chrome，IE9+。");
					stopDOM();
				}
			}
		} else {
			if (oggTest == "probably") {
				alert("支持HTML5，不错嘛。精彩内容，马上呈现！");
			} else {
				alert("唉，支持一部分html5，不给你显示了，换个浏览器吧，比如Chrome，IE9+。");
				stopDOM();
			}
		}
	} else {
		alert("不支持HTML5，推荐你下载个chrome或者IE9版本之上的浏览器，要不就回家洗洗睡吧");
		stopDOM();
	}
	
	function stopDOM() {		
		window.stop ? window.stop() : document.execCommand("Stop");
	}
}

checkVideo();
*/