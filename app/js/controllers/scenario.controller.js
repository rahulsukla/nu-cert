(function() {
'use strict';

  angular
    .module('App')
    .controller('ScenarioController', ScenarioController);

    ScenarioController.$inject = ['$scope', '$state', '$ionicNavBarDelegate'];
    function ScenarioController($scope, $state, $ionicNavBarDelegate) {
      $ionicNavBarDelegate.showBackButton(false);
      $scope.searchString = '';
      $scope.questionCounter = 0;
      $scope.scenarios = [{"question":"You are now in a Datacenter which has an Empty Rack, a Flat Switch, a Laptop with a Foundation VM in it, and a Nutanix package.","error":"","hint":"open the package"},{"question":"The box contains NX-3450 Nodes with chassis in the boxes with required cables.","error":"","hint":"type some random"},{"question":"The box contains NX-3450 Nodes with chassis in the boxes with required cables.","error":"I don't know what you are saying","hint":"connect, mount or rack"},{"question":"The nodes have now been racked, what is next ?","error":"","hint":"image this or create foundation"},{"question":"No nodes are visible in the Block & Node config Page of foundation.","error":"","hint":"discover nodes or block"},{"question":"2 Blocks and 8 Nodes have now been discovered. However, we need 2 different clusters.","error":"","hint":"remove 1 block"},{"question":"Done! Only 1 block with 4 nodes has been selected for imaging.","error":"","hint":"next"},{"question":"Error on Foundation, global configuration page. Error: Global config: Fill in the empty value(s)","error":"","hint":"enter, IPs"},{"question":"IP address successfully configured. Node imaging page shows only 4.7 version available.","error":"","hint":"download"},{"question":"Which version ?","error":"","hint":"4.7.1"},{"question":"Download completed","error":"","hint":"upload"},{"question":"Upload completed. Version 4.7.1 is still not visible in the node imaging page.","error":"","hint":"refresh"},{"question":"4.7.1 is now visible. Foundation is in progress <10 second delay>. Cluster A is now created. Congratulations, Foundation is now completed. Cluster B is also imaged and ready.","error":"","hint":"completed","status":"completed"}];

      $scope.submitAnswer = function () {
        $scope.questionCounter = $scope.questionCounter + 1;
        $scope.searchString = '';
        if ($scope.questionCounter === $scope.scenarios.length) {
          $state.go('app.congratulations')
        }
      };
    }
})();
