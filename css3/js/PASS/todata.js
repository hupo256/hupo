
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
var _li = dataVegetables.goods;
_li['10'].num = 5;

function changeG(obj, id, name, value){
	var _li = obj.goods;
	_li[id][name] = value;
}

changeG(dataVegetables, '18', 'num', 5);
var box = document.getElementById('goods');
var _sd = formatG(dataVegetables, box);

function formatG(obj, con){
	var gs = obj.goods,
		_ul = document.createElement('ul'),
		_tex = '';
	for(var i in gs){
		_tex += '<li><b>' + gs[i].name 
			 + '  </b>单价: ' + gs[i].price + '元/500g'		
			 + '  数量: ' + gs[i].num
			 + '</li>';
	}
	_ul.innerHTML = _tex;
	box.appendChild(_ul);
}


var goo = $('goods');
console.log(goo);
var pt = $('mapbox').getElement('p');
var tex  = pt.get('html');
var tex1 = pt.get('text');
console.log(tex);
console.log(tex1);



// window.addEvent('domready',function(){
   // console.log('先执行');
// });
// window.addEvent('load',function(){
   // console.log('后执行');
// });

var obj1 ={a:0,b:1};
var obj2 ={c:2,d:3};
var obj3 ={a:4,d:5};
var merged=Object.merge(obj1,obj2,obj3);//returns{a:4,b:1,c:2,d:5},(obj2,and obj3 are unaltered)
console.log(merged);
console.log(merged === obj1);


console.log(typeof undefinde);
console.log(typeof null);







