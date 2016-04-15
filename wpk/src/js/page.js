
var app = 'sadfdf';
console.log(app);

var DRmkt_Tool = window.DRmkt_Tool || {};
(function(){
	/*******************
	 *	
	 * 公用层
	 * @param
	 * @discription  封闭更底层的方法，以供业务层调用
	 * @date 20151202
	 * @author  aven.tong  dongdong.tong@dianrong.com
	 *
	 *******************/	
	DRmkt_Tool.common = {		
		//获取目标的位置
		getThePosition : function (e) {
			var x = e.offsetLeft, y = e.offsetTop;
			while (e.offsetParent && e.offsetParent.nodeName !== 'BODY') {
				e = e.offsetParent;
				if (e.style.position == 'fixed') e.style.position = "fixed";
				x += e.offsetLeft - e.scrollLeft;
				y += e.offsetTop - e.scrollTop;
			}
			return {"x" : x,"y" : y};
		},

		//根据窗口的大小重新定位dom
		positionTheDom : function(boxDom, inputDom){
			var _dom = document,
				_ch = _dom.body.offsetHeight,  //可视高度
				_cw = _dom.body.offsetWidth,   //可视宽度
				_bh = $(boxDom).height(),   //box的高度
				_bw = $(boxDom).width(),    //box的宽度
				_xy = this.getThePosition(inputDom),
				_y = _xy.y,  //原点的y坐标
				_x = _xy.x,  //原点的x坐标
				_h = inputDom.offsetHeight,  //原点元素的可视高度
				_w = inputDom.offsetWidth,  //原点元素的可视宽度

				_left = (_cw - _x) > _bw ? _x : (_x + _w + 2 - _bw),  //左对齐，否则右对齐
				_top = (_ch - _y - _h) > _bh ? (_y + _h - 1) : (_y - _bh);   //上对齐，否则下对齐
				_left = _left < 0 ? 0 : _left;   //如果为负值，则设为0
				_top = _top < 0 ? 0 : _top;   //如果为负值，则设为0；
			boxDom.style.left = _left + "px";
			boxDom.style.top = _top + "px";
		},
		
		/*******************
		 * 
		 * function
		 * touch事件
		 * @param   dom 绑定事件的dom对象
					type 事件类型 totop/todown/toleft/toright/tomove/start/tap/end
					callbaxk 回调函数
		 * @date 20160407
		 * @author  aven.tong  dongdong.tong@dianrong.com
		 *
		 *******************/
		touchFunc : function (dom, type, callback) {
			//滑动范围在5x5内则做点击处理，s是开始，e是结束
			var init = {x:5,y:5,sx:0,sy:0,ex:0,ey:0};
			var sTime = 0, eTime = 0;
			type = type.toLowerCase();

			//触屏开始
			dom.addEventListener("touchstart",function(e){
				sTime = new Date().getTime();
				init.sx = event.targetTouches[0].pageX;
				init.sy = event.targetTouches[0].pageY;
				init.ex = init.sx;
				init.ey = init.sy;
				if(type.indexOf("start") != -1) callback(e);
			}, false);

			//在屏幕上移动
			dom.addEventListener("touchmove",function(e) {
				event.preventDefault();  //阻止触摸时浏览器的缩放、滚动条滚动
				init.ex = event.targetTouches[0].pageX;
				init.ey = event.targetTouches[0].pageY;
				if(type.indexOf("tomove")!=-1) callback(e);
			}, false);
			
			//触屏结束时判断具体事件类型
			dom.addEventListener("touchend",function(e) {
				var changeX = init.sx - init.ex;
				var changeY = init.sy - init.ey;
				if(Math.abs(changeX)>Math.abs(changeY)&&Math.abs(changeY)>init.y){
					//左右事件
					if(changeX > 0) {
						if(type.indexOf("toleft")!=-1) callback(e);
					}else{
						if(type.indexOf("toright")!=-1) callback(e);
					}
				}else if(Math.abs(changeY)>Math.abs(changeX)&&Math.abs(changeX)>init.x){
					//上下事件
					if(changeY > 0) {
						if(type.indexOf("totop")!=-1) callback(e);
					}else{
						if(type.indexOf("todown")!=-1) callback(e);
					}
				}else if(Math.abs(changeX)<init.x && Math.abs(changeY)<init.y){
					eTime = new Date().getTime();
					//点击事件，此处根据时间差细分下
					if((eTime - sTime) > 300) {
						if(type.indexOf("tap")!=-1) callback(e); //长按
					}else {
						if(type.indexOf("click")!=-1) callback(e); //当点击处理
					}
				}
				if(type.indexOf("end")!=-1) callback(e);
			}, false);
		}
	}	
	
	/*******************
	 *
	 * class
	 * 隐藏loading层
	 * @param  point     描点
	 *		   loading   loading层
	 *
	 * @discription  侦听某个图层加载成功事件，隐藏loading层，以便开始动画 
	 * @date 20151214
	 * @author  aven.tong  dongdong.tong@dianrong.com
	 *
	 *******************/
	var hideLoading = DRmkt_Tool.hideLoading = function(point, loading){		
		this.point = point;
		this.loading = loading;  
	}
	
	hideLoading.prototype = {
		init : function(callback){
			var point_img = this.point[0],
				that = this;
			if (point_img.complete){		 //complete		
				that.hideLoad(callback); 
			} else {
				point_img.onload = function(){   //loaded					
					point_img.onload = null;
					that.hideLoad(callback);
				}
			}
		},
		
		//关掉load层，动画开始
		hideLoad : function(callback){
			var that = this;
			setTimeout(function(){
				that.loading.fadeOut(600);	  //隐藏掉							
				if(callback) setTimeout(callback, 50);		  //play
			},200);
		}
	};
	
	/*******************
	 *
	 * class
	 * 百分比加载效果
	 * @param  container 放进度条的容器
	 *
	 * @discription  将需要加载的img放入一个数组，每加载完一张img,即计算完成的百分比，显示在页面上
	 * @date 20151229
	 * @author  aven.tong  dongdong.tong@dianrong.com
	 *
	 *******************/
	var progressBar = DRmkt_Tool.progressBar = function(container){
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
					border:'1px solid #ccc',
					borderRadius:'5px'
				});
			_pres.css({
				transition:'all 0.4s ease 0.1s',
				boxShadow:'1px 1px 1px #333 inset',
				height:'10px',
				borderRadius:'5px',
				background:'#16a'
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
		imgDone : function (toatal){
			this.imgNum++;			
			var pct = Math.floor(this.imgNum/toatal*100) + '%', that = this;			
			this.pres.width(pct);
			this.texbox.text(pct);			
			if(this.imgNum === toatal){
				setTimeout(function(){
					that.container.fadeOut();
				}, 600);
			}
		},	
		
		//加载页面中所需的img们
		loadimgs : function (arr){
			var that = this;
			for(var i=0, k=arr.length; i<k; i++){
				var img = document.createElement('img');
				img.src = arr[i];
				
				//加载失败时报错
				img.onerror = function(e){					
					that.texbox.text('网络出现问题，请稍后再试');
				}
				
				if (img.complete) {				
					this.imgDone(k);
				} else {
					img.onload = function(){					
						// img.onload = null;
						that.imgDone(k);
					}
				};	
			}
		}
	}	
	
	
	/*******************
	 * 
	 * class
	 * 重力加速度类
	 * @param   threshold  阀值，大于这个值才认为是触发了
				inter 每隔一小段时间才判断一次，以便提高效率
				callbaxk 回调函数
	 * @discription  根据硬件设备在x,y,z轴上的位移或旋转的角度，来确定硬件在物理位置上发生了什么样的变化 
	 * @date 20160407
	 * @author  aven.tong  dongdong.tong@dianrong.com
	 *
	 *******************/	
	var accelerationGravityManage = DRmkt_Tool.accelerationGravityManage = function(){}
	
	accelerationGravityManage.prototype = {
		// 倾斜	
		slantController : function (config){
			var threshold = config.threshold || 7,
				inter = config.inter || 1000/60,
				callback = config.callback;
			window.DeviceOrientationEvent && window.addEventListener('deviceorientation',DeviceOrientationHandler,false);		
			var last_update = 0;
			function DeviceOrientationHandler(event){		
				var	curTime = new Date().getTime(),
					diffTime = curTime - last_update;
				if(diffTime > inter){
					last_update = curTime;
					var alpha = +event.alpha,    // 0--360   Z轴
						beta = +event.beta,      // -180--180  x轴
						gamma = +event.gamma;    // -90--90   y轴
					if(Math.abs(beta) > threshold || Math.abs(gamma) > threshold){ //倾斜大于阀值时，才进入
						var _obj = {
							alpha : alpha,
							beta : beta,
							gamma : gamma				
						}
						callback && callback(_obj);				
					}
				}
			}
		},

		// 摇晃
		shakeController : function (config){
			var threshold = config.threshold || 2000,     //定义默认阈值 
				inter = config.inter || 1000/60,   
				callback = config.callback,
				
				last_update = 0,			
				x = y = z = last_x = last_y = last_z = 0;         
			window.DeviceMotionEvent && window.addEventListener('devicemotion', deviceMotionHandler, false);
			function deviceMotionHandler(event) {		
				var acceleration = event.accelerationIncludingGravity;
					curTime = new Date().getTime(),
					diffTime = curTime - last_update;
				if (diffTime > inter) {			
					last_update = curTime;
					x = acceleration.x;
					y = acceleration.y;
					z = acceleration.z;
					
					var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
					if (speed > threshold) {	  //摇晃大于阀值时，才进入
						var _obj = {x : x, y : y, z : z};
						callback && callback(_obj);	               
					}                    
					last_x = x;
					last_y = y;
					last_z = z;
				}            
			}        
		}
	}
	
	/*******************
	 *
	 * class
	 * 左右切换
	 * @param  roles   用来切换的page们 (must)
	 *		   loop    是否为循环切换,默认不循环(opt)
	 *		   autoPlay    是否自动播放(opt)
	 *		   interval    播放的时间间隔(opt)
	 *
	 * @discription  利用css3的3D属性将所要旋转的page们，在3D空间下摆成一个圆。再监听事件来旋转这个圆达到切换的效果
	 * @date 20151202
	 *
	 *******************/	
	var SwipeLeftRight = DRmkt_Tool.SwipeLeftRight = function(config){		
		this.roles = config.roles;
		this.loop = config.loop || false;           //默认不循环
		this.autoPlay = config.autoPlay || false;   //默认不自动播放
		this.interval = config.interval || 4000;    //默认间隔为4s
		
		this.deg = 360/this.roles.length; 
		this.preventDefaultOfZepto();			
		this.styleTheSec();
	}
	
	SwipeLeftRight.prototype = {		
		//刷新css
		styleTheSec : function(){
			var that = this,
				_roles = this.roles,				
				_deg = this.deg,
				stepSize = _roles.width(),
				tranZ = (stepSize/2) / Math.tan((_deg/2) / 180 * Math.PI);   //离中心的距离			
			_roles.each(function(i,d){			
				$(d).css({'-webkit-transform': 'rotateY(' + i*_deg + 'deg) translateZ(' + tranZ + 'px)'});
			});	
		},
		
		//绑定事件
		bindSwipe : function(callback){
			var that = this,
				_touch = DRmkt_Tool.common.touchFunc;
				_con = document, 
				_box = this.roles.parent(),				
				nmb = 0;			
			!!this.loop ? doloop() : unloop();			
			function doloop(){
				var time = null;
				//向左
				_touch(_con, 'toleft', function(){
					updateCss(-1);
					return false;
				});
				
				//向右
				_touch(_con, 'toright', function(){
					updateCss(1);
					return false;
				});
				
				//自动播放
				if(that.autoPlay){
					time = setInterval(function(){
						updateCss(-1);						
					},that.interval); 
				}
				
				//触屏后停止播放
				_touch(_con, 'tostart', function(){
					clearInterval(time);
				});
			}			
			
			function unloop(){
				//向左
				_touch(_con, 'toleft', function(){
					if(nmb > -that.roles.length+1) updateCss(-1);				
					return false;
				});
				
				//向右
				_touch(_con, 'toright', function(){
					if(nmb < 0) updateCss(1);					
					return false;
				});
			}
			
			//旋转舞台
			function updateCss(dir){
				nmb += dir;
				_box.css({'-webkit-transform' : 'rotateY(' + nmb*that.deg + 'deg)'});
				// _box.css({'-webkit-transform' : 'rotateY(' + nmb*10 + 'deg)'});
				
				if(callback){
					var ind = nmb%(that.roles.length);				
					ind = ind >= 0 ? ind : -ind;
					setTimeout(function(){
						callback(ind);  //当前场景的索引值为参数
					},600);					
				}
			}
		},
		
		//去掉默认动作
		preventDefaultOfZepto : function(){
			var _touch = DRmkt_Tool.common.touchFunc;
			_touch(document, 'tomove', function(e){
				e.preventDefault();
			});
		}	
	}
	
	/*******************
	 *
	 * class
	 * 上下切换
	 * @param  roles   用来切换的page们 (must)
	 *		   loop    是否为循环切换,默认不循环(opt)
	 *		   autoPlay    是否自动播放(opt)
	 *		   interval    播放的时间间隔(opt)
	 *
	 * @discription  利用css3的3D属性将所要旋转的page们，在3D空间下摆成一个圆。再监听事件来旋转这个圆达到切换的效果
	 * @date 20151202
	 * @author  aven.tong  dongdong.tong@dianrong.com
	 *
	 *******************/	
	var swipeUpDown = DRmkt_Tool.swipeUpDown = function(config){		
		this.roles = config.roles;
		this.loop = config.loop || false;           //默认不循环
		this.autoPlay = config.autoPlay || false;   //默认不自动播放
		this.interval = config.interval || 4000;    //默认间隔为4s
		
		this.deg = 360/this.roles.length;
		this.preventDefaultOfZepto();			
		this.styleTheSec();
	}
	
	swipeUpDown.prototype = {		
		//刷新css
		styleTheSec : function(){
			var that = this,
				_roles = this.roles,
				_len = _roles.length,
				_deg = this.deg,
				stepSize = _roles.height(),
				tranZ = (stepSize/2) / Math.tan((_deg/2) / 180 * Math.PI);   //离中心的距离			
			_roles.each(function(i,d){			
				$(d).css({'-webkit-transform': 'rotateX(' + (_len-i)*_deg + 'deg) translateZ(' + tranZ + 'px)'});
			});	
		},
		
		//绑定事件
		bindSwipe : function(callback){
			var that = this,
				_touch = DRmkt_Tool.common.touchFunc;
				_con = document, 
				_box = this.roles.parent(),				
				nmb = 0;			
			
			!!this.loop ? doloop() : unloop();
			
			function doloop(){
				var time = null;
				//向下
				_touch(_con, 'todown', function(){
					updateCss(-1);
					return false;
				});
				
				//向上
				_touch(_con, 'totop', function(){
					updateCss(1);
					return false;
				});
				
				//自动播放
				if(that.autoPlay){
					time = setInterval(function(){
						updateCss(1);						
					},that.interval); 
				}
				
				//触屏后停止播放
				_touch(_con, 'start', function(){
					clearInterval(time);
				});
			}			
			
			function unloop(){
				//向下
				_touch(_con, 'todown', function(){
					if(nmb > 0) updateCss(-1);
					return false;
				});
				
				//向上
				_touch(_con, 'totop', function(){
					if(nmb < that.roles.length-1) updateCss(1);					
					return false;
				});
			}
			
			//旋转舞台
			function updateCss(dir){
				nmb += dir;
				_box.css({'-webkit-transform' : 'rotateX(' + nmb*that.deg + 'deg)'});
				
				if(callback){
					var ind = nmb%(that.roles.length);				
					ind = ind >= 0 ? ind : -ind;
					setTimeout(function(){
						callback(ind);  //当前场景的索引值为参数
					},600);					
				}				
			}
		},
		
		//去掉默认动作
		preventDefaultOfZepto : function(){
			var _touch = DRmkt_Tool.common.touchFunc;
			_touch(document, 'tomove', function(e){
				e.preventDefault();
			});
		}	
	}
	
	
	/*******************
	 * 
	 * class
	 * 表单校验
	 * @param 
	 * @discription  用正则来校验目标input里的值是否符合要求
	 * @date 20151202
	 * @author  aven.tong  dongdong.tong@dianrong.com
	 *
	 *******************/
	var inputVerify = DRmkt_Tool.inputVerify = function () {}
	
	inputVerify.prototype = {
		phoneReg : /^(13|15|17|18)\d{9}$/,
		emailReg : /^([\w-.]+@([\w-]+\.)+[\w]{2,6})$/,
		passwordReg : /^.*([0-9].*[a-zA-Z]|[a-zA-Z].*[0-9]).*$/,
		
		//表单校验
		checkForm : function (type, val) {
			switch (type) {
			case 'email':
				if (!val) {
					this.showErrorMsg("电子邮件不能为空");					
				} else if (!val.match(this.emailReg)) {
					this.showErrorMsg("电子邮件地址有误");					
				} else {
					return true
				}
				break;
			case 'phone':
				if (!val) {
					this.showErrorMsg("手机号不能为空");					
				} else if (!val.match(this.phoneReg)) {
					this.showErrorMsg("手机号格式不正确，请重新输入");					
				} else {
					return true
				}
				break;
			case 'password':
				if (!val) {
					this.showErrorMsg("密码不能为空");					
				} else if (!val.match(this.passwordReg)) {
					this.showErrorMsg("密码须为8个以上字符和数字组合");					
				} else {
					return true
				}
				break;		
			}			
		},
		
		//非空校验
		isInputEmpty : function(inps){
			var index = -1;
			inps.each(function(i,d){
				var val = $.trim($(d).val());
				index = i;
				if(!val) return false;
			});		

			if(inps.length -1 === index){
				return true;
			}else{
				this.showErrorMsg("请填写完整");
				return false;
			}
		},
		
		//显示错误信息
		showErrorMsg : function (msg, dom) {
			var dom = dom || $('.errorMsg');
			dom.text(msg).show();
			setTimeout(function () {
				dom.hide();
			}, 3000);
		}
	}	
	
	/*******************
	 *
	 * class
	 * 下拉框类
	 * @param  inputDom  被点击的input节点
	 *         listObj   下拉框信息的JSON
	 * @discription  模拟select标签，并动态生成下拉项，封装相应数据，响应选择事件
	 * @date 20151202
	 * @author  aven.tong  dongdong.tong@dianrong.com
	 *
	 *******************/
	var SelectList = DRmkt_Tool.SelectList = function (inputDom, listObj) {
		this.inputDom = inputDom;
		this.listObj = listObj;
		this.panel = null;
	}

	//初始化对象
	SelectList.prototype = {
		draw : function (callback) {
			var listDom = this.panel = this.creatList(callback);
			listDom.style.width = (this.inputDom.clientWidth) + "px";
			DRmkt_Tool.common.positionTheDom(listDom, this.inputDom);
			document.body.appendChild(listDom);
			listDom.style.display = 'block';
			this.hide(listDom);
		},

		//创建下拉框的dom
		creatList : function (callback) {
			var _list = this.listObj,
			_con = '',
			_ul = document.getElementById('_select-list');
			if (!_ul) {
				_ul = document.createElement('ul');
				_ul.id = '_select-list';
			}
			for (var i = 0, k = _list.length; i < k; i++) {
				var _tex = _list[i];
				_con += '<li><span class="dib ell">' + _tex + '</span></li>';
			}
			_ul.innerHTML = _con;
			this.bindListEvent(_ul, callback);
			return _ul;
		},

		//绑定点击事件
		bindListEvent : function (dom, callback) {
			var that = this,
			_lis = dom.getElementsByTagName('li');
			for (var i = 0, k = _lis.length; i < k; i++) {
				_lis[i].onclick = function (e) {
					var _inp1 = that.inputDom,
					_tex = this.getElementsByTagName('span')[0].innerHTML;
					_inp1.value = _tex;
					// _inp1.focus();
					this.parentNode.style.display = 'none';
					if (callback) callback(_tex);
                };
            };
        },

		//控制隐藏
		hide : function (dom) {
			$(dom).mouseleave(function () {
				$(this).hide();
				this.style.position = 'absolute';
			});
			// $(document.body).click(function () {
				// $(dom).hide();
				// dom.style.position = 'absolute';
			// });
		}
	}
	
	
	/*******************
	 *	
	 * 调用微信分享功能
	 * @param   debug  打开调试接口，默认关闭
				link  分享页面的url
				imgUrl 分享的小图片 
				momentsTitle 分享朋友圈标题
				chatTitle 分享好友标题
				description 分享好友的简要说明
				callbaxk 回调函数
	 * @discription  引用微信的api文件，配置相应参数，然后调用相应接口
	 * @date 20151223
	 * @author  aven.tong  dongdong.tong@dianrong.com
	 *
	 *******************/
	var insertWXSDK = DRmkt_Tool.insertWXSDK = function (config) {
		this.debug = config.debug || false;
		this.link = config.link || location.href;
		this.imgUrl = config.imgUrl;
		this.momentsTitle = config.momentsTitle;
		this.chatTitle = config.chatTitle;
		this.description = config.description;
		this.callback = config.callback || null;
		
		this.loadSDK();
	}
	
	insertWXSDK.prototype = {
		loadSDK : function(){
			var that = this,
				_js = document.createElement('script');
			_js.src = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js';
			_js.id = 'wxsdk' + Math.floor(Math.random()*10000);
			document.body.appendChild(_js);
			
			_js.onload = function(){
				that.doConfig();
			}
		},
		
		doConfig : function(){
			var that = this;
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
					var data = res.content;		
					wx.config({
						debug : that.debug,
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
							imgUrl : that.imgUrl,
							link : that.href,
							success : function(rs){
								debug && alert("share on moments finished");
								if(that.callback) that.callback();
							}
						},
						momentsConfig =  $.extend({		//朋友圈		
							title : that.momentsTitle						
						}, _obj),
						chatConfig = $.extend({    //好友						
								title : that.chatTitle,
								desc : that.description
							}, _obj);
							
						wx.onMenuShareTimeline(momentsConfig);
						wx.onMenuShareAppMessage(chatConfig);
					});

					wx.error(function (err) {
						debug && alert(err ? 'err: ' + JSON.stringify(err) : "ok");
					});
				},
				
				error : function(){
					console.log('wx fail');
				}
			});			
		}
	}	
	
	
	
}());


  
