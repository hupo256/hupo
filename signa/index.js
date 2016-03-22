module.exports = function(app){
　　app.get('/',function(req,res){
       res.render('test',{issuccess:"ok"})
    }); 
	
	//get路由
    app.get('/interface',function(req,res){
		
	});
	
	//post路由
    app.post('/interface',function(req,res){
		
	});  
}