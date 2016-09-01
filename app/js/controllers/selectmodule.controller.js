
(function () {
    'use strict';

    angular
        .module('App')
        .controller('SelectModuleController', SelectModuleController);

    SelectModuleController.$inject = ['$scope', '$state', '$ionicPopup', 'Modals', 'Model', 'userProfileService'];
    function SelectModuleController($scope, $state, $ionicPopup, Modals, Model, userProfileService) {


   //activate();
   ///////////

   /*function activate() {
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
   }*/


    }
})();


