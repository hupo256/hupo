
//测试发现前端不能通过发送ajax的方式，借服务端修改数据库
//传回的是500错误，也许这是一种安全机制所决定的
//也许前端只能用其他方式修改数据库了

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongodb = require("mongodb");    //加载mongo模块
var server = new mongodb.Server('localhost', 27017, {auto_reconnect : true});  //创建mongo服务以备用

//设置静态资源解析
app.use(express.static('public'));

//创建 application/x-www-form-urlencoded 编码解析
var urlencodeParser = bodyParser.urlencoded({extended:false});

//路由跳转
app.get('/', function (req, res) {	
    res.sendFile( __dirname + "/" + "index.html" );
    // res.send('Hello GET');
});

app.post('/newDB', urlencodeParser, function (req, res) {
	var db = new mongodb.Db("db05", server, {safe : false});   // 以safe的方式创建新的数据库
	db.open(function (err, db) {  //当新的数据库创建成功时，会发生open这个动作
		if (err) {     //失败时提示信息
			console.log(err);
			return false;
		}
		console.log("We are connected!");   
		db.collection('tb1', function (err, collection) {    //连接这个新的数据库并顺便在此数据库下新建一个名为 “tb1” 的表
			var data = {
				"name" : 'tdd',
				"age" : 24
			};	
			collection.insert(data, function(err, rs){   //往这个表里插入数据
				if (err) {
					console.log(err);
					return false;
				}
				response = rs;
				console.log(rs);
				res.end(JSON.stringify(response));   //将结果转成字符串后返回给前台
				db.close();
				// process.exit();
			});
		});
	});
});
	

//设置服务的监听端口
var server = app.listen(8082, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
})



/*
var mongodb = require("mongodb");    //加载mongo模块
var server = new mongodb.Server('localhost', 27017, {auto_reconnect : true});  //创建mongo服务以备用
var db = new mongodb.Db("db07", server, {safe : false});   // 以safe的方式创建新的数据库

db.open(function (err, db) {  //当新的数据库创建成功时，会发生open这个动作
	if (err) {     //失败时提示信息
		console.log(err);
		return false;
	}
	console.log("We are connected!");   
	db.collection('tb1', function (err, collection) {    //连接这个新的数据库并顺便在此数据库下新建一个名为 “tb1” 的表
		var data = {
			"name" : 'tdd',
			"age" : 25
		};	
		collection.insert(data, function(err, rs){   //往这个表里插入数据
			if (err) {
				console.log(err);
				return false;
			}
			response = rs;
			console.log(rs);
			// res.end(JSON.stringify(response));   //将结果转成字符串后返回给前台
			db.close();
			// process.exit();
		});
	});
});
*/

/*
var mongodb = require("mongodb");
var server = new mongodb.Server('localhost', 27017, {
		auto_reconnect : true
	});
var db = new mongodb.Db("test", server, {
		safe : false
	});
db.open(function (err, db) {
	if (err) {
		console.log(err);
		return false;
	}
	console.log("We are connected!");
	db.collection('test', {safe : true}, function (err, collection) {
		collection.find({
			unique : {
				"$exists" : true
			}
		}).toArray(function (err, items) {
			if (err) {
				console.log(err);
				return false;
			}
			for (item in items)
				console.log(items[item]);
			process.exit();
		});
	});
});
*/