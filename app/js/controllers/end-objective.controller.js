(function() {
'use strict';

  angular
    .module('App')
    .controller('EndObjectiveController', EndObjectiveController);

    EndObjectiveController.$inject = ['$scope', '$state'];
    function EndObjectiveController($scope, $state) {
      $scope.continueExam = function() {
        $state.go('app.selectModule')
      };
    }
})();
