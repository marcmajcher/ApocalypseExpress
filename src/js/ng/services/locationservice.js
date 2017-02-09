(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const locationRoute = '/location';

  /* A service to interface with the location routes */

  const locationService = function locationService($http, $q) {
    return {
      getCurrentLocation() {
        return $q((resolve, reject) => {
          $http.get(locationRoute)
            .then((location) => {
                resolve(location.data);
              },
              (err) => {
                reject(err);
              });
        });
      },
      getDistanceFromId(location, id) {
        for (let i = 0; i < location.connections.length; i++) {
          if (location.connections[i].id === id) {
            return location.connections[i].distance;
          }
        }
        return -1; // eslint-disable-line no-magic-numbers
      }
    };
  };

  angular.module('apox').factory('LocationService', ['$http', '$q', locationService]);
})();
