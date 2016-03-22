/*	
V2.0

url:http://www.innoprive.com/weiconserver

一、/user/getSignature (get)
参数：无
返回结果：
{"data":{"nonce":"1664891392","signature":"5facb42fcce474b7417249013af85d134a719426","timestamp":"1432530741"},"status":true}

二、/user/authority (get)
参数：id : 微信id
返回结果：
{"data":{"gift":0,"id":1249,"lefteye":0,"playtimes":0,"righteye":0,"shared":0,"type":0,"weixinid":"of_V_szv9aRR0RqOmkLXZ53urWZI"},"status":true}
{"msg":"获取用户数据失败","status":false}


三、/user/join (post)
参数 id 用户微信id
     name 用户姓名
     location 用户位置
     lefteye 左眼度数 浮点数
     righteye 右眼度数 浮点数
     color 喜好颜色 
     type 槑瞳颜色 1：黑色骷髅 2：白色骷髅 3：透明骷髅
     phone 手机号码

返回结果：
{"data":false,"msg":"请先关注公众号","status":true}
{"data":true,"status":true}

四、/user/shareGame (get)
参数: id 用户微信id
返回结果：
{"data":true,"status":true}
{"data":false,"msg":"请先关注公众号","status":true}

五、/user/gift (get)
{"data":true,"status":true}
{"data":false,"msg":"没有中奖","status":true}
{"data":false,"msg":"您已经中过奖","status":true}


/user/authority (get)

{"data":true,"status":true}
{"data":false,"msg":"参与2次了，没有中奖，不能玩了","status":true}
{"data":false,"msg":"分享游戏，获得机会再玩一次","status":true}
{"data":false,"msg":"已经中过奖，不能再玩了","status":true}

status 请求是否成功标示 true 时保证data有数据
data true：用户可进行游戏，false：用户不可进行游戏
msg：用户无法进行游戏（data为fale时提示信息，data为true时该字段无数据）



更新接口:

一、
/user/authority (get) 
参数：id 微信用户id
返回结果例子：
{
    "data": true,
    "status": true
}
{
    "data": true,
    “msg”:”保留字段”,
    "status": true
}
{
    "data": false,
    "msg": "看在你那么懂得分享的份上，<br />我们决定再给你一次机会！<br />回复“我要更*”<br />能够再进行一次测试哦！<br />好好把握吧！",
    "status": true
}
{
    "data": false,
    "msg": "恭喜你获得了<br />卫康提供的*瞳彩片隐形眼镜！<br />我们会在活动结束后统一发货<br />可以通过卫康微信平台<br />或客服电话4009209198<br />查询发货进度<br />赶紧把这个试用机会分享给<br />小伙伴们吧！",
    "status": true
}
{
    "data": false,
    "msg": "虽然你2的很有特点<br />但我还是不会给你机会了！<br />如果你获得了试用*瞳<br />我们会在活动结束后统一发货<br />可以通过卫康微信平台<br />或客服电话4009209198<br />查询发货进度",
    "status": true
}



字段描述
status 请求是否成功标示 true 时保证data有数据
data true：用户可进行游戏，false：用户不可进行游戏
msg：字符串 提示用户信息 （data字段为true时可能有msg字段，data为false时msg字段肯定存在）

二、
/user/shareGame (get) 分享活动后调用
参数：id 微信用户id
返回结果：
{"data":false,"msg":"看在你那么懂得分享的份上，<br /> 我们决定再给你一次机会！<br />回复“我要更*”<br />能够再进行一次测试哦！<br />好好把握吧！";","status":true}

data: true : 业务调用成功 false :业务调用失败 
msg :提示信息 当有该参数时请弹出浮层（用户可以在游戏中任意流程分享，请保证图层及时以及准确展现）
status 请求是否成功标示 true 时保证data有数据













*/
var s_url = 'http://www.innoprive.com/weiconserver';
	
	$.ajax({
		dataType : "json",
		type : 'GET',
		url : s_url + '/user/getSignature',
		data : {
			name : location.pathname,
			https : location.protocol.indexOf("https") === 0,
			force : false,
			url : location.href.indexOf("#") < 0 ? location.href : location.href.substring(0, location.href.indexOf("#"))
		},		
		success : function (res) {
			console.log(res);
			var rs = res.data;
			wx.config({
				debug : true,
				appId : 'wx99327085f1b8c0a4',
				timestamp : rs.timestamp,
				nonceStr : rs.nonce,
				signature : rs.signature,
				jsApiList : ["onMenuShareTimeline", "onMenuShareAppMessage"]
			});

			wx.ready(function () {
				console.log("sign signature finished....");
				var _obj = {
					debug : true,
					imgUrl : 'http://www.innoprive.com/weiconh5/image/dai.png',
					link : location.href,
					success : function(rs){
						debug && alert("share on moments finished");
					}
				},
				momentsConfig = $.extend({	//朋友圈	
					title : '艾玛，我上辈子一定是扶老奶奶过街先进模范，竟然通过了“有你槑我”测试！', 	
				}, _obj),		
				chatConfig =  $.extend({	//好友	
					desc : '我没通过“有你槑我”测试！尼玛，这坑爹测试是程序员用脑袋里的水泡出来的吧！',
					title : '这是一个神奇的测试'			
				}, _obj);
				
				wx.onMenuShareTimeline(momentsConfig);
				wx.onMenuShareAppMessage(chatConfig);
			});

			wx.error(function (err) {
				debug && alert(err ? 'fucking err: ' + JSON.stringify(err) : "ok");
			});
		},		
		error : function(){
			console.log('fail');
		}		
	});	