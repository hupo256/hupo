$(function(){
	var bd = $('body'),
		bHeight = bd.height(),		
		effectType = 'easeInCirc',   //easeOutCirc  easeOutQuint  easeInCirc	 	
		effectTypeEnd = 'linear',   
		conTime = 1000,   
		litTime = 300,		
		pages = $('.coverlaye > section'),
		animteDom = $('.contentbox > section');
	
	// $('.animbox').animate({top: -6*bHeight}, 10, 'linear');
	
	var firstPot = startPot = 0;
	//start
	touchFunc(bd[0], 'start', function(e){
		firstPot = startPot = e.targetTouches[0].pageY;
	});
	
	// move
	touchFunc(bd[0], 'move', function(e){		
		var currPot = e.targetTouches[0].pageY,
			dis = currPot - startPot,
			tp = $('.animbox').position().top,
			dom = e.target,
			ind = pages.index(dom);
		toAnimUp(ind);		
		if(tp < -bHeight*6+1 || tp > -1) return false;
		$('.animbox').stop().animate({top: '+=' + dis + 'px'}, 10, 'linear');  		
		startPot = e.targetTouches[0].pageY;    //重新开始		
	});
	
	//抬起
	touchFunc(bd[0], 'end', function(e){
		simulateTab(e);
	});
	
	//下滑
	touchFunc(bd[0], 'down', function(e){		
		toDown(e);
	});
	
	//上滑
	touchFunc(bd[0], 'top', function(e){		
		toUp(e);
	});
	
	//手指抬起来时判断上行还是下行
	function simulateTab(e){
		var dom = e.target,
			ind = pages.index(dom),
			distan = startPot - firstPot;
		console.log(ind);
		if(ind == 6 ) return false;
		if(ind === 0){
			theLastSens();
			return false;
		}	
		console.log(ind);
		if(Math.abs(distan) > 5){  //开始切换	
			distan > 0 ? toDown(e) : toUp(e);
		}
	}
	
	// theLastSens();
	//如果是最上面了就飞出
	function theLastSens(){
		var count = 0;
		$('.scene>.textbox').addClass('tofadeout');
		$('.sens6_7').addClass('tofadeout');		
		var timer = setInterval(
			function() {
				if (count == 0) {
					$('.textboxb').eq(count).addClass('transact').show();
					count++;
				} else if (count == 6) {
					// $('.textboxb').eq(count - 1).removeClass('transact');
					$('.textboxb').eq(count).addClass('transact').show();
					clearInterval(timer);
					finals();
				} else {
					// $('.textboxb').eq(count - 1).removeClass('transact');
					$('.textboxb').eq(count).addClass('transact').show();
					count++;
				}
			}, 3300)

		function finals() {
			setTimeout(function() {
				// $('.textboxb').eq(count).removeClass('transact');
				$('.end1').addClass('acte');
				$('.rol').addClass('act');
				setTimeout(
					function() {
						$('.cloud').addClass('pause');
						$('.end2').addClass('acte');
						$('.end3').addClass('acte');
						$('.bgf').addClass('act');
						$('.end_btn1').addClass('acte');
						$('.end_btn2').addClass('acte');
					}, 1500);
			}, 1500)
		}
		$('.end_btn2').on('click',function(){
			$('.shareimg').show();
		});
		$('.shareimg').on('click',function(){
			$(this).hide();
		})
		
		//  $('.load_con').addClass('actx');
		$('.scene').find('img').addClass('act');
		$('.cloud').addClass('act');
	}
	
	//下行
	function toDown(e){
		var dom = e.target,
			ind = pages.index(dom) - 1;
		if(ind < 0) return false;	//如果到顶就不响应	
		$('.animbox').stop().animate({top: -ind*bHeight}, conTime, effectType, function(){			
			//缓动一下
			$('.animbox').stop().animate({top: '-=10px'}, litTime, effectTypeEnd, function(){
				$(this).animate({top: '+=10px'}, litTime, effectTypeEnd);			
			});
			toAnimFade(ind);
		});		
	}
	
	//上行
	function toUp(e){
		var dom = e.target,
			ind = pages.index(dom) + 1;
		if(ind > 6) return false;	//如果到底就不响应	
		$('.animbox').stop().animate({top: -ind*bHeight}, conTime, effectType, function(){			
			//先缓动一下			
			$('.animbox').stop().animate({top: '+=10px'}, litTime, effectTypeEnd, function(){
				$(this).animate({top: '-=10px'}, litTime, effectTypeEnd);					
			});
			toAnimFade(ind);
		});
	}		
	
	//向上缓动
	function toAnimUp(index){
		animteDom.find('.textbox').removeClass('toup');
		animteDom.eq(index).find('.textbox').addClass('toup');
	}
	
	//文字依次出来
	function toAnimFade(index){
		animteDom.find('.textbox').removeClass('textbox2');
		animteDom.eq(index).find('.textbox').addClass('textbox2');
	}
	
	//向下缓动
	function toAnimDown(index){
		animteDom.find('.textbox').removeClass('todown');
		animteDom.eq(index).find('.textbox').addClass('todown');
	}
	
	
	//往section里加图片
	var secText1 = '<div class="scene">'
					+'<div class="textbox pt20">'					
						+'<img class="" src="image/sens7_1.png" alt="" />'	
						+'<img class="textline_l" src="image/textline_l.png" alt="" />'
						+'<img class="" src="image/sens7_2.png" alt="" />'
						+'<img class="" src="image/sens7_3.png" alt="" />'					
						+'<img class="" src="image/sens7_4.png" alt="" />'					
						+'<img class="" src="image/sens7_5.png" alt="" />'					
					+'</div>'	
				
					+'<div class="bgf"></div>'
					+'<div class="shareimg"><img src="img/share.png" alt=""></div>'
					+'<img src="img/stage.gif" alt="" class="stage">'
					+'<div class="rol">'
						+'<img src="img/rocket.png" alt="" class="rocket">'
						+'<img src="img/line.png" alt="" class="line">'
					+'</div>'
					+'<img src="img/smoke.png" alt="" class="smoke">'
					+'<div class="cloud"></div>'
					+'<div class="textboxb tb3">'
						+'<img src="img/textboxb.png" alt="">'
						+'<h3>2015.03</h3>'
						+'<p>团团赚总投资规模突破'
							+'<br>'
							+'<span class="bigger">10亿元</span>'
						+'</p>'
					+'</div>'
					+'<div class="textboxb tb1">'
						+'<img src="img/textboxb.png" alt="">'
						+'<h3>2015.05</h3>'
						+'<p>跨界联手一号专车，推出余'
							+'<br>额生息计划</p>'
					+'</div>'
					+'<div class="textboxb tb2">'
						+'<img src="img/textboxb.png" alt="">'
						+'<h3>2015.06</h3>'
						+'<p>与芝麻信用携手，达成全面'
							+'<br>合作协议</p>'
					+'</div>'
					+'<div class="textboxb tb3">'
						+'<img src="img/textboxb.png" alt="">'
						+'<h3>2015.09</h3>'
						+'<p>推出第一支电视广告，“白领'
							+'<br>理财节”不让你的钱睡大觉</p>'
					+'</div>'
					+'<div class="textboxb tb2">'
						+'<img src="img/textboxb.png" alt="">'
						+'<h3>2016.01</h3>'
						+'<p>三位资深银行系高管加入点'
							+'<br>融网，黄金管理团队再升级。</p>'
					+'</div>'
					+'<div class="textboxb tb1">'
						+'<img src="img/textboxb.png" alt="">'
						+'<h3>2016.03</h3>'
						+'<p>团团赚总投资规模突破'
							+'<br><span class="bigger">100亿元</span></p>'
					+'</div>'
					+'<div class="ends">'
						+'<img src="img/end_06.png" alt="" class="end1">'
						+'<img src="img/end_04.png" alt="" class="end2">'
						+'<img src="img/end_02.png" alt="" class="end3">'
						+'<a href="https://www.dianrong.com/mkt/h5-3year-campaign-newenroll/index.html" class="end_btn1">加入三周年庆</a>'
						+'<a href="javascript:;" class="end_btn2">和好友分享</a>'
					+'</div>'
				+'</div>',
		secText2 = '<img class="midimg sens6_7" src="image/sens6_7.png" alt="" />'			
				+'<div class="textbox pt20">'						
					+'<img class="" src="image/sens6_1.png" alt="" />'		
					+'<img class="textline_l" src="image/textline_l.png" alt="" />'	
					+'<img class="" src="image/sens6_2.png" alt="" />'	
					+'<img class="" src="image/sens6_3.png" alt="" />'						
				+'</div>'	
				+'<img class="img80 sens6" src="image/sens61.gif" alt="" />',	
		secText3 = '<div class="textbox pt20">'					
					+'<img class="" src="image/sens5_1.png" alt="" />'		
					+'<img class="textline_l" src="image/textline_l.png" alt="" />'	
					+'<img class="" src="image/sens5_2.png" alt="" />'	
					+'<img class="" src="image/sens5_2.png" alt="" />'						
				+'</div>'	
				+'<img class="img80 sens5" src="image/sens5.gif" alt="" />',
		secText4 = '<img class="midimg sens4_5" src="image/sens4_5.png" alt="" />'	
				+'<div class="textbox pt20">'					
					+'<img class="" src="image/sens4_1.png" alt="" />'	
					+'<img class="textline_l" src="image/textline_l.png" alt="" />'
					+'<img class="" src="image/sens4_2.png" alt="" />'
				+'</div>'
				+'<img class="img80 sens4" src="image/sens4.gif" alt="" />',	
		secText5 = '<img class="midimg sens3_4" src="image/sens3_4.png" alt="" />'	
				+'<div class="textbox pt20">'					
					+'<img class="" src="image/sens3_1.png" alt="" />'	
					+'<img class="textline_l" src="image/textline_l.png" alt="" />'
					+'<img class="" src="image/sens3_2.png" alt="" />'
					+'<img class="" src="image/sens3_3.png" alt="" />'
				+'</div>'
				+'<img class="img80 sens3" src="image/sens3.gif" alt="" />',
		secArr = [secText1,secText2,secText3,secText4,secText5];
	
	
	function addImgs(arr){
		var addSectHtml = setInterval(function(){
			if(arr.length === 0) clearInterval(addSectHtml);
			animteDom.eq(arr.length - 1).html(arr.pop());
		},2000);

		$('.textb1').addClass('d_block');
		$('.load_con').addClass('actx');
		var loadsen = $('.loading')[0];
		
		//sens1出现
		setTimeout(function() {
			$('.sens1').addClass('tofade');	
		}, 1400);
		
		touchFunc(loadsen, 'down', function(e){
			e.stopPropagation();
			e.preventDefault();
			$('.anti>img').addClass('actcoin');
			
			setTimeout(function() {
				$('.textb1').removeClass('d_block');
				$('.textb2').delay(500).addClass('d_block');						
			}, 1000);
			
			setTimeout(function() {
				$('.sens1').addClass('toshake');	
			}, 1600);
			
			setTimeout(function() {
				$('.load_con>img').removeClass('act').addClass('act2');
				$('.textb2').removeClass('d_block');				
				
				setTimeout(function(){
					$('.loading').hide();
					setTimeout(function(){
						toAnimFade(6);
						$('.sens1_2').addClass('todown');
					}, 600);
				}, 200);
			}, 2000);			
		})
	}	
	
	
	var audio_stu = true
	$('.audio_handle').on('click', function() {
		if (audio_stu == false) {
			$('#bgAudio')[0].pause();
			$(this).css('background-position','0 100%')
			audio_stu = true;
		} else if (audio_stu == true) {
			$('#bgAudio')[0].play();
			$(this).css('background-position','0 0')
			audio_stu = false;
		}
	});

	
	/*******************
	 *
	 * class
	 * 百分比加载效果
	 * @param  container 放进度条的容器
	 *
	 * @discription 
	 * @date 20151229
	 *
	 *******************/
	function progressBar(container){
		this.container = container;
		this.imgNum = 0;
		this.createBar()
	}
	
	progressBar.prototype = {
		//主进度条
		pres : $('<div>'),

		//显示百分比
		texbox: $('<p>'),
		
		//生成进度条并CSS
		createBar : function(){		
			var _pres = this.pres,
				_texb = this.texbox,
				presborde = $('<div>').css({
					width:'100%',
					// border:'1px solid #ccc',
					borderRadius:'5px'
				});
			_pres.css({
				transition:'all 0.4s ease 0.1s',
				boxShadow:'1px 1px 1px #333 inset',
				height:'10px',
				borderRadius:'5px',
				background:'#38a884'
			});
			_texb.css({
				textAlign:'center',
				fontSize:'1em'
			});
			presborde.append(_pres);
			this.container.append(presborde);
			this.container.append(_texb);
		},
		
		//加载完毕后进行进度处理
		imgDone : function (toatal, callback){
			this.imgNum++;			
			var pct = Math.floor(this.imgNum/toatal*100) + '%', that = this;			
			this.pres.width(pct);
			this.texbox.text(pct);			
			if(this.imgNum === toatal){
				setTimeout(function(){
					that.container.hide();
					if(callback) callback();
				}, 600);
			}
		},	
		
		//加载页面中所需的img们
		loadimgs : function (arr, callback){
			var that = this;
			for(var i=0, k=arr.length; i<k; i++){
				var img = document.createElement('img');
				img.src = arr[i];
				
				//加载失败时报错
				img.onerror = function(e){					
					that.texbox.text('网络出现问题，请稍后再试');
				}
				
				if (img.complete) {				
					this.imgDone(k, callback);
				} else {
					img.onload = function(){					
						// img.onload = null;
						that.imgDone(k, callback);
					}
				};	
			}
		}
	}
	
	/***********    加载进度条    *************/	
	var imgArr = [
		'image/sens1.gif',
		'image/sens1_1.png',
		'image/sens1_2.png',
		'image/sens2.gif',
		'image/sens2_1.png',
		'image/sens2_2.png',
		'image/sens2_3.png',
		'image/sens2_4.png',
		'image/sens2_30.png',
	],
	prog = new progressBar($('#pbox'));
	prog.loadimgs(imgArr, function(){
		// addImgs(secArr); 
	});
	
	//分享
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
					// imgUrl : 'images/mca_shale.jpg',
					imgUrl : 'https://www.dianrong.com/mkt/static/image/toshale.jpg',
					link : location.href,
					success : function(rs){				
						// debug && alert("share on moments finished");
						console.log(rs)
					}
				},
				momentsConfig =  $.extend({		//朋友圈		
					title : '这个认真的Box，能帮我赚钱。'
				}, _obj),
				chatConfig = $.extend({     //好友						
						title : '送你一个认真的Box，它能帮你赚钱！',
						desc : '快来看点融网超认真的三周年年报。它居然帮我赚了这么多。'
					}, _obj);
					
				wx.onMenuShareTimeline(momentsConfig);         
				wx.onMenuShareAppMessage(chatConfig);
			});

			wx.error(function (err) {
				debug && alert(err ? 'Msg: ' + JSON.stringify(err) : "ok");
			});
		}, 
		
		error : function(){
			console.log('wx fail');
		}
	});			
});


// GTM
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push(
{'gtm.start': new Date().getTime(),event:'gtm.js'}
);var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5GSPQ4');