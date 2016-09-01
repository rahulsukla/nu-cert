(function () {
	'use strict';

	angular
		.module('App')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$state', '$ionicPopup', 'Modals', 'Model', 'userProfileService'];
	function LoginController($scope, $state, $ionicPopup, Modals, Model, userProfileService) {
    $scope.userData = null;
    $scope.userData = {
      user_name: '',
      password: ''
    };
    $scope.submitting = false;
    $scope.invalidLogin = false;


    activate();
    ///////////

    function activate() {
      return userProfileService.fetchUserDetails()
        .then(function(){
          $state.go('app.certifications');
        });
    }

    $scope.login = function() {
      $scope.submiting = true;
      $scope.invalidLogin = false;
      userProfileService.login()
        .then(function(){
          $state.go('app.certifications');
          $scope.submiting = false
        })
        .catch(function(){
          $scope.invalidLogin = true;
        });
    }


	}
})();
