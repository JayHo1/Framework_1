angular.module('Framework')
	.controller('userCtrl', function ($scope, $http, $translate, $window, $location) {

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
          console.log("hello");
          document.getElementById('cheat').style.display = "block";
          document.getElementById('ticket-section1').style.display = "none";
          document.getElementById('ticket-section2').style.display = "block";
        });
    };

    $scope.addAnswer = function() {
      var paramValue = $location.absUrl();
      $scope.answerTicket.ans_id = paramValue.slice(34);
      $http.post('/home/ticket', $scope.answerTicket).success(function(res){
        if (res.success)
          $window.location.href = (paramValue);
        else
          console.log("NOT OK");
      });
    };

    $scope.remove_ticket = function(data) {
      $scope.ticket = {
        _id: data
      };
      $http.post('/home/ticket/remove', $scope.ticket).success(function(res){
        if (res.success)
          $window.location.href = ('/home');
        else
          console.log('Remove fail!');
      });
    };

    $scope.lock_ticket = function(data) {
      $scope.lock = {
        _id: data
      };
      $http.post('/home/ticket/lock', $scope.lock).success(function(res){
        if (res.close == true) {
          document.getElementById(res._id).src = 'images/lock1-icon.svg';
          $scope.flashMessage = res.message;
        }
        else {
          document.getElementById(res._id).src = 'images/lock2-icon.svg';
          $scope.flashMessage = res.message;
        }
      });
    };

    $scope.assAdmin = function() {
      var url = $location.absUrl();
      $scope.data.ticketId = url.slice(34);
      $http.post('/ticket/assign', $scope.data).success(function(res) {
        if (res.success)
          $window.location.href = (url);
        else
          console.log('Assign fail!');
      });
    };

    //*** Forum Category

    $scope.addCtg = function() {
      if (!$scope.ctg.newCtg)
        $scope.message = "Field required !";
      else {
        $http.post('/forum/addctg', $scope.ctg).success(function(res){
          $window.location.href = ('/forum');
        });
      }
    };

    $scope.removeCtg = function(data) {
      $scope.ctg = {
        name: data
      };
      $http.post('/forum/rmctg', $scope.ctg).success(function(res){
         $window.location.href = ('/forum');
      });
    };

    $scope.ctg_edit = function(data) {
      $scope.edit.oldCtg = data;
      $http.post('/forum/editctg', $scope.edit).success(function(res){
        $window.location.href = ('/forum');
      });
    };

    //*** Forum Topic

    $scope.createTopic = function() {
      if ($scope.data.title && $scope.data.content && $scope.data.category)
      {
        $http.post('/forum/thread', $scope.data).success(function(res){
          $window.location.href = ('/forum');
        });
      }
      else {
        $scope.message = "Field required!";
      }
    };

    $scope.addTr = function() {
      var topicUrl = $location.absUrl();
      $scope.topicReply.replyId = topicUrl.slice(35);
      $http.post('/forum/thread/topic', $scope.topicReply).success(function(res){
        if (res.success)
          $window.location.href = (topicUrl);
        else
          console.log("Message not send!");
      });
    };

    $scope.removeThread = function(data) {
      $scope.remove = {
        threadId: data
      };
      $http.post('/forum/remove/thread', $scope.remove).success(function(res){ 
        if (res.success)
          $window.location.href = ('/forum');
        else
          console.log("Remove Fail!");
      });
    };

    $scope.addRepSub = function(data, i) {
      var topicUrl = $location.absUrl();
      $scope.message.data = data;
      $scope.message.count = i;
      $http.post('/home/thread/replySub', $scope.message).success(function(res){
        if (res.success)
          $window.location.href = (topicUrl);
        else
          console.log("Reply not send!");
      });
    };

});
