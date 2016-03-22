//用appendFile 在服务端添加一个文件，并在这个文件里不断添加数据
//用readFile 动态读取这个数据，并通过路由返回给前端
//用writeFile 可以修改这个文件， unlink删除这个文件

// PS 这种往后端保存并读取数据的方法，还是存在着那个问题：服务程序没有权限启动

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//加载文件模块
var fs= require("fs"); 

//设置静态资源解析
app.use(express.static('public'));

//创建 application/x-www-form-urlencoded 编码解析
var urlencodeParser = bodyParser.urlencoded({extended:false});

//路由跳转
app.get('/', function (req, res) {	
    res.sendFile( __dirname + "/" + "index.html" );
    // res.send('Hello GET');
});

app.post('/addper', urlencodeParser, function (req, res) {
	var d = ';' + req.body.name + ',' + req.body.age;
	fs.appendFile('test.txt', d, function (err) {
		if (err) throw err;
		//数据被添加到文件的尾部		
		res.end(JSON.stringify(d)); 
	});
});

app.get('/getper', urlencodeParser, function (req, res) {
	fs.readFile('test.txt', function (err, data) {
		if (err) throw err;
		// var arr = data.toString().split(';');
		// arr.shift();
		// console.log(arr);
		res.end(JSON.stringify(data.toString()));		
	});
});

app.post('/editper', urlencodeParser, function (req, res) {	
	var d = '';
	fs.writeFile('test.txt', d,  function(err) {
	   if (err) throw err;
	   console.log("数据写入成功！");
	});
});

app.post('/delper', urlencodeParser, function (req, res) {	
	fs.unlink('test.txt', function(err) {
		if (err) throw err;
		console.log("文件删除成功！");
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