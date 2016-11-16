(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const driverService = function driverService($http) {
    return {
      getDriver: function getDriver() {
        return $http.get('/driver');
      }
    };
  };

  angular.module('apox').factory('DriverService', ['$http', driverService]);
})();
