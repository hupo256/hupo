var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//引入数据库模块
var MongoClient = require('mongodb').MongoClient;   
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/hupo';

//设置静态资源解析
app.use(express.static('public'));

//创建 application/x-www-form-urlencoded 编码解析
var urlencodeParser = bodyParser.urlencoded({extended:false});

//路由跳转
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
    // res.send('Hello GET');
});

//请求数据
app.get('/getList', function (req, res){
	//每次请求都建立一个与数据库的连接
	//连接成功后，在回调里作相应的事情
	//完成任务后关掉这个连接
	
	var age = req.query.age;  //如果是get请求，那么参数就在req.query里
	// console.log(req.query);	  
	
    MongoClient.connect(DB_CONN_STR, function(err, db){
		console.log("连接成功！");
		getData(db, function(rs){			
			res.end(JSON.stringify(rs));   //将结果转成字符串后返回给前台
			db.close();
		});
	});
	
	function getData(db, callback){
		var collection = db.collection('tb1'),
			whereStr = {'age':{$lt:+age}};
		collection.find(whereStr).toArray(function(err, rs){		
			if (err) {
				console.log('Error:' + err);
				return;
			}
			callback(rs);
		});		
	}	
});

//插入数据
app.post('/addDate', urlencodeParser, function (req, res) {
	//每次请求都建立一个与数据库的连接
	//连接成功后，在回调里作相应的操作
	//完成任务后关掉这个连接
	
	var obj = req.body;   //如果是post请求，那么参数就在req.body里
	// console.log(obj);
	
	MongoClient.connect(DB_CONN_STR, function(err, db){
		console.log("连接成功！");
		insertData(db, function(rs){			
			response = rs;
			res.end(JSON.stringify(response));   //将结果转成字符串后返回给前台
			db.close();
		});
	});
	
	var data = {
		"name" : req.body.name,
		"age" : +req.body.age
	};	
	
	function insertData(db, callback){
		//连接到表
		var collection = db.collection('tb1');
		
		//插入数据		
		collection.insert(data, function(err, result){
			if (err) {
				console.log('Error:' + err);
				return;
			}
			callback(result);
		});
	}	
});

//修改数据
app.post('/updateDate', urlencodeParser, function (req, res) {
	var age = req.body.age;
	MongoClient.connect(DB_CONN_STR, function(err, db){
		console.log("连接成功！");
		updateData(db, function(rs){			
			response = rs;
			res.end(JSON.stringify(response));   //将结果转成字符串后返回给前台
			db.close();
		});
	});	
	
	function updateData(db, callback){
		//连接到表
		var collection = db.collection('tb1'),
			whereStr = {'age':{$gt:+age}},
		    updateStr = {$set:{'age':16}};
			
		// collection.update(whereStr, updateStr, true, true, function(err, result){
			// if (err) {
				// console.log('Error:' + err);
				// return;
			// }
			// callback(result);
		// });
		
		//做个循环，只到全部改完为止
		collection.update(whereStr, updateStr, function(err, result){
			if (err) {
				console.log('Error:' + err);
				return;
			}
			callback(result);
		});
	}	
});

//删除数据
app.post('/delDate', urlencodeParser, function (req, res) {
	var age = req.body.age;	
	MongoClient.connect(DB_CONN_STR, function(err, db){
		console.log("连接成功！");
		delData(db, function(rs){			
			response = rs;
			res.end(JSON.stringify(response));   //将结果转成字符串后返回给前台
			db.close();
		});
	});		
	
	function delData(db, callback){
		//连接到表
		var collection = db.collection('tb1'),
			whereStr1 = {'age':age},
			whereStr = {'age':{$lt:+age}};
		collection.remove(whereStr1, function(err, result){
			if (err) {
				console.log('Error:' + err);
				return;
			}
			callback(result);
		});
	}	
});

//设置服务的监听端口
var server = app.listen(8082, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);	
})



