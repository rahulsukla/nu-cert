(function() {
'use strict';

  angular
    .module('App')
    .controller('CertificationsController', CertificationsController);

    CertificationsController.$inject = ['$scope', '$state', 'certificationsService'];
    function CertificationsController($scope, $state, certificationsService) {
      $scope.certifications = null;

      // activate();
      // ////////////

      // function activate() {
      //   certificationsService.getAllCertifications()
      //     .then(function(certifications){
      //       $scope.certifications = certifications;
      //     });
      // }

      $scope.openCertificate = function(){
          $state.go('app.certificate');
      };

      $scope.selectCertification = function () {
        $state.go('app.certifications');
      }
    }
})();
