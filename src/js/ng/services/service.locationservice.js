(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const locationRoute = '/location';

  const locationService = function locationService($http, $q) {
    return {
      getCurrentLocation: function getCurrentLocation() {
        return $q((resolve, reject) => {
          $http.get(locationRoute)
            .then((location) => {
                resolve(location.data);
              },
              (err) => {
                reject(err);
              });
        });
      }
    };
  };

  angular.module('apox').factory('LocationService', ['$http', '$q', locationService]);
})();
