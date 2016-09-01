(function() {
'use strict';

  angular
    .module('App')
    .controller('CertificateController', CertificateController);

    CertificateController.$inject = ['$scope', '$state'];
    function CertificateController($scope, $state) {
      $scope.certificate = null;

      activate();
      ///////////

      function activate() {
        return 
      }

    }
})();
