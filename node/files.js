var fs= require("fs");
 
fs.appendFile('test.txt', 'data to append', function (err) {
	if (err) throw err;

	//数据被添加到文件的尾部
	console.log('The "data to append" was appended to file!'); 
});