(function () {
  'use strict';

  angular
    .module('App')
    .factory('certificationsService', certificationsService);

  certificationsService.$inject = ['$http'];
  function certificationsService($http) {

    return {
      getAllCertifications: function () {
        return $http.get('/app/certifications/')
          .then(function(response){
            return response.data;
          });
      }
    };
  }
})();
