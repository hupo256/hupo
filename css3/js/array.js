/*  用单体模式创建真正的私有变量  */ 
var Namespace = {};
Namespace.DataParse = (function() {
    //private method
    function stripWhitespace(str) {
        return str.replace(/\s+/g, '');
    }
    function stringSplit(str, delimiter) {
        return str.split(delimiter);
    }
    //特权方法
	/*
    return {
        stringToArray: function(str, delimiter, stripWS) {
            if(stripWS) {
                str = stripWhitespace(str);
            }
            return stringSplit(str, delimiter);
        }
    }
	*/	
	
	return {
		we : 'sdf',
		er : 'werwr',
		sa : function(a){
			return a;
		}
	};	
	
})();


$(document).on('change', '.inp_rangs', function(){
	console.log($(this).val());
});

var ref = document.referrer;
console.log(ref);

/*   DIV 的可编辑状态   */
$(document).on('keydown', '.canedit', function(e){
	var _cod = e.keyCode;
	if(_cod == 32 || _cod == 59 || _cod == 13){  //按相应键时退出
		var _tex = $(this).text(),
			_htm = '<div class="list_cell" title="'+ _tex + '">'+ _tex +';</div>';
		$(this).text('').append($(_htm));
		$('.list_cell')[0].contentEditable = false;
		$(this).focus();
		return false;
	} else if(_cod == 46 || _cod == 110 || _cod == 8 ){   //删除
		console.log('del');
	}		
});
$(document).on('click', '.canedit', function(e){
	$(this).next().focus();
});

$(document).on('dblclick', '.canedit', function(e){
	$(this).next().dblclick();
});
 
$(document).on('focus', '.dbclik', function(e){
	console.log(11);	
});

$(document).on('dblclick', '.dbclik', function(e){
	console.log(22);	
});



function setCaretPosition(ctrl, pos){
	console.log('123');
	if(ctrl.setSelectionRange){
		console.log(11);
		ctrl.focus();
		ctrl.setSelectionRange(pos,pos);
	}else if(ctrl.createTextRange) {
		console.log(22);
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}


$('#css3anim').on('click', function(){
	//$(this).prev().css('animation-play-state','running');
	var _ani = $(this).prev();
	if(_ani.hasClass('running')){
		_ani.removeClass('running');
		_ani.addClass('paused');
	}else{
		_ani.removeClass('paused');
		_ani.addClass('running');		
	}
})


function addImg(){
	var img = document.createElement('img');
	img.src = 'image/10_s.jpg';
}
function addJs(){
	var js = document.createElement('script');
	js.src = 'js/drop.js';
	document.body.appendChild(js);
}
$(document).on('click','.btn_img', function(){
	addImg();
	var id = addJs('js/drop.js');
	console.log(id);
});

function addJs(url){
	var _js = document.createElement('script');
	_js.src = url;
	_js.id = '_js' + Math.floor(Math.random() * 100000);
	document.body.appendChild(_js);
	return _js.id;
}

function bind(fn, context){
	var args = Array.prototype.slice().call(arguments, 2);
	return function(){
		var innerArg = Array.prototype.slice().call(arguments),
			finalArg = args.concat(innerArg);
		return fn.apply(context, fialArg);
	};
}


//创建script
function createScript(url){
	var _js = document.createElement('script');
	_js.src = url;
	document.body.appendChild(_js);
}

function jsonpcallback(data){
	console.log(data);	
}

// $('#jsonp').click(function(){
	// console.log(22);
	// createScript('http://10.224.71.51/app/css3/js/width100.js?cb=jsonpCallback');
	
	// return false;
// });



$("#jsonp").click(function () {
    $.ajax({
        url: 'http://10.224.71.51/app/css3/js/width100.js',
        dataType: "jsonp",
        jsonp: "callback",
        success: function (e) {
            console.log(e);
        }
    })
})

// var a = 6;
// setTimeout(function () {
    // alert(a);
    // a = 666;
// }, 1000);
// a = 66;



function f1(){
	var dfd = $.Deferred();
	setTimeout(function () {
		console.log(11);　　　　　　
		dfd.resolve();
	}, 500);
	return dfd.promise();
}
function f2(){
	console.log('ok');
}
function f3(){
	console.log('fail');
}
function f4(){
	console.log('done2');
}
// f1().then(f2);

var wait = function () {
	var dtd = $.Deferred(); //在函数内部，新建一个Deferred对象
	var tasks = function () {
		console.log("执行完毕！");
		// dtd.resolve(); // 改变Deferred对象的执行状态
		dtd.reject(); // 改变Deferred对象的执行状态
	};

	setTimeout(tasks, 1000);
	return dtd.promise(); // 返回promise对象	　　
};
// $.when(wait()).then(f2, f3);
    // .done(f2)
    // .fail(f3);
	
wait().then(f2, f3, f4);




/*
// 关于作用域链：
// 1.可以将其理解为一个带有方向的线，顺着它可以找到变量的值或对象；
// 2.方向是由内而外，一级一级往外查找；
// 3.当前运行的函数总是在最前端；
// 4.var 关键字定义了变量的终点。

var name = 'World!';
(function () {
	console.log(name);
    if (typeof name === 'undefined') {
        var name = 'Jack';		
		// (function(){
			// var name = 'jonh';
		// })();
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }	
})();
*/

//url校验
/*
function IsURL(str_url) {
	var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
		 + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
		 + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
		 + "|" // 允许IP和DOMAIN（域名）
		 + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
		 + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
		 + "[a-z]{2,6})" // first level domain- .com or .museum
		 + "(:[0-9]{1,4})?" // 端口- :80
		 + "((/?)|" // a slash isn't required if there is no file name
		 + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	var re = new RegExp('^((https|http|ftp|rtsp|mms)?://)');
	
	var re = /^(https|http|ftp|rtsp|mms)?:\/\//;
	// if (re.test(str_url)) {
		// console.log(11);
		// return (true);
	// } else {
		// console.log(22);
		// return (false);
	// }
	
	if (str_url.match(re)) {
		console.log(11);
		return (true);
	} else {
		console.log(22);
		return (false);
	}
}

$('#board').on('change', function(){
	// console.log(22);
	IsURL($(this).val());	
})
*/


//div的可编辑状态
/*
// $('#conedit').on('dblclick', function(){
$(document).on('dblclick', '#conedit', function(){
	this.contentEditable = true;
	// this.title = 'why not here?'
	// this.className = 'canEdit';
	this.focus();
	
	// var _len = $(this).text().length;
	// toEnd(this, _len);
	// this.focus();
	return false;
});

function toEnd (obj, len){
	if (obj.createTextRange) {//IE浏览器
	   var range = obj.createTextRange();
	   range.moveStart("character",len);
	   range.collapse(true);
	   range.select();
	} else {//非IE浏览器
	   obj.setSelectionRange(len, len);
	   obj.focus();
	}
}


$(document).on('keydown', '#conedit', function(e){
	var cod = e.keyCode;
	if(cod === 13){		
		this.contentEditable = false;
		return false;
	}
});

$(document).on('blur', '#conedit', function(){
	this.contentEditable = false;
});

$('.editdiv').on('click',function(){
	var _d = $('#conedit'),
		d = _d[0],
		_len = _d.text().length;
	
	d.contentEditable = true;
	d.focus();
	setCaretPosition(d,_len);
	return false;
});

function setCaretPosition(tObj, sPos){	
    if(tObj.setSelectionRange){
        setTimeout(function(){
            tObj.setSelectionRange(sPos, sPos);
            tObj.focus();
        }, 0);
    }else if(tObj.createTextRange){
        var rng = tObj.createTextRange();
        rng.move('character', sPos);
        rng.select();
    }else{
		tObj.focus();
		tObj.setSelectionRange(sPos, sPos);
	    tObj.focus();
	}
}
*/




// var nodet = document.getElementById('qureyaapp'),
	// _child = nodet.childNodes[0];
// console.log(_child);
// var bnt_obj = {
	// type : _child.nodeType,
	// name: _child.nodeName,
	// value : _child.nodeValue,
	// parent : _child.parentNode
// }
// console.log(bnt_obj);


// var wert = new Object();
// wert.name = 'jack';
// wert.age = 25;
// wert.says = function(){
	
	// // return this.name;
	// console.log(22);
// }
// var _tett = JSON.stringify(wert);
// console.log(_tett);
// var qwerr = JSON.parse(_tett);
// console.log(qwerr);






