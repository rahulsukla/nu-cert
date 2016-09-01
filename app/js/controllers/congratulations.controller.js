(function() {
'use strict';

  angular
    .module('App')
    .controller('CongratulationsController', CongratulationsController);

    CongratulationsController.$inject = ['$scope', '$state'];
    function CongratulationsController($scope, $state) {
      $scope.certificate = null;

    }
})();
