(() => {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint class-methods-use-this: off */

  const locationRoute = '/location';

  /* A service to interface with the location routes */

  class LocationService {

    constructor($http, $q) {
      this.$http = $http;
      this.$q = $q;
    }

    getCurrentLocation() {
      return this.$q((resolve, reject) => {
        this.$http.get(locationRoute)
          .then((location) => {
              resolve(location.data);
            },
            (err) => {
              reject(err);
            });
      });
    }

    getDistanceFromId(location, id) {
      for (let i = 0; i < location.connections.length; i++) {
        if (location.connections[i].id === id) {
          return location.connections[i].distance;
        }
      }
      return -1; // eslint-disable-line no-magic-numbers
    }

  }

  angular.module('apox').service('LocationService', ['$http', '$q', LocationService]);
})();
