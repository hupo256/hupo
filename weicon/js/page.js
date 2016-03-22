function Maze(canvas){this.layers=[];this.lines=[];this.getCtx(canvas);}
Maze.prototype={getCtx:function(id){var cvs=document.getElementById(id);this.ctxObj=cvs.getContext('2d');},createRole:function(sx,sy,rad,n){var ctx=this.ctxObj,that=this;function Role(){this.sx=sx;this.sy=sy;this.rad=rad;this.n=n;this.angle=(2*Math.PI)/n;}
Role.prototype={draw:function(){ctx.beginPath();var rad=this.rad;ctx.moveTo(this.sx+rad*Math.cos(-0.5*this.angle),this.sy+rad*Math.sin(-0.5*this.angle));for(var i=1;i<this.n;i++){ctx.lineTo(this.sx+rad*Math.cos((i-0.5)*this.angle),this.sy+rad*Math.sin((i-0.5)*this.angle));}
ctx.fill();},move:function(dx,dy){var walls=that.lines;this.sx+=dx;this.sy+=dy;for(var i=0,k=walls.length;i<k;i++){var wall=walls[i];if(that.isInit(wall.sx,wall.sy,wall.fx,wall.fy,this.sx,this.sy,this.rad)){this.sx-=dx;this.sy-=dy;break;}}}};return new Role();},drawRole:function(sx,sy,rad,n){var role=this.createRole(sx,sy,rad,n),that=this;this.layers.push(role);this.refeshCanvas();var spanbox=$('#spanbox'),img=spanbox.prev().find('img'),spans=spanbox.find('span'),interTime=null;spans.on('touchstart',function(ev){var target=ev.target,code=+target.getAttribute('data-code');img.hide();that.ctxObj.fillStyle='#00e968';interTime=setInterval(function(){var _x=role.sx,_y=role.sy;if(_x>160&&_y>160){spanbox.next().show();return false;}
that.roleMove(role,code,2);},50);return false;});spans.on('touchend',function(ev){clearInterval(interTime);});},createLine:function(sx,sy,fx,fy){var ctx=this.ctxObj;function Wall(){this.sx=sx;this.sy=sy;this.fx=fx;this.fy=fy;}
Wall.prototype={draw:function(){ctx.lineWidth='2';ctx.strokeStyle='rgba(0,0,0,0)';ctx.beginPath();ctx.moveTo(this.sx,this.sy);ctx.lineTo(this.fx,this.fy);ctx.stroke();}}
return new Wall();},drawLines:function(str){var pos=this.stringToArr(str);for(var i=0,k=pos.length;i<k-1;i++){var _sp=pos[i],_ep=pos[i+1],line=this.createLine(_sp[0],_sp[1],_ep[0],_ep[1]);this.layers.push(line);this.lines.push(line);}
this.refeshCanvas();},refeshCanvas:function(){var ctx=this.ctxObj,layers=this.layers;ctx.clearRect(0,0,200,200);for(var i=0;i<layers.length;i++){layers[i].draw();}},stringToArr:function(str){var pos=str.split(','),arr=[];for(var i=0;i<pos.length;){var _ar=[];_ar[0]=+pos.shift();_ar[1]=+pos.shift();arr.push(_ar);}
return arr;},roleMove:function(layer,code,speed){var spd=speed||10;switch(code){case 37:layer.move(-spd,0);break;case 38:layer.move(0,-spd);break;case 39:layer.move(spd,0);break;case 40:layer.move(0,spd);break;default:}
this.refeshCanvas();},isInit:function(sx,sy,fx,fy,cx,cy,rad){var dx=fx-sx,dy=fy-sy,t=0.0-(((sx-cx)*dx+(sy-cy)*dy)/(dx*dx+dy*dy));if(t<0.0){t=0.0;}else if(t>1.0){t=1.0;}
var dx1=(sx+t*dx)-cx,dy1=(sy+t*dy)-cy,rt=dx1*dx1+dy1*dy1;return!!(rt<rad*rad);}}

//主交互逻辑
$(function(){	
	var s_url = 'http://www.innoprive.com/weiconserver',
		games = $('[data-game]'),     //游戏页们
		results = $('[data-result]'), //结果页们
		winPage = $('[data-win]');    //中奖页	
		
		console.log(results.length);
		console.log(winPage);
		
	var _URL = window.location.href,
		_ind = _URL.indexOf('?'),
		_arr = _URL.slice(_ind+1).split('&'),
		wcPara = {};
	for(var i=0, k=_arr.length; i<k; i++){
		var _ar = _arr[i].split('=');
		wcPara[_ar[0]] = _ar[1];		
	}	
	// console.log(wcPara);	
	
	//随机进入游戏
	$('.begain').on('click', function(){
		var that = this, _id = wcPara.id;
		if(!_id){  //如果没有ID表示不是由关键字进入的，弹出引导页
			$('.attention').parent().show();
		}else{  
			//由关键字进入			
			$.ajax({
				dataType : "json",
				type : 'GET',
				data : {id : _id},
				url : s_url + '/user/authority',				
				success : function (rs) {
					var data = rs.data,
						msg = rs.msg;
					if(data){
						turnSection($(that), games, 4);	
					}else{
						var tex = textIntoImg(msg);
						$('.tips').html(tex).parent().show();
					}
				},
				error : function(){
					console.log('game fail');
				}
			});
		}		
		return false;
	});	
	
	//结果 迷宫 and 分贝
	$('.icon_wc').on('click', function(){
		showResult($(this), results);		
		return false;
	});
	
	//结果 上传图片
	$('.upimgbtn').on('click', function(){
		var hei = $(this).prev().find('img').height();
		hei > 1 && showResult($(this), results);	
		return false;
	});
	
	//结果 点选图片
	$('.btn_next').on('click', function(){
		var spn = $(this).prev().find('span'),
			that = this;
		spn.each(function(i,d){
			var num = $(d).css('opacity');
			if(num == 0.7){
				showResult($(that), results);
				return;
			}
		});
		return false;
	});
	
	//section的切换  sec当前的sec,dom下一个sec, num在哪几个里面切换
	function turnSection(sec, dom, num){
		var cur = sec.parents('section'),
			ind = Math.floor(Math.random()*num), 
			next = dom.eq(ind);
		cur.css('margin-left','100%');
		next.css('margin-left','0');
	}
	
	//每次在显示结果之前都向后台请求中奖的信息
	function showResult(sec, dom){
		$.ajax({
			dataType : "json",
			type : 'GET',
			data : {id : wcPara.id},
			url : s_url + '/user/gift',				
			success : function (rs) {
				if(rs.data){  //中奖					
					turnSection(sec, winPage, 0);
				}else{   //未中奖
					turnSection(sec, dom, 3);	
				}
			},
			error : function(){
				console.log('resurl fail');
			}	
		});
	}
	
	//将*换成img
	function textIntoImg(text){
		var reptex = '<img src="image/meimg.png" alt="" />'
		return text.replace(/\*/g, reptex);
	}
	
	//中奖后填表
	winPage.on('click', function(){
		$(this).css('margin-left','100%')
			.next().css('margin-left','0');
	});
	
	
	/*************************
	*
	* 上传图片
	*
	*************************/
	var i_box = $('#imgbox'),
		fileInp = i_box.prev(),
		f_img = i_box.find('img');
	i_box.on('click', function(){
		fileInp.click();		
		return false;
	});
	
	//绑定input的变动事件
	fileInp.on('change', function(e){
		var file = this.files[0];
		if(!file) return false;
		var reader = new FileReader();   //生成img_url对象
		reader.readAsDataURL(file);
		reader.onload = function(){   //加载完成之后添加到页面
			f_img[0].src=this.result;
		}
	});	
	
	
	/*************************
	*
	* 选择图片
	*
	*************************/
	var spnbox = $('.imgchoose'),
		imgSpn = spnbox.find('span');
	spnbox.on('click', 'span', function(){		
		imgSpn.css('opacity',.1);
		$(this).css('opacity',.7);
	});	
	
	
	/*************************
	*
	* 分贝测试
	*
	*************************/
	var mikeTouchTime = null,
		mikephone = $('.mikephone'),
		mikespan = mikephone.find('span'),
		prevAni = mikephone.prev(),
		mikeRs = mikephone.next(),
		mikeplaying = false;
	mikephone.on('touchstart', function(e){
		console.log(prevAni);
		mikephone.addClass('mikephone1');		
		mikeTouchTime = setTimeout(play, 800);		
		function play(){
			mikeplaying = true;
			prevAni.addClass('madkbox_ani');			
		}		
		return false;
	});
	
	mikephone.on('touchend', function(){
		mikephone.removeClass('mikephone1');
		clearTimeout(mikeTouchTime);
		if(mikeplaying){
			setTimeout(function(){
				prevAni.removeClass('madkbox_ani');
				mikeRs.show();
				mikeplaying = false;
			}, 2000);	
		}	
	});
	
	
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
	* 填表页
	*
	*************************/
	//点击弹层详情
	var prodbox = $('.prodbox'),
		prod_li = prodbox.find('span'),
		p_show = prodbox.parent().find('.prod_show').parent();
	prodbox.on('click', 'span', function(){
		var ind = prod_li.index(this);
		p_show.hide();
		p_show.eq(ind).show();
	});
	
	//单选颜色
	var colorbox = $('.colorbox'),
		col_li = colorbox.find('li'),
		col_inp = colorbox.find('input'),
		_inputs = $('.inpbox').find('input');
	colorbox.on('click', 'input', function(){
		var _ind = col_inp.index(this),
			_li = $(this).parents('li'),
			_type = col_li.index(_li) + 1;
		col_inp.prop('checked', false);
		col_inp.eq(_ind).prop('checked', true);
		wcPara.color = col_inp.eq(_ind).next().text();
		wcPara.type = _type;
	});
	
	
	//提交,收集相关信息，然后弹层分享
	$('.btn_submit').on('click', function(){
		//表单的非空校验
		var _len = _inputs.length,
			_len2= col_inp.length,
			_infor = (function(){			
				for(var i=0, k=_inputs.length; i<k; i++){
					var _val = $.trim(_inputs[i].value);
					if(_val === '') return false;
					if(i === _len-1) return true;
				}
			})(),	
			_color = (function(){	
				for(var i=0, k=col_inp.length; i<k; i++){					
					if(col_inp.eq(i).prop('checked')) return true;
					if(i === k-1) return false;
				}
			})();		
		
		//如果有空未填，则报错
		if(!_infor || !_color){    
			$('.fail').parent().show();
			return false;
		}
		
		//如果都填了，则提交
		var para ={
			id : wcPara.id,
			color : wcPara.color,
			type : wcPara.type,
			name : $.trim(_inputs.eq(0).val()),
			phone : $.trim(_inputs.eq(1).val()),
			location : $.trim(_inputs.eq(2).val()),
			lefteye : $.trim(_inputs.eq(3).val()),
			righteye : $.trim(_inputs.eq(4).val())
		};
		
		$.ajax({
			dataType : "json",
			type : 'POST',
			data : para,
			url : s_url + '/user/join',				
			success : function (rs) {
				$('.succeed').parent().show();
			},
			error : function(){
				console.log('submit fail');
			}	
		});
		return false;
	});
	
	
	//分享
	$('.btn_shale, [data-result]').on('click', function(){
		$('.shaleout').parent().show();		
		return false;
	});		
	
	//禁用划屏
	// $(document).on('tap', function(ev){
		// ev.preventDefault();  
	// });
	
	//取消所有a默认事件
	$('.pbox').on('click', '.btn', function(){
		return false;
	});
	
	//点击弹层则关闭
	$('.poppupbox').on('click', function(){
		$(this).hide();
		return false;
	});
	
	//二维码层
	$('.attention').on('click', function(){
		return false;
	});
	
	//活动规则
	$('.ruler').on('click', function(){
		$('.introduce').parent().show();	
		return false;
	});
	
	/*************************
	*
	* 分享
	*
	*************************/
	
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
			// console.log(res);
			var rs = res.data;
			wx.config({
				// debug : true,
				appId : 'wx99327085f1b8c0a4',
				timestamp : rs.timestamp,
				nonceStr : rs.nonce,
				signature : rs.signature,
				jsApiList : ["onMenuShareTimeline", "onMenuShareAppMessage"]
			});

			wx.ready(function () {
				console.log("sign signature finished....");
				var _obj = {					
					imgUrl : 'http://www.innoprive.com/weiconh5/image/shaleimg.jpg',
					link : 'http://www.innoprive.com/weiconh5/index.html',
					success : function(rs){
						//分享成功后，弹出提示，并给后台一个信号
						$.ajax({
							dataType : "json",
							type : 'GET',
							data : {id : wcPara.id},
							url : s_url + '/user/shareGame',			
							success : function (rs) {
								var msg = rs.msg;
								if(msg){
									$('.shaleout').parent().hide();
									var tex = textIntoImg(msg);
									$('.tips').html(tex).parent().show();
								}						
							},
							error : function(){
								console.log('tips fail');
							}	
						});
					}
				},
				momentsConfig = $.extend({	//朋友圈	
					title : '史上最刺激免费送，有你槑(mei)我不服来战！', 	
				}, _obj),		
				chatConfig =  $.extend({	//好友	
					desc : '我没通过“有你槑(mei)我”测试！尼玛，这坑爹测试是程序员用脑袋里的水泡出来的吧！',
					title : '史上最刺激免费送，有你槑我不服来战！'			
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
	
});

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?7af4a87dac3f35294fc3b69a6f7d4436";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();