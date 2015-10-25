angular.module('Framework')
	.controller('userCtrl', function ($scope, $http, $translate, $window) {

    //*** Internationalization

    $scope.changeLanguage = function (key) {
        $translate.use(key);
      }; 

    //*** Login Register

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
        console.log("j'ai envoye la requete");
  			if (res.success)
  				$window.location.href = ('/home');
  			else
  				$scope.error_message = res.message;
  		});
  	};

    //*** Home Ticket

    $scope.addTicket = function() {
      $http.post('/home', $scope.ticket)
        .success(function(res) {
          $scope.cheat = res;
          $scope.cheat_date = new Date();
          document.getElementById('cheat').style.display = "block";
          document.getElementById('ticket-section1').style.display = "none";
          document.getElementById('ticket-section2').style.display = "block";
        });
    };

});
