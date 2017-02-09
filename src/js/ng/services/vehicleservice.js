(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const vehicleRoute = '/vehicle';

  /* A service to interface with the driver routes */

  const VehicleService = function vehicleService($http, $q) {
    return {
      getVehicle: function getVehicle() {
        return $q((resolve, reject) => {
          $http.get(vehicleRoute)
            .then((vehicle) => {
                resolve(vehicle.data);
              },
              (err) => {
                reject(err);
              });
        });
      }
    };
  };

  angular.module('apox').factory('DriverService', ['$http', '$q', VehicleService]);
})();
