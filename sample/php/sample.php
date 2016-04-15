<?php
require_once "jssdk.php";
// $jssdk = new JSSDK("yourAppID", "yourAppSecret");
$jssdk = new JSSDK("wxe45fefedfefad15a", "660950a5a6e805c2fd678074c3a645f1");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="zepto.min.js"></script>
<script>
  /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
  wx.config({
    debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList : ["onMenuShareTimeline", "onMenuShareAppMessage"]
  });
  wx.ready(function () {
    // 在这里调用 API
	console.log("sign signature finished....");
	//==========TEST===================
	var _obj = {					
		imgUrl : 'http://www.dianrong.com/landing/wp-content/uploads/2015/02/year_1.jpg',
		link : location.href,
		success : function(rs){						
			debug && alert("share on moments finished");
		}
	},
	momentsConfig =  $.extend({		//朋友圈		
		title : '1000元拿走！ 从此不做月光狗'						
	}, _obj),
	chatConfig = $.extend({    //好友	
		title : '白送你1000元，敢不敢拿？', 			
		desc : '白拿1000元体验金，零钱理财从此告别月光！'
	}, _obj);
	
	wx.onMenuShareTimeline(momentsConfig);
	wx.onMenuShareAppMessage(chatConfig);
  });
</script>
</html>
