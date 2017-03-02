(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const driverRoute = '/driver';
  const vehicleRoute = '/vehicle';

  /* A service to interface with the driver routes */

  const DriverService = function driverService($http, $q) {
    const getDriver = $http.get(driverRoute);
    const getVehicle = $http.get(vehicleRoute);

    return {
      getDriver() {
        return $q((resolve, reject) => {
          $q.all([getDriver, getVehicle])
            .then((data) => {
                const driverObj = data[0].data;
                driverObj.vehicle = data[1].data;
                resolve(driverObj);
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
