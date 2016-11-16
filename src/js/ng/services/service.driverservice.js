(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const driverRoute = '/driver';

  const driverService = function driverService($http, $q) {
    return {
      getDriver: function getDriver() {
        return $q((resolve, reject) => {
          $http.get(driverRoute)
            .then((driver) => {
                resolve(driver.data);
              },
              (err) => {
                reject(err);
              });
        });
      }
    };
  };

  angular.module('apox').factory('DriverService', ['$http', '$q', driverService]);
})();
