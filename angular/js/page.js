// console.log(22);

//ng-repeat
// var app = angular.module('myApp', []);
// app.controller('myCtrl', function($scope) {
    // $scope.names = [
		// {name:'jack', country:'norway'},
		// {name:'jim', country:'swden'},
		// {name:'david', country:'denmark'}
	// ];
// });

//$timeout
// var app = angular.module('myApp', []);
// app.controller('myCtrl', function($scope, $timeout) {
    // $scope.myHeader = "Hello World!";
    // $timeout(function () {
        // $scope.myHeader = "How are you today?";
    // }, 2000);	
// });


// //#http
// var app = angular.module('myApp', []);
// app.controller('myCtrl', function($scope,  $http) {  
	// $http.get("Customers_JSON.txt")
		// .success(function (response) {
			// console.log(response.data);
			// $scope.names = response.records;
		// });
// });

// var app = angular.module('myApp', []);
// app.controller('myCtrl', function($scope) {
	// // $scope.sites = [
		// // {site : "Google", url : "http://www.google.com"},
		// // {site : "Runoob", url : "http://www.runoob.com"},
		// // {site : "Taobao", url : "http://www.taobao.com"}
	// // ];
	
	// $scope.sites = {
		// site01 : "Google",
		// site02 : "Runoob",
		// site03 : "Taobao"
	// };
// });

//事件
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {  
	$scope.firstName = "John",
    $scope.lastName = "Doe"
    $scope.myVar = false;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    };
});















