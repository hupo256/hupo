//事件
var app = angular.module('myapp', []);
app.controller('mycontrol', function($scope) {
	$scope.person = {
		fname : 'jack',
		lname : 'bluce',
		age : 28,
		fullName : function(){
			// console.log(this);
			return this.fname + ' ' + this.lname
		}
	}	
});



$('#btn').on('click', function(e){
	console.log('ok');
	var ds = $(this).prop('disabled', true);
	console.log(ds);
	
	setTimeout(function(){
		$('button').prop('disabled', function(i, v){
			return !v;
		});
	}, 2000);
});











