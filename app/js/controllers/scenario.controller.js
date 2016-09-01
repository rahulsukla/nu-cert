(function() {
'use strict';

  angular
    .module('App')
    .controller('ScenarioController', ScenarioController);

    ScenarioController.$inject = ['$scope', '$state', '$ionicNavBarDelegate'];
    function ScenarioController($scope, $state, $ionicNavBarDelegate) {
      $ionicNavBarDelegate.showBackButton(false);
      $scope.submitAnswer = function (answer) {

      }
    }
})();
