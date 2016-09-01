(function() {
'use strict';

  angular
    .module('App')
    .controller('EndObjectiveController', EndObjectiveController);

    EndObjectiveController.$inject = ['$scope', '$state'];
    function EndObjectiveController($scope, $state) {
      $scope.beginCertification = function() {
        $state.go('app.scenario')
      };
    }
})();
