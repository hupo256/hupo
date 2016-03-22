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

//加载url组件
var url = require('url');
var querystring = require('querystring');
var util = require('util');


//路由跳转
app.get('/', function (req, res) {
    // res.sendFile( __dirname + "/" + "index.html" );
	var rs = url.parse('https://www.dianrong.com/mkt/h5-ny-1w/?target=/h5/my-account&referredBy=m_BL067', true,true);	    
	
	var result = querystring.parse('foo=bar&cool=xux&cool=yys');
	var sr = util.inspect(result);
    res.send(sr);
	// res.send('Hello GET');
});




//设置服务的监听端口
var server = app.listen(8082, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);	
})