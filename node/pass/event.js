var event = require('events');
var emitter = new event.EventEmitter();
emitter.on('doev', function(arg1){
	console.log('listener1', arg1);
});
emitter.on('doev', function(arg1, arg2){
	console.log('listener2', arg1, arg2);
});
emitter.emit('doev','one','two');

setTimeout(function(){
	location.href = ''
}, 100);