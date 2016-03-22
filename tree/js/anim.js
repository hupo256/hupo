$(function(){
	$('#svg').on('click', function(){
		$('#anima')[0].beginElement();
	});
	
	$('#firebug').on('click', function(){
		console.log(22);
		$('#playfb')[0].beginElement();
	});
	
	
	

	//分享
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
			//return;
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
					imgUrl : '../image/rb_shale_tit.jpg',
					link : shale_url,
					success : function(rs){
						// alert('done');
						debug && alert("share on moments finished");
					}
				},
				momentsConfig =  $.extend({		//朋友圈		
					title : '白拿5000元，随手发给你！'						
				}, _obj),
				chatConfig = $.extend({    //好友						
						title : '真的！我白拿了5000元！',
						desc : '我居然拿到5000元红包！还剩几个，快去抢。'
					}, _obj);
					
				wx.onMenuShareTimeline(momentsConfig);
				wx.onMenuShareAppMessage(chatConfig);
			});

			wx.error(function (err) {
				debug && alert(err ? 'fucking err: ' + JSON.stringify(err) : "ok");
			});
		},
		
		error : function(){
			console.log('wx fail');
		}
	});	
	*/	
});