(function() {
'use strict';

  angular
    .module('App')
    .controller('CertificateController', CertificateController);

    CertificateController.$inject = ['$scope', '$state', '$ionicModal'];
    function CertificateController($scope, $state, $ionicModal) {

      $ionicModal.fromTemplateUrl('templates/modals/end-objective-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.openObjectiveModal = function() {
        $scope.modal.show();
      };

      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      $scope.beginCertification = function() {
        $scope.modal.hide();
        $state.go('app.scenario')
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
    }
})();
