angular.module('Framework')
	.controller('userCtrl', function ($scope, $http, $translate, $window) {

    $scope.changeLanguage = function (key) {
        $translate.use(key);
      }; 

  	$scope.contact = {};
  	$scope.addUser = function() {
  		console.log($scope.contact);
  		$http.post('/', $scope.contact).success(function(res){
  				if (res.success)
  				{	
  					console.log(res);
  					$window.location.href = ('home');
  				}
  				else
  				{
  					console.log(res.message);
  					$scope.error_message = res.message;
  				}
  			});
  	};

  	$scope.checkUser = function() {
  		$http.post('/login', $scope.user).success(function(res){
  			if (res.success)
  				$window.location.href = ('/home');
  			else
  				$scope.error_message = res.message;
  		});
  	};

    $scope.addTicket = function() {
      console.log($scope.ticket);
      $http.post('/home/ticket', $scope.ticket);
    };
});
