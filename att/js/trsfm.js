$(function(){	
	var canv = document.getElementById('myCanvas');	
	var ctx = canv.getContext('2d');   
	var count = num = 0;
	var cwidth = canv.width;
	var cheight = canv.height;

	var imgArr = $('img');
	var speed1 = 2;
	var speed2 = 4;

	var sensEnter = coverEnter = null;
	var inter = 100/6;

	var sensImg = {
			img : imgArr[0],
			iw : imgArr[0].width,
			ih : imgArr[0].height,
			y : -cheight/2
		};
	// var transImg = {
			// img : imgArr[1],
			// iw : imgArr[1].width,
			// ih : imgArr[1].height,
			// x : 0,
			// y : -cheight
		// }
	function updateSens(sens, pos){
		var hei = sens.ih/sens.iw*cwidth*0.8,		
			h = (cheight-hei)/2,
			y = sens.y;
		console.log(h);
		if(!pos){   //滑入	
			if(y<h){
				sens.y += speed1;
			}else{
				clearInterval(sensEnter);   //结束滑入
			}
		}else{    //滑出
			if(y<cheight){
				sens.y += speed1;
			}else{
				clearInterval(sensEnter);  //结束滑出
			}
		}	
		return sens;
	}

	function drawSens(sens, pos){	
		sensEnter = setInterval(function(){
			ctx.clearRect(0, 0, cwidth, cheight);	
			var obj = updateSens(sens, pos),
				img = obj.img,
				iw = obj.iw,
				ih = obj.ih,
				w = cwidth*0.8,
				h = w*ih/iw,
				x = cwidth*0.1,
				y = obj.y;	
			ctx.drawImage(img, x, y, w, h);		
		}, inter);
	}
	function updateTrans(trans){
		var y = trans.y,
			x = trans.x;
		if(y<0){   //先向下
			trans.y += speed2;
		}else{     //再向两边		
			if(x> -cwidth/2){
				trans.x -= speed2;
			}else{
				clearInterval(coverEnter);   //结束向两边
				
				//归零
				trans.y = -cheight;
				trans.x = 0;
			}
		}	
		return trans;
	}
	function drawCover(tran){	
		coverEnter = setInterval(function(){
			ctx.clearRect(0, 0, cwidth, cheight);	
			var trans = updateTrans(tran),
				img = trans.img,
				iw = trans.iw,
				ih = trans.ih,
				tx = trans.x,
				ty = trans.y;		
			if(ty<0){
				ctx.drawImage(img, 0, ty, cwidth, cheight);
			}else{
				ctx.drawImage(img,0,0,iw/2,ih, tx, ty, cwidth/2, cheight);
				ctx.drawImage(img,iw/2,0,iw/2,ih, cwidth/2-tx, ty, cwidth/2, cheight);			
			}		
		}, inter);
	}

	var i =0;
	//点击事件
	$(canv).on('click tap', function(e){
		ctx.beginPath();
		ctx.rect(240, 20, 40,45);  //确定点击框
		if(ctx.isPointInPath(e.offsetX, e.offsetY)){				
			//添加场景
			i++;
			if(i%2){
				drawSens(sensImg);
			}else{
				drawSens(sensImg, true);
			}
			
			var transImg = {
				img : imgArr[1],
				iw : imgArr[1].width,
				ih : imgArr[1].height,
				x : 0,
				y : -cheight
			}		
			ctx.clearRect(0, 0, cwidth, cheight);		
			drawCover(transImg);
		}		
	});


});







