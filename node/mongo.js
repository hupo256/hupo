
/*
//修改
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/hupo';
var updateDate = function (db, callback) {
	//连接到表
	var collection = db.collection('tb1');
	//插入数据
	var whereStr = {"age":6};
	var updateStr = {$set:{'age':100}};
	collection.update(whereStr, updateStr, function (err, result) {
		if (err) {
			console.log('Error:' + err);
			return;
		}
		callback(result);
	});
}
MongoClient.connect(DB_CONN_STR, function (err, db) {
	console.log("连接成功！");
	updateDate(db, function (e) {
		console.log(e);
		db.close();
	});
});
*/


/*
//删除
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/hupo';
var removetDate = function (db, callback) {
	//连接到表
	var collection = db.collection('tb1');
	//插入数据
	// var whereStr = {"age":{$lt:23, $gt:20}};
	var whereStr = {"age":{$gt:20}};
	collection.remove(whereStr, function (err, result) {
		if (err) {
			console.log('Error:' + err);
			return;
		}
		callback(result);
	});
}
MongoClient.connect(DB_CONN_STR, function (err, db) {
	console.log("连接成功！");
	removetDate(db, function (e) {
		console.log(e);
		db.close();
	});
});
*/


//查询
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/hupo';
var selectDate = function (db, callback) {
	//连接到表
	var collection = db.collection('tb1');
	//插入数据
	var whereStr = {"name":'wilson001'};
	collection.find().toArray(function (err, result) {
		if (err) {
			console.log('Error:' + err);
			return;
		}
		callback(result);
	});
}
MongoClient.connect(DB_CONN_STR, function (err, db) {
	console.log("连接成功！");
	selectDate(db, function (e) {
		console.log(e);
		db.close();
	});
});


/*
//插入
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/hupo';
var insertData = function (db, callback) {
	//连接到表
	var collection = db.collection('tb2');
	//插入数据
	var data = [{
			"name" : 'wilson001',
			"age" : 21
		}, {
			"name" : 'wilson002',
			"age" : 22
		}, {
			"name" : 'hupo',
			"age" : 25
		}
	];
	collection.insert(data, function (err, result) {
		if (err) {
			console.log('Error:' + err);
			return;
		}
		callback(result);
	});
}
MongoClient.connect(DB_CONN_STR, function (err, db) {
	console.log("连接成功！");
	insertData(db, function (result) {
		console.log(result);
		db.close();
	});
});
*/