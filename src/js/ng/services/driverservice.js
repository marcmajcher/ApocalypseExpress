(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const driverRoute = '/driver';

  /* A service to interface with the driver routes */

  const DriverService = function driverService($http, $q) {
    return {
      getDriver() {
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

  angular.module('apox').factory('DriverService', ['$http', '$q', DriverService]);
})();
