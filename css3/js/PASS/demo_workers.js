var i=0;
function timedCount(){	
	i=i+1;
	postMessage(i);
	console.log(i);
	// if(i<5)setTimeout(arguments.callee, 100);
	if(i<5)setTimeout(timedCount, 100);
}
timedCount();

//worker.js 
// onmessage =function (evt){   
	// var d = evt.data;//通过evt.data获得发送来的数据   
	// postMessage( '49+846464' );//将获取到的数据发送会主线程 
// } 

