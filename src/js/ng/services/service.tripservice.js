(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const tripRoute = '/trip';

  const tripService = function tripService($http, $q) {
    return {
      getCurrentTrip: function getCurrentTrip() {
        return $q((resolve, reject) => {
          $http.get(tripRoute)
            .then((trip) => {
                resolve(trip.data);
              },
              (err) => {
                reject(err);
              });
        });
      },
      setNextDestination: function setNextDestination(id) {
        return $q((resolve, reject) => {
          $http.put(tripRoute, {
              destination: id
            })
            .then((res) => {
                resolve(res.data);
              },
              (err) => {
                reject(err);
              });
        });
      },
      clearTrip: function clearTrip() {
        return $q((resolve, reject) => {
          $http.delete(tripRoute)
            .then((res) => {
                resolve("ok");
              },
              (err) => {
                reject(err);
              });
        });
      },
      beginTrip: function beginTrip() {

      },
      addDestination: function addDestination(id) {

      }
    };
  };

  angular.module('apox').factory('TripService', ['$http', '$q', tripService]);
})();
