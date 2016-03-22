/*  本地存储   */

if (localStorage.asdf){
	localStorage.asdf=Number(localStorage.asdf) +1;
}else{
	localStorage.asdf=1;
}
console.log("Visits(local): " + localStorage.asdf + " time(s).");
// document.write("Visits(local): " + localStorage.asdf + " time(s).");

if (sessionStorage.pagecount){
	sessionStorage.pagecount=Number(sessionStorage.pagecount) +1;
}else{
	sessionStorage.pagecount=1;
}
console.log("Visits(session): " + sessionStorage.pagecount + " time(s).");
// document.write("Visits(session): " + sessionStorage.pagecount + " time(s).");

/*
var storage = window.localStorage;
console.log(storage.length);
console.log(storage instanceof Array);
console.log(typeof storage);
function showStorage(){
	for(var i=0;i<storage.length;i++){
		key(i)获得相应的键，再用getItem()方法获得对应的值
		console.log(storage.key(i)+ " : " + storage.getItem(storage.key(i)));
	}
}
*/





/*  地理位置  */
var geoDom = document.getElementById("demo");
function getLocation() {
	console.log(11);
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
		// navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		geoDom.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	console.log(33);
	var mapholder = document.getElementById('mapholder');
	mapholder.style.height = '250px';
	mapholder.style.width = '500px';
	mapholder.style.border = '1px solid #ccc';
	
	
	var lat = position.coords.latitude,
		lng = position.coords.longitude,
		poi = new BMap.Point(lng, lat);
	
	var map = new BMap.Map(mapholder);
	map.centerAndZoom(poi, 15);
	var mar = new BMap.Marker(poi,{title: 'I am here', enableDragging:true});	
	map.addOverlay(mar);
	mar.addEventListener('click', function(){
		var iw = new BMap.InfoWindow('ASDF DSFAERSDF SAWDF SDF');
		mar.openInfoWindow(iw);
	});
}

function showError(error) {
	console.log(55);
	switch (error.code) {
	case error.PERMISSION_DENIED:
		geoDom.innerHTML = "User denied the request for Geolocation."
			break;
	case error.POSITION_UNAVAILABLE:
		geoDom.innerHTML = "Location information is unavailable."
			break;
	case error.TIMEOUT:
		geoDom.innerHTML = "The request to get user location timed out."
			break;
	case error.UNKNOWN_ERROR:
		geoDom.innerHTML = "An unknown error occurred."
			break;
	}
}



/*   面向数据编程   */
var dataVegetables = {
    typeId: "bbbbbb",
    goods: {
        "10": { name: "白萝卜", price: 0.4, units: "/斤", num: 0 },
        "11": { name: "菠菜", price: 0.8, units: "/斤", num: 0 },
        "12": { name: "菜花", price: 1.3, units: "/斤", num: 0 },
        "13": { name: "长茄子", price: 0.2, units: "/斤", num: 0 },
        "14": { name: "慈菇", price: 3.5, units: "/斤", num: 0 },
        "15": { name: "葱头 ", price: 0.85, units: "/斤", num: 0 },
        "16": { name: "大白菜 ", price: 0.43, units: "/斤", num: 0 },
        "17": { name: "大葱 ", price: 0.75, units: "/斤", num: 0 },
        "18": { name: "冬瓜", price: 0.5, units: "/斤", num: 0 },
        "19": { name: "冬笋  ", price: 10.0, units: "/斤", num: 0 }
    }
};
// console.log(11);
var _li = dataVegetables.goods;
_li['10'].num = 5;
_li['10'].name += 'sdfsdwe';
// console.log(_li);

function changeG(obj, id, name, value){
	var _li = obj.goods;
	_li[id].name = value;
}

changeG(dataVegetables, '15', 'num', 5);







/* by zhangxinxu 2010-07-27 
* http://www.zhangxinxu.com/
* 倒计时的实现
*/
var fnTimeCountDown = function(d, o){
	var f = {
		zero: function(n){
			var n = parseInt(n, 10);
			if(n > 0){
				if(n <= 9){
					n = "0" + n;	
				}
				return String(n);
			}else{
				return "00";	
			}
		},
		dv: function(){
			d = d || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
			var future = new Date(d), now = new Date();
			//现在将来秒差值
			var dur = Math.round((future.getTime() - now.getTime()) / 1000) + future.getTimezoneOffset() * 60, 
				pms = {
					sec: "00",
					mini: "00",
					hour: "00",
					day: "00",
					month: "00",
					year: "0"
				};
			if(dur > 0){
				pms.sec = f.zero(dur % 60);
				pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
				pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
				pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400)) % 30) : "00";
				//月份，以实际平均每月秒数计算
				pms.month = Math.floor((dur / 2629744)) > 0? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
				//年份，按按回归年365天5时48分46秒算
				pms.year = Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0";
			}
			return pms;
		},
		ui: function(){
			if(o.sec){
				o.sec.innerHTML = f.dv().sec;
			}
			if(o.mini){
				o.mini.innerHTML = f.dv().mini;
			}
			if(o.hour){
				o.hour.innerHTML = f.dv().hour;
			}
			if(o.day){
				o.day.innerHTML = f.dv().day;
			}
			if(o.month){
				o.month.innerHTML = f.dv().month;
			}
			if(o.year){
				o.year.innerHTML = f.dv().year;
			}
			setTimeout(f.ui, 1000);
		}
	};	
	f.ui();
};


var d = Date.UTC(2030, 6, 27, 16, 34);
var obj = {
     sec: document.getElementById("sec"),
     mini: document.getElementById("mini"),
     hour: document.getElementById("hour")
}
fnTimeCountDown(d, obj);

















