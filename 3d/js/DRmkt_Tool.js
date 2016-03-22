/**********************************************************
* DRmkt_Tool是一个市场部有关于H5的一个JS工具集，里面提供了H5中经常用到的工具，

*  		hideLoading   隐藏loading层
*  		progressBar    百分比加载效果
*  		SwipeLeftRight  左右切换类
*  		swipeUpDown     上下切换
* 		multipleSelect  多项选择类
* 		inputVerify    表单校验
* 		SelectList    下拉框类
* 		debrisEffect   碎片效果
* 		snowEffect   雪花效果
* 		insertWXSDK  调用微信分享功能

* 		common 公用类

//	Date  2015.12.04   dongdong.tong

************************************************************/


var DRmkt_Tool = window.DRmkt_Tool || {};
(function(){
	/*******************
	 *
	 * class
	 * 隐藏loading层
	 * @param  point     描点
	 *		   loading   loading层
	 *
	 * @discription  侦听某个图层加载成功事件，隐藏loading层，以便开始动画 
	 * @date 20151214
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
	 * @discription 
	 * @date 20151229
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
	 * 左右切换
	 * @param  roles   用来切换的page们 (must)
	 *		   loop    是否为循环切换,默认不循环 (opt)
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
				_con = $(document), 
				_box = this.roles.parent(),				
				nmb = 0;			
			!!this.loop ? doloop() : unloop();			
			function doloop(){
				var time = null;
				//向左,向上
				_con.on('swipeLeft', function(){
					updateCss(-1);
					return false;
				});
				
				//向右，向下
				_con.on('swipeRight', function(){
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
				$(document).on('touchstart', function(e){
					clearInterval(time);
				});
			}			
			
			function unloop(){
				//向左
				_con.on('swipeLeft', function(){
					if(nmb > -that.roles.length+1) updateCss(-1);				
					return false;
				});
				
				//向右
				_con.on('swipeRight', function(){
					if(nmb < 0) updateCss(1);					
					return false;
				});
			}
			
			//旋转舞台
			function updateCss(dir){
				nmb += dir;
				// _box.css({'-webkit-transform' : 'rotateY(' + nmb*that.deg + 'deg)'});
				_box.css({'-webkit-transform' : 'rotateY(' + nmb*10 + 'deg)'});
				
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
			$(document).on('touchmove', function(e){
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
	 *
	 * @discription  利用css3的3D属性将所要旋转的page们，在3D空间下摆成一个圆。再监听事件来旋转这个圆达到切换的效果
	 * @date 20151202
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
				_con = $(document), 
				_box = this.roles.parent(),				
				nmb = 0;			
			
			!!this.loop ? doloop() : unloop();
			
			function doloop(){
				var time = null;
				//向下
				_con.on('swipeDown', function(){				
					updateCss(-1);
					return false;
				});
				
				//向上
				_con.on('swipeUp', function(){					
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
				$(document).on('touchstart', function(e){
					clearInterval(time);
				});
			}			
			
			function unloop(){
				//向下
				_con.on('swipeDown', function(){
					if(nmb > 0) updateCss(-1);
					return false;
				});
				
				//向上
				_con.on('swipeUp', function(){
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
			$(document).on('touchmove', function(e){
				e.preventDefault();
			});
		}	
	}
	
	/*******************
	 *
	 * class
	 * 多项选择类
	 * @param  saveBox      待选项box (must)
	 *		   selectedBox  已选项box (must)
	 *		   saveTag      具体待选项的tag, 默认为 li (opt)
	 *
	 * @discription  在待选与已选之间进行关联的选择，关联的key是附在目标tag上的data属性
	 * @date 20151202
	 *
	 *******************/	
	var multipleSelect = DRmkt_Tool.multipleSelect = function (saveBox, selectedBox, saveTag){
		this.saveBox = saveBox;
		this.selectedBox = selectedBox;
		this.saveTag = saveTag || 'li';
	}
	
	multipleSelect.prototype = {		
		//添加
		addTagTitle : function (tag, id){
			var _tex = '<span data-pid="' + id + '">' + $.trim(tag.text()) + '<i class="icon-delete"></i></span>';		
			this.selectedBox.append($(_tex));				
		},
		
		//删除
		removeTagTitle : function (id){
			var _span = this.selectedBox.find('span');
			_span.each(function(i,d){
				var _id = $(d).data().pid;
				if(_id === id) $(d).remove();
			});
		},
		
		//弹出提示
		popTheLimit : function (limit, text){
			var tex = text || '最多可选' + limit + '项';
			$('.poppupborder').find('p').text(tex).end()
				.fadeIn(400).delay(2000).fadeOut(200);	
		},
		
		bindSelectEvent : function(){
			var _tag = this.saveTag, that = this;
			
			//点击备选
			this.saveBox.on('click', ''+_tag, function(){
				var pid = $(this).data().pid,   //拿到pid
					_cls = $(this)[0].className,
					_pbox = $(this).parent(),
					_len = that.selectedBox.find('span').length,			
					isoff = _cls.indexOf('off'),
					ison = _cls.indexOf('on');
					
				//先处理off
				if(isoff>-1) return false; //如果是off则退出
				if(ison>-1){	//有on则去掉		
					$(this).removeClass('on');
					that.removeTagTitle(pid);
					
					//顺便删掉off
					if(pid === 'ttz001') $(this).nextAll().removeClass('off');
					if(_pbox.find('.on').length < 1) _pbox.find(_tag + ':first').removeClass('off');
					
				}else{  //没有on则看大于2吗			
					if(_len > 2){  //大于2就弹层
						that.popTheLimit(3);
					}else{   //否则加上
						$(this).addClass('on');
						that.addTagTitle($(this).find('p:first'), pid);
						
						//顺便加上off
						if(pid === 'ttz001'){
							$(this).nextAll().addClass('off');
						}else{
							_pbox.find(_tag + ':first').addClass('off');
						}
					}			
				}				
				return false;
			});			
			
			//点击已选则关闭
			this.selectedBox.on('click', 'span', function(){							
				var _tags = that.saveBox.find(''+ that.saveTag),
					_id = $(this).data().pid;
				$(this).remove(); //先将自己删掉
				_tags.each(function(i,d){
					var id = $(d).data().pid;					
					if(_id === id) $(d).click(); //模拟触发点击事件
				});
			});
		}
	}
	
	/*******************
	 * 
	 * class
	 * 表单校验
	 * @param 
	 * @date 20151202
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
	 * @date 20151202
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
	 * 碎片效果
	 * @param  
	 * @discription  将图片分割成碎片效果
	 * @date 20151212
	 *
	 *******************/
	var debrisEffect = DRmkt_Tool.debrisEffect = function (config) {
		this.container = config.container;   //碎片容器
		this.row = config.row || 3;          //行数
		this.column = config.column || 4;    //列数
		this.continueTime = config.continueTime || '1000';   //速度		
	}
	debrisEffect.prototype = {
		//返回两个数之间的随机数
		randomNum : function (n, m){
			return parseInt(Math.random()*(m-n)+n);
		},
		
		//创建碎片div们
		creatDivs : function () {
			var oDiv = this.container[0],
				R = this.row,
				C = this.column,
				rdm = this.randomNum;
			for(var i=0;i<R;i++){
				for(var j=0;j<C;j++){
					//创建
					var dw = oDiv.offsetWidth,
						dh = oDiv.offsetHeight,
						w=Math.floor(dw/C),
						h=Math.floor(dh/R),
						oNewDiv=document.createElement('div');
					//css
					// oNewDiv.id='new_'+i+'_'+j;
					oNewDiv.style.opacity=0;
					oNewDiv.style.left=j*w+'px';
					oNewDiv.style.top=i*h+'px';					
					oNewDiv.style.width=w+'px';
					oNewDiv.style.height=h+'px';
					oNewDiv.style.backgroundPosition = '-'+j*w+'px -'+i*h+'px';
					oNewDiv.style.backgroundSize = dw + 'px auto';
					oNewDiv.style.WebkitTransition =this.continueTime + 'ms all ease';
					oNewDiv.style.WebkitTransform='translate3d('+rdm(-dw, dw)+'px, '+rdm(-dh, dh)+'px, 300px) rotateY('+rdm(-180, 180)+'deg) rotateX('+rdm(-180, 180)+'deg) scale(2,2)';
					//添加到dom里
					oDiv.appendChild(oNewDiv);
				}
			}
		},
		
		//聚拢
		goTogether : function (callback){
			var ds = this.container.find('div'),
				rdm = this.randomNum;
			ds.each(function(i,d){
				setTimeout(function (){
					d.style.WebkitTransform='translate3d(0,0,0)';
					d.style.opacity=1;				
				}, rdm(300, 400));
			});
			if(callback) callback(this.row);
		},
		
		//分散
		goDisperse : function (callback){
			var box = this.container,
				ds = box.find('div'),
				dw = box.width(),
				dh = box.height(),
				rdm = this.randomNum;
			ds.each(function(i,d){
				setTimeout(function (){
					d.style.WebkitTransform='translate3d('+rdm(-dw, dw)+'px, '+rdm(-dh, dh)+'px, 300px) rotateY('+rdm(-180, 180)+'deg) rotateX('+rdm(-180, 180)+'deg) scale(2,2)';
					d.style.opacity=0;				
				}, rdm(300, 400));
			});
			if(callback) callback(this.row);
		}		
	}
	
	/*******************
	 *	
	 * 雪花效果
	 * @param  
	 * @discription  雪花飘舞的效果
	 * @date 20151228
	 *
	 *******************/
	var snowEffect = DRmkt_Tool.snowEffect = function (config) {
		this.container = config.container;        //效果容器
		this.imgUrl = config.imgUrl;              //雪花		
		this.autoPlay = config.autoPlay || false; //自动播放，默认不自动	
		this.num = config.num || 10;              //雪花片数,默认10片	
		this.interval = config.interval || 2000;  //步长值,默认2000ms		
		this.creatImgs();     //一进来，就生成雪花们		
	}
	
	snowEffect.prototype = {
		//返回两个数之间的随机数
		randomNum : function (n, m){
			return parseInt(Math.random()*(m-n)+n);
		},
		
		//生成雪花
		creatImgs : function(){			
			var img = '<img src="' + this.imgUrl + '" alt="unit" />',
				rad = this.randomNum,
				that = this;
			for(var i=0; i<this.num; i++){
				this.container.append(img);
			}
			
			if(this.autoPlay){
				that.tosnow();   //进来时，先运行一次
				setInterval(function(){
					that.tosnow();
				}, rad(2500, 3000));
			}
		},
		
		//开始下雪
		tosnow : function(){
			var imgs = this.container.find('img'),
				rdm = this.randomNum,
				con = this.container,
				dw = con.width(),
				dh = con.height();
			imgs.each(function(i,d){
				setTimeout(function (){
					d.style.WebkitTransform='translate3d('+rdm(-0.5*dw, 0.5*dw)+'px, '+rdm(-0.5*dh, 0.5*dh)+'px, 300px) rotateY('+rdm(-180, 180)+'deg) rotateX('+rdm(-180, 180)+'deg) rotateZ('+rdm(-180, 180)+'deg) scale('+ rdm(0.8, 1.5) +','+ rdm(0.8, 1.5) +')';
					d.style.opacity = Math.random() + 0.3;
				}, rdm(200, 300));			
			});
		}
	}
	
	/*******************
	 *	
	 * 调用微信分享功能
	 * @param  
	 * @discription 将图片分割成碎片效果
	 * @date 20151223
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
	
	
	/*******************
	 *	
	 * 公用类
	 * @param  
	 * @discription  获取页面中某个元素的坐标，以及根据这个坐标定位一个弹层
	 * @date 20151202
	 *
	 *******************/	
	DRmkt_Tool.common = {		
		//获取目录的位置
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
		}
	}	
}());

//确认是否为微信
function is_weixin(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger"){
		return true;
	} else {
		return false;
	}
}	

//确定客户端类型			
function bindEvents () {
	var ua = navigator.userAgent,
		android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
		ipad = ua.match(/(iPad).*OS\s([\d_]+)/),	
		iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
		weixin = ua.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';	
	if(android || ipad || iphone) {
		$('#btn').on('touchstart', hideAndShow);
	} else {
		$('#btn').on('click', hideAndShow);
	}		
}	  
