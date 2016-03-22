$(function(){		
	
	/*************************
	*
	* 迷宫
	*
	*************************/
	//点的坐标
	var _postex1 = '53, 148, 53, 126, 115, 125, 115, 95, 141, 96, 114, 95, 114, 67, 93, 68, 162, 68, 164, 143, 163, 29, 34, 30, 182 ,30, 183, 159, 182, 13, 2, 14',
		_postex2 = '138, 49, 69, 49, 69, 73, 69, 49, 32, 50, 32, 88, 49, 88, 49, 68, 50, 88, 94, 88, 31, 88, 31, 109, 84, 108, 31, 108, 32, 168, 75, 168, 74, 153, 74, 168, 139, 168, 139, 117, 140, 147, 101, 146, 138, 147, 139, 162, 163, 161, 139, 162, 140, 185, 182, 184, 12, 185, 12, 45';	
	var	maze = new Maze("canvas");
	
	// 画迷宫	
	maze.drawLines(_postex1);	
	maze.drawLines(_postex2);
	
	// 画元素
	maze.drawRole(14, 30, 5, 36);
	
	
	
	
	/*************************
	*
	* 分享
	*
	*************************/
	/*
	$.ajax({
		dataType : "json",
		data : {
			name : location.pathname,
			https : location.protocol.indexOf("https") === 0,
			force : false,
			url : location.href.indexOf("#") < 0 ? location.href : location.href.substring(0, location.href.indexOf("#"))
		},
		url : '/nb/api/public/wechat-signature',
		success : function (res) {
			console.log(res);
			// return;
			var data = res.content;			
			wx.config({
				// debug : true,
				appId : 'wxe45fefedfefad15a',
				timestamp : data.timestamp,
				nonceStr : data.nonceStr,
				signature : data.signature,
				jsApiList : ["onMenuShareTimeline", "onMenuShareAppMessage"]
			});

			wx.ready(function () {
				console.log("sign signature finished....");
				//==========TEST===================	
				var _obj = {
					imgUrl : '',
					link : location.href,
					success : function(rs){
						// alert('done');
						// debug && alert("share on moments finished");
					}
				},
				momentsConfig =  $.extend({		//朋友圈		
					title : '你真的会赚钱吗？快来测测'						
				}, _obj),
				chatConfig = $.extend({    //好友						
						desc : '原来我这么会赚，你也来测测。',
						title : '我赚到手的钱绝对让你惊呆！'
					}, _obj);
					
				wx.onMenuShareTimeline(momentsConfig);
				wx.onMenuShareAppMessage(chatConfig);
			});

			wx.error(function (err) {
				//debug && alert(err ? 'fucking err: ' + JSON.stringify(err) : "ok");
			});
		},
		
		error : function(){
			console.log('wx fail');
		}
	});	
	*/
	
});