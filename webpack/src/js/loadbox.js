$(function(){
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
	
	
	//盒子打开和关闭
	var anibox = $('.item');
	function dealCls(dom){
		var	cls = dom.className,
			ind = cls.indexOf('toopen');
		if(ind > -1){
			anibox.removeClass('toopen');
		}else{
			anibox.addClass('toopen');
		}
	}
	
	setInterval(function(){
		dealCls(anibox[0]);
	},1200);
	
	
	// console.log(22);
});